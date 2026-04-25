import React from 'react';
import Image from 'next/image';
import { PlayCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-background">
       {/* Background Glow */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />

       <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border text-xs font-bold mb-8 animate-in slide-in-from-bottom-4">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             الإصدار 5.0 متاح الآن
          </div>

          <h1 className="text-5xl md:text-7xl font-black font-heading mb-6 tracking-tight leading-tight animate-in slide-in-from-bottom-8">
             منصتك الشاملة للإبداع <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">وصناعة المحتوى</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in slide-in-from-bottom-10">
             اربط مع أفضل المونتيرية، المصممين، ومعلقي الصوت في الشرق الأوسط.
             أدر مشاريعك، مدفوعاتك، وملفاتك في مكان واحد آمن.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in slide-in-from-bottom-12">
             <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25" icon={<ArrowRight size={20} />}>
                ابدأ مشروعك مجاناً
             </Button>
             <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full" icon={<PlayCircle size={20} />}>
                كيف يعمل الموقع؟
             </Button>
          </div>

          {/* UI Mockup */}
          <div className="relative max-w-5xl mx-auto rounded-2xl border border-border shadow-2xl overflow-hidden animate-in slide-in-from-bottom-16">
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
             <Image 
                src="/images/dashboard_mockup.jpg" 
                alt="Monteerly Dashboard" 
                width={1200} 
                height={675} 
                className="w-full h-auto object-cover"
                priority
             />
          </div>
       </div>
    </section>
  );
}

################################################################################