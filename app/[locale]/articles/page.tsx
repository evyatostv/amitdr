import {getLocale} from 'next-intl/server';
import {articleItems} from '@/lib/content';
import {ArticleFilters} from '@/components/ArticleFilters';
import {MotionReveal} from '@/components/MotionReveal';
import {buildMetadata} from '@/lib/seo';

export async function generateMetadata() {
  const locale = (await getLocale()) as 'he' | 'en';

  return buildMetadata({
    locale,
    title: locale === 'he' ? 'מאמרים וסרטונים' : 'Articles and Videos',
    description:
      locale === 'he'
        ? 'תוכן מקצועי נבחר בנושאי ריאומטולוגיה, עם קישורים למקורות.'
        : 'Selected rheumatology content with links to source material.',
    path: locale === 'he' ? '/articles' : '/en/articles'
  });
}

export default async function ArticlesPage() {
  const locale = (await getLocale()) as 'he' | 'en';

  return (
    <section className="section-space">
      <div className="container-main">
        <MotionReveal>
          <div className="mb-6 rounded-3xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/60 p-6 sm:p-8">
            <h1 className="mb-4 text-3xl font-black text-slate-900">{locale === 'he' ? 'מאמרים וסרטונים' : 'Articles & Videos'}</h1>
            <p className="text-slate-700">
              {locale === 'he'
                ? 'תוכן מקצועי מסונן לפי מחלה: מה נבדק, תובנות וקישור למקור.'
                : 'Condition-based content: what was checked, insights and source links.'}
            </p>
          </div>
        </MotionReveal>
        <ArticleFilters articles={articleItems} locale={locale} />
      </div>
    </section>
  );
}
