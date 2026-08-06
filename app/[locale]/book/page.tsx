import {MotionReveal} from '@/components/MotionReveal';
import {OdoroBookingWidget} from '@/components/OdoroBookingWidget';
import {buildMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

  return buildMetadata({
    locale,
    title: locale === 'he' ? 'קביעת תור' : 'Book Appointment',
    description:
      locale === 'he'
        ? 'קביעת תור פרטי אונליין ב-J Medical, תורים נוספים ב-BMC מדיקל סנטר, מסלול מכבי ותיאום טלפוני.'
        : 'Private online booking at J Medical, additional appointments at BMC Medical Center, Maccabi path and phone scheduling.',
    path: locale === 'he' ? '/book' : '/en/book'
  });
}

export default async function BookPage({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

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
                ? 'ד"ר דרוין מקבל בשתי מרפאות פרטיות. קביעת תור אונליין דרך J Medical; תורים נוספים אפשריים גם ב-BMC מדיקל סנטר בפנייה ישירה.'
                : 'Dr. Druyan sees patients at two private clinics. Book online through J Medical; additional appointments are also available at BMC Medical Center by direct contact.'}
            </p>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <article className="card mt-4 bg-gradient-to-br from-white to-brand-50">
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              {locale === 'he' ? 'מטופלי מכבי' : 'Maccabi Patients'}
            </h2>
            <p className="mb-3 text-sm text-slate-700">
              {locale === 'he'
                ? 'מטופלי מכבי יתקבלו דרך הקופה. יש לבחור - קביעת תור למטופלי מכבי.'
                : 'Appointment flow through Maccabi channels.'}
            </p>
            <a
              href="https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=591791029E0DAEF80B7904B3F3143DBC5FEC270D3DC1D628A665A204A62A6F20&RequestId=00000000-0000-0000-0001-000000000216"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary w-full text-center"
            >
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

        <MotionReveal delay={0.12}>
          <article className="card mt-4 border-brand-200">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <img
                src="/images/bmc-logo.png"
                alt={locale === 'he' ? 'BMC מדיקל סנטר' : 'BMC Medical Center'}
                width={140}
                height={60}
                loading="lazy"
                className="h-auto w-[132px]"
              />
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                {locale === 'he' ? 'מרפאה פרטית נוספת' : 'Additional private clinic'}
              </span>
            </div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              {locale === 'he' ? 'תורים נוספים — BMC מדיקל סנטר' : 'Additional Appointments — BMC Medical Center'}
            </h2>
            <p className="mb-3 text-sm text-slate-700">
              {locale === 'he'
                ? 'קביעת תור ב-BMC מתבצעת בפנייה טלפונית או בוואטסאפ (אין קביעת תור אונליין).'
                : 'Appointments at BMC are arranged by phone or WhatsApp (no online booking).'}
            </p>
            <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-slate-900">{locale === 'he' ? 'טלפון' : 'Phone'}</p>
                <a href="tel:039617777" className="font-black text-brand-700 underline">03-961-7777</a>
                <span className="mx-1 text-slate-400">·</span>
                <a href="tel:0737893215" className="text-brand-700 underline">073-789-3215</a>
              </div>
              <div>
                <p className="font-semibold text-slate-900">WhatsApp</p>
                <a
                  href="https://wa.me/972723789215"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 underline"
                >
                  072-378-9215
                </a>
              </div>
              <div>
                <p className="font-semibold text-slate-900">{locale === 'he' ? 'שעות' : 'Hours'}</p>
                <p>{locale === 'he' ? 'א׳–ה׳ 08:00–19:00 · ו׳ 08:00–14:00' : 'Sun–Thu 08:00–19:00 · Fri 08:00–14:00'}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">{locale === 'he' ? 'כתובת' : 'Address'}</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=%D7%94%D7%93%D7%95%D7%93%D7%91%D7%9F+7+%D7%A7%D7%A8%D7%99%D7%99%D7%AA+%D7%90%D7%95%D7%A0%D7%95"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 underline"
                >
                  {locale === 'he' ? 'הדובדבן 7, קריית אונו' : 'HaDuvdevan 7, Kiryat Ono'}
                </a>
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-xl border border-brand-100">
              <iframe
                title={locale === 'he' ? 'מפת BMC מדיקל סנטר' : 'BMC Medical Center map'}
                src="https://maps.google.com/maps?q=32.0688753,34.8649490&z=16&output=embed"
                width="100%"
                height="220"
                style={{border: 0}}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </article>
        </MotionReveal>

        <MotionReveal delay={0.14}>
          <article className="card mt-4 bg-gradient-to-br from-white to-brand-50/60">
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              {locale === 'he' ? 'קביעת תור אונליין — J Medical' : 'Online Booking — J Medical'}
            </h2>
            <p className="mb-3 text-sm text-slate-700">
              {locale === 'he' ? 'קביעת תור באופן עצמאי בזמן שנוח לכם.' : 'Book directly online at your preferred time.'}
            </p>
            <div className="rounded-xl border border-brand-100 bg-white p-3">
              <OdoroBookingWidget clinicId="539955994" appdrn="druyana" divId="odoro" lang={locale} />
            </div>
          </article>
        </MotionReveal>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <MotionReveal>
            <article className="card">
              <h2 className="mb-2 text-lg font-semibold text-slate-900">{locale === 'he' ? 'מה להביא לביקור' : 'What to Bring'}</h2>
              <ul className="list-disc space-y-1 ps-5 text-sm text-slate-700">
                <li>{locale === 'he' ? 'סיכומים רפואיים' : 'Medical summaries'}</li>
                <li>{locale === 'he' ? 'בדיקות דם עדכניות' : 'Recent blood tests'}</li>
                <li>{locale === 'he' ? 'הדמיות' : 'Imaging studies'}</li>
                <li>{locale === 'he' ? 'רשימת תרופות' : 'Medication list'}</li>
                <li>
                  {locale === 'he' ? 'מומלץ לקראת הביקור למלא את השאלון ' : 'Recommended before the visit, complete the questionnaire '}
                  <a
                    href="https://smartclinic.belong.life/signup?community=ae5f69b1bae74aab8ea664addd114954"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-700 underline"
                  >
                    {locale === 'he' ? 'לחצו כאן' : 'click here'}
                  </a>
                </li>
              </ul>
            </article>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <article className="card">
              <h2 className="mb-2 text-lg font-semibold text-slate-900">{locale === 'he' ? 'מיקום מרפאת J Medical' : 'J Medical Clinic Location'}</h2>
              <p className="text-sm text-slate-700">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Derech+Yitzhak+Rabin+1,+Petah+Tikva,+Israel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-700 underline"
                >
                  {locale === 'he'
                    ? 'מרפאת ג\'יי מדיקל, דרך יצחק רבין 1, מגדלי Global Towers, בניין A קומה 12.'
                    : 'J Medical Clinic, Derech Yitzhak Rabin 1, Global Towers, Building A, Floor 12.'}
                </a>
              </p>
              <div className="mt-4 overflow-hidden rounded-xl border border-brand-100">
                <iframe
                  title={locale === 'he' ? 'מפת מיקום המרפאה' : 'Clinic location map'}
                  src="https://maps.google.com/maps?q=Derech%20Yitzhak%20Rabin%201%2C%20Petah%20Tikva%2C%20Israel&z=16&output=embed"
                  width="100%"
                  height="260"
                  style={{border: 0}}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </article>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
