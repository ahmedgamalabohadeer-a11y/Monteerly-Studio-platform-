'use client';
import React, { useState } from 'react';
import { FileText, Globe, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox'; // Assume exists

export function TaxResidencyForm() {
  const [isUS, setIsUS] = useState<boolean | null>(null);

  return (
    <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-8">
       <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full"><FileText size={24} /></div>
          <div>
             <h2 className="text-xl font-bold">الإقرار الضريبي (Tax Residency)</h2>
             <p className="text-sm text-muted-foreground">مطلوب لمعالجة المدفوعات وفقاً للقوانين الدولية.</p>
          </div>
       </div>

       <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex gap-3 text-blue-800 text-sm">
             <Globe className="shrink-0 mt-0.5" size={18} />
             <p>تحدد هذه المعلومات ما إذا كنا ملزمين باقتطاع ضرائب من أرباحك لصالح مصلحة الضرائب الأمريكية (IRS).</p>
          </div>

          <div className="space-y-3">
             <label className="font-bold text-sm block">1. هل أنت مواطن أمريكي أو مقيم في الولايات المتحدة؟</label>
             <div className="flex gap-4">
                <label className="flex items-center gap-2 border p-3 rounded-lg flex-1 cursor-pointer hover:bg-muted">
                   <input type="radio" name="us_citizen" onChange={() => setIsUS(true)} className="accent-primary" />
                   <span>نعم (مطلوب نموذج W-9)</span>
                </label>
                <label className="flex items-center gap-2 border p-3 rounded-lg flex-1 cursor-pointer hover:bg-muted">
                   <input type="radio" name="us_citizen" onChange={() => setIsUS(false)} className="accent-primary" />
                   <span>لا (مطلوب نموذج W-8BEN)</span>
                </label>
             </div>
          </div>

          {isUS === false && (
             <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                <Input label="الاسم الكامل (كما في جواز السفر)" />
                <Input label="الدولة التي تقيم فيها وتدفع لها الضرائب" />
                <Input label="رقم التعريف الضريبي الأجنبي (Foreign TIN) - اختياري" />
                
                <div className="flex items-start gap-2 mt-4">
                   <input type="checkbox" className="mt-1 accent-primary" />
                   <span className="text-xs text-muted-foreground">
                      أقر تحت طائلة عقوبة الحنث باليمين بأنني لست مواطناً أمريكياً وأن الدخل الذي أتقاضاه مرتبط بعمل تم تأديته خارج الولايات المتحدة.
                   </span>
                </div>
             </div>
          )}

          <div className="pt-6 border-t border-border flex justify-end">
             <Button variant="primary" disabled={isUS === null}>حفظ وتقديم الإقرار</Button>
          </div>
       </div>
    </div>
  );
}

