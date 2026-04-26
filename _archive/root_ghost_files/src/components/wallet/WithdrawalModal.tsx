'use client';
import React, { useState } from 'react';
import { ArrowUpRight, AlertCircle, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
}

export function WithdrawalModal({ isOpen, onClose, availableBalance }: Props) {
  const [amount, setAmount] = useState<number>(0);
  const fee = 3.00; // Fixed fee example
  const netAmount = amount > 0 ? amount - fee : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
       <div className="bg-card w-full max-w-md rounded-2xl p-6 shadow-2xl border border-border">
          <div className="flex justify-between items-start mb-6">
             <div>
                <h2 className="text-xl font-bold">سحب الرصيد</h2>
                <p className="text-sm text-muted-foreground">تحويل الأموال إلى حسابك البنكي</p>
             </div>
             <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                <Wallet size={24} />
             </div>
          </div>

          <div className="bg-muted p-4 rounded-xl mb-6 flex justify-between items-center">
             <span className="text-sm font-medium">الرصيد المتاح للسحب</span>
             <span className="text-lg font-bold text-emerald-600">${availableBalance.toFixed(2)}</span>
          </div>

          <div className="space-y-4">
             <Input 
                label="المبلغ المراد سحبه ($)" 
                type="number" 
                placeholder="0.00"
                onChange={(e) => setAmount(Number(e.target.value))}
                min={50}
                max={availableBalance}
             />
             
             <div className="text-sm space-y-2 p-3 border border-border rounded-lg">
                <div className="flex justify-between text-muted-foreground">
                   <span>رسوم التحويل</span>
                   <span>${fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-border">
                   <span>سيصلك صافي</span>
                   <span>${netAmount.toFixed(2)}</span>
                </div>
             </div>

             {amount > availableBalance && (
                <div className="flex items-center gap-2 text-xs text-red-500 bg-red-50 p-2 rounded">
                   <AlertCircle size={12} />
                   <span>المبلغ المدخل أكبر من الرصيد المتاح.</span>
                </div>
             )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
             <Button variant="ghost" onClick={onClose}>إلغاء</Button>
             <Button 
                variant="primary" 
                disabled={amount <= 0 || amount > availableBalance}
                icon={<ArrowUpRight size={16} />}
                onClick={() => { alert('تم إرسال الطلب'); onClose(); }}
             >
                تأكيد السحب
             </Button>
          </div>
       </div>
    </div>
  );
}

################################################################################