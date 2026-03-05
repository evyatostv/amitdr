import type {ConditionItem} from '@/lib/types';
import type {Locale} from '@/lib/i18n/routing';

function ConditionIllustration({slug}: {slug: string}) {
  const baseProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-5 w-5'
  };

  switch (slug) {
    case 'fmf':
      return (
        <svg {...baseProps} aria-hidden="true">
          <path d="M12 4c3.6 0 6 2.4 6 6 0 4.5-6 9.8-6 9.8S6 14.5 6 10c0-3.6 2.4-6 6-6z" />
          <path d="M12 8v4" />
          <path d="M10 10h4" />
        </svg>
      );
    case 'ra':
      return (
        <svg {...baseProps} aria-hidden="true">
          <path d="M7 14c1.4-1.8 3.1-2.7 5-2.7s3.6.9 5 2.7" />
          <circle cx="8" cy="9" r="1.8" />
          <circle cx="16" cy="9" r="1.8" />
          <path d="M5.5 17.5h13" />
        </svg>
      );
    case 'gout':
      return (
        <svg {...baseProps} aria-hidden="true">
          <path d="M12 4c1.8 2.5 3.8 4.8 3.8 7.2A3.8 3.8 0 1 1 8.2 11.2C8.2 8.8 10.2 6.5 12 4z" />
          <path d="M7 17.5c1.4-1 3.1-1.5 5-1.5s3.6.5 5 1.5" />
        </svg>
      );
    case 'sle':
      return (
        <svg {...baseProps} aria-hidden="true">
          <path d="M12 4l1.7 3.4 3.8.6-2.7 2.7.7 3.9L12 13l-3.5 1.6.7-3.9L6.5 8l3.8-.6L12 4z" />
          <path d="M6.5 18h11" />
        </svg>
      );
    case 'scleroderma':
      return (
        <svg {...baseProps} aria-hidden="true">
          <path d="M8.5 11.5c0-2.8 1.9-4.5 3.5-4.5s3.5 1.7 3.5 4.5V17H8.5v-5.5z" />
          <path d="M7.5 17h9" />
          <path d="M10 7.5V6M14 7.5V6" />
        </svg>
      );
    case 'vasculitis':
      return (
        <svg {...baseProps} aria-hidden="true">
          <path d="M4.5 12h5l2-3.5 2 7 2-3.5h4" />
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
    default:
      return (
        <svg {...baseProps} aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
  }
}

export function ConditionCard({item, locale}: {item: ConditionItem; locale: Locale}) {
  const name = locale === 'he' ? item.nameHe : item.nameEn;
  const short = locale === 'he' ? item.shortHe : item.shortEn;
  const treatments = locale === 'he' ? item.treatmentsHe : item.treatmentsEn;

  return (
    <article className="card group relative flex h-full flex-col overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-brand-300 opacity-80" />
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <ConditionIllustration slug={item.slug} />
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
