'use client';
import React, { useState } from 'react';
import { DollarSign, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface CounterOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalPrice: number;
}

export function CounterOfferModal({ isOpen, onClose, originalPrice }: CounterOfferModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-lg rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
        <h2 className="text-xl font-bold mb-1">تقديم عرض مضاد</h2>
        <p className="text-sm text-muted-foreground mb-6">السعر الأصلي للعميل هو <span className="font-bold text-foreground">${originalPrice}</span>. ما هو اقتراحك؟</p>

        <div className="space-y-4">
           <div className="grid grid-cols-2 gap-4">
              <Input 
                label="السعر المقترح ($)" 
                placeholder="0.00" 
                icon={<DollarSign size={16} />} 
                type="number"
              />
              <Input 
                label="مدة التسليم (أيام)" 
                placeholder="مثلاً: 5" 
                icon={<Calendar size={16} />} 
                type="number"
              />
           </div>
           
           <div className="space-y-2">
              <label className="text-sm font-medium">رسالة للعميل (تبرير السعر)</label>
              <textarea className="w-full h-24 p-3 bg-muted/30 border border-border rounded-xl resize-none text-sm" placeholder="أحتاج لزيادة السعر لأن المشروع يتطلب..." />
           </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
           <Button variant="ghost" onClick={onClose}>إلغاء</Button>
           <Button variant="primary" icon={<MessageSquare size={16} />} onClick={() => { alert('Sent!'); onClose(); }}>
              إرسال العرض الجديد
           </Button>
        </div>
      </div>
    </div>
  );
}

