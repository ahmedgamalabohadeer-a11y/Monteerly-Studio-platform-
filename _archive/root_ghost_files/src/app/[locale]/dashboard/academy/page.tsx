'use client';
import React from 'react';
import { GraduationCap, Star, Trophy, BookOpen } from 'lucide-react';
import { CourseCard } from '@/components/academy/CourseCard';
import { SkillTree } from '@/components/academy/SkillTree';
import { CertificateCard } from '@/components/academy/CertificateCard';

export default function AcademyDashboard() {
  const courses = [
    {
      title: 'أساسيات المونتاج السينمائي بالذكاء الاصطناعي',
      instructor: 'أحمد جمال',
      duration: '12 ساعة',
      students: 450,
      level: 'Beginner' as const,
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80'
    },
    {
      title: 'إدارة تدفق العمل (Workflow) للوكالات الكبرى',
      instructor: 'إدارة مونتيرلي',
      duration: '8 ساعات',
      students: 120,
      level: 'Advanced' as const,
      price: 'Premium',
      image: 'https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="space-y-8 p-6 pb-24 bg-slate-950 min-h-screen" dir="rtl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-800 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <GraduationCap className="text-amber-500" size={32} />
            أكاديمية مونتيرلي للتدريب
          </h1>
          <p className="text-slate-400 mt-2 text-sm">بناء الكوادر، تطوير المهارات، وتوثيق الاحتراف.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-center min-w-[100px]">
            <p className="text-[10px] text-slate-500 font-bold uppercase">الدورات المكتملة</p>
            <p className="text-xl font-black text-white">12</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-center min-w-[100px]">
            <p className="text-[10px] text-indigo-400 font-bold uppercase">نقاط الخبرة XP</p>
            <p className="text-xl font-black text-white">4.8k</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen size={20} className="text-indigo-400" /> المسارات التدريبية المتاحة
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <SkillTree />
          <CertificateCard />
        </div>
      </div>
    </div>
  );
}
