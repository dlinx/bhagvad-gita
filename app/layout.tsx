import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google'
import "@assistant-ui/react/styles/index.css";
import "@assistant-ui/react/styles/modal.css"; // if using AssistantModal

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bhagvad Gita',
  description: 'Timeless wisdom from the sacred text',
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