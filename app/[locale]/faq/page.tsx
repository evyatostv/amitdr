import {getLocale} from 'next-intl/server';
import {MotionReveal} from '@/components/MotionReveal';
import {buildMetadata} from '@/lib/seo';

export async function generateMetadata() {
  const locale = (await getLocale()) as 'he' | 'en';

  return buildMetadata({
    locale,
    title: locale === 'he' ? 'שאלות נפוצות' : 'FAQ',
    description:
      locale === 'he' ? 'שאלות נפוצות לפני ביקור ריאומטולוגי.' : 'Common questions before a rheumatology visit.',
    path: locale === 'he' ? '/faq' : '/en/faq'
  });
}

export default async function FaqPage() {
  const locale = (await getLocale()) as 'he' | 'en';

  const qa =
    locale === 'he'
      ? [
          {
            q: 'איך נקבע תור?',
            a: 'ניתן לקבוע תור דרך עמוד קביעת התורים או בטלפון 03-9775355.'
          },
          {
            q: 'האם ניתן להגיע עם הפניה ממכבי?',
            a: 'כן. בעמוד קביעת תור קיים מסלול ייעודי למטופלי מכבי.'
          },
          {
            q: 'מה להביא לביקור ראשון?',
            a: 'סיכומים רפואיים, בדיקות דם עדכניות, הדמיות ורשימת תרופות.'
          },
          {
            q: 'האם יש מעקב ארוך טווח?',
            a: 'כן. הטיפול כולל תוכנית מעקב ברורה לפי המחלה והתגובה לטיפול.'
          }
        ]
      : [
          {
            q: 'How do I book?',
            a: 'Use the Book page or call 03-9775355.'
          },
          {
            q: 'Is there a Maccabi flow?',
            a: 'Yes. The booking page includes a dedicated Maccabi path.'
          },
          {
            q: 'What should I bring to a first visit?',
            a: 'Medical summaries, recent blood tests, imaging and medication list.'
          },
          {
            q: 'Is long-term follow-up available?',
            a: 'Yes. Follow-up plans are based on diagnosis and treatment response.'
          }
        ];

  return (
    <section className="section-space">
      <div className="container-main max-w-4xl">
        <MotionReveal>
          <h1 className="mb-5 text-3xl font-black text-slate-900">{locale === 'he' ? 'שאלות נפוצות' : 'FAQ'}</h1>
        </MotionReveal>
        <div className="space-y-3">
          {qa.map((item, index) => (
            <MotionReveal key={item.q} delay={0.04 * index}>
              <details className="card group">
                <summary className="cursor-pointer text-base font-semibold text-slate-900 marker:text-brand-600">{item.q}</summary>
                <p className="mt-2 text-sm text-slate-700">{item.a}</p>
              </details>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
