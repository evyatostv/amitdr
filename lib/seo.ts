import type {Metadata} from 'next';
import type {Locale} from './i18n/routing';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://amitdr.com';

export function buildMetadata({
  locale,
  title,
  description,
  path
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        he: `${siteUrl}${path.replace('/en', '')}`,
        en: `${siteUrl}/en${path.replace('/en', '')}`
      }
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'he' ? 'he_IL' : 'en_US',
      url,
      siteName: 'Dr Amit Druyan'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}

export const baseSiteUrl = siteUrl;
