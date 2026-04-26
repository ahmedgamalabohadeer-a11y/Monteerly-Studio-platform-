'use client';
import React, { useState } from 'react';
import { Calendar, Clock, CreditCard, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function InstantBookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
       <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-950">
             <h3 className="font-bold text-white">حجز جلسة عمل</h3>
             <button onClick={onClose} className="text-slate-500 hover:text-white"><X size={20} /></button>
          </div>

          <div className="p-6">
             {/* Step 1: Calendar */}
             {step === 1 && (
                <div className="animate-in slide-in-from-right-4">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400">
                         <Calendar size={24} />
                      </div>
                      <div>
                         <h4 className="font-bold text-white">اختر الموعد</h4>
                         <p className="text-xs text-slate-400">المواعيد بتوقيت الرياض (GMT+3)</p>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-5 gap-2 mb-6">
                      {[15, 16, 17, 18, 19].map(d => (
                         <button 
                           key={d}
                           onClick={() => setDate(d)}
                           className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${date === d ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
                         >
                            <span className="text-[10px] uppercase font-bold">JAN</span>
                            <span className="text-xl font-bold">{d}</span>
                         </button>
                      ))}
                   </div>
                   
                   <Button onClick={() => setStep(2)} disabled={!date} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3">
                      التالي: تأكيد الدفع
                   </Button>
                </div>
             )}

             {/* Step 2: Payment */}
             {step === 2 && (
                <div className="animate-in slide-in-from-right-4">
                   <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
                      <div className="flex justify-between mb-2 text-sm">
                         <span className="text-slate-300">جلسة مونتاج (ساعة)</span>
                         <span className="text-white font-bold">$150.00</span>
                      </div>
                      <div className="flex justify-between mb-2 text-sm">
                         <span className="text-slate-300">رسوم الخدمة</span>
                         <span className="text-white font-bold">$15.00</span>
                      </div>
                      <div className="h-px bg-white/10 my-3" />
                      <div className="flex justify-between text-lg font-bold">
                         <span className="text-white">الإجمالي</span>
                         <span className="text-green-400">$165.00</span>
                      </div>
                   </div>

                   <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-bold mb-3 shadow-lg shadow-green-500/20">
                      <CreditCard size={18} className="mr-2" /> ادفع واحجز فوراً
                   </Button>
                   <button onClick={() => setStep(1)} className="w-full text-slate-500 text-xs hover:text-white">العودة للخلف</button>
                </div>
             )}
          </div>
       </div>
    </div>
  );
}

