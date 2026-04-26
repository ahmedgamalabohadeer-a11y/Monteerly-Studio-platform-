'use client';
import React, { useState } from 'react';
import { Building2, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch'; // نفترض وجوده

export function TaxSettings() {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <div className="space-y-6">
       <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <Info className="text-blue-600 shrink-0" size={24} />
          <div className="text-sm text-blue-800">
             <p className="font-bold mb-1">معلومات ضريبية هامة</p>
             <p>بناءً على قوانين دولتك، قد تكون ملزماً بتحصيل ضريبة القيمة المضافة (VAT) من عملائك. تأكد من استشارة محاسب قانوني.</p>
          </div>
       </div>

       <div className="flex items-center justify-between py-4 border-b border-border">
          <div>
             <h4 className="font-bold text-sm">مسجل في ضريبة القيمة المضافة؟</h4>
             <p className="text-xs text-muted-foreground">قم بتفعيل هذا الخيار لإضافة الضريبة على فواتيرك.</p>
          </div>
          <Switch checked={isRegistered} onChange={setIsRegistered} />
       </div>

       {isRegistered && (
          <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-top-2">
             <Input label="الاسم القانوني للشركة" placeholder="شركة المونتاج المحدودة" icon={<Building2 size={16} />} />
             <Input label="رقم التسجيل الضريبي (VAT ID)" placeholder="EG-123-456-789" className="font-mono" />
             <div className="col-span-2">
                <Input label="عنوان الفوترة المسجل" placeholder="شارع 90، التجمع الخامس، القاهرة" />
             </div>
          </div>
       )}

       <div className="flex justify-end pt-4">
          <Button variant="primary">حفظ المعلومات الضريبية</Button>
       </div>
    </div>
  );
}

