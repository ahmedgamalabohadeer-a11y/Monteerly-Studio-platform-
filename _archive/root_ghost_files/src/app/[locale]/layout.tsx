import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

// استرجاع خطوط الأرشيف
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// استرجاع البيانات الوصفية من الأرشيف
export const metadata = {
  title: "Dashboard | Monteerly Studio",
  description: "Manage your enterprise, creative projects, and team in one AI-powered place.",
};

export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';

  return (
    <html 
      lang={locale} 
      dir={locale === 'ar' ? 'rtl' : 'ltr'} 
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50">
        {children}
      </body>
    </html>
  );
}
