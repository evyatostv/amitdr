'use client';

import {useState} from 'react';
import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import {Link, usePathname} from '@/lib/i18n/navigation';
import {withBasePath} from '@/lib/asset-path';

const navItems = [
  {href: '/', key: 'home'},
  {href: '/about', key: 'about'},
  {href: '/conditions', key: 'conditions'},
  {href: '/contact', key: 'contact'}
] as const;

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === 'he' ? 'en' : 'he';
  const languageLabel = locale === 'he' ? 'English' : 'עברית';
  const languageFlag = locale === 'he' ? '🇺🇸' : '🇮🇱';
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/85 backdrop-blur-xl">
      <div className="container-main flex items-center justify-between gap-3 py-3">
        <Link
          href="/"
          className="inline-flex items-center p-0"
          aria-label={t('siteName')}
        >
          <Image
            src={withBasePath('/images/logo-icon.png')}
            alt={t('siteName')}
            width={44}
            height={44}
            className="object-contain"
            priority
          />
        </Link>

        <button
          type="button"
          className="inline-flex min-h-12 rounded-xl border border-slate-300 px-4 py-2 text-base font-semibold text-slate-700 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={locale === 'he' ? 'פתיחת תפריט' : 'Toggle menu'}
        >
          {locale === 'he' ? 'תפריט' : 'Menu'}
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2.5 text-base font-medium text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href={pathname}
            locale={nextLocale}
            className="btn-secondary min-w-[130px] gap-2"
            aria-label={t('common.languageSwitch')}
          >
            <span aria-hidden>{languageFlag}</span>
            <span>{languageLabel}</span>
          </Link>
          <a href="tel:039775355" className="btn-secondary" aria-label={t('common.callNow')}>
            {t('common.callNow')}
          </a>
          <Link href="/book" className="btn-primary" aria-label={t('common.bookNow')}>
            {t('common.bookNow')}
          </Link>
        </div>
      </div>

      {open && (
        <div className="container-main pb-4 md:hidden">
          <div className="rounded-2xl border border-brand-100 bg-white p-3 shadow-soft">
            <nav className="mb-3 flex flex-col gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-brand-50"
                  onClick={() => setOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
              <Link
                href={pathname}
                locale={nextLocale}
                className="btn-secondary w-full gap-2"
                aria-label={t('common.languageSwitch')}
                onClick={() => setOpen(false)}
              >
                <span aria-hidden>{languageFlag}</span>
                <span>{languageLabel}</span>
              </Link>
              <a href="tel:039775355" className="btn-secondary w-full text-center" aria-label={t('common.callNow')}>
                {t('common.callNow')}
              </a>
              <Link href="/book" className="btn-primary w-full" aria-label={t('common.bookNow')} onClick={() => setOpen(false)}>
                {t('common.bookNow')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
