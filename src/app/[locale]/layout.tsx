import React from 'react';
import { Cairo, Geist } from 'next/font/google';
import '@/app/globals.css';

// 1. فرض خط القاهرة العربي إجبارياً على جميع الواجهات
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
  weight: ['400', '600', '700', '900']
});

// 2. فرض خط Geist المخصص للأكواد والأرقام المالية
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap'
});

export const metadata = {
  title: 'Monteerly Corporate OS | نظام الإنتاج السيادي',
  description: 'أول نظام تشغيل متكامل لشركات الإنتاج والمبدعين مدعوم بالذكاء الاصطناعي.',
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // فك التشفير عن المتغيرات باستخدام await (Next.js 15+ Standard)
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${cairo.variable} ${geist.variable} scroll-smooth`} data-scroll-behavior="smooth">
      {/* 3. فرض الهوية اللونية الداكنة Slate-950 بشكل قاطع على كامل المنصة */}
      <body className="bg-slate-950 text-slate-50 font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">

        {/* شريط الإشعارات السيادي العالمي (Global Alert) */}
        <div className="w-full bg-indigo-600 text-white text-center py-1.5 text-[10px] font-black tracking-widest uppercase z-[100] relative">
          جميع الاتصالات مشفرة | MCOS V5.0 System Active
        </div>

        <main className="relative flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
