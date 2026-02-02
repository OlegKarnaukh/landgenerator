import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'LandGen.AI - AI Landing Page Generator',
  description:
    'Create stunning landing pages with AI-generated content and images in minutes. No design skills required.',
  keywords: [
    'landing page',
    'AI',
    'generator',
    'website builder',
    'no-code',
    'artificial intelligence',
  ],
  authors: [{ name: 'LandGen.AI' }],
  openGraph: {
    title: 'LandGen.AI - AI Landing Page Generator',
    description:
      'Create stunning landing pages with AI-generated content and images in minutes.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
