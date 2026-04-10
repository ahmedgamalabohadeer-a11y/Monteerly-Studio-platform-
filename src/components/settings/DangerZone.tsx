'use client';
import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

export function DangerZone() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-red-200 rounded-xl p-6 bg-red-50/30 mt-12">
       <h3 className="text-red-700 font-bold text-lg mb-2">منطقة الخطر</h3>
       <p className="text-sm text-red-600/80 mb-6">
          حذف الحساب هو إجراء نهائي لا يمكن التراجع عنه. سيتم حذف جميع مشاريعك وملفاتك.
       </p>
       
       <Button variant="danger" icon={<Trash2 size={16} />} onClick={() => setIsOpen(true)}>
          حذف الحساب نهائياً
       </Button>

       <ConfirmationModal 
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => alert('Account Deleted!')}
          title="هل أنت متأكد تماماً؟"
          description="سيتم حذف حسابك وجميع البيانات المرتبطة به. هذا الإجراء لا يمكن التراجع عنه."
          confirmText="نعم، احذف حسابي"
          isDanger
       />
    </div>
  );
}
