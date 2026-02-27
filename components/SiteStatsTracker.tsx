'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {getSupabaseClient} from '@/lib/supabase/client';

export function SiteStatsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      return;
    }

    void supabase.from('site_stats').insert({
      path: pathname,
      referrer: document.referrer || null,
      language: navigator.language || null,
      user_agent: navigator.userAgent || null,
      screen: `${window.screen.width}x${window.screen.height}`,
      cookies_enabled: navigator.cookieEnabled
    });
  }, [pathname]);

  return null;
}
