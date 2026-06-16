import React from 'react';
import { VoiceoverRecorder } from '@/components/workspace/VoiceoverRecorder';
import { ShieldCheck } from 'lucide-react';

export default function TestAudioPage() {
  return (
    <div className="min-h-screen bg-[#05050A] flex flex-col items-center justify-center p-4 font-sans text-slate-50" dir="rtl">
      <div className="text-center mb-10 max-w-md">
         <div className="inline-block p-4 bg-indigo-500/10 rounded-3xl mb-4 border border-indigo-500/20">
             <ShieldCheck className="w-10 h-10 text-indigo-400" />
         </div>
         <h1 className="text-3xl font-black mb-2 text-white">مختبر الصوتيات (Audio Lab)</h1>
         <p className="text-slate-400 text-sm leading-relaxed">
           هذه بيئة معزولة لاختبار صلاحيات المايكروفون، التقاط الذبذبات الحية، ورفع الملفات الخام مباشرة إلى الخزنة السحابية.
         </p>
      </div>

      {/* استدعاء المكون وتمرير رقم مشروع وهمي للاختبار */}
      <VoiceoverRecorder projectId="TEST_PRJ_99" />
    </div>
  );
}
