'use client';

import {useLocale, useTranslations} from 'next-intl';

export function WhatsappButton() {
  const t = useTranslations();
  const locale = useLocale();
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!number) {
    return null;
  }

  const message =
    locale === 'he'
      ? encodeURIComponent('שלום, אשמח לקבוע תור עם ד"ר עמית דרויאן.')
      : encodeURIComponent('Hello, I would like to book an appointment with Dr Amit Druyan.');

  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-soft"
      aria-label={t('common.whatsapp')}
    >
      {t('common.whatsapp')}
    </a>
  );
}
