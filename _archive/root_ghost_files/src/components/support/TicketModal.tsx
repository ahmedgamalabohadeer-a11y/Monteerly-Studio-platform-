'use client';
import React from 'react';
import { MessageCircle, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export function TicketModal({ isOpen, onClose, category }: TicketModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-card w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-border">
        
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl font-bold flex items-center gap-2">
              <MessageCircle className="text-primary" /> فتح تذكرة دعم
           </h2>
           <button onClick={onClose} className="text-muted-foreground hover:text-foreground">✕</button>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Ticket Created!'); onClose(); }}>
           <div>
              <label className="text-sm font-bold block mb-1.5">القسم</label>
              <select className="w-full p-2.5 bg-background border border-input rounded-xl outline-none focus:ring-2 focus:ring-primary" defaultValue={category}>
                 <option>الدعم الفني</option>
                 <option>المدفوعات والفواتير</option>
                 <option>اعتراض على حظر</option>
                 <option>الإبلاغ عن مستخدم</option>
              </select>
           </div>

           <Input label="الموضوع" placeholder="مثلاً: مشكلة في رفع الملفات" />
           
           <Textarea label="تفاصيل المشكلة" placeholder="يرجى شرح المشكلة بالتفصيل..." className="h-32" />

           <div className="border border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <Paperclip className="mx-auto mb-2 text-muted-foreground" size={20} />
              <span className="text-xs text-muted-foreground">إرفاق لقطة شاشة (اختياري)</span>
           </div>

           <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="ghost" onClick={onClose}>إلغاء</Button>
              <Button type="submit" variant="primary">إرسال التذكرة</Button>
           </div>
        </form>
      </div>
    </div>
  );
}

################################################################################