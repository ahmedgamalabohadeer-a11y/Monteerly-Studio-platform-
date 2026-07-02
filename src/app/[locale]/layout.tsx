import type { Metadata } from 'next';
import React from 'react';
import { Cairo, IBM_Plex_Sans_Arabic } from 'next/font/google';
import '@/app/globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
  weight: ['400', '600', '700', '800', '900'],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-ibm-plex-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://monteerly.com'),
  title: {
    default: 'Monteerly Corporate OS',
    template: '%s | Monteerly Corporate OS',
  },
  description:
    'Monteerly is a sovereign operating system for creative production, secure collaboration, approvals, execution, and executive visibility.',
  applicationName: 'Monteerly Corporate OS',
  keywords: [
    'Monteerly',
    'creative operations',
    'production system',
    'executive runtime',
    'sovereign platform',
    'studio operations',
    'media governance',
    'creative intelligence',
  ],
  authors: [{ name: 'Monteerly' }],
  creator: 'Monteerly',
  publisher: 'Monteerly',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Monteerly Corporate OS',
    description:
      'A sovereign operating system for creative production, secure collaboration, execution, and executive visibility.',
    siteName: 'Monteerly Corporate OS',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monteerly Corporate OS',
    description:
      'A sovereign operating system for creative production, secure collaboration, execution, and executive visibility.',
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

function getShellDescriptor(locale: string) {
  return locale === 'ar'
    ? 'إطار تشغيلي سيادي هادئ'
    : 'Calm sovereign operational shell';
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const isArabic = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`${cairo.variable} ${ibmPlexArabic.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#02050B] text-slate-50 antialiased selection:bg-cyan-400/20 selection:text-cyan-100">
        <div className="relative min-h-screen overflow-x-clip bg-[linear-gradient(180deg,#02050B_0%,#050914_42%,#030711_100%)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:120px_120px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(6,182,212,0.05),transparent_24%),radial-gradient(circle_at_82%_10%,rgba(16,185,129,0.05),transparent_20%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.025),transparent_34%)]"
          />

          <div className="relative z-10 flex min-h-screen flex-col">
            <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-full max-w-[1600px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <main className="relative z-10 flex min-h-screen flex-1 flex-col">
              <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-1 flex-col">
                {children}
              </div>
            </main>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent"
          />

          <div className="sr-only">{getShellDescriptor(locale)}</div>
        </div>
      </body>
    </html>
  );
}
