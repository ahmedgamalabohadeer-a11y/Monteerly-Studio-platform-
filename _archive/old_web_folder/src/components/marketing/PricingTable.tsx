'use client';
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function PricingTable() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
       <div className="text-center mb-12">
          <h2 className="text-3xl font-black font-heading mb-4">خطط تناسب الجميع</h2>
          <p className="text-muted-foreground mb-8">اختر الخطة المناسبة لحجم أعمالك.</p>
          
          <div className="inline-flex items-center p-1 bg-muted rounded-full border border-border">
             <button 
                onClick={() => setAnnual(false)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${!annual ? 'bg-white shadow text-foreground' : 'text-muted-foreground'}`}
             >
                شهري
             </button>
             <button 
                onClick={() => setAnnual(true)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${annual ? 'bg-white shadow text-foreground' : 'text-muted-foreground'}`}
             >
                سنوي <span className="text-[10px] text-green-600 ml-1">-20%</span>
             </button>
          </div>
       </div>

       <div className="grid md:grid-cols-3 gap-8">
          <PlanCard 
             title="مستقل (Freelancer)" 
             price={annual ? "0" : "0"} 
             desc="للبدء في عالم المونتاج."
             features={['2 جيجا مساحة تخزين', 'مشاريع غير محدودة', 'عمولة منصة 15%', 'دعم فني عبر الإيميل']}
             missing={['مشاركة الملفات مع العملاء', 'نطاق خاص (Custom Domain)', 'أدوات الفريق']}
          />
          <PlanCard 
             title="محترف (Pro)" 
             price={annual ? "12" : "15"} 
             desc="للمحترفين وصناع المحتوى."
             isPopular
             features={['100 جيجا مساحة تخزين', 'رابط مراجعة للعملاء', 'عمولة منصة 5%', 'دعم فني مباشر', '4K Video Review']}
             missing={['أدوات الفريق']}
          />
          <PlanCard 
             title="وكالة (Agency)" 
             price={annual ? "49" : "59"} 
             desc="للشركات وفرق العمل."
             features={['1 تيرا مساحة تخزين', 'أعضاء فريق غير محدودين', 'عمولة منصة 0%', 'مدير حساب خاص', 'API Access']}
             missing={[]}
          />
       </div>
    </div>
  );
}

function PlanCard({ title, price, desc, features, missing, isPopular }: any) {
    return (
        <div className={`relative p-8 bg-card border rounded-2xl flex flex-col ${isPopular ? 'border-primary shadow-2xl scale-105 z-10' : 'border-border shadow-sm'}`}>
            {isPopular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3"><Badge variant="primary">الأكثر طلباً</Badge></div>}
            
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-6">{desc}</p>
            <div className="text-4xl font-black mb-6">${price}<span className="text-base font-normal text-muted-foreground">/شهر</span></div>
            
            <Button variant={isPopular ? 'primary' : 'outline'} className="w-full mb-8">اختر الخطة</Button>
            
            <div className="space-y-4 flex-1">
               {features.map((f: string) => (
                  <div key={f} className="flex items-center gap-3 text-sm">
                     <div className="p-1 bg-green-100 text-green-700 rounded-full"><Check size={12} /></div>
                     {f}
                  </div>
               ))}
               {missing.map((f: string) => (
                  <div key={f} className="flex items-center gap-3 text-sm text-muted-foreground line-through opacity-60">
                     <div className="p-1 bg-slate-100 text-slate-400 rounded-full"><X size={12} /></div>
                     {f}
                  </div>
               ))}
            </div>
        </div>
    )
}

