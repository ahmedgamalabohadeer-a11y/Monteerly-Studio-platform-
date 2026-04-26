'use client';
import React from 'react';
import { AlertTriangle, Copy, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Props {
  isOpen: boolean;
  fileName: string;
  onClose: () => void;
  onReplace: () => void;
  onKeepBoth: () => void;
}

export function FileConflictModal({ isOpen, fileName, onClose, onReplace, onKeepBoth }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
       <div className="bg-card w-full max-w-md rounded-2xl p-6 shadow-2xl border border-border">
          <div className="flex items-start gap-4 mb-6">
             <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full shrink-0">
                <AlertTriangle size={24} />
             </div>
             <div>
                <h3 className="font-bold text-lg">يوجد ملف بهذا الاسم بالفعل</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                   أنت تحاول رفع <span className="font-mono font-bold text-foreground bg-muted px-1 rounded">{fileName}</span>، ولكن يوجد ملف بنفس الاسم في هذا المجلد.
                </p>
             </div>
          </div>

          <div className="space-y-3">
             <button 
                onClick={onKeepBoth}
                className="w-full flex items-center gap-3 p-3 border border-border rounded-xl hover:bg-muted/50 transition-colors text-left group"
             >
                <div className="p-2 bg-muted group-hover:bg-primary/10 group-hover:text-primary rounded-lg">
                   <Copy size={20} />
                </div>
                <div>
                   <div className="font-bold text-sm">الاحتفاظ بالملفين</div>
                   <div className="text-xs text-muted-foreground">سيتم تسمية الجديد "{fileName} (1)"</div>
                </div>
             </button>

             <button 
                onClick={onReplace}
                className="w-full flex items-center gap-3 p-3 border border-border rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors text-left group"
             >
                <div className="p-2 bg-muted group-hover:bg-red-100 group-hover:text-red-600 rounded-lg">
                   <RefreshCw size={20} />
                </div>
                <div>
                   <div className="font-bold text-sm group-hover:text-red-600">استبدال الملف الموجود</div>
                   <div className="text-xs text-muted-foreground">سيتم حذف النسخة القديمة نهائياً</div>
                </div>
             </button>
          </div>

          <div className="mt-6 flex justify-end">
             <Button variant="ghost" onClick={onClose}>إلغاء الأمر</Button>
          </div>
       </div>
    </div>
  );
}

################################################################################