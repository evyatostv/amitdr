'use client';

import {FormEvent, useEffect, useMemo, useState} from 'react';
import {createClient, type Session} from '@supabase/supabase-js';

type CookieLog = {
  choice: 'accepted' | 'essential';
  path: string;
  at: string;
};

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://dzhrczoxkfglxdlqllkp.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6aHJjem94a2ZnbHhkbHFsbGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxOTI5MTcsImV4cCI6MjA4Nzc2ODkxN30.kQF2sva0zNzmo446hQJxfPnAri5RgYu_bNcLJAXtCJs';

const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);
const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
const ADMIN_USERNAME = 'AmitDruyan';
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || '';

export default function AdmitPage() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const [cookieLogs, setCookieLogs] = useState<CookieLog[]>([]);
  const [dbLogs, setDbLogs] = useState<Array<Record<string, unknown>>>([]);
  const [dbStats, setDbStats] = useState<Array<Record<string, unknown>>>([]);
  const [dbError, setDbError] = useState('');

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({data}) => {
      setSession(data.session);
    });

    const {
      data: {subscription}
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('cookie_consent_log_v1');
      const parsed = raw ? (JSON.parse(raw) as CookieLog[]) : [];
      setCookieLogs(parsed);
    } catch {
      setCookieLogs([]);
    }
  }, []);

  useEffect(() => {
    if (!session || !supabase) {
      return;
    }

    (async () => {
      const [{data: logs, error: logsError}, {data: stats, error: statsError}] = await Promise.all([
        supabase
          .from('cookie_logs')
          .select('*')
          .order('created_at', {ascending: false})
          .limit(100),
        supabase
          .from('site_stats')
          .select('*')
          .order('created_at', {ascending: false})
          .limit(100)
      ]);

      setDbLogs(logs ?? []);
      setDbStats(stats ?? []);
      setDbError(logsError?.message || statsError?.message || '');
    })();
  }, [session]);

  const browserStats = useMemo(
    () => [
      {label: 'Current path', value: typeof window !== 'undefined' ? window.location.pathname : ''},
      {label: 'Referrer', value: typeof window !== 'undefined' ? document.referrer || 'Direct' : ''},
      {label: 'Language', value: typeof window !== 'undefined' ? navigator.language : ''},
      {label: 'User agent', value: typeof window !== 'undefined' ? navigator.userAgent : ''},
      {label: 'Screen', value: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : ''},
      {label: 'Cookies enabled', value: typeof window !== 'undefined' ? (navigator.cookieEnabled ? 'Yes' : 'No') : ''}
    ],
    []
  );

  async function onLogin(event: FormEvent) {
    event.preventDefault();
    if (!supabase) {
      setError('Missing Supabase config. Add NEXT_PUBLIC_SUPABASE_ANON_KEY.');
      return;
    }

    setError('');
    setBusy(true);
    const normalizedLogin =
      loginId.includes('@')
        ? loginId.trim()
        : loginId.trim() === ADMIN_USERNAME && ADMIN_EMAIL
          ? ADMIN_EMAIL
          : '';

    if (!normalizedLogin) {
      setBusy(false);
      setError(
        loginId.trim() === ADMIN_USERNAME
          ? 'Set NEXT_PUBLIC_ADMIN_EMAIL to map this username to your Supabase admin email.'
          : 'Use your Supabase admin email to sign in.'
      );
      return;
    }

    const {error: loginError} = await supabase.auth.signInWithPassword({
      email: normalizedLogin,
      password
    });
    setBusy(false);

    if (loginError) {
      setError(loginError.message);
    }
  }

  async function onLogout() {
    if (!supabase) {
      return;
    }
    await supabase.auth.signOut();
    setDbLogs([]);
    setDbStats([]);
  }

  return (
    <section className="section-space">
      <div className="container-main max-w-5xl">
        <h1 className="mb-4 text-3xl font-black text-slate-900">Admin</h1>
        {!hasSupabaseConfig ? (
          <div className="card mb-4 border-amber-300 bg-amber-50 text-slate-800">
            <p className="font-semibold">Supabase setup required</p>
            <p className="text-sm">
              Add <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to enable login.
            </p>
          </div>
        ) : null}

        {!session ? (
          <form onSubmit={onLogin} className="card max-w-lg space-y-3">
            <p className="text-lg font-semibold text-slate-900">Admin Login</p>
            <label className="block text-sm">
              <span className="mb-1 block text-slate-700">Admin email or username</span>
              <input
                type="text"
                required
                value={loginId}
                onChange={(event) => setLoginId(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-slate-700">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2"
              />
            </label>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button type="submit" className="btn-primary" disabled={busy}>
              {busy ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="card flex items-center justify-between">
              <p className="text-sm text-slate-700">
                Logged in as <span className="font-semibold">{session.user.email}</span>
              </p>
              <button type="button" className="btn-secondary" onClick={onLogout}>
                Sign out
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="card">
                <h2 className="mb-3 text-xl font-bold text-slate-900">Cookie consent logs (browser)</h2>
                <div className="max-h-72 space-y-2 overflow-auto">
                  {cookieLogs.length === 0 ? (
                    <p className="text-sm text-slate-600">No local consent logs yet.</p>
                  ) : (
                    cookieLogs.map((log, index) => (
                      <div key={`${log.at}-${index}`} className="rounded-lg border border-slate-200 p-2 text-sm">
                        <p><span className="font-semibold">Choice:</span> {log.choice}</p>
                        <p><span className="font-semibold">Path:</span> {log.path}</p>
                        <p><span className="font-semibold">At:</span> {new Date(log.at).toLocaleString()}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="card">
                <h2 className="mb-3 text-xl font-bold text-slate-900">Website stats (browser)</h2>
                <div className="space-y-2 text-sm">
                  {browserStats.map((item) => (
                    <p key={item.label}>
                      <span className="font-semibold">{item.label}:</span> {item.value}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="card">
                <h2 className="mb-3 text-xl font-bold text-slate-900">Supabase cookie_logs</h2>
                <p className="mb-2 text-xs text-slate-500">Shows records if table exists and RLS allows your admin user.</p>
                {dbError ? <p className="mb-2 text-xs text-red-600">{dbError}</p> : null}
                <div className="max-h-72 space-y-2 overflow-auto">
                  {dbLogs.length === 0 ? (
                    <p className="text-sm text-slate-600">No Supabase cookie logs yet.</p>
                  ) : (
                    dbLogs.map((row, index) => (
                      <div key={String(row.id ?? index)} className="rounded-lg border border-slate-200 p-2 text-sm text-slate-700">
                        <p><span className="font-semibold">Choice:</span> {String(row.choice ?? '-')}</p>
                        <p><span className="font-semibold">Path:</span> {String(row.path ?? '-')}</p>
                        <p><span className="font-semibold">Source:</span> {String(row.source ?? '-')}</p>
                        <p><span className="font-semibold">Created:</span> {String(row.created_at ?? '-')}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="card">
                <h2 className="mb-3 text-xl font-bold text-slate-900">Supabase site_stats</h2>
                <p className="mb-2 text-xs text-slate-500">Optional table for extra website analytics.</p>
                <div className="max-h-72 space-y-2 overflow-auto">
                  {dbStats.length === 0 ? (
                    <p className="text-sm text-slate-600">No Supabase site stats yet.</p>
                  ) : (
                    dbStats.map((row, index) => (
                      <div key={String(row.id ?? index)} className="rounded-lg border border-slate-200 p-2 text-sm text-slate-700">
                        <p><span className="font-semibold">Path:</span> {String(row.path ?? '-')}</p>
                        <p><span className="font-semibold">Language:</span> {String(row.language ?? '-')}</p>
                        <p><span className="font-semibold">Referrer:</span> {String(row.referrer ?? '-')}</p>
                        <p><span className="font-semibold">Created:</span> {String(row.created_at ?? '-')}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
