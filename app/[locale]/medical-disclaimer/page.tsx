import {buildMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

  return buildMetadata({
    locale,
    title: locale === 'he' ? 'הצהרה רפואית' : 'Medical Disclaimer',
    description:
      locale === 'he'
        ? 'הבהרה רפואית לגבי השימוש במידע באתר.'
        : 'Medical disclaimer regarding information presented on this website.',
    path: locale === 'he' ? '/medical-disclaimer' : '/en/medical-disclaimer'
  });
}

export default async function MedicalDisclaimerPage({
  params
}: {
  params: {locale: 'he' | 'en'};
}) {
  const locale = params.locale;

  const points =
    locale === 'he'
      ? [
          'המידע באתר אינו תחליף לבדיקה, אבחון או טיפול רפואי אישי.',
          'במקרה של החמרה, מצב דחוף או שאלה רפואית, יש לפנות לרופא או למוקד חירום.',
          'החלטות טיפוליות מתקבלות רק לאחר הערכה רפואית מסודרת.',
          'האתר אינו מתחייב להתאמה מלאה של המידע לכל מטופל או מצב קליני.'
        ]
      : [
          'Information on this website is not a substitute for personal medical evaluation, diagnosis, or treatment.',
          'In case of worsening symptoms, urgent concerns, or medical questions, contact a physician or emergency services.',
          'Treatment decisions should be made only after a proper medical assessment.',
          'The website does not guarantee full suitability of all content to every patient or clinical situation.'
        ];

  return (
    <section className="section-space">
      <div className="container-main max-w-4xl">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          {locale === 'he' ? 'הצהרה רפואית' : 'Medical Disclaimer'}
        </h1>
        <ul className="card list-disc space-y-3 p-6 ps-7 text-slate-800 sm:p-8 sm:ps-8">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
