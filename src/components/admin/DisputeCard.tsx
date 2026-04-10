'use client';
import React from 'react';
import { AlertTriangle, FileText, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface DisputeProps {
  id: string;
  project: string;
  client: string;
  creator: string;
  amount: number;
  reason: string;
}

export function DisputeCard({ id, project, client, creator, amount, reason }: DisputeProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
       <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
             <Badge variant="danger">نزاع مفتوح</Badge>
             <span className="text-xs text-muted-foreground">ID: #{id}</span>
          </div>
          <span className="font-bold text-lg">${amount}</span>
       </div>

       <h3 className="font-bold text-lg mb-2">{project}</h3>
       
       <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4 bg-muted/30 p-3 rounded-lg">
          <div className="flex items-center gap-2"><User size={14} /> العميل: <span className="text-foreground font-medium">{client}</span></div>
          <div className="flex items-center gap-2"><User size={14} /> المستقل: <span className="text-foreground font-medium">{creator}</span></div>
       </div>

       <div className="bg-red-50 text-red-800 p-3 rounded-lg text-sm mb-6 flex gap-2">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          <p><strong>السبب:</strong> {reason}</p>
       </div>

       <div className="flex gap-3 pt-4 border-t border-border">
          <Button size="sm" variant="outline" icon={<FileText size={14} />}>مراجعة المحادثات</Button>
          <div className="flex-1" />
          <Button size="sm" variant="danger">إلغاء ورد المال للعميل</Button>
          <Button size="sm" variant="primary">تحرير المال للمستقل</Button>
       </div>
    </div>
  );
}
