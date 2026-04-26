'use client';
import React, { useState } from 'react';
import { Sparkles, Copy, RefreshCw, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export function ScriptGenerator() {
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState('');
  const { addToast } = useToast();

  const handleGenerate = () => {
    setLoading(true);
    // محاكاة للتوليد
    setTimeout(() => {
      setScript(`عنوان الفيديو: رحلة إلى المستقبل

[المشهد 1 - المقدمة] (00:00 - 00:15)
صورة: لقطات سريعة لمدن مستقبلية وطائرات درون.
صوت: "هل تخيلت يوماً كيف ستبدو حياتنا في عام 2050؟"

[المشهد 2 - المشكلة] (00:15 - 00:45)
صورة: شخص يستخدم تقنيات قديمة ويبدو منزعجاً.
صوت: "اليوم، نواجه تحديات في السرعة والتواصل..."

[المشهد 3 - الحل] (00:45 - 01:30)
صورة: عرض لشاشات هولوغرام وذكاء اصطناعي يعمل.
صوت: "لكن مع التطور المتسارع للذكاء الاصطناعي، الحلول أصبحت أقرب مما نتخيل."`);
      setLoading(false);
      addToast('success', 'تم توليد السيناريو بنجاح!');
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
       {/* Input Panel */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col gap-4">
          <h3 className="font-bold text-white flex items-center gap-2">
             <Sparkles size={18} className="text-indigo-400" /> إعدادات السيناريو
          </h3>
          
          <div>
             <label className="text-xs text-slate-400 mb-1 block">موضوع الفيديو</label>
             <input type="text" placeholder="مثال: مستقبل الذكاء الاصطناعي" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" />
          </div>

          <div>
             <label className="text-xs text-slate-400 mb-1 block">نبرة الصوت (Tone)</label>
             <select className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none">
                <option>حماسي / تشويقي</option>
                <option>تعليمي / هادئ</option>
                <option>احترافي / رسمي</option>
                <option>كوميدي / مرح</option>
             </select>
          </div>

          <div>
             <label className="text-xs text-slate-400 mb-1 block">المدة التقريبية</label>
             <select className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none">
                <option>30 ثانية (Reels/TikTok)</option>
                <option>دقيقتين (YouTube)</option>
                <option>5 دقائق (وثائقي قصير)</option>
             </select>
          </div>

          <Button onClick={handleGenerate} disabled={loading} className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 shadow-lg shadow-indigo-500/20">
             {loading ? <span className="flex items-center gap-2"><RefreshCw className="animate-spin" size={16}/> جاري التفكير...</span> : 'توليد السيناريو ✨'}
          </Button>
       </div>

       {/* Output Panel */}
       <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col relative">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
             <h3 className="font-bold text-white">النتيجة</h3>
             <div className="flex gap-2">
                <button className="p-2 hover:bg-white/10 rounded text-slate-400 hover:text-white" title="نسخ"><Copy size={16}/></button>
                <button className="p-2 hover:bg-white/10 rounded text-slate-400 hover:text-white" title="حفظ"><Save size={16}/></button>
             </div>
          </div>
          
          <textarea 
            className="flex-1 w-full bg-transparent border-none text-slate-300 focus:outline-none resize-none leading-relaxed font-mono text-sm"
            placeholder="السيناريو سيظهر هنا..."
            value={script}
            readOnly
          />
       </div>
    </div>
  );
}

################################################################################