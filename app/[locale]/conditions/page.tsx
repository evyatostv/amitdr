import {conditionItems} from '@/lib/content';
import {ConditionCard} from '@/components/ConditionCard';
import {MotionReveal} from '@/components/MotionReveal';
import {buildMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

  return buildMetadata({
    locale,
    title:
      locale === 'he' ? 'מחלות וטיפולים בריאומטולוגיה' : 'Conditions and Treatments in Rheumatology',
    description:
      locale === 'he'
        ? 'טיפול בדלקות מפרקים ומחלות אוטואימוניות: RA, SLE, FMF ועוד.'
        : 'Treatment for inflammatory arthritis and autoimmune rheumatic diseases.',
    path: locale === 'he' ? '/conditions' : '/en/conditions'
  });
}

export default async function ConditionsPage({params}: {params: {locale: 'he' | 'en'}}) {
  const locale = params.locale;

  return (
    <section className="section-space">
      <div className="container-main">
        <MotionReveal>
          <div className="mb-6 rounded-3xl border border-brand-100 bg-gradient-to-br from-white to-brand-50 p-6 sm:p-8">
            <h1 className="mb-3 text-3xl font-black text-slate-900">{locale === 'he' ? 'מחלות וטיפולים' : 'Conditions & Treatments'}</h1>
            <p className="max-w-3xl text-slate-700">
              {locale === 'he'
                ? 'טיפול בכלל תחומי הראומטולוגיה - דלקת מפרקים שגרונתית (RA), דלקת חוליות מקשחת (AS), דלקת מפרקים פסוריאטית (PSA), ספונדילוארתרופתיות, זאבת (לופוס - SLE), סקלרודרמה, וסקוליטיס, פולימיאלגיה ראומטיקה (PMR), קדחת ים תיכונית (FMF), בכצ\'ט, שיגדון (גאוט GOUT).'
                : 'Care for inflammatory and autoimmune rheumatic diseases including RA, SLE, scleroderma, vasculitis, gout, ankylosing spondylitis and FMF.'}
            </p>
          </div>
        </MotionReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conditionItems.map((item, index) => (
            <MotionReveal key={item.slug} delay={0.03 * index}>
              <ConditionCard item={item} locale={locale} />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
