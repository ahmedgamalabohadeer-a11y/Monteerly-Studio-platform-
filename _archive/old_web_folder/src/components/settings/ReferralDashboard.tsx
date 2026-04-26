'use client';
import React from 'react';
import { Copy, Gift, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function ReferralDashboard() {
  return (
    <div className="space-y-8">
       {/* Hero Banner */}
       <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <Gift size={48} className="mx-auto mb-4 text-yellow-300" />
          <h2 className="text-2xl font-bold mb-2">ادعُ أصدقاءك واربح $20</h2>
          <p className="text-purple-100 max-w-md mx-auto mb-6">
             احصل على $20 رصيد لكل صديق يسجل ويقوم بأول عملية شراء. صديقك سيحصل أيضاً على خصم 10%.
          </p>
          
          <div className="flex max-w-md mx-auto bg-white/10 p-1 rounded-xl backdrop-blur border border-white/20">
             <div className="flex-1 px-4 py-2 text-sm font-mono truncate select-all flex items-center">
                monteerly.com/r/AHMED99
             </div>
             <Button size="sm" className="bg-white text-purple-600 hover:bg-purple-50" icon={<Copy size={14} />}>نسخ</Button>
          </div>
       </div>

       {/* Stats */}
       <div className="grid grid-cols-3 gap-4">
          <div className="border border-border rounded-xl p-4 text-center">
             <Users className="mx-auto mb-2 text-muted-foreground" size={20} />
             <div className="text-2xl font-bold">12</div>
             <div className="text-xs text-muted-foreground">المسجلين</div>
          </div>
          <div className="border border-border rounded-xl p-4 text-center">
             <Gift className="mx-auto mb-2 text-muted-foreground" size={20} />
             <div className="text-2xl font-bold text-emerald-600">3</div>
             <div className="text-xs text-muted-foreground">المؤهلين</div>
          </div>
          <div className="border border-border rounded-xl p-4 text-center bg-emerald-50 border-emerald-100">
             <div className="text-2xl font-bold text-emerald-700">$60</div>
             <div className="text-xs text-emerald-600">الأرباح المتاحة</div>
          </div>
       </div>
    </div>
  );
}

