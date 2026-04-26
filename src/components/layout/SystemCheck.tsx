'use client';
import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function SystemCheck() {
  const [status, setStatus] = useState<'checking' | 'pass' | 'fail'>('checking');
  const [checks, setChecks] = useState({ webgl: false, wasm: false, screen: false });

  useEffect(() => {
    // Simulate checks
    setTimeout(() => {
        const webgl = !!document.createElement('canvas').getContext('webgl');
        const wasm = typeof WebAssembly === 'object';
        const screen = window.innerWidth >= 1024; // Desktop preferred

        setChecks({ webgl, wasm, screen });
        setStatus(webgl && wasm ? 'pass' : 'fail');
    }, 1000);
  }, []);

  if (status === 'pass') return null; // Hide if all good
  if (status === 'checking') return null; // Don't show loading

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center p-4">
       <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
             <AlertTriangle size={32} />
          </div>
          
          <h2 className="text-xl font-bold mb-2">النظام غير متوافق تماماً</h2>
          <p className="text-muted-foreground text-sm mb-6">
             لضمان أفضل تجربة مونتاج على Monteerly، يرجى مراجعة المتطلبات التالية:
          </p>

          <div className="space-y-3 mb-8 text-left">
             <CheckItem label="دعم WebGL للرسوميات" pass={checks.webgl} />
             <CheckItem label="دعم WebAssembly للمعالجة" pass={checks.wasm} />
             <CheckItem label="حجم شاشة مناسب (Desktop)" pass={checks.screen} warning />
          </div>

          <div className="flex gap-3">
             <Button variant="outline" className="flex-1" onClick={() => window.history.back()}>رجوع</Button>
             <Button variant="primary" className="flex-1" onClick={() => setStatus('pass')}>المتابعة على مسؤوليتي</Button>
          </div>
       </div>
    </div>
  );
}

function CheckItem({ label, pass, warning }: any) {
    return (
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <span className="text-sm font-medium">{label}</span>
            {pass ? (
                <CheckCircle size={18} className="text-emerald-500" />
            ) : warning ? (
                <AlertTriangle size={18} className="text-yellow-500" />
            ) : (
                <XCircle size={18} className="text-red-500" />
            )}
        </div>
    )
}

