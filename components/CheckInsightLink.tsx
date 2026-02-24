import type {Locale} from '@/lib/i18n/routing';

export function CheckInsightLink({
  locale,
  checked,
  insight,
  link,
  source
}: {
  locale: Locale;
  checked: string;
  insight: string;
  link: string;
  source: string;
}) {
  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
      <p className="mb-2 font-semibold text-slate-900">
        {locale === 'he' ? 'מה נבדק' : 'What was checked'}
      </p>
      <p className="mb-3 text-slate-700">{checked}</p>
      <p className="mb-2 font-semibold text-slate-900">
        {locale === 'he' ? 'תובנה' : 'Insight'}
      </p>
      <p className="mb-3 text-slate-700">{insight}</p>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-brand-700 underline underline-offset-2"
      >
        {locale === 'he' ? 'קישור למקור' : 'Source link'}: {source}
      </a>
    </div>
  );
}
