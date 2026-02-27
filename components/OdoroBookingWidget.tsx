'use client';

import {useEffect} from 'react';

declare global {
  interface Window {
    odoro?: {
      params?: {
        clinicId: string;
        mode: string;
        lang?: 'he' | 'en';
        options: {appdrn: string};
        divId: string;
      };
    };
  }
}

export function OdoroBookingWidget({
  clinicId,
  appdrn,
  divId,
  lang
}: {
  clinicId: string;
  appdrn: string;
  divId: string;
  lang: 'he' | 'en';
}) {
  useEffect(() => {
    window.odoro = window.odoro || {};
    window.odoro.params = {
      clinicId,
      mode: 'public',
      lang,
      options: {appdrn},
      divId
    };

    const existing = document.querySelector(
      'script[data-odoro-widget="true"]'
    ) as HTMLScriptElement | null;

    if (existing) {
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://widget.doctorim.co.il/js/widget.js';
    script.setAttribute('data-odoro-widget', 'true');
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [clinicId, appdrn, divId, lang]);

  return <div id={divId} className="w-full" aria-label="Odoro booking widget" />;
}
