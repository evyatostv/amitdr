import {buildMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

  return buildMetadata({
    locale,
    title: locale === 'he' ? 'תנאי שימוש' : 'Terms of Use',
    description:
      locale === 'he'
        ? 'תנאי השימוש באתר המרפאה.'
        : 'Terms and conditions for using the clinic website.',
    path: locale === 'he' ? '/terms' : '/en/terms'
  });
}

export default async function TermsPage({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

  const points =
    locale === 'he'
      ? [
          'המידע באתר מיועד למטרות מידע כללי בלבד ואינו מהווה ייעוץ רפואי אישי.',
          'השימוש באתר באחריות המשתמש בלבד ובהתאם לדין החל.',
          'אין להעתיק, לשכפל או להשתמש בתכנים ללא אישור מראש ובכתב.',
          'הנהלת האתר רשאית לעדכן את התכנים ותנאי השימוש מעת לעת.'
        ]
      : [
          'Website content is for general information only and does not constitute personal medical advice.',
          'Use of this website is at your own responsibility and subject to applicable law.',
          'Content may not be copied, reproduced, or reused without prior written permission.',
          'The website owner may update content and terms of use from time to time.'
        ];

  return (
    <section className="section-space">
      <div className="container-main max-w-4xl">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          {locale === 'he' ? 'תנאי שימוש' : 'Terms of Use'}
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
