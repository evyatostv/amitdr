'use client';

import {createClient, type SupabaseClient} from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient() {
  if (cachedClient) {
    return cachedClient;
  }

  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://dzhrczoxkfglxdlqllkp.supabase.co';
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6aHJjem94a2ZnbHhkbHFsbGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxOTI5MTcsImV4cCI6MjA4Nzc2ODkxN30.kQF2sva0zNzmo446hQJxfPnAri5RgYu_bNcLJAXtCJs';

  if (!url || !anonKey) {
    return null;
  }

  cachedClient = createClient(url, anonKey);
  return cachedClient;
}
