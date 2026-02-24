import {MotionReveal} from '@/components/MotionReveal';
import {buildMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

  return buildMetadata({
    locale,
    title: locale === 'he' ? 'שירותים רפואיים' : 'Medical Services',
    description:
      locale === 'he'
        ? 'ייעוץ ריאומטולוגי, אבחון, התאמת טיפול ומעקב.'
        : 'Rheumatology consultation, diagnosis, treatment planning and follow-up.',
    path: locale === 'he' ? '/services' : '/en/services'
  });
}

export default async function ServicesPage({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

  const services =
    locale === 'he'
      ? [
          'ייעוץ ריאומטולוגי מקיף למבוגרים.',
          'חוות דעת שנייה במחלות אוטואימוניות ודלקתיות.',
          'התאמת טיפול תרופתי ומעקב תופעות לוואי.',
          'בניית תוכנית מעקב ברורה עם יעדי טיפול.',
          'ליווי מטופלי FMF במסגרת המשך טיפול.'
        ]
      : [
          'Comprehensive adult rheumatology consultation.',
          'Second opinions for autoimmune and inflammatory disease.',
          'Medication optimization and safety monitoring.',
          'Clear follow-up plans with treatment goals.',
          'Ongoing FMF patient care.'
        ];

  return (
    <section className="section-space">
      <div className="container-main max-w-5xl">
        <MotionReveal>
          <div className="mb-6 rounded-3xl border border-brand-100 bg-gradient-to-br from-white to-brand-50 p-6 sm:p-8">
            <h1 className="mb-4 text-3xl font-black text-slate-900">{locale === 'he' ? 'שירותים' : 'Services'}</h1>
            <p className="text-slate-700">
              {locale === 'he'
                ? 'שירות רפואי מקצועי, חם וברור - מהאבחון הראשוני ועד מעקב ארוך טווח.'
                : 'Professional, warm and clear medical care from first evaluation to long-term follow-up.'}
            </p>
          </div>
        </MotionReveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((line, index) => (
            <MotionReveal key={line} delay={0.05 * index}>
              <article className="card flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-600" />
                <p className="text-slate-800">{line}</p>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
