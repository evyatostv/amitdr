import './globals.css';
import type {Metadata} from 'next';
import Script from 'next/script';
import {withBasePath} from '@/lib/asset-path';
import {SmoothScroll} from '@/components/SmoothScroll';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://amitdr.com'),
  title: 'Dr Amit Druyan',
  description: 'Rheumatology care in Israel',
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
        <SmoothScroll />
        <Script id="console-legal-warning" strategy="afterInteractive">
          {consoleWarningScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
