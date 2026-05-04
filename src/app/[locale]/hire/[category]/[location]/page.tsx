import React from 'react';
import { Metadata } from 'next';
import { Briefcase, Star, MapPin, CheckCircle } from 'lucide-react';
import Link from 'next/link';

// توليد البيانات الوصفية (Metadata) ديناميكياً لجوجل
export async function generateMetadata({ params }: { params: { category: string, location: string, locale: string } }): Promise<Metadata> {
  const title = `وظف أفضل ${params.category.replace('-', ' ')} في ${params.location.replace('-', ' ')} | Monteerly OS`;
  const description = `تصفح نخبة من المبدعين في مجال ${params.category.replace('-', ' ')} المتاحين للعمل فوراً في ${params.location.replace('-', ' ')} مع حماية مالية كاملة (Escrow).`;
  return { title, description };
}

export default function SEO LandingPage({ params }: { params: { category: string, location: string, locale: string } }) {
  const displayCategory = params.category.replace('-', ' ');
  const displayLocation = params.location.replace('-', ' ');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans" dir={params.locale === 'ar' ? 'rtl' : 'ltr'}>
      <header className="bg-slate-900 border-b border-slate-800 py-20 px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-6 capitalize text-white">
          وظف أمهر <span className="text-emerald-500">{displayCategory}</span> في {displayLocation}
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
          منصة MCOS تضمن لك الجودة والاحترافية. أموالك في أمان حتى تستلم مشروعك كاملاً.
        </p>
        <Link href={`/${params.locale}/auth`} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-black transition-all inline-flex items-center gap-2">
          <Briefcase className="w-5 h-5" /> ابدأ التوظيف الآن
        </Link>
      </header>

      <section className="py-16 px-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-black mb-8 flex items-center gap-2">
          <Star className="w-6 h-6 text-amber-500" /> نخب متاحة للعمل (مُوثقون)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex gap-4 hover:border-emerald-500/50 transition-colors">
              <div className="w-16 h-16 bg-slate-800 rounded-full shrink-0 border-2 border-emerald-500/30"></div>
              <div>
                <h3 className="font-black text-lg text-white flex items-center gap-2">
                  مبدع محترف {i} <CheckCircle className="w-4 h-4 text-emerald-500" />
                </h3>
                <p className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" /> {displayLocation}
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-emerald-400 font-bold">باقة PRO</span>
                  <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-300">متاح الآن</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
