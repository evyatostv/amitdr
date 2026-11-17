'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

const measurementId = 'G-NJ4B4Z79QX';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const track = () => {
      if (window.localStorage.getItem('cookie_consent_v1') !== 'accepted') return;
      if (!window.gtag) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
        window.gtag('js', new Date());
        window.gtag('config', measurementId, {send_page_view: false});
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script);
      }
      window.gtag('event', 'page_view', {page_path: pathname, page_location: `${window.location.origin}${pathname}`});
    };

    track();
    window.addEventListener('analytics-consent-changed', track);
    return () => window.removeEventListener('analytics-consent-changed', track);
  }, [pathname]);

  return null;
}
