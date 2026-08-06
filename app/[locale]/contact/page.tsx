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
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-brand-200 bg-brand-50 p-4">
            <p className="text-sm font-semibold text-slate-900">
              {locale === 'he' ? 'J Medical — קביעת תור אונליין' : 'J Medical — online booking'}
            </p>
            <a href="tel:039775355" className="text-sm font-black text-brand-700 underline">03-9775355</a>
          </div>
          <div className="rounded-xl border border-brand-200 bg-brand-50 p-4">
            <p className="text-sm font-semibold text-slate-900">
              {locale === 'he' ? 'BMC מדיקל סנטר — תורים נוספים' : 'BMC Medical Center — additional appointments'}
            </p>
            <a href="tel:039617777" className="text-sm font-black text-brand-700 underline">03-961-7777</a>
            <span className="mx-1 text-slate-400">·</span>
            <a href="https://wa.me/972723789215" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-700 underline">
              WhatsApp
            </a>
          </div>
        </div>
        <ContactForm locale={locale} />
      </div>
    </section>
  );
}
