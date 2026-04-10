'use client';
import React from 'react';
import { CreditCard, Lock } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function CreditCardForm() {
  return (
    <div className="space-y-4">
       <div className="relative">
          <Input 
             label="رقم البطاقة" 
             placeholder="0000 0000 0000 0000" 
             icon={<CreditCard size={18} />} 
             className="font-mono tracking-wider"
          />
          <div className="absolute top-9 left-3 flex gap-1">
             <div className="w-8 h-5 bg-slate-200 rounded"></div>
             <div className="w-8 h-5 bg-slate-200 rounded"></div>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-4">
          <Input 
             label="تاريخ الانتهاء" 
             placeholder="MM/YY" 
             className="font-mono text-center"
          />
          <Input 
             label="رمز الأمان (CVC)" 
             placeholder="123" 
             icon={<Lock size={16} />} 
             type="password"
             className="font-mono text-center"
          />
       </div>

       <Input label="الاسم على البطاقة" placeholder="AHMED GAMAL" />

       <Button className="w-full mt-4" variant="primary" size="lg">
          إتمام الدفع وتخزين البطاقة
       </Button>
       
       <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
          <Lock size={10} /> مدفوعات آمنة ومشفرة بواسطة Stripe
       </p>
    </div>
  );
}
