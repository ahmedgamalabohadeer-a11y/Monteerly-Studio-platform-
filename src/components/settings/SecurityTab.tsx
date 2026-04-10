'use client';
import React from 'react';
import { Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function SecurityTab() {
  return (
    <div className="space-y-8">
       {/* Password Change */}
       <div className="space-y-4">
          <h3 className="font-bold text-lg border-b border-border pb-2">تغيير كلمة المرور</h3>
          <div className="grid md:grid-cols-2 gap-4">
             <Input label="كلمة المرور الحالية" type="password" />
             <div className="hidden md:block"></div> {/* Spacer */}
             <Input label="كلمة المرور الجديدة" type="password" />
             <Input label="تأكيد كلمة المرور الجديدة" type="password" />
          </div>
          <div className="flex justify-end">
             <Button variant="primary">تحديث كلمة المرور</Button>
          </div>
       </div>

       {/* 2FA Status */}
       <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
                <Shield size={24} />
             </div>
             <div>
                <h4 className="font-bold text-emerald-900">المصادقة الثنائية (2FA)</h4>
                <p className="text-sm text-emerald-700">حسابك محمي بطبقة أمان إضافية.</p>
             </div>
          </div>
          <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-100">
             إدارة الإعدادات
          </Button>
       </div>
    </div>
  );
}
