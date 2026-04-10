'use client';
import React, { useState } from 'react';
import { ShieldAlert, FileText, MessageSquare, Upload, CheckCircle, Scale } from 'lucide-react';
import { InteractiveButton } from '@/components/system/InteractiveButton';
import { motion } from 'framer-motion';

export function DisputeWizard() {
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState('');

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-red-900/20 p-6 border-b border-red-500/20 flex items-center gap-4">
        <div className="p-3 bg-red-500/10 rounded-full text-red-500 border border-red-500/20">
           <Scale size={24} />
        </div>
        <div>
           <h2 className="text-xl font-bold text-white">فتح ملف نزاع رسمي</h2>
           <p className="text-red-200 text-sm">سيتم تجميد الأموال فوراً لحين حل المشكلة.</p>
        </div>
      </div>

      <div className="p-8">
         {step === 1 && (
            <div className="space-y-6">
               <h3 className="font-bold text-white">ما هي المشكلة؟</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['جودة العمل لا تطابق الاتفاق', 'تأخير في التسليم', 'انتهاك حقوق الملكية', 'العميل لا يستجيب'].map((r) => (
                     <div 
                       key={r}
                       onClick={() => setReason(r)}
                       className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          reason === r 
                          ? 'bg-red-500/10 border-red-500 text-white' 
                          : 'bg-black/20 border-white/10 hover:border-white/30 text-slate-400'
                       }`}
                     >
                        {r}
                     </div>
                  ))}
               </div>
               <div className="flex justify-end">
                  <InteractiveButton 
                    disabled={!reason} 
                    onClick={() => setStep(2)}
                    variant="danger"
                  >
                     التالي: تقديم الأدلة
                  </InteractiveButton>
               </div>
            </div>
         )}

         {step === 2 && (
            <div className="space-y-6">
               <h3 className="font-bold text-white">الأدلة والمستندات</h3>
               <p className="text-sm text-slate-400">سيقوم فريق التحكيم بمراجعة سجلات الدردشة والملفات تلقائياً. هل لديك شيء آخر؟</p>
               
               <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center bg-black/20">
                  <Upload className="mx-auto text-slate-500 mb-2" />
                  <div className="text-sm text-slate-300 font-bold">ارفع صور أو ملفات PDF</div>
                  <div className="text-xs text-slate-500">العقد الأصلي، لقطات شاشة، إلخ.</div>
               </div>

               <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-xs text-blue-300 flex gap-2">
                  <ShieldAlert size={16} className="shrink-0" />
                  <div>
                     تنبيه قانوني: تقديم أدلة مزيفة قد يعرض حسابك للإيقاف النهائي والملاحقة القانونية.
                  </div>
               </div>

               <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="text-slate-400 text-sm">عودة</button>
                  <InteractiveButton 
                    onClick={() => setStep(3)}
                    variant="danger"
                  >
                     رفع النزاع وتجميد الأموال
                  </InteractiveButton>
               </div>
            </div>
         )}

         {step === 3 && (
            <div className="text-center py-8">
               <motion.div 
                 initial={{ scale: 0 }} animate={{ scale: 1 }}
                 className="w-20 h-20 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6"
               >
                  <ShieldAlert size={40} />
               </motion.div>
               <h3 className="text-2xl font-black text-white mb-2">تم تجميد المعاملة #TX-992</h3>
               <p className="text-slate-400 max-w-md mx-auto mb-8">
                  تم إخطار الطرف الآخر. سيتدخل وسيط من Monteerly خلال 24 ساعة إذا لم يتم الحل ودياً.
               </p>
               <div className="bg-slate-950 p-4 rounded-lg border border-white/5 inline-block text-left">
                  <div className="text-xs text-slate-500 uppercase font-bold mb-1">رقم القضية</div>
                  <div className="text-lg font-mono text-white tracking-widest">CASE-2026-881</div>
               </div>
            </div>
         )}
      </div>
    </div>
  );
}
