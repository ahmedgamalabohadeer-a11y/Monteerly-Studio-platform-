'use client';
import React from 'react';
import { Star, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

export function CompareTable() {
  return (
    <div className="overflow-x-auto border border-border rounded-xl">
       <table className="w-full text-center">
          <thead>
             <tr className="bg-muted/30">
                <th className="p-4 text-right min-w-[150px]">المقارنة</th>
                <th className="p-4 min-w-[180px]">
                   <div className="flex flex-col items-center gap-2">
                      <Avatar src="/images/u1.jpg" fallback="A" />
                      <span>أحمد كمال</span>
                   </div>
                </th>
                <th className="p-4 min-w-[180px] bg-primary/5 border-x border-primary/10">
                   <div className="flex flex-col items-center gap-2">
                      <Avatar src="/images/u2.jpg" fallback="S" />
                      <span className="font-bold text-primary">سارة علي (موصى به)</span>
                   </div>
                </th>
                <th className="p-4 min-w-[180px]">
                   <div className="flex flex-col items-center gap-2">
                      <Avatar src="/images/u3.jpg" fallback="M" />
                      <span>محمود حسن</span>
                   </div>
                </th>
             </tr>
          </thead>
          <tbody className="divide-y divide-border">
             <Row label="السعر المقترح" c1="$150" c2="$200" c3="$120" />
             <Row label="التقييم العام" c1={<Stars n={4} />} c2={<Stars n={5} />} c3={<Stars n={3} />} />
             <Row label="سرعة التسليم" c1="3 أيام" c2="2 يوم" c3="5 أيام" />
             <Row label="عدد المشاريع المكتملة" c1="12" c2="45" c3="5" />
             <Row label="توثيق الهوية" c1={<CheckCircle size={16} className="mx-auto text-emerald-500" />} c2={<CheckCircle size={16} className="mx-auto text-emerald-500" />} c3={<XCircle size={16} className="mx-auto text-muted-foreground" />} />
             <tr>
                <td className="p-4"></td>
                <td className="p-4"><Button size="sm" variant="outline">توظيف</Button></td>
                <td className="p-4 bg-primary/5 border-x border-primary/10"><Button size="sm" variant="primary">توظيف</Button></td>
                <td className="p-4"><Button size="sm" variant="outline">توظيف</Button></td>
             </tr>
          </tbody>
       </table>
    </div>
  );
}

function Row({ label, c1, c2, c3 }: any) {
   return (
      <tr className="hover:bg-muted/10">
         <td className="p-4 text-right font-medium text-sm text-muted-foreground">{label}</td>
         <td className="p-4 font-bold">{c1}</td>
         <td className="p-4 font-bold bg-primary/5 border-x border-primary/10">{c2}</td>
         <td className="p-4 font-bold">{c3}</td>
      </tr>
   );
}

function Stars({ n }: { n: number }) {
    return <div className="flex justify-center gap-1 text-yellow-500">{Array(n).fill(0).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
}

################################################################################