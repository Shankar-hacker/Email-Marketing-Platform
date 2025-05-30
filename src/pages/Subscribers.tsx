
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useForm } from 'react-hook-form';
import { Users, Plus, Mail, UserX, LogOut, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface Subscriber {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  status: string;
  subscribed_at: string;
  tags: string[] | null;
}

interface SubscriberForm {
  email: string;
  first_name: string;
  last_name: string;
}

const Subscribers = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingSubscriber, setIsAddingSubscriber] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState<Subscriber | null>(null);
  const [isUpdatingSubscriber, setIsUpdatingSubscriber] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SubscriberForm>();
  const { register: registerEdit, handleSubmit: handleSubmitEdit, reset: resetEdit, setValue, formState: { errors: editErrors } } = useForm<SubscriberForm>();

  useEffect(() => {
    if (user) {
      fetchSubscribers();
    }
  }, [user]);

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .eq('user_id', user?.id)
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast.error('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: SubscriberForm) => {
    if (!user) return;

    setIsAddingSubscriber(true);
    try {
      const { error } = await supabase
        .from('subscribers')
        .insert({
          user_id: user.id,
          email: data.email,
          first_name: data.first_name || null,
          last_name: data.last_name || null,
        });

      if (error) {
        if (error.code === '23505') {
          toast.error('This email is already subscribed');
        } else {
          throw error;
        }
      } else {
        toast.success('Subscriber added successfully');
        reset();
        fetchSubscribers();
      }
    } catch (error) {
      console.error('Error adding subscriber:', error);
      toast.error('Failed to add subscriber');
    } finally {
      setIsAddingSubscriber(false);
    }
  };

  const onUpdateSubmit = async (data: SubscriberForm) => {
    if (!editingSubscriber) return;

    setIsUpdatingSubscriber(true);
    try {
      const { error } = await supabase
        .from('subscribers')
        .update({
          email: data.email,
          first_name: data.first_name || null,
          last_name: data.last_name || null,
        })
        .eq('id', editingSubscriber.id);

      if (error) {
        if (error.code === '23505') {
          toast.error('This email is already taken by another subscriber');
        } else {
          throw error;
        }
      } else {
        toast.success('Subscriber updated successfully');
        setEditingSubscriber(null);
        resetEdit();
        fetchSubscribers();
      }
    } catch (error) {
      console.error('Error updating subscriber:', error);
      toast.error('Failed to update subscriber');
    } finally {
      setIsUpdatingSubscriber(false);
    }
  };

  const unsubscribeUser = async (subscriberId: string) => {
    try {
      const { error } = await supabase
        .from('subscribers')
        .update({ 
          status: 'unsubscribed',
          unsubscribed_at: new Date().toISOString()
        })
        .eq('id', subscriberId);

      if (error) throw error;
      toast.success('Subscriber unsubscribed');
      fetchSubscribers();
    } catch (error) {
      console.error('Error unsubscribing user:', error);
      toast.error('Failed to unsubscribe user');
    }
  };

  const deleteSubscriber = async (subscriberId: string) => {
    try {
      const { error } = await supabase
        .from('subscribers')
        .delete()
        .eq('id', subscriberId);

      if (error) throw error;
      toast.success('Subscriber deleted successfully');
      fetchSubscribers();
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      toast.error('Failed to delete subscriber');
    }
  };

  const startEdit = (subscriber: Subscriber) => {
    setEditingSubscriber(subscriber);
    setValue('email', subscriber.email);
    setValue('first_name', subscriber.first_name || '');
    setValue('last_name', subscriber.last_name || '');
  };

  const cancelEdit = () => {
    setEditingSubscriber(null);
    resetEdit();
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscribers...</p>
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
              <Button variant="ghost" onClick={() => navigate('/campaigns')}>Campaigns</Button>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscribers</h1>
          <p className="text-gray-600">Manage your email subscribers and grow your audience</p>
        </div>

        {/* Add Subscriber Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Add New Subscriber</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Input
                  placeholder="Email address"
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Input
                  placeholder="First name (optional)"
                  {...register('first_name')}
                />
              </div>
              <div>
                <Input
                  placeholder="Last name (optional)"
                  {...register('last_name')}
                />
              </div>
              <Button type="submit" disabled={isAddingSubscriber}>
                {isAddingSubscriber ? 'Adding...' : 'Add Subscriber'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Edit Subscriber Form */}
        {editingSubscriber && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Edit className="h-5 w-5" />
                <span>Edit Subscriber</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitEdit(onUpdateSubmit)} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Input
                    placeholder="Email address"
                    type="email"
                    {...registerEdit('email', { required: 'Email is required' })}
                  />
                  {editErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{editErrors.email.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="First name (optional)"
                    {...registerEdit('first_name')}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Last name (optional)"
                    {...registerEdit('last_name')}
                  />
                </div>
                <Button type="submit" disabled={isUpdatingSubscriber}>
                  {isUpdatingSubscriber ? 'Updating...' : 'Update'}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Subscribers Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscribers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {subscribers.filter(s => s.status === 'active').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unsubscribed</CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {subscribers.filter(s => s.status === 'unsubscribed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscribers Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            {subscribers.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No subscribers yet. Add your first subscriber above!</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Subscribed</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell className="font-medium">{subscriber.email}</TableCell>
                      <TableCell>
                        {subscriber.first_name || subscriber.last_name
                          ? `${subscriber.first_name || ''} ${subscriber.last_name || ''}`.trim()
                          : '-'
                        }
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          subscriber.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {subscriber.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(subscriber.subscribed_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEdit(subscriber)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {subscriber.status === 'active' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => unsubscribeUser(subscriber.id)}
                            >
                              Unsubscribe
                            </Button>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Subscriber</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this subscriber? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteSubscriber(subscriber.id)}>
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

export default Subscribers;
