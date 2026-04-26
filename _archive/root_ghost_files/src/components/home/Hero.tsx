'use client';
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8 backdrop-blur-sm">
           <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
           نظام التشغيل الجديد للمبدعين v2.0
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400">
           أطلق العنان<br /> لإبداعك بلا حدود.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
           منصة Monteerly Studio تجمع بين إدارة المشاريع، مراجعة الفيديو، والذكاء الاصطناعي في مكان واحد. ودّع تشتت الملفات ومرحبًا بالإنتاجية.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
           <Button size="xl" className="w-full md:w-auto h-14 text-lg px-8 bg-white text-black hover:bg-slate-200">
              ابدأ مجاناً الآن <ArrowRight className="ml-2" size={20} />
           </Button>
           <Button variant="outline" size="xl" className="w-full md:w-auto h-14 text-lg px-8 border-white/10 hover:bg-white/5">
              <Play className="mr-2" size={18} /> شاهد العرض
           </Button>
        </div>
      </div>
    </section>
  );
}

################################################################################