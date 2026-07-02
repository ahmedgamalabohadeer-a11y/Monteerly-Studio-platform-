'use client';

import React from 'react';
import { Download, Trash2, Database } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DataPrivacy() {
  return (
    <div className="space-y-8">
      <div className="border-l-4 border-blue-500 pl-4 py-1">
        <h3 className="font-bold text-lg">بياناتك ملك لك</h3>
        <p className="text-sm text-muted-foreground">
          نحن نلتزم بمعايير GDPR و CCPA لحماية خصوصيتك.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <Database size={24} />
          </div>
          <div>
            <h4 className="font-bold">تصدير البيانات الشخصية</h4>
            <p className="text-xs text-muted-foreground max-w-sm">
              احصل على ملف JSON يحتوي على سجل مشاريعك، فواتيرك، ومحادثاتك.
            </p>
          </div>
        </div>
        <Button variant="outline" icon={<Download size={16} />}>
          طلب الأرشيف
        </Button>
      </div>

      <div className="bg-red-50/50 border border-red-100 rounded-xl p-6">
        <div className="flex items-center gap-2 text-red-700 mb-2">
          <Trash2 size={20} />
          <h4 className="font-bold">منطقة الخطر: حذف البيانات</h4>
        </div>
        <p className="text-sm text-red-600/80 mb-4">
          هذا الإجراء سيقوم بمسح جميع بياناتك من سيرفراتنا نهائياً ولا يمكن استعادتها.
          سيتم إلغاء أي مشاريع نشطة وفقدان الرصيد غير المسحوب.
        </p>
        <Button variant="danger" size="sm">
          بدء إجراءات الحذف
        </Button>
      </div>
    </div>
  );
}
