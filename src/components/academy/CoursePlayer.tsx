'use client';
import React, { useState } from 'react';
import { PlayCircle, CheckCircle, Lock, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CoursePlayer() {
  const [activeLesson, setActiveLesson] = useState(1);
  
  const lessons = [
    { id: 1, title: 'مقدمة في المونتاج السردي', duration: '10:00', completed: true },
    { id: 2, title: 'فهم الـ J-Cuts و L-Cuts', duration: '15:30', completed: false },
    { id: 3, title: 'اختيار الموسيقى المناسبة', duration: '12:45', completed: false },
    { id: 4, title: 'تصدير المشروع بجودة عالية', duration: '08:20', completed: false, locked: true },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)] gap-6">
       {/* Video Area */}
       <div className="flex-1 flex flex-col">
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-4">
             {/* Fake Video Player UI */}
             <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/20 to-black">
                <Button className="w-20 h-20 rounded-full bg-white/20 hover:bg-indigo-600 hover:scale-110 transition-all backdrop-blur border border-white/30">
                   <PlayCircle size={40} className="text-white ml-1" />
                </Button>
             </div>
             <div className="absolute bottom-4 left-4 text-white font-bold bg-black/60 px-3 py-1 rounded">
                الدرس {activeLesson}: {lessons.find(l => l.id === activeLesson)?.title}
             </div>
          </div>
          
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6 flex-1">
             <h2 className="text-2xl font-bold text-white mb-4">وصف الدرس</h2>
             <p className="text-slate-400 leading-relaxed">
                في هذا الدرس، سنتعلم كيف نستخدم تقنيات القطع المتقدمة لربط المشاهد ببعضها بطريقة انسيابية تخدم القصة، وكيف يؤثر الصوت على عاطفة المشهد.
             </p>
          </div>
       </div>

       {/* Syllabus Sidebar */}
       <div className="w-full lg:w-96 bg-slate-900 border border-white/10 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-slate-950">
             <h3 className="font-bold text-white">محتوى الدورة</h3>
             <div className="text-xs text-slate-500 mt-1">تم إكمال 25%</div>
             <div className="w-full bg-slate-800 h-1 mt-2 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[25%]" />
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
             {lessons.map((lesson) => (
                <button 
                  key={lesson.id}
                  disabled={lesson.locked}
                  onClick={() => setActiveLesson(lesson.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-right transition-colors ${
                     activeLesson === lesson.id ? 'bg-indigo-600 text-white' : 
                     lesson.locked ? 'bg-transparent text-slate-600 cursor-not-allowed' :
                     'hover:bg-white/5 text-slate-300'
                  }`}
                >
                   <div className="flex items-center gap-3">
                      {lesson.completed ? <CheckCircle size={16} className="text-green-400" /> : 
                       lesson.locked ? <Lock size={16} /> :
                       <div className="w-4 h-4 rounded-full border-2 border-slate-500" />}
                      <div className="text-sm font-medium line-clamp-1">{lesson.title}</div>
                   </div>
                   <span className="text-[10px] opacity-60">{lesson.duration}</span>
                </button>
             ))}
          </div>
          
          <div className="p-4 border-t border-white/10 bg-slate-950 text-center">
             <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5">
                <ChevronLeft size={16} className="mr-2"/> العودة للأكاديمية
             </Button>
          </div>
       </div>
    </div>
  );
}
