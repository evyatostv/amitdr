import {MotionReveal} from '@/components/MotionReveal';
import {buildMetadata, baseSiteUrl} from '@/lib/seo';
import Image from 'next/image';
import Script from 'next/script';
import {withBasePath} from '@/lib/asset-path';

export async function generateMetadata({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

  return buildMetadata({
    locale,
    title: locale === 'he' ? 'אודות ד״ר עמית דרוין' : 'About Dr Amit Druyan',
    description:
      locale === 'he'
        ? 'רופא בכיר ביחידה הראומטולוגית ובמרפאת FMF בשיבא תל השומר.'
        : 'Senior physician in the rheumatology unit and FMF clinic at Sheba Medical Center.',
    path: locale === 'he' ? '/about' : '/en/about'
  });
}

export default async function AboutPage({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

  const profileSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${baseSiteUrl}${locale === 'he' ? '/about' : '/en/about'}`,
    mainEntity: {
      '@type': 'Physician',
      '@id': `${baseSiteUrl}/#physician`,
      name: 'Dr Amit Druyan',
      honorificPrefix: 'Dr.',
      jobTitle: 'Senior Rheumatologist',
      description:
        'Dr Amit Druyan is a senior rheumatologist and internal medicine specialist at Sheba Medical Center (Tel HaShomer) with over 20 years of clinical experience. He leads acute inpatient arthritis care and runs the FMF clinic at one of the world\'s leading medical centers. He is a board-certified specialist in both Internal Medicine and Rheumatology and a lecturer at Tel Aviv University School of Medicine.',
      medicalSpecialty: ['Rheumatology', 'Internal Medicine'],
      worksFor: {
        '@type': 'Hospital',
        name: 'Sheba Medical Center',
        url: 'https://eng.sheba.co.il'
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Hebrew University-Hadassah Medical School'
      },
      memberOf: {
        '@type': 'Organization',
        name: 'Israeli Rheumatology Association'
      }
    }
  };

  return (
    <>
      <Script id="schema-profile" type="application/ld+json">
        {JSON.stringify(profileSchema)}
      </Script>
      <section className="section-space">
      <div className="container-main max-w-5xl">
        <MotionReveal>
          <div className="mb-6 rounded-3xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/60 p-6 sm:p-8">
            <h1 className="mb-5 text-3xl font-black text-slate-900 sm:text-4xl">{locale === 'he' ? 'אודות' : 'About'}</h1>

            <div className="grid items-start gap-6 md:grid-cols-[1.15fr_0.85fr]">
              {locale === 'he' ? (
                <div className="space-y-5 text-base leading-8 text-slate-800">
                  <p>
                    ד״ר עמית דרוין הוא רופא בכיר ביחידה הראומטולוגית ובמרפאת קדחת ים תיכונית (FMF) במרכז
                    הרפואי שיבא, תל השומר. כמומחה לראומטולוגיה ורפואה פנימית, ד״ר דרוין צבר ניסיון רב בטיפול
                    במגוון רחב של מחלות דלקתיות ראומטולוגיות כרוניות, ביניהן דלקת מפרקים שגרונתית (RA),
                    דלקת חוליות מקשחת, קדחת ים תיכונית (FMF), גאוט, וסקוליטיס, סקלרודרמה, לופוס (SLE) ועוד.
                  </p>

                  <p>
                    ד״ר דרוין מקפיד על מתן יחס אישי וקשוב לכל מטופל, תוך התאמה מדויקת של תוכנית הטיפול לצרכיו
                    הייחודיים. הוא עושה שימוש בידע הרפואי המתקדם ביותר בתחום, ומלווה את מטופליו במסירות לאורך
                    כל שלבי האבחון והטיפול.
                  </p>

                  <p>
                    ד״ר דרוין השלים את לימודי הרפואה בבית הספר לרפואה של האוניברסיטה העברית והדסה בירושלים
                    במסגרת העתודה האקדמאית. את שנת הסטאז׳ ביצע בביה״ח סורוקה. התמחותו ברפואה פנימית
                    ובראומטולוגיה התבצעה במרכז הרפואי שיבא – תל השומר, אחד המרכזים הרפואיים המובילים בעולם.
                  </p>

                  <p>ד״ר דרוין חבר באיגוד הישראלי לראומטולוגיה.</p>

                  <p>
                    נוסף לעבודתו הקלינית, ד״ר דרוין מרצה לרפואה פנימית בפקולטה לרפואה של אוניברסיטת תל אביב.
                  </p>

                  <p>
                    בפרטי ד״ר דרוין מקבל בשתי מרפאות: J Medical בפתח תקווה (דרך יצחק רבין 1, מגדלי Global Towers,
                    בניין A קומה 12) — עם קביעת תור אונליין; ו-BMC מדיקל סנטר בקריית אונו (הדובדבן 7) — בתיאום טלפוני
                    או בוואטסאפ. מטופלי מכבי יכולים לקבוע דרך הקופה.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-slate-700">
                  <p>
                    Dr Amit Druyan is a senior physician in the Rheumatology Unit and FMF clinic at Sheba Medical
                    Center, Tel Hashomer — one of the world&apos;s leading academic medical centers. As a
                    board-certified specialist in both Internal Medicine and Rheumatology, he has more than 20 years
                    of clinical experience treating chronic inflammatory and autoimmune rheumatic diseases.
                  </p>
                  <p>
                    His clinical focus covers rheumatoid arthritis (RA), ankylosing spondylitis, psoriatic arthritis,
                    Familial Mediterranean Fever (FMF), gout, vasculitis, scleroderma, lupus (SLE), polymyalgia
                    rheumatica, Behçet disease, and other connective tissue diseases. He leads acute inpatient
                    arthritis care at the Internal Medicine Department F (6) at Tel HaShomer.
                  </p>
                  <p>
                    Dr Druyan completed his medical degree under the Academic Reserve program at the Hebrew
                    University–Hadassah Medical School in Jerusalem, followed by a residency in Internal Medicine
                    and a fellowship in Rheumatology at Sheba Medical Center. He is a member of the Israeli
                    Rheumatology Association.
                  </p>
                  <p>
                    Alongside his clinical role, Dr Druyan is a lecturer in Internal Medicine at the Tel Aviv
                    University School of Medicine. He is committed to evidence-based, personalized treatment:
                    every patient receives a structured disease-activity assessment, a clear treatment plan, and
                    close long-term follow-up adjusted to their response.
                  </p>
                  <p>
                    Dr Druyan sees private patients at two clinics: J Medical, Derech Yitzhak Rabin 1, Petah Tikva
                    (Global Towers, Building A, 12th floor), where appointments can be booked online; and BMC Medical
                    Center, HaDuvdevan 7, Kiryat Ono, by phone or WhatsApp. Maccabi HMO patients can book through the fund.
                  </p>
                </div>
              )}

              <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-soft">
                <Image
                  src={withBasePath('/images/amit-about.jpg')}
                  alt={locale === 'he' ? 'ד״ר עמית דרוין' : 'Dr Amit Druyan'}
                  width={800}
                  height={800}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
    </>
  );
}
