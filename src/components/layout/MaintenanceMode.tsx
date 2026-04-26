'use client';
import React from 'react';
import { Hammer, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function MaintenanceMode() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
       <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-8 animate-pulse">
          <Hammer size={48} />
       </div>

       <h1 className="text-3xl md:text-5xl font-black font-heading mb-4">نعمل على تحسين المنصة 🛠️</h1>
       <p className="text-muted-foreground max-w-lg mb-8 text-lg">
          نقوم حالياً بإجراء بعض التحديثات الدورية لضمان أفضل أداء واستقرار. سنعود للعمل خلال دقائق قليلة.
       </p>

       <div className="p-4 bg-card border border-border rounded-xl max-w-sm w-full mb-8">
          <div className="flex justify-between items-center text-sm mb-2">
             <span className="text-muted-foreground">حالة النظام:</span>
             <span className="font-bold text-yellow-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-600 rounded-full animate-ping" /> جاري التحديث
             </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
             <div className="h-full bg-yellow-500 w-[70%] animate-pulse" />
          </div>
       </div>

       <Button variant="outline" icon={<RefreshCw size={16} />} onClick={() => window.location.reload()}>
          التحقق مرة أخرى
       </Button>
       
       <p className="mt-8 text-xs text-muted-foreground">Error Code: 503_SERVICE_UNAVAILABLE</p>
    </div>
  );
}

