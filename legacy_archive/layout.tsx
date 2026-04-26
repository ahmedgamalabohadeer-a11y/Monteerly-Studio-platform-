import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Monteerly Studio | Corporate OS for Production & Trade',
    template: '%s | Monteerly Studio'
  },
  description: 'المنصة المتكاملة لإدارة عمليات المونتاج، التجارة الدولية، والتحكيم القانوني بالذكاء الاصطناعي.',
  keywords: ['مونتاج فيديوهات', 'استيراد وتصدير', 'AI Video Editing', 'Corporate OS', 'تحكيم قانوني رقمي', 'أكاديمية مونتيرلي'],
  authors: [{ name: 'Ahmed Gamal' }],
  openGraph: {
    title: 'Monteerly Studio',
    description: 'نظام تشغيل مؤسسي متكامل للإنتاج واللوجستيات.',
    url: 'https://monteerly.studio',
    siteName: 'Monteerly Studio',
    images: [
      {
        url: '/images/monteerly/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ar_EG',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
