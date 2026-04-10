'use client';
import React, { useState } from 'react';
import { PenTool, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface SignerProps {
  onSign: (signature: string) => void;
}

export function DigitalSigner({ onSign }: SignerProps) {
  const [signature, setSignature] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
       <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <PenTool size={20} className="text-primary" /> التوقيع الإلكتروني
       </h3>
       
       <div className="bg-yellow-50 text-yellow-800 text-sm p-4 rounded-lg mb-6 border border-yellow-200">
          بإدخال اسمك الكامل أدناه، أنت توافق قانونياً على جميع الشروط والأحكام المذكورة في هذا العقد وتلتزم بتنفيذها.
       </div>

       <div className="space-y-4">
          <div className="flex items-start gap-3">
             <input 
                type="checkbox" 
                id="agree" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)} 
                className="mt-1 w-4 h-4 text-primary rounded focus:ring-primary" 
             />
             <label htmlFor="agree" className="text-sm cursor-pointer select-none">
                أقر بأنني قرأت العقد كاملاً وأوافق على شروط منصة Monteerly للعمل الحر.
             </label>
          </div>

          <div>
             <label className="text-sm font-bold block mb-2">اكتب اسمك الكامل للتوقيع</label>
             <Input 
                placeholder="مثلاً: أحمد محمد جمال" 
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="font-script text-2xl h-16" // Assuming a handwriting font is loaded
             />
             <p className="text-xs text-muted-foreground mt-2">سيتم ختم هذا التوقيع بختم زمني ورقم IP الجهاز.</p>
          </div>
       </div>

       <div className="pt-6 mt-6 border-t border-border flex justify-end">
          <Button 
             variant="primary" 
             size="lg" 
             disabled={!agreed || signature.length < 5}
             onClick={() => onSign(signature)}
             icon={<Check size={20} />}
          >
             اعتماد وتوقيع العقد
          </Button>
       </div>
    </div>
  );
}
