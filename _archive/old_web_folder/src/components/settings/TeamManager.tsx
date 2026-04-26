'use client';
import React from 'react';
import { UserPlus, MoreHorizontal, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

export function TeamManager() {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-end bg-primary/5 p-6 rounded-2xl border border-primary/20">
          <div>
             <h3 className="font-bold text-lg mb-1">فريق العمل</h3>
             <p className="text-sm text-muted-foreground">لديك 3 مقاعد متبقية في خطة الوكالة.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <Input placeholder="البريد الإلكتروني للدعوة" className="bg-background" />
             <Button variant="primary" icon={<UserPlus size={16} />}>دعوة</Button>
          </div>
       </div>

       <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm text-right">
             <thead className="bg-muted text-muted-foreground">
                <tr>
                   <th className="p-4 font-medium">العضو</th>
                   <th className="p-4 font-medium">الصلاحية</th>
                   <th className="p-4 font-medium">الحالة</th>
                   <th className="p-4"></th>
                </tr>
             </thead>
             <tbody className="divide-y divide-border">
                <tr>
                   <td className="p-4 flex items-center gap-3">
                      <Avatar size="sm" fallback="AJ" />
                      <div>
                         <p className="font-bold">أحمد جمال</p>
                         <p className="text-xs text-muted-foreground">admin@agency.com</p>
                      </div>
                   </td>
                   <td className="p-4"><Badge variant="primary">مالك (Owner)</Badge></td>
                   <td className="p-4"><span className="text-emerald-600 font-bold">نشط</span></td>
                   <td className="p-4 text-left"><Button size="sm" variant="ghost" disabled><MoreHorizontal size={16} /></Button></td>
                </tr>
                <tr>
                   <td className="p-4 flex items-center gap-3">
                      <Avatar size="sm" fallback="SM" />
                      <div>
                         <p className="font-bold">سارة محمد</p>
                         <p className="text-xs text-muted-foreground">sara@agency.com</p>
                      </div>
                   </td>
                   <td className="p-4 flex items-center gap-2">
                      <Shield size={14} className="text-muted-foreground" /> 
                      <span>محرر (Editor)</span>
                   </td>
                   <td className="p-4"><span className="text-yellow-600 font-bold">معلق (Pending)</span></td>
                   <td className="p-4 text-left"><Button size="sm" variant="ghost"><MoreHorizontal size={16} /></Button></td>
                </tr>
             </tbody>
          </table>
       </div>
    </div>
  );
}

