import {ContactForm} from '@/components/ContactForm';
import {buildMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

  return buildMetadata({
    locale,
    title: locale === 'he' ? 'יצירת קשר' : 'Contact',
    description:
      locale === 'he'
        ? 'השאירו פרטים ונחזור אליכם בהקדם לתיאום תור.'
        : 'Leave your details and we will get back to you to schedule an appointment.',
    path: locale === 'he' ? '/contact' : '/en/contact'
  });
}

export default async function ContactPage({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

  return (
    <section className="section-space">
      <div className="container-main max-w-4xl">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          {locale === 'he' ? 'יצירת קשר' : 'Contact'}
        </h1>
        <p className="mb-5 text-slate-700">
          {locale === 'he'
            ? 'לשאלות או קביעת תור, ניתן להשאיר פרטים או להתקשר ישירות.'
            : 'For questions or scheduling, submit your details or call directly.'}
        </p>
        <div className="mb-4 rounded-xl border border-brand-200 bg-brand-50 p-4">
          <p className="text-sm text-slate-800">JMEDICAL: 03-9775355</p>
        </div>
        <ContactForm locale={locale} />
      </div>
    </section>
  );
}
