'use client';
import React from 'react';
import { Check, X, ExternalLink, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ModerationQueue() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
       <div className="p-4 border-b border-border flex justify-between items-center">
          <h3 className="font-bold">طلبات النشر المعلقة</h3>
          <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-bold">5 قيد الانتظار</span>
       </div>

       <div className="divide-y divide-border">
          {[1, 2].map((i) => (
             <div key={i} className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center hover:bg-muted/10 transition-colors">
                {/* Thumbnail */}
                <div className="w-24 h-16 bg-slate-900 rounded-lg flex-shrink-0" />
                
                {/* Info */}
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-muted-foreground uppercase">خدمة (Gig)</span>
                      <span className="text-xs text-muted-foreground">• منذ 2 ساعة</span>
                   </div>
                   <h4 className="font-bold text-sm truncate">تصميم انترو 3D احترافي لقنوات الألعاب</h4>
                   <p className="text-xs text-muted-foreground mt-1">بواسطة: أحمد كمال</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                   <Button size="sm" variant="ghost" icon={<ExternalLink size={16} />}>معاينة</Button>
                   <Button size="sm" variant="outline" className="text-red-500 hover:bg-red-50" icon={<X size={16} />}>رفض</Button>
                   <Button size="sm" variant="primary" className="bg-emerald-600 hover:bg-emerald-700" icon={<Check size={16} />}>موافقة</Button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

