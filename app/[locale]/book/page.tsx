import {getLocale} from 'next-intl/server';
import {MotionReveal} from '@/components/MotionReveal';
import {OdoroBookingWidget} from '@/components/OdoroBookingWidget';
import {buildMetadata} from '@/lib/seo';

export async function generateMetadata() {
  const locale = (await getLocale()) as 'he' | 'en';

  return buildMetadata({
    locale,
    title: locale === 'he' ? 'קביעת תור' : 'Book Appointment',
    description:
      locale === 'he'
        ? 'קביעת תור פרטי, מסלול מכבי ויצירת קשר טלפוני עם JMEDICAL.'
        : 'Private booking, Maccabi booking path and JMEDICAL phone support.',
    path: locale === 'he' ? '/book' : '/en/book'
  });
}

export default async function BookPage() {
  const locale = (await getLocale()) as 'he' | 'en';

  return (
    <section className="section-space">
      <div className="container-main max-w-5xl">
        <MotionReveal>
          <div className="mb-6 rounded-3xl border border-brand-100 bg-gradient-to-br from-white to-brand-50 p-6 sm:p-8">
            <h1 className="mb-4 text-3xl font-black text-slate-900">
              {locale === 'he' ? 'קביעת תור מהירה' : 'Fast Appointment Booking'}
            </h1>
            <p className="text-slate-700">
              {locale === 'he'
                ? 'בחרו את המסלול המתאים לכם. כל המידע במקום אחד, בצורה פשוטה וברורה.'
                : 'Choose the booking path that fits you. Clear and simple steps in one place.'}
            </p>
          </div>
        </MotionReveal>

        <MotionReveal>
          <article className="card bg-gradient-to-br from-white to-brand-50/60">
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              {locale === 'he' ? 'תור פרטי אונליין' : 'Private Online Booking'}
            </h2>
            <p className="mb-3 text-sm text-slate-700">
              {locale === 'he' ? 'קביעת תור באופן עצמאי בזמן שנוח לכם.' : 'Book directly online at your preferred time.'}
            </p>
            <div className="rounded-xl border border-brand-100 bg-white p-3">
              <OdoroBookingWidget clinicId="539955994" appdrn="druyana" divId="odoro" />
            </div>
          </article>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <article className="card mt-4 bg-gradient-to-br from-white to-brand-50">
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              {locale === 'he' ? 'מטופלי מכבי' : 'Maccabi Patients'}
            </h2>
            <p className="mb-3 text-sm text-slate-700">
              {locale === 'he'
                ? 'מסלול קביעת תור דרך ערוצי מכבי.'
                : 'Appointment flow through Maccabi channels.'}
            </p>
            <a href="#" className="btn-secondary w-full text-center">
              {locale === 'he' ? 'מעבר למסלול מכבי' : 'Open Maccabi Flow'}
            </a>
          </article>
        </MotionReveal>

        <MotionReveal delay={0.1}>
          <article className="card mt-4 border-brand-200 bg-brand-50/60">
            <h2 className="mb-2 text-lg font-semibold text-slate-900">JMEDICAL</h2>
            <p className="mb-2 text-sm text-slate-700">
              {locale === 'he' ? 'לתיאום טלפוני מהיר ניתן ליצור קשר:' : 'For fast phone scheduling, call:'}
            </p>
            <a href="tel:039775355" className="text-lg font-black text-brand-700 underline">
              03-9775355
            </a>
          </article>
        </MotionReveal>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <MotionReveal>
            <article className="card">
              <h2 className="mb-2 text-lg font-semibold text-slate-900">{locale === 'he' ? 'מה להביא לביקור' : 'What to Bring'}</h2>
              <ul className="list-disc space-y-1 ps-5 text-sm text-slate-700">
                <li>{locale === 'he' ? 'תעודה מזהה וכרטיס קופה' : 'ID and health fund card'}</li>
                <li>{locale === 'he' ? 'סיכומים רפואיים קודמים' : 'Previous medical summaries'}</li>
                <li>{locale === 'he' ? 'בדיקות דם והדמיה עדכניות' : 'Recent blood tests and imaging'}</li>
                <li>{locale === 'he' ? 'רשימת תרופות עדכנית' : 'Current medication list'}</li>
              </ul>
            </article>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <article className="card">
              <h2 className="mb-2 text-lg font-semibold text-slate-900">{locale === 'he' ? 'מיקום מרפאה' : 'Clinic Location'}</h2>
              <p className="text-sm text-slate-700">
                {locale === 'he'
                  ? 'מרכז רפואי שיבא, תל השומר, רמת גן. פרטי הגעה מדויקים נשלחים לאחר אישור התור.'
                  : 'Sheba Medical Center, Tel Hashomer, Ramat Gan. Exact arrival details are sent after appointment confirmation.'}
              </p>
            </article>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
