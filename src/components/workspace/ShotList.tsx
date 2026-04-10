'use client';
import React from 'react';
import { Plus, GripVertical, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ShotList() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
       <div className="p-4 border-b border-border flex justify-between items-center bg-muted/10">
          <h3 className="font-bold text-sm">قائمة اللقطات (Shot List)</h3>
          <Button size="sm" variant="outline" icon={<Plus size={14} />}>لقطة جديدة</Button>
       </div>

       <table className="w-full text-sm text-right">
          <thead className="bg-muted text-muted-foreground text-xs uppercase">
             <tr>
                <th className="p-3 w-10"></th>
                <th className="p-3 w-16">#</th>
                <th className="p-3">المشهد</th>
                <th className="p-3">نوع اللقطة</th>
                <th className="p-3">الحالة</th>
                <th className="p-3">ملاحظات</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-border">
             <ShotRow id={1} scene="المقدمة - البطل يمشي" type="Wide Shot (WS)" status="done" notes="إضاءة طبيعية ممتازة" />
             <ShotRow id={2} scene="المقدمة - وجه البطل" type="Close Up (CU)" status="pending" notes="نحتاج إعادة تصوير" />
             <ShotRow id={3} scene="المطاردة - السيارة" type="Drone Shot" status="planned" notes="يوم الجمعة" />
          </tbody>
       </table>
    </div>
  );
}

function ShotRow({ id, scene, type, status, notes }: any) {
    const statusConfig: any = {
        done: { color: 'bg-emerald-100 text-emerald-700', label: 'تم التصوير' },
        pending: { color: 'bg-yellow-100 text-yellow-700', label: 'مراجعة' },
        planned: { color: 'bg-slate-100 text-slate-700', label: 'مخطط' },
    };

    return (
        <tr className="hover:bg-muted/50 transition-colors group">
            <td className="p-3 text-center text-muted-foreground cursor-grab"><GripVertical size={16} /></td>
            <td className="p-3 font-mono text-xs">{String(id).padStart(3, '0')}</td>
            <td className="p-3 font-bold">{scene}</td>
            <td className="p-3"><span className="bg-muted px-2 py-1 rounded text-xs border border-border">{type}</span></td>
            <td className="p-3">
               <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${statusConfig[status].color}`}>
                  {statusConfig[status].label}
               </span>
            </td>
            <td className="p-3 text-muted-foreground text-xs truncate max-w-[150px]">{notes}</td>
        </tr>
    )
}
