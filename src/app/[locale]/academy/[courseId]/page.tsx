'use client';

import React from 'react';
import { PlayCircle, Lock, Clock, Award, Share2 } from 'lucide-react';

const COURSE_DETAILS = {
  title: 'إتقان أدوبي بريمير من الصفر للاحتراف',
  description: 'دورة شاملة تأخذك من واجهة البرنامج وحتى تصدير مشاريع احترافية. ستتعلم التقطيع، التزامن الصوتي، التحريكات البسيطة، وتصحيح الألوان الأساسي.',
  instructor: 'أحمد سامي',
  modules: [
    {
      title: 'القسم الأول: الأساسيات والواجهة',
      lessons: [
        { title: 'مقدمة الدورة وتحميل الملفات', time: '10:00', type: 'open' },
        { title: 'شرح واجهة البرنامج Workspace', time: '15:30', type: 'open' },
        { title: 'إعدادات السيكونس الصحيحة', time: '12:00', type: 'locked' }
      ]
    },
    {
      title: 'القسم الثاني: أدوات التحرير',
      lessons: [
        { title: 'القطع والدمج (Cut & Trim)', time: '20:00', type: 'locked' },
        { title: 'اختصارات الكيبورد للسرعة', time: '08:45', type: 'locked' }
      ]
    }
  ]
};

export default function CourseDetailPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      <div className="bg-slate-900 border-b border-slate-800 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-indigo-400 mb-4 text-sm font-bold">
              <span>الأكاديمية</span>
              <span>/</span>
              <span>المونتاج</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {COURSE_DETAILS.title}
            </h1>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              {COURSE_DETAILS.description}
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-slate-950" />
                <div>
                  <div className="text-slate-400 text-xs">المدرب</div>
                  <div className="font-bold">{COURSE_DETAILS.instructor}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <div>
                  <div className="text-slate-400 text-xs">مكافأة إتمام</div>
                  <div className="font-bold">500 XP + شهادة</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-400" />
                <div>
                  <div className="text-slate-400 text-xs">آخر تحديث</div>
                  <div className="font-bold">يناير 2026</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-slate-950 border border-slate-700 rounded-2xl p-6 shadow-2xl lg:absolute lg:top-0 lg:left-0 lg:w-full">
              <div className="aspect-video bg-indigo-900 rounded-xl mb-6 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <PlayCircle className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-4 text-sm font-bold">مشاهدة المقدمة</span>
              </div>

              <div className="text-3xl font-bold mb-2">مجاناً</div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold mb-4 transition-all hover:scale-[1.02]">
                ابدأ التعلم الآن
              </button>
              <button className="w-full border border-slate-600 hover:bg-slate-950 text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                مشاركة الدورة
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-bold">محتوى الدورة</h2>

          <div className="space-y-4">
            {COURSE_DETAILS.modules.map((module, i) => (
              <div key={i} className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
                <div className="bg-slate-950/50 p-4 font-bold border-b border-slate-800 flex justify-between">
                  <span>{module.title}</span>
                  <span className="text-sm text-slate-400">{module.lessons.length} دروس</span>
                </div>
                <div className="divide-y divide-slate-800/50">
                  {module.lessons.map((lesson, j) => (
                    <div key={j} className="p-4 flex items-center justify-between hover:bg-slate-950/30 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${lesson.type === 'open' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-950 text-slate-500'}`}>
                          {lesson.type === 'open' ? <PlayCircle className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                        </div>
                        <span className={lesson.type === 'locked' ? 'text-slate-400' : 'text-white'}>
                          {lesson.title}
                        </span>
                      </div>
                      <span className="text-sm text-slate-500">{lesson.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
