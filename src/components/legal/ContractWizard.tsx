'use client';
import React, { useEffect, useRef, useState } from 'react';
import { FileText, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SignaturePad } from './SignaturePad';
import { useToast } from '@/components/ui/Toast';
import {
  finalizeGeneratedContract,
  issueGeneratedContractIdempotencyKey,
} from '@/app/[locale]/contracts/actions';

const pendingRequestKeyStorage = 'mcos.contract-wizard.pending-request-key';

export function ContractWizard({ onBack }: { onBack?: () => void }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<'nda' | 'service'>('service');
  const [clientName, setClientName] = useState('');
  const [contractValue, setContractValue] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [aiDraft, setAiDraft] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);
  const idempotencyKeyRef = useRef<string | null>(null);
  const finalizationInFlightRef = useRef(false);
  const [requestKeyReady, setRequestKeyReady] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    try {
      idempotencyKeyRef.current = sessionStorage.getItem(pendingRequestKeyStorage);
    } catch {
      idempotencyKeyRef.current = null;
    }
    setRequestKeyReady(true);
  }, []);

  const handleGenerateDraft = async () => {
    if (!clientName || !contractValue || !deliveryDate) {
      addToast('error', 'يرجى إكمال جميع بيانات المشروع أولاً.');
      return;
    }
    idempotencyKeyRef.current = null;
    try {
      sessionStorage.removeItem(pendingRequestKeyStorage);
    } catch {
      // In-memory retention still supports retries when browser storage is unavailable.
    }
    setIsDrafting(true);
    setStep(3);
    try {
      const res = await fetch('/api/ai/legal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, clientName, value: contractValue, date: deliveryDate })
      });
      const data = await res.json();
      if (data.draft) setAiDraft(data.draft);
    } catch {
      addToast('error', 'فشل الوكيل الذكي في توليد العقد.');
      setStep(2);
    } finally {
      setIsDrafting(false);
    }
  };

  const handleFinish = async () => {
    if (!requestKeyReady || finalizationInFlightRef.current) return;
    finalizationInFlightRef.current = true;

    try {
      addToast('success', 'جاري حفظ مسودة العقد...');

      const idempotencyKey =
        idempotencyKeyRef.current ?? await issueGeneratedContractIdempotencyKey();
      idempotencyKeyRef.current = idempotencyKey;
      try {
        sessionStorage.setItem(pendingRequestKeyStorage, idempotencyKey);
      } catch {
        // The ref keeps the server-issued key available for retries in this view.
      }
      
      await finalizeGeneratedContract({
        type,
        clientName,
        contractValue,
        deliveryDate,
        aiDraft,
        idempotencyKey,
      });

      idempotencyKeyRef.current = null;
      try {
        sessionStorage.removeItem(pendingRequestKeyStorage);
      } catch {
        // The persisted value is an opaque request key and is not an authorization token.
      }
      addToast('success', 'تم حفظ مسودة العقد.');
      if (onBack) setTimeout(onBack, 2000);
    } catch {
      addToast('error', 'تعذر إتمام طلب العقد. يرجى المحاولة مرة أخرى.');
    } finally {
      finalizationInFlightRef.current = false;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full p-4">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
            {onBack && <button onClick={onBack} className="p-2 bg-white/5 rounded-full hover:bg-white/10"><ArrowLeft size={18} className="text-white"/></button>}
            <h2 className="text-xl font-bold text-white font-cairo">الوكيل القانوني الذكي</h2>
        </div>
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-8">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'}`}>{s}</div>
                {s < 3 && <div className="w-8 h-0.5 bg-slate-800" />}
              </React.Fragment>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-bold text-white text-lg">نوع العقد</h3>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setType('service')} className={`p-4 rounded-xl border-2 ${type === 'service' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10'}`}>
                  <FileText className="mx-auto mb-2 text-indigo-400" />
                  <div className="font-bold text-white text-sm">اتفاقية عمل</div>
                </button>
                <button onClick={() => setType('nda')} className={`p-4 rounded-xl border-2 ${type === 'nda' ? 'border-purple-500 bg-purple-500/10' : 'border-white/10'}`}>
                  <Shield className="mx-auto mb-2 text-purple-400" />
                  <div className="font-bold text-white text-sm">NDA</div>
                </button>
              </div>
              <Button onClick={() => setStep(2)} className="w-full bg-white text-black">التالي</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-bold text-white text-lg">بيانات المشروع</h3>
              <input value={clientName} onChange={(e)=>setClientName(e.target.value)} type="text" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" placeholder="اسم العميل..." />
              <input value={contractValue} onChange={(e)=>setContractValue(e.target.value)} type="number" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" placeholder="القيمة (USD)..." />
              <input value={deliveryDate} onChange={(e)=>setDeliveryDate(e.target.value)} type="date" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
              <div className="flex gap-3">
                <Button onClick={() => setStep(1)} variant="outline" className="text-white">رجوع</Button>
                <Button onClick={handleGenerateDraft} className="flex-1 bg-brand-primary text-white">توليد العقد</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
            <h3 className="font-bold text-white text-lg">مراجعة وحفظ المسودة</h3>
              <SignaturePad onSign={handleFinish} disabled={isDrafting || !requestKeyReady} />
              <Button onClick={() => setStep(2)} variant="outline" className="w-full text-white">رجوع</Button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white text-black p-8 rounded-xl min-h-[500px] overflow-y-auto max-h-[80vh] border-4 border-slate-200">
        {isDrafting ? <div className="text-center animate-pulse">جاري الصياغة...</div> : <div className="whitespace-pre-wrap">{aiDraft || "المعاينة ستظهر هنا"}</div>}
      </div>
    </div>
  );
}
