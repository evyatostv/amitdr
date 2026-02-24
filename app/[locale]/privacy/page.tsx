import {buildMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

  return buildMetadata({
    locale,
    title: locale === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy',
    description:
      locale === 'he' ? 'מידע על שימוש ושמירת פרטים באתר.' : 'Information about data use and storage on this website.',
    path: locale === 'he' ? '/privacy' : '/en/privacy'
  });
}

export default async function PrivacyPage({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

  const points =
    locale === 'he'
      ? [
          'האתר אוסף פרטי קשר שנמסרים בטופס בלבד.',
          'המידע משמש למענה לפנייה ולקביעת תור.',
          'המידע לא יועבר לצד שלישי ללא אישור, למעט חובה לפי דין.',
          'ניתן לבקש עדכון או מחיקה של מידע דרך עמוד יצירת קשר.'
        ]
      : [
          'The website collects contact details submitted in the form only.',
          'Data is used to respond and schedule appointments.',
          'Data is not shared with third parties unless legally required.',
          'You may request update or deletion via the contact page.'
        ];

  return (
    <section className="section-space">
      <div className="container-main max-w-4xl">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          {locale === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy'}
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
