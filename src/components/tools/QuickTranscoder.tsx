'use client';
import React, { useState } from 'react';
import { FileVideo, RefreshCw, Download, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function QuickTranscoder() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const handleConvert = () => {
    if (!file) return;
    setConverting(true);
    
    // Simulation
    let p = 0;
    const interval = setInterval(() => {
       p += 5;
       setProgress(p);
       if (p >= 100) {
          clearInterval(interval);
          setConverting(false);
          setDone(true);
       }
    }, 100);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 text-center max-w-md mx-auto">
       <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <RefreshCw size={32} />
       </div>
       <h3 className="font-bold text-lg mb-2">محول صيغ الفيديو السريع</h3>
       <p className="text-sm text-muted-foreground mb-6">حول ملفاتك إلى MP4 المتوافق مع الويب مباشرة من متصفحك.</p>

       {!file ? (
          <div className="border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:bg-muted/50 transition-colors">
             <UploadCloud className="mx-auto text-muted-foreground mb-2" />
             <p className="text-sm font-bold">اسحب ملف الفيديو هنا</p>
             <p className="text-xs text-muted-foreground">أو اضغط للاختيار (MOV, AVI, MKV)</p>
             <input type="file" className="hidden" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
          </div>
       ) : !done ? (
          <div className="space-y-4">
             <div className="flex items-center gap-3 p-3 bg-muted rounded-lg text-left">
                <FileVideo className="text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                   <p className="text-sm font-bold truncate">{file.name}</p>
                   <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
             </div>

             {converting && (
                <div className="space-y-1">
                   <div className="flex justify-between text-xs text-muted-foreground">
                      <span>جاري التحويل...</span>
                      <span>{progress}%</span>
                   </div>
                   <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all duration-100" style={{ width: `${progress}%` }} />
                   </div>
                </div>
             )}

             <Button 
                onClick={handleConvert} 
                disabled={converting} 
                className="w-full" 
                variant="primary"
             >
                {converting ? 'جاري المعالجة...' : 'تحويل إلى MP4'}
             </Button>
          </div>
       ) : (
          <div className="space-y-4 animate-in zoom-in">
             <div className="text-emerald-500 font-bold flex items-center justify-center gap-2">
                <Check size={20} /> تم التحويل بنجاح!
             </div>
             <Button className="w-full" variant="primary" icon={<Download size={18} />}>
                تحميل الملف (MP4)
             </Button>
             <Button variant="ghost" className="w-full" onClick={() => { setFile(null); setDone(false); setProgress(0); }}>
                تحويل ملف آخر
             </Button>
          </div>
       )}
    </div>
  );
}
import { Check } from 'lucide-react';
