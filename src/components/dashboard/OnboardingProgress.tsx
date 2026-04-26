'use client';
import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function OnboardingProgress() {
  const progress = 60; // 3 out of 5

  return (
    <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-xl p-6">
       <div className="flex justify-between items-start mb-4">
          <div>
             <h3 className="font-bold text-lg">أكمل إعداد حسابك</h3>
             <p className="text-sm text-muted-foreground">أكمل هذه الخطوات لتزيد فرص ظهورك في البحث.</p>
          </div>
          <span className="font-bold text-xl text-primary">{progress}%</span>
       </div>

       {/* Progress Bar */}
       <div className="h-2 bg-background rounded-full overflow-hidden mb-6 border border-border">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
       </div>

       {/* Steps */}
       <div className="space-y-3">
          <Step label="تأكيد البريد الإلكتروني" completed />
          <Step label="رفع صورة شخصية" completed />
          <Step label="إضافة نبذة تعريفية (Bio)" completed />
          <Step label="رفع 3 أعمال في المعرض" active />
          <Step label="توثيق الهوية" />
       </div>
    </div>
  );
}

function Step({ label, completed, active }: any) {
   return (
      <div className={`flex items-center justify-between p-2 rounded-lg ${active ? 'bg-background shadow-sm border border-border' : ''}`}>
         <div className="flex items-center gap-3">
            {completed ? (
               <CheckCircle2 size={20} className="text-emerald-500" />
            ) : (
               <Circle size={20} className={active ? 'text-primary' : 'text-muted-foreground/50'} />
            )}
            <span className={`text-sm ${completed ? 'text-muted-foreground line-through' : active ? 'font-bold' : 'text-muted-foreground'}`}>
               {label}
            </span>
         </div>
         {active && <Button size="sm" variant="ghost" className="h-6 text-xs" icon={<ArrowRight size={12} />}>ابدأ</Button>}
      </div>
   );
}

