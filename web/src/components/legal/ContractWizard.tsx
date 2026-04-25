// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { FileText, Shield, User, DollarSign, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SignaturePad } from './SignaturePad';
import { useToast } from '@/components/ui/Toast';
import { supabase } from '@/lib/supabase/client';

export function ContractWizard({ onBack }: { onBack?: () => void }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<'nda' | 'service'>('service');
  
  // States للبيانات
  const [clientName, setClientName] = useState('');
  const [contractValue, setContractValue] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  
  // States للذكاء الاصطناعي
  const [aiDraft, setAiDraft] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);
  const { addToast } = useToast();

  const handleGenerateDraft = async () => {
    if (!clientName || !contractValue || !deliveryDate) {
      addToast('error', 'يرجى إكمال جميع بيانات المشروع أولاً.');
      return;
    }
    setIsDrafting(true);
    setStep(3); // ننتقل للمعاينة
    try {
      const res = await fetch('/api/ai/legal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, clientName, value: contractValue, date: deliveryDate })
      });
      const data = await res.json();
      if (data.draft) setAiDraft(data.draft);
      else throw new Error('خطأ في التوليد');
    } catch (err) {
      addToast('error', 'فشل الوكيل الذكي في توليد العقد.');
      setStep(2);
    } finally {
      setIsDrafting(false);
    }
  };

  const handleFinish = async () => {
    try {
      addToast('success', 'جاري التوثيق في Supabase...');
      const { error } = await supabase.from('legal_contracts').insert([{
        contract_type: type,
        client_name: clientName,
        contract_value: parseFloat(contractValue),
        delivery_date: deliveryDate,
        ai_content: aiDraft,
        status: 'signed'
      }]);

      if (error) throw error;
      addToast('success', 'تم التوثيق السيادي بنجاح في قاعدة البيانات.');
      if (onBack) setTimeout(onBack, 2000);
    } catch (err) {
      addToast('error', 'رفض Supabase: ' + (err.message || JSON.stringify(err)));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Form Side */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
            {onBack && <button onClick={onBack} className="p-2 bg-white/5 rounded-full hover:bg-white/10"><ArrowLeft size={18} className="text-white"/></button>}
            <h2 className="text-xl font-bold text-white font-cairo">الوكيل القانوني الذكي</h2>
        </div>
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
                <button onClick={() => setType('service')} className={`p-4 rounded-xl border-2 text-center transition-all ${type === 'service' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 bg-white/5'}`}>
                  <FileText size={24} className="mx-auto mb-2 text-indigo-400" />
                  <div className="font-bold text-white text-sm">اتفاقية عمل</div>
                </button>
                <button onClick={() => setType('nda')} className={`p-4 rounded-xl border-2 text-center transition-all ${type === 'nda' ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 bg-white/5'}`}>
                  <Shield size={24} className="mx-auto mb-2 text-purple-400" />
                  <div className="font-bold text-white text-sm">عدم إفشاء أسرار</div>
                </button>
              </div>
              <Button onClick={() => setStep(2)} className="w-full mt-4 bg-white text-black font-bold">التالي</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in slide-in-from-left-4">
              <h3 className="font-bold text-white text-lg">بيانات الصياغة الآلية</h3>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">اسم الطرف الثاني (العميل)</label>
                <div className="relative">
                  <User size={16} className="absolute right-3 top-3 text-slate-500" />
                  <input value={clientName} onChange={(e)=>setClientName(e.target.value)} type="text" className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 pr-9 text-white text-sm outline-none focus:border-brand-primary" placeholder="الاسم أو الشركة..." />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">قيمة العقد (USD)</label>
                <div className="relative">
                  <DollarSign size={16} className="absolute right-3 top-3 text-slate-500" />
                  <input value={contractValue} onChange={(e)=>setContractValue(e.target.value)} type="number" className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 pr-9 text-white text-sm outline-none focus:border-brand-primary" placeholder="1000" />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">تاريخ التسليم</label>
                <div className="relative">
                  <Calendar size={16} className="absolute right-3 top-3 text-slate-500" />
                  <input value={deliveryDate} onChange={(e)=>setDeliveryDate(e.target.value)} type="date" className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 pr-9 text-white text-sm outline-none focus:border-brand-primary" />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button onClick={() => setStep(1)} variant="outline" className="border-white/10 text-white">رجوع</Button>
                <Button onClick={handleGenerateDraft} className="flex-1 bg-brand-primary text-white font-bold">توليد العقد بالذكاء الاصطناعي</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in slide-in-from-left-4">
              <h3 className="font-bold text-white text-lg">التوقيع والاعتماد السيادي</h3>
              <p className="text-sm text-slate-400">راجع المسودة التي صاغها الوكيل. بالتوقيع أدناه، يتم توثيق العقد في قاعدة البيانات (Supabase).</p>
              <SignaturePad onSign={handleFinish} disabled={isDrafting} />
              <Button onClick={() => setStep(2)} variant="outline" className="w-full mt-2 border-white/10 text-white">رجوع للتعديل</Button>
            </div>
          )}
        </div>
      </div>

      {/* Preview Side (Paper) */}
      <div className="bg-white text-black p-8 rounded-xl shadow-2xl relative min-h-[600px] font-serif text-sm leading-relaxed overflow-y-auto max-h-[80vh] border-4 border-slate-200">
        <div className="absolute top-4 right-4 opacity-5 pointer-events-none">
          <Shield size={150} />
        </div>
        
        {isDrafting ? (
           <div className="flex flex-col items-center justify-center h-full text-slate-500 animate-pulse">
              <Shield size={48} className="mb-4 text-brand-primary" />
              <p className="text-lg font-bold font-cairo">الوكيل القانوني يقوم بالصياغة الآن...</p>
              <p className="text-xs mt-2">جاري استدعاء المعايير القانونية...</p>
           </div>
        ) : aiDraft ? (
           <div className="whitespace-pre-wrap text-justify text-slate-800 leading-8">
              {aiDraft}
              <div className="mt-12 flex justify-between">
                <div className="text-center w-40">
                  <div className="mb-8 font-bold border-b border-black pb-1">الطرف الأول (مونتيرلي)</div>
                  {step === 3 && <div className="font-handwriting text-xl text-blue-900 rotate-[-5deg]">Monteerly Studio</div>}
                </div>
                <div className="text-center w-40">
                  <div className="mb-8 font-bold border-b border-black pb-1">الطرف الثاني</div>
                  <div className="text-slate-300 text-xs italic">(بانتظار التوقيع)</div>
                </div>
              </div>
           </div>
        ) : (
           <div className="flex flex-col items-center justify-center h-full text-slate-300">
              <FileText size={64} className="mb-4 opacity-50" />
              <p className="text-lg font-cairo">مسودة العقد ستظهر هنا</p>
           </div>
        )}
      </div>
    </div>
  );
}
