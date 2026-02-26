'use client';

import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import {Link, usePathname} from '@/lib/i18n/navigation';
import {withBasePath} from '@/lib/asset-path';

const primaryNavItems = [
  {href: '/', key: 'home'},
  {href: '/about', key: 'about'},
  {href: '/conditions', key: 'conditions'},
  {href: '/articles', key: 'articles'}
] as const;

const moreNavItems = [
  {href: '/services', key: 'services'},
  {href: '/faq', key: 'faq'},
  {href: '/contact', key: 'contact'},
  {href: '/book', key: 'book'},
  {href: '/privacy', key: 'privacy'},
  {href: '/accessibility', key: 'accessibility'}
] as const;

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === 'he' ? 'en' : 'he';
  const languageFlag = locale === 'he' ? '🇺🇸' : '🇮🇱';
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
    setMobileMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (!moreRef.current) {
        return;
      }

      if (!moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

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
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={
            locale === 'he'
              ? open
                ? 'סגירת תפריט'
                : 'פתיחת תפריט'
              : open
                ? 'Close menu'
                : 'Open menu'
          }
        >
          <span className="sr-only">{locale === 'he' ? 'תפריט' : 'Menu'}</span>
          <span className="relative h-5 w-6" aria-hidden>
            <span
              className={`absolute left-0 top-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                open ? 'translate-y-[9px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-[9px] h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 top-[18px] h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                open ? '-translate-y-[9px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2.5 text-base font-medium text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
          <div className="relative" ref={moreRef}>
            <button
              type="button"
              className="rounded-xl px-3 py-2.5 text-base font-medium text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
              onClick={() => setMoreOpen((prev) => !prev)}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
            >
              {locale === 'he' ? 'עוד' : 'More'}
            </button>
            <div
              className={`absolute end-0 top-full mt-2 w-[min(560px,80vw)] rounded-2xl border border-brand-100 bg-white p-3 shadow-soft transition-all duration-200 ${
                moreOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
              }`}
            >
              <div className="grid grid-cols-2 gap-1">
                {moreNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
                    onClick={() => setMoreOpen(false)}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href={pathname}
            locale={nextLocale}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full text-2xl transition-transform hover:scale-110"
            aria-label={t('common.languageSwitch')}
          >
            <span aria-hidden>{languageFlag}</span>
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
              {primaryNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-brand-50"
                  onClick={() => setOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
              <button
                type="button"
                className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-brand-50"
                onClick={() => setMobileMoreOpen((prev) => !prev)}
                aria-expanded={mobileMoreOpen}
              >
                <span>{locale === 'he' ? 'עוד' : 'More'}</span>
                <span
                  className={`transition-transform duration-200 ${
                    mobileMoreOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden
                >
                  ▾
                </span>
              </button>
              {mobileMoreOpen ? (
                <div className="grid grid-cols-1 gap-1 rounded-xl border border-brand-100 bg-brand-50/40 p-2">
                  {moreNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-white"
                      onClick={() => setOpen(false)}
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  ))}
                </div>
              ) : null}
            </nav>
            <div className="flex flex-col gap-2">
              <Link
                href={pathname}
                locale={nextLocale}
                className="inline-flex h-12 w-12 items-center justify-center self-center rounded-full text-2xl transition-transform hover:scale-110"
                aria-label={t('common.languageSwitch')}
                onClick={() => setOpen(false)}
              >
                <span aria-hidden>{languageFlag}</span>
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
