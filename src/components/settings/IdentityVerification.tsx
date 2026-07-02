'use client';

import React, { useState } from 'react';
import { ShieldCheck, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function IdentityVerification() {
  const [status, setStatus] = useState<'pending' | 'verified' | 'rejected' | 'none'>(
    'none'
  );

  if (status === 'verified') {
    return (
      <Card className="p-6 border-emerald-200 bg-emerald-50 flex items-center gap-4">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
          <ShieldCheck size={32} />
        </div>
        <div>
          <h3 className="font-bold text-emerald-800">هويتك موثقة بالكامل</h3>
          <p className="text-sm text-emerald-700">
            يمكنك الآن سحب الأرباح والتقديم على مشاريع الشركات.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-l-4 border-primary bg-muted/20 p-4 rounded-r-xl">
        <h3 className="font-bold text-lg mb-2">توثيق الحساب (KYC)</h3>
        <p className="text-sm text-muted-foreground">
          لحماية مجتمع Monteerly، نطلب من جميع المبدعين توثيق هويتهم قبل إجراء أول
          عملية سحب. بياناتك مشفرة ولا يتم مشاركتها مع أي طرف ثالث.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <UploadZone title="الوجه الأمامي للهوية" />
        <UploadZone title="الوجه الخلفي للهوية" />
      </div>

      <div className="space-y-4">
        <label className="text-sm font-bold">صورة سيلفي مع الهوية</label>
        <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <ShieldCheck size={32} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">اضغط لالتقاط صورة أو رفع ملف</p>
          <p className="text-xs text-muted-foreground mt-1">
            تأكد من أن وجهك وبيانات البطاقة واضحة.
          </p>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button variant="primary" size="lg" onClick={() => setStatus('verified')}>
          إرسال المستندات للمراجعة
        </Button>
      </div>
    </div>
  );
}

interface UploadZoneProps {
  title: string;
}

function UploadZone({ title }: UploadZoneProps) {
  return (
    <div className="border border-border rounded-xl p-4 hover:border-primary cursor-pointer transition-colors bg-card">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-sm">{title}</span>
        <Upload size={16} className="text-muted-foreground" />
      </div>
      <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center text-xs text-muted-foreground">
        JPG, PNG (Max 5MB)
      </div>
    </div>
  );
}
