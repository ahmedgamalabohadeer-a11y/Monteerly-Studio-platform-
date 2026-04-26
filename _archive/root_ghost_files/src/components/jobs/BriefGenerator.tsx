'use client';
import React, { useState } from 'react';
import { Wand2, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

export function BriefGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState('');

  const generate = () => {
    setIsGenerating(true);
    // Simulation of AI generation
    setTimeout(() => {
      setGeneratedBrief(`عنوان المشروع: فيديو إعلاني لمنصة عقارات
      
الهدف: زيادة المبيعات وجذب عملاء جدد.
المدة: 30-60 ثانية.
المنصة: Instagram Reels & TikTok.
الأسلوب: سريع، ديناميكي، مع موسيقى حماسية.
المطلوب من المستقل:
1. مونتاج اللقطات المرفقة.
2. إضافة نصوص متحركة (Kinetic Typography).
3. تصحيح ألوان يناسب الهوية البصرية.
      `);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-6">
       <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-indigo-600 text-white rounded-lg">
             <Wand2 size={20} />
          </div>
          <h3 className="font-bold text-indigo-900">مساعد كتابة الوصف (AI)</h3>
       </div>

       <div className="grid grid-cols-2 gap-3 mb-4">
          <select className="p-2 rounded-lg border border-indigo-200 text-sm outline-none">
             <option>نوع الفيديو: إعلان</option>
             <option>نوع الفيديو: يوتيوب</option>
             <option>نوع الفيديو: وثائقي</option>
          </select>
          <select className="p-2 rounded-lg border border-indigo-200 text-sm outline-none">
             <option>المنصة: Instagram</option>
             <option>المنصة: YouTube</option>
             <option>المنصة: TV</option>
          </select>
       </div>

       <Button 
         onClick={generate} 
         disabled={isGenerating} 
         className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mb-4"
         icon={isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <Wand2 size={16} />}
       >
         {isGenerating ? 'جاري التوليد...' : 'توليد وصف احترافي'}
       </Button>

       {generatedBrief && (
          <div className="relative animate-in fade-in">
             <Textarea value={generatedBrief} readOnly className="h-48 bg-white" />
             <Button 
               size="sm" 
               variant="ghost" 
               className="absolute top-2 left-2 bg-white/80 hover:bg-white" 
               icon={<Copy size={14} />}
               onClick={() => navigator.clipboard.writeText(generatedBrief)}
             >
                نسخ
             </Button>
          </div>
       )}
    </div>
  );
}

################################################################################