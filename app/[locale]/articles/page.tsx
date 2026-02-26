import {articleItems} from '@/lib/content';
import {ArticleFilters} from '@/components/ArticleFilters';
import {MotionReveal} from '@/components/MotionReveal';
import {buildMetadata} from '@/lib/seo';
import Script from 'next/script';

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
  const researchItems = [
    {
      titleHe: 'טיפול בהתקף חריף: הזרקה מהירה של אנקינרה',
      titleEn: 'Acute Attack Treatment: Fast Anakinra Injection',
      checkedHe: 'מה נבדק במחקר: האם אפשר לעצור התקף FMF בעזרת זריקת בודדת של קינרת?',
      checkedEn: 'What was examined: can a single Kineret injection stop an FMF attack?',
      insightHe:
        'תובנה למטופל: זריקה בודדת של התרופה הביולוגית אנקינרה (קינרת) שניתנת בזמן, יכולה לעצור את ההתקף ולצמצם משמעותית את הכאב ואת משכו!',
      insightEn:
        'Patient insight: a timely single Anakinra (Kineret) injection can stop the attack and significantly reduce pain and duration.',
      link: 'https://pubmed.ncbi.nlm.nih.gov/41133353/'
    },
    {
      titleHe: 'תגובה לטיפול באילריס אחרי כישלון קינרת',
      titleEn: 'Response to Ilaris After Kineret Failure',
      checkedHe: 'מה נבדק במחקר: האם חולים שלא הגיבו לקינרת יכולים להגיב לאילריס?',
      checkedEn: 'What was examined: can patients who failed Kineret still respond to Ilaris?',
      insightHe:
        'תובנה למטופל: גם אחרי כישלון באנאקינרה, טיפול באילריס עשוי להיות יעיל ולהביא לשיפור משמעותי.',
      insightEn:
        'Patient insight: even after Anakinra failure, Ilaris may still be effective and provide meaningful improvement.',
      link: 'https://pubmed.ncbi.nlm.nih.gov/34369359/'
    }
  ];

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

        <div className="mb-8 space-y-4">
          <MotionReveal>
            <div className="mx-auto w-full max-w-[750px] overflow-hidden rounded-2xl border border-brand-100 bg-white">
              <div className="relative w-full" style={{paddingTop: '56.25%'}}>
                <iframe
                  src="https://player.vimeo.com/video/1010353933?h=f5ca7c3ece&badge=0&autopause=0&player_id=0&app_id=58479"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  className="absolute left-0 top-0 h-full w-full border-0"
                  title='4 עיניים 11.9.24 - ד"ר עמית דרוין'
                />
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.06}>
            <div className="mx-auto w-full max-w-[750px] overflow-hidden rounded-2xl border border-brand-100 bg-white">
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
            <div className="mx-auto w-full max-w-[750px] overflow-hidden rounded-2xl border border-brand-100 bg-white">
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
        </div>

        <MotionReveal>
          <div className="mb-8 rounded-3xl bg-[#e7e7e7] p-6 text-center sm:p-10">
            <h2 className="mb-8 text-3xl font-black text-slate-900 sm:text-5xl">
              {locale === 'he' ? 'מחקרים בהם היה ד״ר דרוין שותף' : 'Research Involving Dr Druyan'}
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {researchItems.map((item) => (
                <article key={item.link} className="rounded-2xl bg-white/70 p-5 text-slate-900">
                  <h3 className="mb-3 text-2xl font-black">
                    {locale === 'he' ? item.titleHe : item.titleEn}
                  </h3>
                  <p className="mb-3 text-xl">{locale === 'he' ? item.checkedHe : item.checkedEn}</p>
                  <p className="mb-4 text-xl">{locale === 'he' ? item.insightHe : item.insightEn}</p>
                  <p className="text-xl break-words">
                    {locale === 'he' ? 'קישור למחקר:' : 'Study link:'}{' '}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline break-all"
                    >
                      {item.link}
                    </a>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </MotionReveal>

        <ArticleFilters articles={articleItems} locale={locale} />

        <div className="mt-8 overflow-hidden">
          <div className="elfsight-app-67ca7e7f-b560-4665-90df-e88e0fcf7487" data-elfsight-app-lazy />
        </div>
      </div>
      <Script src="https://player.vimeo.com/api/player.js" />
      <Script src="https://static.elfsight.com/platform/platform.js" async />
    </section>
  );
}
