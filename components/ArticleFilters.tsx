'use client';

import {useCallback, useEffect, useMemo, useState} from 'react';
import type {Locale} from '@/lib/i18n/routing';

const tagLabelMapEn: Record<string, string> = {
  אנקינרה: 'Anakinra',
  קינרת: 'Kineret',
  גנטיקה: 'Genetics',
  עמילואידוזיס: 'Amyloidosis',
  כליות: 'Kidneys',
  חיסון: 'Vaccine',
  אוטואימוני: 'Autoimmune',
  לופוס: 'Lupus',
  זאבת: 'Lupus',
  פסוריאזיס: 'Psoriasis',
  מתוטרקסט: 'Methotrexate',
  סרקואידוזיס: 'Sarcoidosis',
  סקרואיליאקלי: 'Sacroiliac',
  קרדיווסקולרי: 'Cardiovascular',
  מעי: 'Intestinal',
  'פאבמד': 'PubMed'
};

export type UnifiedArticleItem = {
  id: string;
  titleHe: string;
  titleEn: string;
  checkedHe: string;
  checkedEn: string;
  insightHe: string;
  insightEn: string;
  date: string;
  tags: string[];
  externalLink: string;
};

export function ArticleFilters({
  items,
  locale
}: {
  items: UnifiedArticleItem[];
  locale: Locale;
}) {
  const INITIAL_VISIBLE_ITEMS = 6;
  const LOAD_MORE_COUNT = 6;
  const toDisplayTag = useCallback(
    (tag: string) => (locale === 'he' ? tag : (tagLabelMapEn[tag] ?? tag)),
    [locale]
  );

  const [activeTag, setActiveTag] = useState<string>('all');
  const [showAllTags, setShowAllTags] = useState(false);
  const [visibleItemsCount, setVisibleItemsCount] = useState(INITIAL_VISIBLE_ITEMS);

  const tags = useMemo(() => {
    const allTags = new Set<string>();
    for (const article of items) {
      article.tags.forEach((tag) => allTags.add(toDisplayTag(tag)));
    }
    return ['all', ...Array.from(allTags)];
  }, [items, toDisplayTag]);

  const filtered =
    activeTag === 'all'
      ? items
      : items.filter((article) =>
          article.tags.some((tag) => toDisplayTag(tag) === activeTag)
        );
  const visibleItems = filtered.slice(0, visibleItemsCount);
  const visibleTags = showAllTags ? tags : tags.slice(0, 12);
  const hasMoreTags = tags.length > 12;
  const hasMoreItems = filtered.length > visibleItems.length;

  useEffect(() => {
    setVisibleItemsCount(INITIAL_VISIBLE_ITEMS);
  }, [activeTag]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {visibleTags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${
              activeTag === tag
                ? 'bg-brand-600 text-white'
                : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
            }`}
            onClick={() => setActiveTag(tag)}
          >
            {tag === 'all' ? (locale === 'he' ? 'הכל' : 'All') : tag}
          </button>
        ))}
        {hasMoreTags ? (
          <button
            type="button"
            className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-brand-700 ring-1 ring-slate-200 hover:bg-slate-100"
            onClick={() => setShowAllTags((prev) => !prev)}
          >
            {showAllTags
              ? locale === 'he'
                ? 'הצג פחות'
                : 'View less'
              : locale === 'he'
                ? 'הצג עוד'
                : 'View more'}
          </button>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {visibleItems.map((article) => (
          <article
            className="rounded-xl border border-slate-200 bg-white p-4 text-slate-900"
            key={article.id}
          >
            <p className="mb-1 text-xs text-slate-500">{article.date}</p>
            <h3 className="mb-1 text-lg font-black leading-tight">
              {locale === 'he' ? article.titleHe : article.titleEn}
            </h3>
            <p className="mb-1 line-clamp-2 text-sm leading-6">
              {locale === 'he' ? article.checkedHe : article.checkedEn}
            </p>
            <p className="mb-3 line-clamp-2 text-sm leading-6 text-slate-700">
              {locale === 'he' ? article.insightHe : article.insightEn}
            </p>
            <div className="mt-1">
              <a
                href={article.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-700"
              >
                {locale === 'he' ? 'פתיחת המחקר ב-PubMed' : 'Open study on PubMed'}
              </a>
            </div>
          </article>
        ))}
      </div>

      {hasMoreItems ? (
        <div className="mt-4 text-center">
          <button
            type="button"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 ring-1 ring-slate-200 transition hover:bg-slate-100"
            onClick={() =>
              setVisibleItemsCount((prev) => prev + LOAD_MORE_COUNT)
            }
          >
            {locale === 'he' ? 'הצג עוד' : 'View more'}
          </button>
        </div>
      ) : null}
    </div>
  );
}
