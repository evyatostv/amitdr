import {getLocale} from 'next-intl/server';
import {buildMetadata} from '@/lib/seo';

export async function generateMetadata() {
  const locale = (await getLocale()) as 'he' | 'en';

  return buildMetadata({
    locale,
    title: locale === 'he' ? 'הצהרת נגישות' : 'Accessibility Statement',
    description:
      locale === 'he' ? 'התאמות נגישות באתר ד"ר עמית דרויאן.' : 'Accessibility adjustments on Dr Amit Druyan website.',
    path: locale === 'he' ? '/accessibility' : '/en/accessibility'
  });
}

export default async function AccessibilityPage() {
  const locale = (await getLocale()) as 'he' | 'en';

  const points =
    locale === 'he'
      ? [
          'האתר מותאם לניווט מקלדת ולמסכים ניידים.',
          'נשמר ניגוד צבעים גבוה לטקסט וכפתורים.',
          'אלמנטים אינטראקטיביים כוללים תוויות נגישות.',
          'ניתן לפנות אלינו בכל קושי נגישות דרך עמוד יצירת קשר.'
        ]
      : [
          'The website supports keyboard navigation and mobile screens.',
          'High contrast is maintained for text and controls.',
          'Interactive elements include accessibility labels.',
          'For any accessibility issue, please contact us via the contact page.'
        ];

  return (
    <section className="section-space">
      <div className="container-main max-w-4xl">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          {locale === 'he' ? 'הצהרת נגישות' : 'Accessibility Statement'}
        </h1>
        <ul className="card list-disc space-y-2 ps-6 text-slate-800">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
