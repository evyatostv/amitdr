'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/lib/i18n/navigation';
import type {Locale} from '@/lib/i18n/routing';
import {getSupabaseClient} from '@/lib/supabase/client';

const STORAGE_KEY = 'cookie_consent_v1';
const LOG_STORAGE_KEY = 'cookie_consent_log_v1';

export function CookieBanner({locale}: {locale: Locale}) {
  const t = useTranslations('cookies');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      setVisible(!saved);
    } catch {
      setVisible(true);
    }
  }, []);

  const saveConsent = (value: 'accepted' | 'essential') => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
      const raw = window.localStorage.getItem(LOG_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const next = [
        {
          choice: value,
          path: window.location.pathname,
          at: new Date().toISOString()
        },
        ...parsed
      ].slice(0, 200);
      window.localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(next));
      const supabase = getSupabaseClient();
      if (supabase) {
        void supabase.from('cookie_logs').insert({
          choice: value,
          path: window.location.pathname,
          user_agent: navigator.userAgent,
          language: navigator.language,
          source: 'cookie-banner'
        });
      }
    } finally {
      setVisible(false);
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] p-3 sm:p-4">
      <div className="container-main">
        <div className="rounded-2xl border border-brand-100 bg-white p-4 shadow-soft sm:p-5">
          <p className="text-sm font-semibold text-slate-900">{t('title')}</p>
          <p className="mt-1 text-sm text-slate-700">
            {t('description')}{' '}
            <Link href="/privacy" locale={locale} className="font-semibold text-brand-700 underline">
              {t('policyLink')}
            </Link>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              className="btn-primary"
              onClick={() => saveConsent('accepted')}
            >
              {t('acceptAll')}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => saveConsent('essential')}
            >
              {t('essentialOnly')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
