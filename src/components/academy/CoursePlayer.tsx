'use client';
import React, { useState } from 'react';
import { PlayCircle, CheckCircle, Lock } from 'lucide-react';

export function CoursePlayer() {
  const [activeLesson, setActiveLesson] = useState(1);

  const lessons = [
    { id: 1, title: 'مقدمة في المونتاج السردي', duration: '10:00', completed: true },
    { id: 2, title: 'فهم الـ J-Cuts و L-Cuts', duration: '15:30', completed: false },
    { id: 3, title: 'اختيار الموسيقى المناسبة', duration: '12:45', completed: false },
    { id: 4, title: 'تصدير المشروع بجودة عالية', duration: '08:20', completed: false, locked: true },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[600px] gap-6" dir="rtl">
       <div className="flex-1 flex flex-col">
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-slate-800 shadow-2xl mb-4">
             <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/20 to-black">
                <button className="w-20 h-20 flex items-center justify-center rounded-full bg-white/10 hover:bg-indigo-600 hover:scale-110 transition-all backdrop-blur border border-white/20">
                   <PlayCircle size={40} className="text-white" />
                </button>
             </div>
             <div className="absolute bottom-4 right-4 text-white font-bold bg-black/80 px-4 py-2 rounded-lg border border-white/10 backdrop-blur">
                الدرس {activeLesson}: {lessons.find((l) => l.id === activeLesson)?.title}
             </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex-1">
             <h2 className="text-2xl font-bold text-white mb-4">وصف الدرس</h2>
             <p className="text-slate-400 leading-relaxed">
                في هذا الدرس، سنتعلم كيف نستخدم تقنيات القطع المتقدمة لربط المشاهد ببعضها بطريقة انسيابية تخدم القصة، وكيف يؤثر الصوت على عاطفة المشهد.
             </p>
          </div>
       </div>

       <div className="w-full lg:w-96 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-950/50">
             <h3 className="font-bold text-white">محتوى الدورة</h3>
             <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
               <span>التقدم</span>
               <span className="font-bold text-green-400">25%</span>
             </div>
             <div className="w-full bg-slate-800 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[25%]" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
             {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  disabled={lesson.locked}
                  onClick={() => setActiveLesson(lesson.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg text-right transition-colors ${
                     activeLesson === lesson.id ? 'bg-indigo-600 text-white shadow-lg' :
                     lesson.locked ? 'bg-transparent text-slate-600 cursor-not-allowed opacity-50' :
                     'bg-slate-800/50 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                   <div className="flex items-center gap-3">
                      {lesson.completed ? <CheckCircle size={18} className="text-green-400" /> :
                       lesson.locked ? <Lock size={18} /> :
                       <div className="w-4 h-4 rounded-full border-2 border-slate-500" />}
                      <div className="text-sm font-bold line-clamp-1">{lesson.title}</div>
                   </div>
                   <span className="text-xs opacity-60 font-mono">{lesson.duration}</span>
                </button>
             ))}
          </div>
       </div>
    </div>
  );
}
