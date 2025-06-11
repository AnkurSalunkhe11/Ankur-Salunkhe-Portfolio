import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { getConfig } from '@/lib/data-loader';

const inter = Inter({ subsets: ['latin'] });
const config = getConfig();

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  keywords: config.seo.keywords,
  authors: [{ name: 'Ankur Salunkhe' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ankur-salunkhe.vercel.app'),
  openGraph: {
    title: config.seo.title,
    description: config.seo.description,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ankur-salunkhe.vercel.app',
    siteName: 'Ankur Salunkhe Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: config.seo.title,
    description: config.seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}