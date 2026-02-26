import type {ConditionItem} from '@/lib/types';
import type {Locale} from '@/lib/i18n/routing';

export function ConditionCard({item, locale}: {item: ConditionItem; locale: Locale}) {
  const name = locale === 'he' ? item.nameHe : item.nameEn;
  const short = locale === 'he' ? item.shortHe : item.shortEn;
  const treatments = locale === 'he' ? item.treatmentsHe : item.treatmentsEn;

  return (
    <article className="card group relative flex h-full flex-col overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-brand-300 opacity-80" />
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <span className="text-lg">+</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{name}</h3>
      <p className="mb-3 text-sm text-slate-700">{short}</p>
      <ul className="list-disc space-y-1 ps-5 text-sm text-slate-700">
        {treatments.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </article>
  );
}
