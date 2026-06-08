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
  const hebrewPath = path.replace(/^\/en/, '') || '/';
  const englishPath = `/en${hebrewPath === '/' ? '' : hebrewPath}`;

  return {
    title,
    description,
    authors: [{name: 'Dr Amit Druyan', url: siteUrl}],
    creator: 'Dr Amit Druyan',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1
      }
    },
    alternates: {
      canonical: url,
      languages: {
        he: `${siteUrl}${hebrewPath}`,
        en: `${siteUrl}${englishPath}`,
        'x-default': `${siteUrl}${hebrewPath}`
      }
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'he' ? 'he_IL' : 'en_US',
      url,
      siteName: 'Dr Amit Druyan',
      images: [
        {
          url: `${siteUrl}/images/amit-doctor-portrait.jpg`,
          width: 900,
          height: 1100,
          alt:
            locale === 'he'
              ? 'ד״ר עמית דרוין – ראומטולוג בכיר | Sheba Medical Center'
              : 'Dr Amit Druyan – Senior Rheumatologist | Sheba Medical Center'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/images/amit-doctor-portrait.jpg`]
    },
    other: {
      'geo.region': 'IL-M',
      'geo.placename': 'Petah Tikva, Israel',
      'geo.position': '32.0866;34.8883',
      ICBM: '32.0866, 34.8883'
    }
  };
}

export const baseSiteUrl = siteUrl;
