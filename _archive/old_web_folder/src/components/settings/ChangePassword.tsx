'use client';
import React from 'react';
import { Lock } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function ChangePassword() {
  return (
    <div className="space-y-6 max-w-md">
       <h3 className="text-lg font-bold flex items-center gap-2">
          <Lock size={18} className="text-primary" /> تغيير كلمة المرور
       </h3>
       
       <div className="space-y-4">
          <Input label="كلمة المرور الحالية" type="password" placeholder="••••••••" />
          <Input label="كلمة المرور الجديدة" type="password" placeholder="••••••••" />
          <Input label="تأكيد كلمة المرور الجديدة" type="password" placeholder="••••••••" />
       </div>

       <div className="text-xs text-muted-foreground space-y-1 p-3 bg-muted/30 rounded-lg">
          <p>• يجب أن تحتوي على 8 أحرف على الأقل.</p>
          <p>• يجب أن تحتوي على رقم ورمز خاص.</p>
       </div>

       <Button variant="outline">تحديث كلمة المرور</Button>
    </div>
  );
}

