import Image from 'next/image';
import Script from 'next/script';
import {Link} from '@/lib/i18n/navigation';
import {conditionItems} from '@/lib/content';
import {ConditionCard} from '@/components/ConditionCard';
import {MotionReveal} from '@/components/MotionReveal';
import {HomeInfoPopups} from '@/components/HomeInfoPopups';
import {buildMetadata, baseSiteUrl} from '@/lib/seo';

export async function generateMetadata({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

  return buildMetadata({
    locale,
    title:
      locale === 'he'
        ? 'ד"ר עמית דרוין | ריאומטולוג בכיר'
        : 'Dr Amit Druvin | Senior Rheumatologist',
    description:
      locale === 'he'
        ? 'רופא בכיר ביחידה לראומטולוגיה ובמרפאת FMF בשיבא. קביעת תור מהירה.'
        : 'Senior physician in Rheumatology and FMF clinic at Sheba. Fast appointment booking.',
    path: locale === 'he' ? '/' : '/en'
  });
}

export default async function HomePage({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

  const physicianSchema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Dr Amit Druvin',
    medicalSpecialty: 'Rheumatology',
    worksFor: 'Sheba Medical Center',
    knowsAbout: [
      'Rheumatoid Arthritis',
      'SLE',
      'Scleroderma',
      'Vasculitis',
      'Gout',
      'Ankylosing Spondylitis',
      'FMF'
    ],
    url: baseSiteUrl,
    telephone: '+972-3-9775355'
  };

  const clinicSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'Dr Amit Druvin Clinic',
    areaServed: 'Israel',
    telephone: '+972-3-9775355',
    url: baseSiteUrl,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IL',
      addressLocality: 'Ramat Gan',
      streetAddress: 'Sheba Medical Center, Tel Hashomer'
    }
  };

  const treatmentHighlights =
    locale === 'he'
      ? [
          {icon: '🧬', label: 'וסקוליטיס'},
          {icon: '🦴', label: 'דלקות מפרקים'},
          {icon: '🦋', label: 'FMF'},
          {icon: '✋', label: 'מחלות רקמת חיבור'},
          {icon: '🧪', label: 'לופוס (SLE)'},
          {icon: '🧷', label: 'סקלרודרמה'}
        ]
      : [
          {icon: '🧬', label: 'Vasculitis'},
          {icon: '🦴', label: 'Inflammatory Arthritis'},
          {icon: '🦋', label: 'FMF'},
          {icon: '✋', label: 'Connective Tissue Disease'},
          {icon: '🧪', label: 'Lupus (SLE)'},
          {icon: '🧷', label: 'Scleroderma'}
        ];

  return (
    <>
      <Script id="schema-physician" type="application/ld+json">
        {JSON.stringify(physicianSchema)}
      </Script>
      <Script id="schema-clinic" type="application/ld+json">
        {JSON.stringify(clinicSchema)}
      </Script>

      <section className="hero-shell section-space pt-12 sm:pt-16">
        <div className="hero-grid" />
        <div className="orb orb-a" />
        <div className="orb orb-b" />

        <div className="container-main relative grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <MotionReveal>
            <div>
              <p className="mb-4 inline-flex rounded-full border border-brand-200 bg-white/85 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-700">
                {locale === 'he' ? 'ריאומטולוגיה מתקדמת | שיבא תל השומר' : 'Advanced Rheumatology | Sheba Tel Hashomer'}
              </p>
              <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
                {locale === 'he' ? 'ד"ר עמית דרוין' : 'Dr Amit Druvin'}
                <span className="mt-2 block text-2xl font-bold text-brand-700 sm:text-3xl">
                  {locale === 'he' ? 'טיפול אישי, מדויק ונגיש' : 'Personal, Precise and Accessible Care'}
                </span>
              </h1>
              <p className="mb-6 max-w-2xl text-base text-slate-700 sm:text-lg">
                {locale === 'he'
                  ? 'רופא בכיר ביחידה לראומטולוגיה ובמרפאת FMF. אבחון מקצועי, תוכנית טיפול ברורה וליווי לאורך כל הדרך.'
                  : 'Senior physician in the Rheumatology Unit and FMF clinic. Professional diagnosis, clear plans and close follow-up.'}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book" className="btn-primary">
                  {locale === 'he' ? 'קביעת תור מהירה' : 'Book Fast'}
                </Link>
                <a href="tel:039775355" className="btn-secondary">
                  {locale === 'he' ? '03-9775355' : 'Call 03-9775355'}
                </a>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.12}>
            <aside className="glass overflow-hidden rounded-3xl p-4 shadow-soft sm:p-5">
              <div className="relative overflow-hidden rounded-2xl border border-brand-100 bg-white">
                <Image
                  src="/images/amit-doctor-portrait.jpg"
                  alt={locale === 'he' ? 'ד"ר עמית דרוין' : 'Dr Amit Druvin'}
                  width={900}
                  height={1100}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-800">
                {locale === 'he' ? 'ד"ר עמית דרוין | מומחה לרפואה פנימית וראומטולוגיה' : 'Dr Amit Druvin | Internal Medicine & Rheumatology'}
              </p>
            </aside>
          </MotionReveal>
        </div>
      </section>

      <section className="section-space pt-4">
        <div className="container-main">
          <MotionReveal>
            <h2 className="mb-5 text-2xl font-black text-slate-900 sm:text-3xl">
              {locale === 'he' ? 'תחומי טיפול' : 'Treatment Areas'}
            </h2>
          </MotionReveal>
          <div className="rounded-3xl border border-brand-100 bg-white/75 p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {treatmentHighlights.map((item, index) => (
                <MotionReveal key={item.label} delay={0.04 * index}>
                  <div className="card h-full items-center p-4 text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-brand-200 text-3xl">
                      {item.icon}
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-main grid items-center gap-6 lg:grid-cols-2">
          <MotionReveal>
            <article className="card bg-gradient-to-br from-white to-brand-50/50 p-6">
              <h2 className="mb-3 text-3xl font-black text-slate-900">
                {locale === 'he' ? 'אודות ד"ר עמית דרוין' : 'About Dr Amit Druvin'}
              </h2>
              <p className="mb-4 text-slate-700">
                {locale === 'he'
                  ? 'מומחה לרפואה פנימית וראומטולוגיה. נותן מענה מקצועי למגוון מחלות ראומטולוגיות עם יחס אישי, הסבר ברור ותכנון טיפול מדורג.'
                  : 'Specialist in Internal Medicine and Rheumatology, offering focused care with clear guidance and stepwise treatment planning.'}
              </p>
              <Link href="/about" className="btn-secondary">
                {locale === 'he' ? 'למידע נוסף' : 'Read More'}
              </Link>
            </article>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <article className="card bg-gradient-to-br from-white to-brand-50 p-6">
              <p className="text-3xl font-black text-brand-700">20+</p>
              <p className="mt-2 text-sm text-slate-700">
                {locale === 'he' ? 'שנות ניסיון ברפואה פנימית וריאומטולוגיה' : 'Years of internal medicine and rheumatology experience'}
              </p>
              <div className="mt-4 space-y-2 text-sm text-slate-700">
                <p>FMF | Sheba Tel Hashomer</p>
                <p>JMEDICAL | 03-9775355</p>
              </div>
            </article>
          </MotionReveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container-main">
          <MotionReveal>
            <h2 className="mb-2 text-2xl font-black text-slate-900 sm:text-3xl">
              {locale === 'he' ? 'מחלות וטיפולים מרכזיים' : 'Conditions & Treatments'}
            </h2>
            <p className="mb-6 max-w-3xl text-slate-700">
              {locale === 'he'
                ? 'אבחון וטיפול בדלקות מפרקים ומחלות אוטואימוניות בגישה מותאמת אישית.'
                : 'Personalized diagnosis and care for inflammatory and autoimmune rheumatic diseases.'}
            </p>
          </MotionReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {conditionItems.slice(0, 6).map((item, index) => (
              <MotionReveal key={item.slug} delay={0.05 * index}>
                <ConditionCard item={item} locale={locale} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container-main">
          <MotionReveal>
            <h2 className="mb-3 text-2xl font-black text-slate-900 sm:text-3xl">
              {locale === 'he' ? 'מידע מהיר' : 'Quick Information'}
            </h2>
            <p className="mb-6 max-w-3xl text-slate-700">
              {locale === 'he'
                ? 'במקום תפריט עמוס: כל המידע החשוב נמצא כאן בלחיצה אחת.'
                : 'Instead of a crowded menu, important information is available here in one click.'}
            </p>
          </MotionReveal>
          <HomeInfoPopups locale={locale} />
        </div>
      </section>
    </>
  );
}
