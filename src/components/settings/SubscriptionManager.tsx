'use client';
import React from 'react';
import { CreditCard, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function SubscriptionManager() {
  return (
    <div className="space-y-6">
       {/* Current Plan */}
       <div className="border border-primary/20 bg-primary/5 rounded-xl p-6 flex justify-between items-center">
          <div>
             <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-lg text-primary">خطة المبدع المحترف (Pro)</h3>
                <Badge variant="success">نشط</Badge>
             </div>
             <p className="text-sm text-muted-foreground">يتم التجديد تلقائياً في 25 فبراير 2026</p>
          </div>
          <div className="text-right">
             <div className="text-2xl font-bold">$19.00</div>
             <div className="text-xs text-muted-foreground">/ شهرياً</div>
          </div>
       </div>

       {/* Usage Stats */}
       <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
             <div className="flex justify-between text-sm"><span>مساحة التخزين</span><span>45%</span></div>
             <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[45%]" />
             </div>
             <p className="text-xs text-muted-foreground">45GB من 100GB مستخدمة</p>
          </div>
          
          <div className="space-y-2">
             <div className="flex justify-between text-sm"><span>نقاط الذكاء الاصطناعي</span><span>80%</span></div>
             <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[80%]" />
             </div>
             <p className="text-xs text-muted-foreground">تبقي 200 نقطة هذا الشهر</p>
          </div>
       </div>

       {/* Actions */}
       <div className="pt-6 border-t border-border flex justify-between items-center">
          <div className="flex gap-2">
             <Button variant="outline">تغيير الخطة</Button>
             <Button variant="outline">تحديث وسيلة الدفع</Button>
          </div>
          <button className="text-sm text-red-500 hover:underline">إلغاء الاشتراك</button>
       </div>
    </div>
  );
}
