'use client';
import React, { useState } from 'react';
import { QrCode, Copy, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function TwoFactorSetup() {
  const [step, setStep] = useState(1);
  const secretKey = "JBSWY3DPEHPK3PXP"; // Mock Secret

  return (
    <div className="max-w-md mx-auto bg-card border border-border rounded-xl p-8 shadow-lg">
       <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
             <QrCode size={32} />
          </div>
          <h2 className="text-xl font-bold">إعداد المصادقة الثنائية</h2>
          <p className="text-sm text-muted-foreground">تأمين حسابك باستخدام Google Authenticator.</p>
       </div>

       {step === 1 && (
          <div className="space-y-6">
             <div className="bg-white p-4 rounded-xl border border-border flex justify-center">
                {/* Mock QR Code Visual */}
                <div className="w-48 h-48 bg-slate-900 grid grid-cols-6 grid-rows-6 gap-0.5 p-2">
                   {Array.from({ length: 36 }).map((_, i) => (
                      <div key={i} className={`bg-white ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
                   ))}
                </div>
             </div>
             
             <div className="bg-muted p-3 rounded-lg flex items-center justify-between">
                <code className="font-mono text-sm font-bold tracking-widest">{secretKey}</code>
                <button className="text-primary hover:underline text-xs flex items-center gap-1">
                   <Copy size={12} /> نسخ
                </button>
             </div>

             <Button className="w-full" variant="primary" onClick={() => setStep(2)}>
                التالي: إدخال الكود <ArrowRight size={16} className="mr-2" />
             </Button>
          </div>
       )}

       {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
             <div className="text-center">
                <p className="text-sm font-medium mb-4">أدخل الرمز المكون من 6 أرقام الظاهر في التطبيق:</p>
                <div className="flex justify-center gap-2 mb-4" style={{ direction: 'ltr' }}>
                   {[1, 2, 3, 4, 5, 6].map((i) => (
                      <input key={i} className="w-10 h-12 border rounded text-center text-xl font-bold focus:ring-2 focus:ring-primary outline-none" maxLength={1} />
                   ))}
                </div>
             </div>

             <Button className="w-full" variant="primary" onClick={() => setStep(3)}>
                تفعيل الحماية
             </Button>
             <Button className="w-full" variant="ghost" onClick={() => setStep(1)}>رجوع</Button>
          </div>
       )}

       {step === 3 && (
          <div className="text-center space-y-4 animate-in zoom-in">
             <div className="text-emerald-500 flex justify-center"><CheckCircle size={48} /></div>
             <h3 className="font-bold text-lg">تم تفعيل المصادقة بنجاح!</h3>
             <Button className="w-full" variant="outline" onClick={() => window.location.reload()}>إغلاق</Button>
          </div>
       )}
    </div>
  );
}

################################################################################