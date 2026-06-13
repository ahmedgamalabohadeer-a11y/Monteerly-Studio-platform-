'use client';
import React from 'react';
import { Shield, Download, FileCode } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AuditLog() {
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
          <div>
             <h3 className="font-bold text-lg flex items-center gap-2">
                <Shield className="text-emerald-600" size={20} /> سجل النشاط الأمني (Audit Log)
             </h3>
             <p className="text-sm text-muted-foreground">تتبع جميع الإجراءات الحساسة التي تمت في مساحة العمل.</p>
          </div>
          <Button variant="outline" icon={<Download size={16} />}>تصدير CSV</Button>
       </div>

       <div className="border border-border rounded-xl overflow-hidden text-sm">
          <table className="w-full text-right">
             <thead className="bg-muted text-muted-foreground font-bold">
                <tr>
                   <th className="p-4">المستخدم</th>
                   <th className="p-4">الحدث</th>
                   <th className="p-4">التفاصيل / الموارد</th>
                   <th className="p-4">IP Address</th>
                   <th className="p-4">التاريخ</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-border bg-card">
                <LogRow 
                   user="أحمد (Admin)" 
                   event="تعديل صلاحيات" 
                   details="تم ترقية 'سارة' إلى محرر" 
                   ip="192.168.1.1" 
                   date="2026-01-15 10:30 AM" 
                />
                <LogRow 
                   user="سارة (Editor)" 
                   event="حذف ملف" 
                   details="Deleted: Raw_Cam_B.mov" 
                   ip="156.201.x.x" 
                   date="2026-01-15 09:15 AM"
                   isRisk 
                />
                <LogRow 
                   user="محمد (Client)" 
                   event="تحميل ملف" 
                   details="Downloaded: Final_Cut.mp4" 
                   ip="41.233.x.x" 
                   date="2026-01-14 04:00 PM" 
                />
             </tbody>
          </table>
       </div>
    </div>
  );
}

function LogRow({ user, event, details, ip, date, isRisk }: unknown) {
    return (
        <tr className="hover:bg-muted/30 transition-colors">
            <td className="p-4 font-bold">{user}</td>
            <td className="p-4">
               <span className={`px-2 py-1 rounded text-xs font-bold ${isRisk ? 'bg-red-100 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
                  {event}
               </span>
            </td>
            <td className="p-4 text-muted-foreground font-mono text-xs">{details}</td>
            <td className="p-4 text-muted-foreground text-xs">{ip}</td>
            <td className="p-4 text-muted-foreground text-xs">{date}</td>
        </tr>
    )
}

