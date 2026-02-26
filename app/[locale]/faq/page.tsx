import {MotionReveal} from '@/components/MotionReveal';
import {FaqAccordion} from '@/components/FaqAccordion';
import {buildMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

  return buildMetadata({
    locale,
    title: locale === 'he' ? 'שאלות נפוצות' : 'FAQ',
    description:
      locale === 'he' ? 'שאלות נפוצות לפני ביקור ריאומטולוגי.' : 'Common questions before a rheumatology visit.',
    path: locale === 'he' ? '/faq' : '/en/faq'
  });
}

export default async function FaqPage({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;
  const questionnaireUrl =
    'https://smartclinic.belong.life/signup?community=ae5f69b1bae74aab8ea664addd114954';

  const qa =
    locale === 'he'
      ? [
          {
            q: 'איך נקבע תור?',
            a: 'ניתן לקבוע תור דרך עמוד קביעת התורים או בטלפון 03-9775355.'
          },
          {
            q: 'האם ניתן להגיע עם הפניה ממכבי?',
            a: 'מטופלי מכבי יתקבלו דרך הקופה. בעמוד קביעת תור יש לבחור - קביעת תור למטופלי מכבי.'
          },
          {
            q: 'מה להביא לביקור ראשון?',
            a: 'סיכומים רפואיים, בדיקות דם עדכניות, הדמיות ורשימת תרופות.',
            linkText: 'להעלאת מסמכים ומילוי שאלון לפני ביקור - לחצו כאן'
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
            a: 'Medical summaries, recent blood tests, imaging and medication list.',
            linkText: 'Upload documents and complete the pre-visit questionnaire here'
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
        <FaqAccordion items={qa} questionnaireUrl={questionnaireUrl} />
      </div>
    </section>
  );
}
