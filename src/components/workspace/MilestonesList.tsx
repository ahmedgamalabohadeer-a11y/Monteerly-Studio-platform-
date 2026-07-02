'use client';
import React from 'react';
import { Lock, CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function MilestonesList() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
       <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
          <h3 className="font-bold text-sm">دفعات المشروع (Escrow)</h3>
          <span className="text-xs font-mono bg-white px-2 py-1 rounded border">Total: $1,200</span>
       </div>
       <div className="divide-y divide-border">
          <div className="p-4 flex items-center gap-4 opacity-60">
             <div className="text-emerald-500"><CheckCircle size={20} /></div>
             <div className="flex-1">
                <p className="font-bold text-sm line-through">الدفعة الأولى: السكربت</p>
                <p className="text-xs">تم الدفع في 10 Jan</p>
             </div>
             <div className="text-right">
                <p className="font-bold text-sm">$200</p>
                <Badge variant="success">مدفوع</Badge>
             </div>
          </div>

          <div className="p-4 flex items-center gap-4 bg-primary/5">
             <div className="text-primary animate-pulse"><Circle size={20} strokeWidth={3} /></div>
             <div className="flex-1">
                <p className="font-bold text-sm">الدفعة الثانية: المونتاج الأولي</p>
                <p className="text-xs text-muted-foreground">تستحق عند التسليم</p>
             </div>
             <div className="text-right flex flex-col items-end gap-1">
                <p className="font-bold text-sm">$600</p>
                <Button size="sm" variant="primary" className="h-7 text-xs px-2">تحرير المبلغ</Button>
             </div>
          </div>

          <div className="p-4 flex items-center gap-4 text-muted-foreground">
             <div><Lock size={20} /></div>
             <div className="flex-1">
                <p className="font-bold text-sm">الدفعة النهائية: الملفات المفتوحة</p>
                <p className="text-xs">بانتظار اكتمال المرحلة السابقة</p>
             </div>
             <div className="text-right">
                <p className="font-bold text-sm">$400</p>
                <Badge variant="secondary">مغلق</Badge>
             </div>
          </div>
       </div>
    </div>
  );
}
