import {articleItems} from '@/lib/content';
import {ArticleFilters} from '@/components/ArticleFilters';
import {MotionReveal} from '@/components/MotionReveal';
import {buildMetadata} from '@/lib/seo';
import Script from 'next/script';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';

type PubMedFeedItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
};

function decodeXml(text: string) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function extractTag(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return decodeXml((match?.[1] || '').replace(/<!\[CDATA\[|\]\]>/g, '').trim());
}

function parsePubMedFeed(xml: string): PubMedFeedItem[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/gi) || [];
  return items.map((item) => ({
    title: extractTag(item, 'title'),
    link: extractTag(item, 'link'),
    pubDate: extractTag(item, 'pubDate'),
    description: extractTag(item, 'description')
  }));
}

function normalizePubMedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes('pubmed.ncbi.nlm.nih.gov')) {
      return url;
    }
    return `${parsed.origin}${parsed.pathname}`.replace(/\/$/, '');
  } catch {
    return url.replace(/\/$/, '');
  }
}

function toIsoDate(dateValue: string) {
  if (!dateValue) {
    return '';
  }
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    return '';
  }
  return parsed.toISOString().slice(0, 10);
}

export async function generateMetadata({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

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

export default async function ArticlesPage({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;
  let pubmedFeedItems: PubMedFeedItem[] = [];

  try {
    const feedXml = await readFile(
      resolve(process.cwd(), 'public/feeds/pubmed-custom.xml'),
      'utf8'
    );
    pubmedFeedItems = parsePubMedFeed(feedXml);
  } catch {
    pubmedFeedItems = [];
  }

  const seenLinks = new Set<string>();
  const unifiedItems = [
    ...articleItems.map((item) => ({
      id: item.slug,
      titleHe: item.titleHe,
      titleEn: item.titleEn,
      checkedHe: item.checkedHe,
      checkedEn: item.checkedEn,
      insightHe: item.insightHe,
      insightEn: item.insightEn,
      date: item.date,
      tags: item.tags,
      externalLink: item.externalLink
    })),
    ...pubmedFeedItems.map((item, index) => ({
      id: `feed-${index}-${normalizePubMedUrl(item.link)}`,
      titleHe: item.title,
      titleEn: item.title,
      checkedHe: `מה נבדק: ${item.description || 'תקציר לא זמין.'}`,
      checkedEn: `What was examined: ${item.description || 'Summary not available.'}`,
      insightHe: 'תובנה: למידע המלא והמדויק יש לפתוח את המחקר המלא ב-PubMed.',
      insightEn: 'Insight: open the full study on PubMed for complete details.',
      date: toIsoDate(item.pubDate),
      tags: ['פאבמד'],
      externalLink: item.link
    }))
  ]
    .filter((item) => {
      if (!item.externalLink) {
        return false;
      }
      const normalized = normalizePubMedUrl(item.externalLink);
      if (seenLinks.has(normalized)) {
        return false;
      }
      seenLinks.add(normalized);
      return true;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="section-space overflow-x-hidden">
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

        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          <MotionReveal>
            <div className="w-full overflow-hidden rounded-xl border border-brand-100 bg-white">
              <div className="relative w-full" style={{paddingTop: '56.25%'}}>
                <iframe
                  src="https://player.vimeo.com/video/1010353933?h=f5ca7c3ece&badge=0&autopause=0&player_id=0&app_id=58479"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  className="absolute left-0 top-0 h-full w-full border-0"
                  title={
                    locale === 'he'
                      ? '4 עיניים 11.9.24 - ד"ר עמית דרוין'
                      : '4 Eyes 11.9.24 - Dr Amit Druyan'
                  }
                />
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.06}>
            <div className="w-full overflow-hidden rounded-xl border border-brand-100 bg-white">
              <div className="relative w-full" style={{paddingTop: '56.25%'}}>
                <iframe
                  src="https://www.youtube.com/embed/MFk2HQkAGZg?si=XIokIDkcLerBOvQl"
                  className="absolute left-0 top-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  title={locale === 'he' ? 'סרטון יוטיוב 1' : 'YouTube Video 1'}
                />
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.12}>
            <div className="w-full overflow-hidden rounded-xl border border-brand-100 bg-white">
              <div className="relative w-full" style={{paddingTop: '56.25%'}}>
                <iframe
                  src="https://www.youtube.com/embed/ffTKKeekXjM?si=-MT5dT6e6NReUUOR"
                  className="absolute left-0 top-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  title={locale === 'he' ? 'סרטון יוטיוב 2' : 'YouTube Video 2'}
                />
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.18}>
            <div className="w-full overflow-hidden rounded-xl border border-brand-100 bg-white">
              <div className="relative w-full" style={{paddingTop: '56.25%'}}>
                <iframe
                  src="https://www.youtube.com/embed/xdaWxoBabgg?si=gFEzqoQdEjJkcN6H"
                  className="absolute left-0 top-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  title={locale === 'he' ? 'סרטון יוטיוב 3' : 'YouTube Video 3'}
                />
              </div>
            </div>
          </MotionReveal>
        </div>

        <MotionReveal>
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-black text-slate-900 sm:text-3xl">
              {locale === 'he' ? 'כל המחקרים במקום אחד' : 'All Research in One Place'}
            </h2>
            <ArticleFilters items={unifiedItems} locale={locale} />
          </div>
        </MotionReveal>
      </div>
      <Script src="https://player.vimeo.com/api/player.js" />
    </section>
  );
}
