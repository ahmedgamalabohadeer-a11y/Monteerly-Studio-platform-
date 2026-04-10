'use client';
import React from 'react';
import { RefreshCw, Home, AlertOctagon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// هذا المكون يستخدم عادة داخل ErrorBoundary Class في React
// أو كـ Fallback Component في Next.js error.tsx

interface Props {
  error?: Error;
  reset?: () => void;
}

export function ErrorBoundaryFallback({ error, reset }: Props) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center bg-background border border-border rounded-2xl m-4">
       <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <AlertOctagon size={40} />
       </div>
       
       <h2 className="text-2xl font-bold mb-2">عذراً، حدث خطأ غير متوقع!</h2>
       <p className="text-muted-foreground max-w-md mb-8">
          واجه النظام مشكلة في عرض هذا الجزء. تم إشعار فريق التطوير تلقائياً.
       </p>

       {error && (
          <div className="bg-muted p-4 rounded-lg mb-8 max-w-lg w-full overflow-x-auto text-left">
             <code className="text-xs font-mono text-red-500">{error.message}</code>
          </div>
       )}

       <div className="flex gap-4">
          <Button 
             variant="primary" 
             onClick={() => reset ? reset() : window.location.reload()} 
             icon={<RefreshCw size={16} />}
          >
             إعادة المحاولة
          </Button>
          <Button 
             variant="outline" 
             onClick={() => window.location.href = '/'} 
             icon={<Home size={16} />}
          >
             العودة للرئيسية
          </Button>
       </div>
    </div>
  );
}
