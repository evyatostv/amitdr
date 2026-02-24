import {notFound} from 'next/navigation';
import {articleItems, getArticleBySlug} from '@/lib/content';
import {CheckInsightLink} from '@/components/CheckInsightLink';
import {buildMetadata} from '@/lib/seo';

export function generateStaticParams() {
  return articleItems.map((article) => ({slug: article.slug}));
}

export async function generateMetadata({params}: {params: {locale: 'he' | 'en'; slug: string}}) {
  const locale = params.locale;
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {};
  }

  return buildMetadata({
    locale,
    title: locale === 'he' ? article.titleHe : article.titleEn,
    description: locale === 'he' ? article.summaryHe : article.summaryEn,
    path: locale === 'he' ? `/articles/${article.slug}` : `/en/articles/${article.slug}`
  });
}

export default async function ArticleDetailPage({params}: {params: {locale: 'he' | 'en'; slug: string}}) {
  const locale = params.locale;
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <section className="section-space">
      <div className="container-main max-w-3xl">
        <p className="mb-2 text-xs text-slate-500">{article.date}</p>
        <h1 className="mb-3 text-3xl font-bold text-slate-900">
          {locale === 'he' ? article.titleHe : article.titleEn}
        </h1>
        <p className="text-slate-700">{locale === 'he' ? article.summaryHe : article.summaryEn}</p>

        <CheckInsightLink
          locale={locale}
          checked={locale === 'he' ? article.checkedHe : article.checkedEn}
          insight={locale === 'he' ? article.insightHe : article.insightEn}
          link={article.externalLink}
          source={article.sourceName}
        />
      </div>
    </section>
  );
}
