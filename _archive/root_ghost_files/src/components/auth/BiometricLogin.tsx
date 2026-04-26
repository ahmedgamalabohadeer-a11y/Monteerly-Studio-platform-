'use client';
import React from 'react';
import { Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function BiometricLogin() {
  const handleBiometric = () => {
    // WebAuthn Logic Simulation
    alert("جاري التحقق من البصمة...");
  };

  return (
    <div className="mt-4 text-center">
       <div className="relative py-2">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">أو استخدم</span></div>
       </div>
       <Button 
         variant="outline" 
         className="w-full mt-2 gap-2 h-12 border-primary/20 hover:bg-primary/5 hover:border-primary"
         onClick={handleBiometric}
       >
          <Fingerprint size={20} className="text-primary" />
          <span>الدخول ببصمة الوجه / الإصبع</span>
       </Button>
    </div>
  );
}

################################################################################