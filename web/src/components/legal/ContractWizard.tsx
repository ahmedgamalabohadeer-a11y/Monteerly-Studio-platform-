// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { FileText, Shield, User, DollarSign, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SignaturePad } from './SignaturePad';
import { useToast } from '@/components/ui/Toast';

export function ContractWizard() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<'nda' | 'service'>('service');
  const { addToast } = useToast();

  const handleFinish = () => {
    addToast('success', 'تم إنشاء العقد وتوقيعه وحفظه في الخزنة.');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
       {/* Form Side */}
       <div className="space-y-6">
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
             <div className="flex items-center gap-4 mb-8">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'}`}>1</div>
                <div className="w-8 h-0.5 bg-slate-800" />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'}`}>2</div>
                <div className="w-8 h-0.5 bg-slate-800" />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'}`}>3</div>
             </div>

             {step === 1 && (
                <div className="space-y-4 animate-in slide-in-from-left-4">
                   <h3 className="font-bold text-white text-lg">نوع العقد</h3>
                   <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setType('service')}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${type === 'service' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 bg-white/5'}`}
                      >
                         <FileText size={24} className="mx-auto mb-2 text-indigo-400" />
                         <div className="font-bold text-white text-sm">اتفاقية عمل</div>
                         <div className="text-[10px] text-slate-400">Freelance Agreement</div>
                      </button>
                      <button 
                         onClick={() => setType('nda')}
                         className={`p-4 rounded-xl border-2 text-center transition-all ${type === 'nda' ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 bg-white/5'}`}
                      >
                         <Shield size={24} className="mx-auto mb-2 text-purple-400" />
                         <div className="font-bold text-white text-sm">عدم إفشاء أسرار</div>
                         <div className="text-[10px] text-slate-400">Standard NDA</div>
                      </button>
                   </div>
                   <Button onClick={() => setStep(2)} className="w-full mt-4 bg-white text-black font-bold">التالي</Button>
                </div>
             )}

             {step === 2 && (
                <div className="space-y-4 animate-in slide-in-from-left-4">
                   <h3 className="font-bold text-white text-lg">تفاصيل المشروع</h3>
                   <div>
                      <label className="text-xs text-slate-400 mb-1 block">اسم الطرف الثاني (العميل)</label>
                      <div className="relative">
                         <User size={16} className="absolute right-3 top-3 text-slate-500" />
                         <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 pr-9 text-white text-sm" placeholder="شركة..." />
                      </div>
                   </div>
                   <div>
                      <label className="text-xs text-slate-400 mb-1 block">قيمة العقد</label>
                      <div className="relative">
                         <DollarSign size={16} className="absolute right-3 top-3 text-slate-500" />
                         <input type="number" className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 pr-9 text-white text-sm" placeholder="1000" />
                      </div>
                   </div>
                   <div>
                      <label className="text-xs text-slate-400 mb-1 block">تاريخ التسليم</label>
                      <div className="relative">
                         <Calendar size={16} className="absolute right-3 top-3 text-slate-500" />
                         <input type="date" className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 pr-9 text-white text-sm" />
                      </div>
                   </div>
                   <div className="flex gap-3 mt-4">
                      <Button onClick={() => setStep(1)} variant="outline" className="border-white/10 text-white">رجوع</Button>
                      <Button onClick={() => setStep(3)} className="flex-1 bg-white text-black font-bold">التالي</Button>
                   </div>
                </div>
             )}

             {step === 3 && (
                <div className="space-y-4 animate-in slide-in-from-left-4">
                   <h3 className="font-bold text-white text-lg">التوقيع والاعتماد</h3>
                   <p className="text-sm text-slate-400">بالتوقيع أدناه، أنت توافق على جميع الشروط المذكورة في المعاينة.</p>
                   <SignaturePad onSign={handleFinish} />
                   <Button onClick={() => setStep(2)} variant="outline" className="w-full mt-2 border-white/10 text-white">رجوع</Button>
                </div>
             )}
          </div>
       </div>

       {/* Preview Side (Paper) */}
       <div className="bg-white text-black p-8 rounded-xl shadow-2xl relative min-h-[600px] font-serif text-sm leading-relaxed overflow-y-auto max-h-[80vh]">
          <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
             <Shield size={100} />
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-widest border-b-2 border-black pb-4">
             {type === 'service' ? 'اتفاقية خدمات إنتاج' : 'اتفاقية عدم إفشاء (NDA)'}
          </h2>

          <div className="space-y-6">
             <p>
                <strong>إنه في يوم:</strong> {new Date().toLocaleDateString('ar-EG')}<br/>
                <strong>تم الاتفاق بين كل من:</strong>
             </p>
             <p>
                <strong>الطرف الأول (مقدم الخدمة):</strong> محمد كمال (Monteerly User)<br/>
                <strong>الطرف الثاني (العميل):</strong> [اسم العميل سيظهر هنا]
             </p>

             <h4 className="font-bold mt-4 uppercase text-xs">البند الأول: النطاق</h4>
             <p className="text-justify text-slate-700">
                يقوم الطرف الأول بتقديم خدمات المونتاج وتصحيح الألوان لمشروع "إعلان رمضان 2026" وفقاً للمواصفات الفنية المتفق عليها في منصة Monteerly.
             </p>

             <h4 className="font-bold mt-4 uppercase text-xs">البند الثاني: الحقوق الملكية</h4>
             <p className="text-justify text-slate-700">
                تنتقل كافة حقوق الملكية الفكرية للمواد المنتجة إلى الطرف الثاني فور سداد كامل المستحقات المالية البالغة [$$$]. لا يحق للطرف الأول نشر العمل إلا بموافقة خطية.
             </p>

             <h4 className="font-bold mt-4 uppercase text-xs">البند الثالث: الشرط الجزائي</h4>
             <p className="text-justify text-slate-700">
                في حال التأخر عن موعد التسليم لأكثر من 3 أيام دون عذر قهري، يخصم 5% عن كل يوم تأخير.
             </p>
          </div>

          <div className="mt-12 flex justify-between">
             <div className="text-center w-40">
                <div className="mb-8 font-bold border-b border-black pb-1">الطرف الأول</div>
                {step === 3 && <div className="font-handwriting text-xl text-blue-900 rotate-[-5deg]">Mohamed Kamal</div>}
             </div>
             <div className="text-center w-40">
                <div className="mb-8 font-bold border-b border-black pb-1">الطرف الثاني</div>
                <div className="text-slate-300 text-xs italic">(بانتظار التوقيع)</div>
             </div>
          </div>
       </div>
    </div>
  );
}

