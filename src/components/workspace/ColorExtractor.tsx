'use client';
import React, { useState } from 'react';
import { Pipette, Copy, UploadCloud, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ColorExtractor() {
  // Mock extracted colors
  const [colors, setColors] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setColors(['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3']);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4">
       <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-pink-100 text-pink-600 rounded-lg"><Pipette size={18} /></div>
          <h3 className="font-bold text-sm">مولد باليت الألوان (Branding)</h3>
       </div>

       {colors.length === 0 ? (
          <div 
            onClick={handleUpload}
            className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 hover:border-primary transition-colors"
          >
             {isProcessing ? (
                <RefreshCw className="animate-spin mx-auto text-primary" />
             ) : (
                <>
                   <UploadCloud className="mx-auto mb-2 text-muted-foreground" />
                   <p className="text-xs font-bold">ارفع صورة لاستخراج الألوان</p>
                </>
             )}
          </div>
       ) : (
          <div className="space-y-3 animate-in fade-in">
             <div className="grid grid-cols-5 gap-2 h-16">
                {colors.map((color, i) => (
                   <div 
                     key={i} 
                     className="rounded-md shadow-sm cursor-pointer hover:scale-105 transition-transform"
                     style={{ backgroundColor: color }}
                     onClick={() => navigator.clipboard.writeText(color)}
                     title={color}
                   />
                ))}
             </div>
             
             <div className="space-y-1">
                {colors.map((color, i) => (
                   <div key={i} className="flex justify-between items-center text-xs p-1 hover:bg-muted rounded">
                      <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                         <span className="font-mono">{color}</span>
                      </div>
                      <button onClick={() => navigator.clipboard.writeText(color)} className="text-muted-foreground hover:text-primary"><Copy size={12} /></button>
                   </div>
                ))}
             </div>
             
             <Button size="sm" variant="ghost" className="w-full text-xs" onClick={() => setColors([])}>
                صورة جديدة
             </Button>
          </div>
       )}
    </div>
  );
}
