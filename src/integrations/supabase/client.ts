// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://benkcwsxshrinllatlvm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlbmtjd3N4c2hyaW5sbGF0bHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MzAzNTMsImV4cCI6MjA2NDEwNjM1M30.VY2MkLlUQbPW74Wra6QLQpXHkxwEoXIgNiVFEfY8JHA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);