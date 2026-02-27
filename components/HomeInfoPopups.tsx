'use client';

import type {Locale} from '@/lib/i18n/routing';
import {Link} from '@/lib/i18n/navigation';

type PopupItem = {
  key: 'services' | 'articles' | 'faq';
  titleHe: string;
  titleEn: string;
  textHe: string;
  textEn: string;
  href: '/services' | '/articles' | '/faq';
};

const popupItems: PopupItem[] = [
  {
    key: 'services',
    titleHe: 'שירותים',
    titleEn: 'Services',
    textHe: 'ייעוץ ריאומטולוגי, חוות דעת שנייה, התאמת טיפול ומעקב.',
    textEn: 'Rheumatology consultation, second opinion, treatment planning and follow-up.',
    href: '/services'
  },
  {
    key: 'articles',
    titleHe: 'מאמרים וסרטונים',
    titleEn: 'Articles & Videos',
    textHe: 'תוכן מקצועי קצר וברור עם קישורים למקורות.',
    textEn: 'Short, clear medical content with source links.',
    href: '/articles'
  },
  {
    key: 'faq',
    titleHe: 'שאלות נפוצות',
    titleEn: 'FAQ',
    textHe: 'תשובות מהירות לפני ביקור או קביעת תור.',
    textEn: 'Quick answers before your visit or booking.',
    href: '/faq'
  }
];

export function HomeInfoPopups({locale}: {locale: Locale}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {popupItems.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          locale={locale}
          className="card text-start hover:bg-brand-50"
          aria-label={locale === 'he' ? `מעבר ל${item.titleHe}` : `Go to ${item.titleEn}`}
        >
          <p className="mb-2 text-xl font-bold text-slate-900">
            {locale === 'he' ? item.titleHe : item.titleEn}
          </p>
          <p className="text-base text-slate-700">
            {locale === 'he' ? item.textHe : item.textEn}
          </p>
        </Link>
      ))}
    </div>
  );
}
