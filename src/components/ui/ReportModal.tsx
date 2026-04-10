'use client';
import React from 'react';
import { Flag, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

interface ReportProps {
  isOpen: boolean;
  onClose: () => void;
  targetName: string; // User or Project Name
}

export function ReportModal({ isOpen, onClose, targetName }: ReportProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
       <div className="bg-card w-full max-w-md rounded-2xl p-6 shadow-xl border border-border">
          <div className="flex items-center gap-3 text-red-600 mb-4">
             <Flag size={24} />
             <h3 className="font-bold text-lg">الإبلاغ عن محتوى</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
             أنت على وشك الإبلاغ عن "{targetName}". يرجى تحديد السبب لمساعدة فريقنا في المراجعة.
          </p>

          <div className="space-y-4 mb-6">
             <label className="text-sm font-bold">سبب البلاغ</label>
             <div className="space-y-2">
                <RadioOption label="محتوى مسروق أو ينتهك الحقوق" />
                <RadioOption label="احتيال أو خداع" />
                <RadioOption label="سلوك مسيء أو غير لائق" />
                <RadioOption label="بريد عشوائي (Spam)" />
             </div>
             
             <Textarea placeholder="أضف تفاصيل إضافية (اختياري)..." className="h-24" />
          </div>

          <div className="flex justify-end gap-3">
             <Button variant="ghost" onClick={onClose}>إلغاء</Button>
             <Button variant="danger" onClick={() => { alert('Report Submitted'); onClose(); }}>
                إرسال البلاغ
             </Button>
          </div>
       </div>
    </div>
  );
}

function RadioOption({ label }: { label: string }) {
    return (
        <label className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
            <input type="radio" name="report_reason" className="accent-red-500 w-4 h-4" />
            <span className="text-sm">{label}</span>
        </label>
    )
}
