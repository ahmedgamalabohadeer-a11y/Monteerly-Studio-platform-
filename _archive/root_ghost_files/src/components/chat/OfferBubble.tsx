'use client';
import React from 'react';
import { Briefcase, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface OfferProps {
  title: string;
  price: number;
  days: number;
  status: 'pending' | 'accepted' | 'expired';
  isSender: boolean;
}

export function OfferBubble({ title, price, days, status, isSender }: OfferProps) {
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}>
       <div className={`max-w-sm w-full rounded-2xl overflow-hidden border ${isSender ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'}`}>
          
          {/* Header */}
          <div className="bg-primary/10 p-3 border-b border-primary/10 flex items-center gap-2">
             <Briefcase size={16} className="text-primary" />
             <span className="font-bold text-sm text-primary">عرض مخصص</span>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3">
             <h4 className="font-bold text-lg">{title}</h4>
             
             <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-1"><Clock size={14} /> التسليم: {days} أيام</div>
                <div className="font-bold text-xl text-foreground">${price}</div>
             </div>
          </div>

          {/* Footer / Actions */}
          <div className="p-3 bg-muted/30 border-t border-border">
             {status === 'pending' ? (
                isSender ? (
                   <div className="text-center text-xs text-muted-foreground">بانتظار موافقة العميل</div>
                ) : (
                   <Button className="w-full" variant="primary">قبول العرض والدفع</Button>
                )
             ) : (
                <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-sm">
                   <Check size={16} /> تم قبول العرض
                </div>
             )}
          </div>
       </div>
    </div>
  );
}

################################################################################