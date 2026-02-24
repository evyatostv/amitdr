'use client';

import {useState} from 'react';
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
  const [active, setActive] = useState<PopupItem | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        {popupItems.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setActive(item)}
            className="card text-start hover:bg-brand-50"
            aria-haspopup="dialog"
            aria-label={locale === 'he' ? `פתיחת ${item.titleHe}` : `Open ${item.titleEn}`}
          >
            <p className="mb-2 text-xl font-bold text-slate-900">
              {locale === 'he' ? item.titleHe : item.titleEn}
            </p>
            <p className="text-base text-slate-700">
              {locale === 'he' ? item.textHe : item.textEn}
            </p>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={locale === 'he' ? active.titleHe : active.titleEn}
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-brand-100 bg-white p-6 shadow-soft"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="mb-3 text-2xl font-black text-slate-900">
              {locale === 'he' ? active.titleHe : active.titleEn}
            </h3>
            <p className="mb-5 text-base text-slate-700">
              {locale === 'he' ? active.textHe : active.textEn}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={active.href} className="btn-primary" onClick={() => setActive(null)}>
                {locale === 'he' ? 'מעבר לעמוד' : 'Open Page'}
              </Link>
              <button type="button" className="btn-secondary" onClick={() => setActive(null)}>
                {locale === 'he' ? 'סגירה' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

