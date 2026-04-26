'use client';
import React, { useState } from 'react';
import { Landmark, CreditCard, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export function PayoutMethods() {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">طرق استلام الأرباح</h3>
          <Button size="sm" variant="outline" icon={<Plus size={16} />} onClick={() => setIsAdding(true)}>إضافة طريقة جديدة</Button>
       </div>

       {/* List of Methods */}
       <div className="space-y-3">
          <Card className="flex justify-between items-center p-4 border-l-4 border-l-primary">
             <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-lg"><Landmark size={24} /></div>
                <div>
                   <p className="font-bold text-sm">National Bank of Egypt</p>
                   <p className="text-xs text-muted-foreground">**** 1234 • EGP</p>
                </div>
             </div>
             <Button size="sm" variant="ghost" className="text-red-500"><Trash2 size={16} /></Button>
          </Card>
       </div>

       {/* Add New Form */}
       {isAdding && (
          <Card className="p-6 bg-muted/10 animate-in slide-in-from-top-2">
             <h4 className="font-bold mb-4">إضافة حساب بنكي جديد</h4>
             <div className="grid md:grid-cols-2 gap-4 mb-4">
                <Input label="اسم صاحب الحساب" placeholder="الاسم كما في البنك" />
                <Input label="اسم البنك" placeholder="مثلاً: CIB" />
                <Input label="رقم الحساب (IBAN)" placeholder="EG..." className="col-span-2 font-mono" />
                <Input label="SWIFT Code" placeholder="CIBEG..." />
             </div>
             <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setIsAdding(false)}>إلغاء</Button>
                <Button variant="primary">حفظ الحساب</Button>
             </div>
          </Card>
       )}
    </div>
  );
}

