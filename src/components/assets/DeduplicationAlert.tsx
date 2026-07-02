'use client';
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DeduplicationAlert() {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start gap-3">
       <AlertTriangle className="text-yellow-600 shrink-0" size={20} />
       <div className="flex-1">
          <h4 className="font-bold text-sm text-yellow-800 dark:text-yellow-200">تنبيه: ملفات مكررة</h4>
          <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
             وجدنا 3 ملفات متطابقة في مشاريع مختلفة تستهلك 4.5 GB. هل تريد دمجها لتوفير المساحة؟
          </p>
          <div className="mt-2 flex gap-2">
             <Button size="sm" variant="outline" className="h-8 text-xs bg-white dark:bg-black/20">عرض الملفات</Button>
             <Button size="sm" variant="ghost" className="h-8 text-xs text-yellow-800">تجاهل</Button>
          </div>
       </div>
    </div>
  );
}

