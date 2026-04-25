'use client';
import React, { useState } from 'react';
import { Tag, Loader2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CouponInput() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const applyCoupon = () => {
    if (!code) return;
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      if (code === 'MONTEERLY2026') setStatus('success');
      else setStatus('error');
    }, 1500);
  };

  return (
    <div className="space-y-2">
       <label className="text-sm font-medium flex items-center gap-2">
          <Tag size={16} className="text-muted-foreground" /> كود الخصم
       </label>
       
       <div className="flex gap-2">
          <div className="relative flex-1">
             <input 
                value={code}
                onChange={(e) => { setCode(e.target.value.toUpperCase()); setStatus('idle'); }}
                placeholder="أدخل الكود هنا"
                disabled={status === 'success'}
                className={`w-full bg-background border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 transition-all font-mono uppercase tracking-wider
                   ${status === 'error' ? 'border-red-500 focus:ring-red-200' : status === 'success' ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-input focus:ring-primary/20'}
                `}
             />
             {status === 'success' && <Check size={16} className="absolute left-3 top-3 text-emerald-600" />}
             {status === 'error' && <X size={16} className="absolute left-3 top-3 text-red-500" />}
          </div>
          
          <Button 
             variant={status === 'success' ? 'ghost' : 'primary'} 
             onClick={applyCoupon}
             disabled={status === 'loading' || status === 'success' || !code}
             icon={status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : undefined}
          >
             {status === 'success' ? 'تم التطبيق' : 'تطبيق'}
          </Button>
       </div>

       {status === 'success' && <p className="text-xs text-emerald-600 font-bold animate-in slide-in-from-top-1">تم خصم 20% بنجاح! 🎉</p>}
       {status === 'error' && <p className="text-xs text-red-500 font-bold animate-in slide-in-from-top-1">الكود غير صالح أو منتهي الصلاحية.</p>}
    </div>
  );
}

