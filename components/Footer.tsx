import {useTranslations} from 'next-intl';
import {Link} from '@/lib/i18n/navigation';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-brand-100 bg-gradient-to-b from-white to-brand-50/40">
      <div className="container-main py-8 text-sm text-slate-600">
        <div className="mb-3 flex flex-wrap gap-4">
          <Link href="/privacy" className="hover:text-slate-900">
            {t('nav.privacy')}
          </Link>
          <Link href="/accessibility" className="hover:text-slate-900">
            {t('nav.accessibility')}
          </Link>
        </div>
        <p>{t('footer.address')}</p>
        <p>
          {t('siteName')} | {new Date().getFullYear()} | {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
