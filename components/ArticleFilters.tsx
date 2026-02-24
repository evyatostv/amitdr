'use client';

import {useMemo, useState} from 'react';
import type {ArticleItem} from '@/lib/types';
import type {Locale} from '@/lib/i18n/routing';
import {Link} from '@/lib/i18n/navigation';

export function ArticleFilters({
  articles,
  locale
}: {
  articles: ArticleItem[];
  locale: Locale;
}) {
  const [activeTag, setActiveTag] = useState<string>('all');

  const tags = useMemo(() => {
    const allTags = new Set<string>();
    for (const article of articles) {
      article.tags.forEach((tag) => allTags.add(tag));
    }
    return ['all', ...Array.from(allTags)];
  }, [articles]);

  const filtered =
    activeTag === 'all'
      ? articles
      : articles.filter((article) => article.tags.includes(activeTag));

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              activeTag === tag
                ? 'bg-brand-600 text-white'
                : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
            }`}
            onClick={() => setActiveTag(tag)}
          >
            {tag === 'all' ? (locale === 'he' ? 'הכל' : 'All') : tag}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((article) => (
          <article className="card" key={article.slug}>
            <p className="mb-2 text-xs text-slate-500">{article.date}</p>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              {locale === 'he' ? article.titleHe : article.titleEn}
            </h3>
            <p className="mb-3 text-sm text-slate-700">
              {locale === 'he' ? article.summaryHe : article.summaryEn}
            </p>
            <Link href={`/articles/${article.slug}`} className="text-sm font-semibold text-brand-700 underline">
              {locale === 'he' ? 'לפרטים' : 'Read more'}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
