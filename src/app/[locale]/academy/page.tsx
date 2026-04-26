'use client';
import { use } from 'react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Star, Users, Award, Search } from 'lucide-react';
import Link from 'next/link';

const COURSES = [
  {
    id: "premier-pro-masterclass",
    title: "إتقان أدوبي بريمير من الصفر للاحتراف",
    instructor: "أحمد سامي",
    level: "Beginner",
    duration: "15 ساعة",
    studentsCount: 1240,
    rating: 4.8,
    xpReward: 500,
    price: "مجاناً",
    thumbnail: "bg-indigo-900"
  },
  {
    id: "color-grading-davinci",
    title: "فن تصحيح الألوان السينمائي",
    instructor: "سارة المخرج",
    level: "Advanced",
    duration: "8 ساعات",
    studentsCount: 850,
    rating: 4.9,
    xpReward: 800,
    price: 450,
    thumbnail: "bg-purple-900"
  },
  {
    id: "motion-graphics-trends",
    title: "تريندات الموشن جرافيك 2026",
    instructor: "ستوديو بيكسل",
    level: "Intermediate",
    duration: "5 ساعات",
    studentsCount: 2000,
    rating: 4.7,
    xpReward: 300,
    price: 200,
    thumbnail: "bg-blue-900"
  }
];

export default function AcademyPage() {
  const [activeTab, setActiveTab] = useState('الكل');

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
      
      <section className="relative pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">أكاديمية مونتيرلي 🎓</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">تعلم مهارات <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">المستقبل الإبداعي</span></h1>
            
            <div className="max-w-2xl mx-auto bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-2 flex items-center shadow-2xl mt-8">
              <div className="p-3 text-slate-500"><Search className="w-6 h-6" /></div>
              <input type="text" placeholder="ماذا تريد أن تتعلم اليوم؟" className="flex-1 bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 text-right px-4" />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-colors">بحث</button>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap gap-4 mb-10 border-b border-slate-800 pb-4">
          {['الكل', 'المونتاج', 'تلوين', 'موشن جرافيك', 'هندسة صوتية'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-white text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}>{tab}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course, index) => (
            <Link href={`/academy/${course.id}`} key={course.id}>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                <div className={`h-48 w-full ${course.thumbnail} relative flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300"><Play className="w-6 h-6 text-white fill-current" /></div>
                  <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-xs font-bold px-2 py-1 rounded text-white border border-white/10">{course.level}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-indigo-400 flex items-center gap-1 bg-indigo-500/10 px-2 py-1 rounded"><Award className="w-3 h-3" />+{course.xpReward} XP</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-indigo-400 transition-colors">{course.title}</h3>
                  <div className="mt-auto space-y-4 border-t border-slate-800 pt-4 flex justify-between text-sm text-slate-400">
                    <div className="flex items-center gap-1.5"><Users className="w-4 h-4" />{course.studentsCount}</div>
                    <div className="flex items-center gap-1.5 text-yellow-500"><Star className="w-4 h-4 fill-current" />{course.rating}</div>
                    <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{course.duration}</div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
