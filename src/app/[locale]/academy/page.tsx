'use client'
import React from 'react';
import { PlayCircle, Award, BookOpen } from 'lucide-react';

export default function AcademyPage() {
  const dict = {
    title: "أكاديمية MCOS للصناعات الإبداعية",
    sub: "من مبتدئ إلى محترف مُعتمد. مسارات تدريبية مكثفة مدعومة بالذكاء الاصطناعي.",
    courses: [
      { id: 1, title: "هندسة الموشن جرافيك المتقدمة", level: "متقدم", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070" },
      { id: 2, title: "إدارة العقود والعمل الحر السيادي", level: "أساسي", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070" },
      { id: 3, title: "الذكاء الاصطناعي في تحرير الفيديو", level: "متوسط", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965" }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <div className="inline-block bg-indigo-500/10 p-4 rounded-full mb-6">
            <BookOpen className="w-10 h-10 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">{dict.title}</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">{dict.sub}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dict.courses.map(course => (
            <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group hover:border-indigo-500/50 transition-all">
              <div className="relative h-48 overflow-hidden">
                <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-300">
                  {course.level}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black mb-4 group-hover:text-indigo-400 transition-colors">{course.title}</h3>
                <button className="w-full py-3 bg-slate-950 hover:bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                  <PlayCircle className="w-4 h-4" /> ابدأ التعلم
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
