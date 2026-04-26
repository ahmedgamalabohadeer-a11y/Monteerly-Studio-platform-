'use client';
import React from 'react';
import { MoreHorizontal, Ban, Eye, Search } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function UsersTable() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
       {/* Toolbar */}
       <div className="p-4 border-b border-border flex justify-between items-center bg-muted/10">
          <div className="relative max-w-sm w-full">
             <Search className="absolute right-3 top-2.5 text-muted-foreground" size={16} />
             <input className="w-full bg-background border border-input rounded-lg py-2 pr-9 pl-4 text-sm" placeholder="بحث بالاسم أو البريد..." />
          </div>
          <div className="flex gap-2">
             <select className="bg-background border border-input rounded-lg px-3 py-2 text-sm"><option>الكل</option><option>العملاء</option><option>المستقلين</option></select>
          </div>
       </div>

       {/* Table */}
       <table className="w-full text-sm text-right">
          <thead className="bg-muted text-muted-foreground">
             <tr>
                <th className="p-4">المستخدم</th>
                <th className="p-4">النوع</th>
                <th className="p-4">الأرباح</th>
                <th className="p-4">الحالة</th>
                <th className="p-4">التاريخ</th>
                <th className="p-4">إجراءات</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-border">
             {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                   <td className="p-4 flex items-center gap-3">
                      <Avatar size="sm" fallback={`U${i}`} />
                      <div>
                         <p className="font-bold">مستخدم تجريبي {i}</p>
                         <p className="text-xs text-muted-foreground">user{i}@example.com</p>
                      </div>
                   </td>
                   <td className="p-4">{i % 2 === 0 ? 'مستقل' : 'عميل'}</td>
                   <td className="p-4 font-mono">${i * 150}.00</td>
                   <td className="p-4">
                      {i === 3 ? <Badge variant="danger">محظور</Badge> : <Badge variant="success">نشط</Badge>}
                   </td>
                   <td className="p-4 text-muted-foreground">12 Jan 2026</td>
                   <td className="p-4 flex gap-2">
                      <Button size="sm" variant="ghost" icon={<Eye size={16} />} />
                      <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50" icon={<Ban size={16} />} />
                   </td>
                </tr>
             ))}
          </tbody>
       </table>
       
       {/* Footer */}
       <div className="p-4 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
          <span>عرض 1-10 من 2450 مستخدم</span>
          <div className="flex gap-2">
             <Button size="sm" variant="outline" disabled>السابق</Button>
             <Button size="sm" variant="outline">التالي</Button>
          </div>
       </div>
    </div>
  );
}

