'use client';
import React from 'react';
import { Archive, RotateCcw, Trash2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ArchivedProjectView() {
  return (
    <div className="mb-6 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-inner">
       <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-200 dark:bg-slate-800 rounded-full text-slate-500">
             <Archive size={24} />
          </div>
          <div>
             <h3 className="font-bold text-lg flex items-center gap-2">
                هذا المشروع مؤرشف <Lock size={14} />
             </h3>
             <p className="text-sm text-muted-foreground">
                المشروع في وضع "القراءة فقط". لا يمكنك إجراء تعديلات أو رفع ملفات جديدة.
             </p>
          </div>
       </div>

       <div className="flex items-center gap-3 w-full md:w-auto">
          <Button 
             variant="primary" 
             className="flex-1 md:flex-none"
             icon={<RotateCcw size={16} />}
          >
             استعادة المشروع
          </Button>
          <Button 
             variant="ghost" 
             className="flex-1 md:flex-none text-red-500 hover:bg-red-50 hover:text-red-600"
             icon={<Trash2 size={16} />}
          >
             حذف نهائي
          </Button>
       </div>
    </div>
  );
}

################################################################################