'use client';
import React from 'react';
import { Gift, Copy, Users, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ReferralDashboard() {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 border border-border rounded-xl p-8 text-center">
       <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-6 text-primary">
          <Gift size={40} />
       </div>

       <h2 className="text-2xl font-bold mb-2">ادعُ أصدقاءك واكسب مساحة تخزين! 🚀</h2>
       <p className="text-muted-foreground max-w-lg mx-auto mb-8">
          احصل على <span className="font-bold text-foreground">5 GB</span> إضافية لكل صديق يسجل في Monteerly ويقوم بتفعيل حسابه.
       </p>

       <div className="max-w-md mx-auto bg-white border border-border rounded-xl p-2 flex items-center gap-2 mb-8 shadow-sm">
          <div className="bg-muted px-3 py-1.5 rounded font-mono text-sm font-bold border border-border text-muted-foreground">
             monteerly.com/inv/ahmed99
          </div>
          <Button size="sm" variant="primary" className="flex-1" icon={<Copy size={14} />}>نسخ الرابط</Button>
       </div>

       <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
          <div className="bg-card p-4 rounded-xl border border-border">
             <div className="flex justify-center mb-2 text-blue-500"><Users size={24} /></div>
             <div className="font-bold text-2xl">3</div>
             <div className="text-xs text-muted-foreground">أصدقاء مسجلين</div>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border">
             <div className="flex justify-center mb-2 text-emerald-500"><HardDrive size={24} /></div>
             <div className="font-bold text-2xl">15 GB</div>
             <div className="text-xs text-muted-foreground">مساحة مكتسبة</div>
          </div>
       </div>
    </div>
  );
}

