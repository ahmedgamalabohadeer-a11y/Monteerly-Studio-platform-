'use client';
import React from 'react';
import { Calendar, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function HireMeWidget() {
  return (
    <div className="bg-white text-black rounded-xl p-6 shadow-2xl sticky top-24">
       <div className="flex items-center justify-between mb-6">
          <div>
             <h3 className="text-xl font-black">احجزني الآن</h3>
             <div className="flex items-center gap-1 text-green-600 text-xs font-bold mt-1">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" /> متاح للعمل
             </div>
          </div>
          <div className="text-right">
             <div className="text-2xl font-bold">$50</div>
             <div className="text-xs text-slate-500">/ ساعة</div>
          </div>
       </div>

       <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-slate-700 bg-slate-100 p-3 rounded-lg">
             <Clock size={16} className="text-slate-400" />
             <span>وقت الرد: <strong>أقل من ساعة</strong></span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-700 bg-slate-100 p-3 rounded-lg">
             <CheckCircle size={16} className="text-slate-400" />
             <span>مشاريع مكتملة: <strong>142</strong></span>
          </div>
       </div>

       <Button className="w-full bg-black text-white hover:bg-slate-800 font-bold py-4 text-lg mb-3 shadow-lg">
          ابدأ مشروعاً
       </Button>
       <Button variant="outline" className="w-full border-black/10 text-slate-600 hover:bg-slate-50">
          حجز استشارة (Video Call)
       </Button>
       
       <p className="text-center text-[10px] text-slate-400 mt-4">
          محمية بواسطة نظام Monteerly Escrow
       </p>
    </div>
  );
}
