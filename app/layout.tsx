import './globals.css';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://amitdr.com'),
  title: 'Dr Amit Druvin',
  description: 'Rheumatology care in Israel'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="he">
      <body>{children}</body>
    </html>
  );
}
