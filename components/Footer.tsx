'use client';

import {useLocale, useTranslations} from 'next-intl';
import Image from 'next/image';
import {Link} from '@/lib/i18n/navigation';
import {withBasePath} from '@/lib/asset-path';

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="border-t border-brand-100 bg-gradient-to-b from-white to-brand-50/40">
      <div className="container-main py-8 text-sm text-slate-600">
        <div className="mb-3 flex flex-wrap gap-4">
          <Link href="/privacy" locale={locale} className="hover:text-slate-900">
            {t('nav.privacy')}
          </Link>
          <Link href="/accessibility" locale={locale} className="hover:text-slate-900">
            {t('nav.accessibility')}
          </Link>
        </div>
        <p>{t('footer.address')}</p>
        <div className="mt-2 flex items-center gap-2">
          <Image src={withBasePath('/images/logo-icon.png')} alt={t('siteName')} width={24} height={24} className="rounded-full object-contain" />
          <p>
            {t('siteName')} | {new Date().getFullYear()} | {t('footer.rights')}
            {' | '}
            <a
              href="https://drd.co.il"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-900"
            >
              {locale === 'he' ? 'נבנה באהבה על ידי drd.co.il' : 'Built with care by drd.co.il'}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
