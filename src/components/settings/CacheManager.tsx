'use client';
import React, { useState } from 'react';
import { Database, Trash2, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CacheManager() {
  const [clearing, setClearing] = useState(false);

  // Simulated storage usage
  const storage = {
    used: 450, // MB
    limit: 2000, // MB (Browser Limit usually)
    breakdown: [
        { label: 'Video Proxies', size: '320 MB', color: 'bg-blue-500' },
        { label: 'Waveforms', size: '80 MB', color: 'bg-purple-500' },
        { label: 'Thumbnails', size: '50 MB', color: 'bg-emerald-500' },
    ]
  };

  const percentage = (storage.used / storage.limit) * 100;

  const handleClear = () => {
    setClearing(true);
    setTimeout(() => {
        alert('تم تنظيف الكاش بنجاح!');
        setClearing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
       <div className="flex items-start gap-4 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
          <Database className="text-yellow-600 shrink-0" size={24} />
          <div>
             <h4 className="font-bold text-yellow-800 text-sm">التخزين المحلي (Local Cache)</h4>
             <p className="text-xs text-yellow-700 mt-1">
                يستخدم المتصفح مساحة جهازك لتخزين ملفات مؤقتة لتسريع المونتاج. تنظيفها لن يحذف ملفاتك الأصلية من السحابة.
             </p>
          </div>
       </div>

       <div className="bg-card border border-border p-6 rounded-xl">
          <div className="flex justify-between items-end mb-2">
             <span className="font-bold text-2xl">{storage.used} MB <span className="text-sm text-muted-foreground font-normal">مستخدم</span></span>
             <span className="text-xs text-muted-foreground">الحد الأقصى المسموح: {storage.limit} MB</span>
          </div>
          
          <div className="h-4 bg-muted rounded-full overflow-hidden mb-6 flex">
             {storage.breakdown.map((item, i) => (
                 <div key={i} className={`h-full ${item.color}`} style={{ width: `${(parseInt(item.size)/storage.used)*100}%` }} title={item.label} />
             ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
             {storage.breakdown.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                   <div className={`w-2 h-2 rounded-full ${item.color}`} />
                   <span className="font-bold">{item.label}</span>
                   <span className="text-muted-foreground">({item.size})</span>
                </div>
             ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
             <Button 
                variant="outline" 
                className="text-red-500 hover:bg-red-50 border-red-200"
                onClick={handleClear}
                disabled={clearing}
                icon={clearing ? <RefreshCw size={16} className="animate-spin" /> : <Trash2 size={16} />}
             >
                {clearing ? 'جاري التنظيف...' : 'تنظيف الكاش الآن'}
             </Button>
          </div>
       </div>
    </div>
  );
}
