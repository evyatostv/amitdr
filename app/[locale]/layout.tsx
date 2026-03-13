import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {Heebo} from 'next/font/google';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {WhatsappButton} from '@/components/WhatsappButton';
import {CookieBanner} from '@/components/CookieBanner';
import {SiteStatsTracker} from '@/components/SiteStatsTracker';
import {HomeLogoIntro} from '@/components/HomeLogoIntro';
import {routing, type Locale} from '@/lib/i18n/routing';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo'
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const locale = params.locale as Locale;

  if (!routing.locales.includes(locale as 'he' | 'en')) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <div
      className={`${heebo.variable} font-sans`}
      style={{fontFamily: 'var(--font-heebo), system-ui, -apple-system, sans-serif'}}
      lang={locale}
      dir={locale === 'he' ? 'rtl' : 'ltr'}
    >
      <NextIntlClientProvider messages={messages}>
        <HomeLogoIntro />
        <div className="flex min-h-screen flex-col">
          <Header />
          <SiteStatsTracker />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <WhatsappButton />
          <CookieBanner locale={locale} />
        </div>
      </NextIntlClientProvider>
    </div>
  );
}
