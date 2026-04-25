'use client';
import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface BanModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export function BanModal({ isOpen, onClose, userName }: BanModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-md rounded-2xl p-6 shadow-2xl border-2 border-red-500/20">
        
        <div className="flex items-center gap-3 text-red-600 mb-4">
           <ShieldAlert size={28} />
           <h2 className="text-xl font-bold">حظر المستخدم: {userName}</h2>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
           سيتم منع هذا المستخدم من الدخول، تجميد أرصدته، وإلغاء مشاريعه النشطة فوراً.
        </p>

        <div className="space-y-4 mb-8">
           <label className="text-sm font-bold block">سبب الحظر (سيظهر للمستخدم)</label>
           <select className="w-full p-3 bg-muted border border-border rounded-xl">
              <option>انتهاك شروط الخدمة (Terms Violation)</option>
              <option>احتيال مالي (Financial Fraud)</option>
              <option>سلوك مسيء (Abusive Behavior)</option>
              <option>أخرى</option>
           </select>
           
           <Input label="ملاحظات إدارية (داخلية فقط)" placeholder="رقم التذكرة #123..." />
        </div>

        <div className="flex justify-end gap-3">
           <Button variant="ghost" onClick={onClose}>إلغاء</Button>
           <Button variant="danger" onClick={() => { alert('User Banned'); onClose(); }}>
              تأكيد الحظر النهائي
           </Button>
        </div>
      </div>
    </div>
  );
}

