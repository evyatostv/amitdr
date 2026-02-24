import {getLocale} from 'next-intl/server';
import {MotionReveal} from '@/components/MotionReveal';
import {buildMetadata} from '@/lib/seo';

export async function generateMetadata() {
  const locale = (await getLocale()) as 'he' | 'en';

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

export default async function AboutPage() {
  const locale = (await getLocale()) as 'he' | 'en';

  return (
    <section className="section-space">
      <div className="container-main max-w-5xl">
        <MotionReveal>
          <div className="mb-6 rounded-3xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/60 p-6 sm:p-8">
            <h1 className="mb-5 text-3xl font-black text-slate-900 sm:text-4xl">{locale === 'he' ? 'אודות' : 'About'}</h1>

            {locale === 'he' ? (
              <div className="space-y-5 text-base leading-8 text-slate-800">
                <p>
                  ד״ר עמית דרוין הוא רופא בכיר ביחידה הראומטולוגית ובמרפאת קדחת ים תיכונית (FMF) במרכז
                  הרפואי שיבא, תל השומר. כמומחה לרפואה פנימית וראומטולוגיה, ד״ר דרוין צבר ניסיון רב בטיפול
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
              </div>
            ) : (
              <div className="space-y-4 text-slate-700">
                <p>
                  Dr Amit Druyan is a senior physician in the Rheumatology Unit and FMF clinic at Sheba Medical
                  Center, Tel Hashomer. As a specialist in Internal Medicine and Rheumatology, he treats a wide range
                  of chronic inflammatory rheumatic diseases including RA, ankylosing spondylitis, FMF, gout,
                  vasculitis, scleroderma and SLE.
                </p>
                <p>
                  He is known for attentive, personalized care and for building precise treatment plans tailored to
                  each patient, with close follow-up through all diagnostic and treatment stages.
                </p>
              </div>
            )}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
