'use client';
import React, { useState } from 'react';
import { Wifi, UploadCloud, DownloadCloud, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function SpeedTest() {
  const [status, setStatus] = useState<'idle' | 'testing' | 'done'>('idle');
  const [download, setDownload] = useState(0);
  const [upload, setUpload] = useState(0);

  const startTest = () => {
    setStatus('testing');
    setDownload(0);
    setUpload(0);

    // Simulation logic
    let d = 0;
    const interval = setInterval(() => {
       d += Math.random() * 10;
       setDownload(Math.min(150, d));
       if (d >= 150) {
          clearInterval(interval);
          // Start Upload sim
          let u = 0;
          const uInterval = setInterval(() => {
             u += Math.random() * 5;
             setUpload(Math.min(45, u));
             if (u >= 45) {
                clearInterval(uInterval);
                setStatus('done');
             }
          }, 100);
       }
    }, 100);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 text-center max-w-sm mx-auto">
       <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
          <Wifi size={32} />
       </div>
       <h3 className="font-bold text-lg mb-2">فحص جودة الاتصال</h3>
       <p className="text-sm text-muted-foreground mb-6">تأكد من أن سرعة الإنترنت لديك مناسبة لرفع ملفات 4K.</p>

       <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-muted/30 rounded-xl">
             <div className="flex justify-center items-center gap-2 text-muted-foreground text-xs mb-2">
                <DownloadCloud size={14} /> Download
             </div>
             <div className="text-2xl font-black font-mono">{download.toFixed(1)}</div>
             <div className="text-xs text-muted-foreground">Mbps</div>
          </div>
          <div className="p-4 bg-muted/30 rounded-xl">
             <div className="flex justify-center items-center gap-2 text-muted-foreground text-xs mb-2">
                <UploadCloud size={14} /> Upload
             </div>
             <div className="text-2xl font-black font-mono">{upload.toFixed(1)}</div>
             <div className="text-xs text-muted-foreground">Mbps</div>
          </div>
       </div>

       {status === 'done' && upload < 10 && (
          <div className="text-xs text-red-500 bg-red-50 p-2 rounded-lg mb-4">
             ⚠️ سرعة الرفع لديك بطيئة. قد تواجه مشاكل في الملفات الكبيرة.
          </div>
       )}

       <Button 
          onClick={startTest} 
          disabled={status === 'testing'}
          className="w-full" 
          variant="primary"
          icon={status === 'testing' ? <RefreshCw className="animate-spin" size={16} /> : undefined}
       >
          {status === 'testing' ? 'جاري الفحص...' : 'بدء الاختبار'}
       </Button>
    </div>
  );
}

