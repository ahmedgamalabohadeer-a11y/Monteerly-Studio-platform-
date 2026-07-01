import type { Metadata } from 'next';
import React from 'react';
import { Cairo, IBM_Plex_Sans_Arabic } from 'next/font/google';
import '@/app/globals.css';

// Monteerly Root Layout Constitution
// Role:
// This file is the highest-priority shell enforcement layer for the platform.
// It must preserve a calm sovereign frame, keep the shell quieter than route content,
// and prevent the product from collapsing into generic SaaS chrome or banner-like noise.
//
// Tone:
// Luxury Editorial Executive
//
// Required outcomes:
// - calm runtime shell
// - dark sovereign atmosphere
// - premium low-noise contrast
// - correct RTL / LTR support
// - consistent cross-route visual continuity

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

function getRuntimeLabel(locale: string) {
  return locale === 'ar' ? 'النظام التشغيلي السيادي' : 'Sovereign Runtime';
}

function getRuntimeStatus(locale: string) {
  return locale === 'ar'
    ? 'جميع الاتصالات مشفرة'
    : 'All connections encrypted';
}

function getShellDescriptor(locale: string) {
  return locale === 'ar'
    ? 'طبقة تشغيل تنفيذية هادئة'
    : 'Calm executive shell';
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
        <div className="relative isolate min-h-screen overflow-x-clip bg-[linear-gradient(180deg,#02050B_0%,#050914_36%,#040812_68%,#02050B_100%)]">
          {/* Ambient sovereign atmosphere */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:96px_96px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(6,182,212,0.07),transparent_24%),radial-gradient(circle_at_84%_10%,rgba(16,185,129,0.07),transparent_22%),radial-gradient(circle_at_74%_74%,rgba(148,163,184,0.06),transparent_24%),radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.03),transparent_36%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%,transparent_76%,rgba(255,255,255,0.02))]"
          />

          {/* Quiet runtime bar */}
          <header className="relative z-30 border-b border-white/6 bg-black/20 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between md:px-6 lg:px-8">
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-slate-300/90">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.55)]" />
                {getRuntimeLabel(locale)}
              </div>

              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                {getRuntimeStatus(locale)}
              </div>
            </div>
          </header>

          {/* Sovereign frame lines */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-px bg-gradient-to-b from-transparent via-white/7 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-px bg-gradient-to-b from-transparent via-white/7 to-transparent" />

          {/* Main shell */}
          <div className="relative z-10 flex min-h-[calc(100vh-41px)] flex-col">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.03] to-transparent" />

            <div className="relative flex min-h-[calc(100vh-41px)] flex-1 flex-col">
              {/* Inner executive shell restraint */}
              <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-40 max-w-7xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.035),transparent_65%)]" />

              <main className="relative z-20 flex min-h-[calc(100vh-41px)] flex-1 flex-col">
                <div className="mx-auto flex min-h-[calc(100vh-41px)] w-full max-w-[1600px] flex-1 flex-col">
                  {children}
                </div>
              </main>
            </div>
          </div>

          {/* Bottom atmospheric fade */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent"
          />

          {/* Hidden descriptor for assistive context */}
          <div className="sr-only">{getShellDescriptor(locale)}</div>
        </div>
      </body>
    </html>
  );
}
