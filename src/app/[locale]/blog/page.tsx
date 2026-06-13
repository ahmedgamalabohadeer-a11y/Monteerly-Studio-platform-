'use client'
import React from 'react';
import Image from 'next/image';
import { BookOpen, ArrowLeft } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    { title: 'كيف تضاعف أرباحك باستخدام المساعد الإخراجي؟', category: 'الذكاء الاصطناعي', date: '15 مايو 2026', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600' },
    { title: 'دليل النخبة: التعامل الآمن مع نظام العقود الذكية', category: 'الأمان السيادي', date: '10 مايو 2026', img: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=600' }
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-6 md:p-12 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-white/5 pb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-emerald-500" /> سجلات الإمبراطورية (Blog)
          </h1>
          <p className="text-slate-400 text-lg">أحدث الرؤى الإستراتيجية، التحديثات، وأسرار النجاح في MCOS.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="bg-[#0A0A0F] border border-white/5 rounded-[2rem] overflow-hidden hover:border-emerald-500/30 transition-all group">
              <div className="h-64 overflow-hidden relative">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-emerald-500 text-slate-900 px-3 py-1 rounded-full text-xs font-black">{post.category}</div>
              </div>
              <div className="p-8">
                <p className="text-slate-500 text-sm font-bold mb-3">{post.date}</p>
                <h2 className="text-2xl font-black mb-6 text-white leading-snug">{post.title}</h2>
                <button className="text-emerald-400 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                  اقرأ التقرير الكامل <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
