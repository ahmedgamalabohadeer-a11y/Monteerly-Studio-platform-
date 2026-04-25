'use client';
import React, { useState } from 'react';
import { Smartphone, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function TwoFactorSetup() {
  const [step, setStep] = useState(1);

  return (
    <div className="border border-border rounded-xl p-6 bg-card">
       <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-primary/10 rounded-full text-primary">
             <Smartphone size={24} />
          </div>
          <div>
             <h3 className="font-bold text-lg">المصادقة الثنائية (2FA)</h3>
             <p className="text-sm text-muted-foreground">أضف طبقة حماية إضافية لحسابك باستخدام Google Authenticator.</p>
          </div>
       </div>

       {step === 1 && (
          <div className="text-center space-y-6">
             <div className="w-48 h-48 bg-white mx-auto border-4 border-white shadow-sm rounded-lg flex items-center justify-center">
                {/* Placeholder for QR Code */}
                <div className="w-40 h-40 bg-slate-900 pattern-grid-lg opacity-20" /> 
             </div>
             <p className="text-sm font-mono bg-muted inline-block px-3 py-1 rounded">Secret: JX4V 5K3L 2M9P Q1R7</p>
             
             <div className="max-w-xs mx-auto">
                <Input placeholder="أدخل الرمز المكون من 6 أرقام" className="text-center tracking-widest font-bold" />
             </div>
             
             <Button variant="primary" onClick={() => setStep(2)}>تفعيل الحماية</Button>
          </div>
       )}

       {step === 2 && (
          <div className="text-center py-8 bg-emerald-50 rounded-xl border border-emerald-100">
             <CheckCircle size={48} className="mx-auto text-emerald-500 mb-4" />
             <h3 className="font-bold text-xl text-emerald-900">تم التفعيل بنجاح!</h3>
             <p className="text-emerald-700 mt-2 text-sm">حسابك الآن محمي. سيطلب منك الرمز عند تسجيل الدخول القادم.</p>
          </div>
       )}
    </div>
  );
}

################################################################################