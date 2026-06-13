'use client';
import React from 'react';
import { Check, X, Minus } from 'lucide-react';

export function PlanComparison() {
  return (
    <div className="overflow-x-auto">
       <table className="w-full text-center border-collapse">
          <thead>
             <tr>
                <th className="p-4 text-right min-w-[200px]">الميزة</th>
                <th className="p-4 min-w-[150px] font-bold text-muted-foreground">البداية (Free)</th>
                <th className="p-4 min-w-[150px] font-bold text-primary text-lg bg-primary/5 rounded-t-xl">المحترف (Pro)</th>
                <th className="p-4 min-w-[150px] font-bold text-foreground">الوكالة (Agency)</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-border">
             <Row label="عمولة المنصة" free="20%" pro="10%" agency="5%" highlight />
             <Row label="مساحة التخزين" free="2 GB" pro="100 GB" agency="1 TB" />
             <Row label="عدد المشاريع النشطة" free="1" pro="غير محدود" agency="غير محدود" />
             <Row label="أعضاء الفريق" free={<Minus size={16} className="mx-auto text-muted-foreground" />} pro={<Minus size={16} className="mx-auto text-muted-foreground" />} agency="5 أعضاء" />
             <Row label="أدوات الذكاء الاصطناعي" free="محدودة" pro="كاملة" agency="كاملة + أولوية" />
             <Row label="شعار مخصص (White Label)" free={<X size={16} className="mx-auto text-red-300" />} pro={<Check size={16} className="mx-auto text-emerald-500" />} agency={<Check size={16} className="mx-auto text-emerald-500" />} />
             <Row label="الدعم الفني" free="بريد إلكتروني" pro="شات مباشر" agency="مدير حساب مخصص" />
          </tbody>
       </table>
    </div>
  );
}

function Row({ label, free, pro, agency, highlight }: unknown) {
   return (
      <tr className={`hover:bg-muted/50 transition-colors ${highlight ? 'bg-muted/10' : ''}`}>
         <td className="p-4 text-right font-medium text-sm">{label}</td>
         <td className="p-4 text-sm text-muted-foreground">{free}</td>
         <td className="p-4 text-sm font-bold text-foreground bg-primary/5 border-x border-primary/10">{pro}</td>
         <td className="p-4 text-sm text-foreground">{agency}</td>
      </tr>
   );
}

