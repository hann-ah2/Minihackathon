import { createClient } from '@supabase/supabase-js';

// Only the project URL and public/publishable key belong in the browser.
// Never use the service role or secret key in frontend code.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

// Without configuration the existing local demo continues to work.
// Once configured, database errors are surfaced instead of silently discarding data.
export const supabase = url && publishableKey
  ? createClient(url, publishableKey, { auth: { persistSession: false } })
  : null;
