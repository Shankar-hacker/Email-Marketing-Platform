
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useForm } from 'react-hook-form';
import { Mail, Plus, Send, Clock, CheckCircle, LogOut, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface Campaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  status: string;
  created_at: string;
  scheduled_at: string | null;
  sent_at: string | null;
}

interface CampaignForm {
  name: string;
  subject: string;
  content: string;
}

const Campaigns = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [isUpdatingCampaign, setIsUpdatingCampaign] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CampaignForm>();
  const { register: registerEdit, handleSubmit: handleSubmitEdit, reset: resetEdit, setValue, formState: { errors: editErrors } } = useForm<CampaignForm>();

  useEffect(() => {
    if (user) {
      fetchCampaigns();
    }
  }, [user]);

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: CampaignForm) => {
    if (!user) return;

    setIsCreatingCampaign(true);
    try {
      const { error } = await supabase
        .from('campaigns')
        .insert({
          user_id: user.id,
          name: data.name,
          subject: data.subject,
          content: data.content,
          status: 'draft'
        });

      if (error) throw error;
      
      toast.success('Campaign created successfully');
      reset();
      setShowCreateForm(false);
      fetchCampaigns();
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error('Failed to create campaign');
    } finally {
      setIsCreatingCampaign(false);
    }
  };

  const onUpdateSubmit = async (data: CampaignForm) => {
    if (!editingCampaign) return;

    setIsUpdatingCampaign(true);
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({
          name: data.name,
          subject: data.subject,
          content: data.content,
        })
        .eq('id', editingCampaign.id);

      if (error) throw error;
      
      toast.success('Campaign updated successfully');
      setEditingCampaign(null);
      resetEdit();
      fetchCampaigns();
    } catch (error) {
      console.error('Error updating campaign:', error);
      toast.error('Failed to update campaign');
    } finally {
      setIsUpdatingCampaign(false);
    }
  };

  const sendCampaign = async (campaignId: string) => {
    try {
      // First, check if there are any subscribers
      const { data: subscribers, error: subscribersError } = await supabase
        .from('subscribers')
        .select('id')
        .eq('user_id', user?.id)
        .eq('status', 'active');

      if (subscribersError) throw subscribersError;

      if (!subscribers || subscribers.length === 0) {
        toast.error('No active subscribers found. Add subscribers first.');
        return;
      }

      // Update campaign status to sent
      const { error } = await supabase
        .from('campaigns')
        .update({ 
          status: 'sent',
          sent_at: new Date().toISOString()
        })
        .eq('id', campaignId);

      if (error) throw error;

      // Create campaign stats
      const { error: statsError } = await supabase
        .from('campaign_stats')
        .insert({
          campaign_id: campaignId,
          total_sent: subscribers.length
        });

      if (statsError) console.error('Error creating stats:', statsError);

      toast.success(`Campaign sent to ${subscribers.length} subscribers!`);
      fetchCampaigns();
    } catch (error) {
      console.error('Error sending campaign:', error);
      toast.error('Failed to send campaign');
    }
  };

  const deleteCampaign = async (campaignId: string) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', campaignId);

      if (error) throw error;
      toast.success('Campaign deleted successfully');
      fetchCampaigns();
    } catch (error) {
      console.error('Error deleting campaign:', error);
      toast.error('Failed to delete campaign');
    }
  };

  const startEdit = (campaign: Campaign) => {
    if (campaign.status === 'sent') {
      toast.error('Cannot edit a campaign that has already been sent');
      return;
    }
    setEditingCampaign(campaign);
    setValue('name', campaign.name);
    setValue('subject', campaign.subject);
    setValue('content', campaign.content);
  };

  const cancelEdit = () => {
    setEditingCampaign(null);
    resetEdit();
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Mail className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EM</span>
              </div>
              <span className="text-xl font-bold text-gray-900">EmailMaster</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>Dashboard</Button>
              <Button variant="ghost" onClick={() => navigate('/subscribers')}>Subscribers</Button>
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaigns</h1>
              <p className="text-gray-600">Create and manage your email campaigns</p>
            </div>
            <Button onClick={() => setShowCreateForm(!showCreateForm)}>
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>

        {/* Create Campaign Form */}
        {showCreateForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Create New Campaign</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    placeholder="Campaign name"
                    {...register('name', { required: 'Campaign name is required' })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Email subject line"
                    {...register('subject', { required: 'Subject is required' })}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>
                <div>
                  <textarea
                    className="w-full min-h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email content (HTML supported)"
                    {...register('content', { required: 'Content is required' })}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                  )}
                </div>
                <div className="flex space-x-4">
                  <Button type="submit" disabled={isCreatingCampaign}>
                    {isCreatingCampaign ? 'Creating...' : 'Create Campaign'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Edit Campaign Form */}
        {editingCampaign && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Edit className="h-5 w-5" />
                <span>Edit Campaign</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitEdit(onUpdateSubmit)} className="space-y-4">
                <div>
                  <Input
                    placeholder="Campaign name"
                    {...registerEdit('name', { required: 'Campaign name is required' })}
                  />
                  {editErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{editErrors.name.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Email subject line"
                    {...registerEdit('subject', { required: 'Subject is required' })}
                  />
                  {editErrors.subject && (
                    <p className="text-red-500 text-sm mt-1">{editErrors.subject.message}</p>
                  )}
                </div>
                <div>
                  <textarea
                    className="w-full min-h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email content (HTML supported)"
                    {...registerEdit('content', { required: 'Content is required' })}
                  />
                  {editErrors.content && (
                    <p className="text-red-500 text-sm mt-1">{editErrors.content.message}</p>
                  )}
                </div>
                <div className="flex space-x-4">
                  <Button type="submit" disabled={isUpdatingCampaign}>
                    {isUpdatingCampaign ? 'Updating...' : 'Update Campaign'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Campaign Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{campaigns.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {campaigns.filter(c => c.status === 'draft').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sent</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {campaigns.filter(c => c.status === 'sent').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {campaigns.filter(c => c.status === 'scheduled').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            {campaigns.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No campaigns yet. Create your first campaign above!</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>{campaign.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(campaign.status)}
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(campaign.status)}`}>
                            {campaign.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(campaign.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {campaign.status === 'draft' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => startEdit(campaign)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => sendCampaign(campaign.id)}
                              >
                                <Send className="h-4 w-4 mr-1" />
                                Send
                              </Button>
                            </>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Campaign</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this campaign? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteCampaign(campaign.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Campaigns;
