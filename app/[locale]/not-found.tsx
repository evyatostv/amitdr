'use client';

import Image from 'next/image';
import {useLocale} from 'next-intl';
import {Link} from '@/lib/i18n/navigation';
import {withBasePath} from '@/lib/asset-path';

const content = {
  he: {
    code: '404',
    title: 'העמוד לא נמצא',
    description: 'ייתכן שהקישור שגוי או שהעמוד הוסר. אפשר לחזור לעמוד הבית או לקביעת תור.',
    home: 'חזרה לבית',
    book: 'קביעת תור',
    phone: '03-9775355'
  },
  en: {
    code: '404',
    title: 'Page Not Found',
    description: 'The link may be broken or the page was removed. You can return home or book an appointment.',
    home: 'Back Home',
    book: 'Book Appointment',
    phone: '03-9775355'
  }
} as const;

export default function LocalizedNotFound() {
  const locale = useLocale() === 'en' ? 'en' : 'he';
  const t = content[locale];

  return (
    <section className="relative isolate overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(106,209,173,0.34),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(40,60,140,0.24),transparent_37%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.17),transparent_42%),linear-gradient(160deg,#ebf8f2_0%,#f6fbff_52%,#ffffff_100%)]" />
        <div className="absolute -start-24 top-12 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl" />
        <div className="absolute -end-24 top-24 h-72 w-72 rounded-full bg-blue-900/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(40,60,140,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(40,60,140,0.06)_1px,transparent_1px)] bg-[size:34px_34px] opacity-30 [mask-image:radial-gradient(circle_at_center,black_38%,transparent_100%)]" />
      </div>

      <div className="container-main relative">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/70 bg-white/78 p-6 shadow-[0_30px_70px_-35px_rgba(30,58,138,0.45)] backdrop-blur-xl sm:p-10">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-brand-200/80 bg-white/80 px-4 py-2 text-sm font-bold tracking-wide text-brand-800">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-blue-900">
              <Image
                src={withBasePath('/images/logo-icon.png')}
                alt=""
                width={21}
                height={21}
                className="rounded-full object-contain"
                priority
              />
            </span>
            <span>{t.code}</span>
          </div>

          <h1 className="mb-3 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">{t.title}</h1>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">{t.description}</p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/" locale={locale} className="btn-primary px-6">
              {t.home}
            </Link>
            <Link href="/book" locale={locale} className="btn-secondary px-6">
              {t.book}
            </Link>
            <a href={`tel:${t.phone.replace(/-/g, '')}`} className="btn-secondary px-6">
              {t.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
