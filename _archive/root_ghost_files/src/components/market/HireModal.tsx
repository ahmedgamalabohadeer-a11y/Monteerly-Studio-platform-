'use client';
import React, { useState } from 'react';
import { Briefcase, DollarSign, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorName: string;
}

export function HireModal({ isOpen, onClose, creatorName }: HireModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
       <div className="bg-card w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-border">
          <h2 className="text-xl font-bold mb-1">توظيف {creatorName}</h2>
          <p className="text-sm text-muted-foreground mb-6">سيتم إنشاء عقد جديد وحجز المبلغ في الضمان.</p>

          <div className="space-y-4">
             <Input label="عنوان المشروع" placeholder="مشروع جديد..." icon={<Briefcase size={16} />} />
             
             <div className="grid grid-cols-2 gap-4">
                <Input label="الميزانية ($)" placeholder="0.00" icon={<DollarSign size={16} />} type="number" />
                <Input label="تاريخ التسليم" type="date" icon={<Calendar size={16} />} />
             </div>

             <Textarea label="رسالة للمستقل" placeholder="مرحباً، أريد العمل معك على..." className="h-24" />
          </div>

          <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg mt-4 flex gap-2">
             <span className="font-bold">ملاحظة:</span>
             لن يتم تحويل الأموال للمستقل إلا بعد موافقتك على التسليم النهائي.
          </div>

          <div className="flex justify-end gap-3 mt-6">
             <Button variant="ghost" onClick={onClose}>إلغاء</Button>
             <Button variant="primary" onClick={() => { alert('Contract Sent!'); onClose(); }}>
                إرسال العرض
             </Button>
          </div>
       </div>
    </div>
  );
}

################################################################################