'use client';
import React, { useState } from 'react';
import { ShieldAlert, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface NdaProps {
  isOpen: boolean;
  onAccept: () => void;
  clientName: string;
}

export function NdaModal({ isOpen, onAccept, clientName }: NdaProps) {
  const [scrolled, setScrolled] = useState(false);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
       <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="p-6 bg-red-50 border-b border-red-100">
             <div className="flex items-center gap-3 text-red-800">
                <ShieldAlert size={24} />
                <h2 className="font-bold text-lg">مطلوب توقيع اتفاقية سرية (NDA)</h2>
             </div>
             <p className="text-sm text-red-700 mt-2">
                المشروع الخاص بالعميل "{clientName}" يحتوي على مواد حساسة غير معلنة.
             </p>
          </div>

          {/* Legal Text */}
          <div 
            className="flex-1 overflow-y-auto p-6 text-sm text-muted-foreground leading-relaxed bg-background"
            onScroll={(e) => {
                const target = e.currentTarget;
                if (target.scrollHeight - target.scrollTop === target.clientHeight) {
                    setScrolled(true);
                }
            }}
          >
             <p className="font-bold mb-2">1. التعريفات</p>
             <p className="mb-4">يقصد بالمعلومات السرية كافة البيانات والملفات والوسائط التي يتم مشاركتها...</p>
             
             <p className="font-bold mb-2">2. التزامات الطرف الثاني</p>
             <p className="mb-4">يتعهد المستقل بعدم مشاركة أو نشر أو تسريب أي جزء من العمل...</p>
             
             <p className="font-bold mb-2">3. العقوبات</p>
             <p className="mb-4">في حال ثبوت التسريب، يحق للعميل المطالبة بتعويض مادي يصل إلى...</p>
             
             <div className="h-32" /> {/* Spacer to force scroll */}
             <p className="text-center italic text-xs text-slate-400">--- نهاية الوثيقة ---</p>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-border bg-muted/10">
             <div className="flex items-center gap-2 mb-4">
                <input type="checkbox" id="agree" disabled={!scrolled} className="w-4 h-4" />
                <label htmlFor="agree" className={`text-sm ${!scrolled ? 'opacity-50' : ''}`}>
                   قرأت وفهمت جميع البنود المذكورة أعلاه.
                </label>
             </div>
             <Button 
                className="w-full" 
                variant="primary" 
                disabled={!scrolled}
                onClick={onAccept}
                icon={<FileText size={16} />}
             >
                توقيع والدخول للمشروع
             </Button>
          </div>
       </div>
    </div>
  );
}

################################################################################