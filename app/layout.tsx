import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SSR Demo',
  description: 'Server-side rendered Next.js application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-49C4CS2EMS" />
    </html>
  );
}