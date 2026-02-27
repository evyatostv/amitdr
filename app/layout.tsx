import './globals.css';
import type {Metadata} from 'next';
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
  return (
    <html lang="he">
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
