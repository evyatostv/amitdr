import './globals.css';
import type {Metadata} from 'next';
import Script from 'next/script';
import {withBasePath} from '@/lib/asset-path';
import {SmoothScroll} from '@/components/SmoothScroll';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://amitdr.com';

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'Dr Amit Druyan',
  description:
    'Official website of Dr Amit Druyan, senior rheumatologist at Sheba Medical Center. Specialist in FMF, RA, vasculitis, lupus, scleroderma and inflammatory arthritis.',
  inLanguage: ['he', 'en'],
  publisher: {
    '@type': 'Physician',
    '@id': `${siteUrl}/#physician`,
    name: 'Dr Amit Druyan'
  }
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://amitdr.com'),
  title: 'Dr Amit Druyan | Senior Rheumatologist – Sheba Medical Center',
  description:
    'Dr Amit Druyan — senior rheumatologist and internal medicine specialist at Sheba Medical Center. Expert in FMF, rheumatoid arthritis, vasculitis, lupus, scleroderma and inflammatory arthritis. 20+ years clinical experience. Private clinics in Petah Tikva (J Medical) and Kiryat Ono (BMC).',
  icons: {
    icon: [
      {url: withBasePath('/images/logo-icon.png'), type: 'image/png'},
      {url: withBasePath('/icon.png'), type: 'image/png'}
    ],
    apple: [{url: withBasePath('/images/logo-icon.png'), type: 'image/png'}],
    shortcut: [withBasePath('/images/logo-icon.png')]
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const consoleWarningScript = `
    (function () {
      function printWarning() {
        var titleStyle = 'background:#000000;color:#ff2b2b;padding:14px 18px;font-size:56px;font-weight:900;line-height:1.1;border:3px solid #ff2b2b;border-radius:8px;';
        var bodyStyle = 'background:#000000;color:#ff2b2b;padding:10px 14px;font-size:24px;font-weight:900;line-height:1.3;border-left:3px solid #ff2b2b;';
        console.log('%cWARNING', titleStyle);
        console.log('%cUNAUTHORIZED USE WITHOUT PERMISSION IS ILLEGAL.', bodyStyle);
        console.log('%cUNAUTHORIZED USE WITHOUT PERMISSION IS ILLEGAL.', bodyStyle);
      }
      printWarning();
      setInterval(printWarning, 15000);
    })();
  `;

  return (
    <html lang="he">
      <body>
        <Script id="schema-website" type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </Script>
        <SmoothScroll />
        <Script id="console-legal-warning" strategy="afterInteractive">
          {consoleWarningScript}
        </Script>
        <script
          src="https://widget.tabnav.com/limited-widget.min.js.gz"
          {...{
            'tnv-data-config':
              '{"language":"he","color":"#283c8c","buttonColor":"#283c8c","buttonSize":"small","widgetSize":"small","widgetLocation":"right","buttonLocation":"bottom"}'
          }}
          defer
        />
        <noscript>
          פתרונות נגישות לאתרי אינטרנט לפי התקן הישראלי 5568
          <a href="https://tabnav.com/he">הנגשת אתרים</a>
        </noscript>
        {children}
      </body>
    </html>
  );
}
