'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Star, Users, Award, Search } from 'lucide-react';
import Link from 'next/link';

const COURSES = [
  { id: "premier-pro-masterclass", title: "إتقان أدوبي بريمير من الصفر للاحتراف", instructor: "أحمد سامي", level: "Beginner", duration: "15 ساعة", studentsCount: 1240, rating: 4.8, xpReward: 500, price: "مجاناً", thumbnail: "bg-indigo-900" },
  { id: "color-grading-davinci", title: "فن تصحيح الألوان السينمائي", instructor: "سارة المخرج", level: "Advanced", duration: "8 ساعات", studentsCount: 850, rating: 4.9, xpReward: 800, price: 450, thumbnail: "bg-purple-900" }
];

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 relative">
      <section className="pt-24 pb-12 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">أكاديمية <span className="text-indigo-400">مونتيرلي</span></h1>
        <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-2 flex items-center">
          <input type="text" placeholder="ماذا تريد أن تتعلم اليوم؟" className="flex-1 bg-transparent border-none text-white px-4 outline-none" />
          <button className="bg-indigo-600 px-6 py-3 rounded-xl font-bold">بحث</button>
        </div>
      </section>
      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {COURSES.map((course) => (
          <Link href={`/academy/${course.id}`} key={course.id}>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500 transition-all">
              <div className={`h-48 ${course.thumbnail} flex items-center justify-center`}><Play size={40} /></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                <div className="flex justify-between text-sm text-slate-400">
                  <div className="flex items-center gap-1"><Users size={14} /> {course.studentsCount}</div>
                  <div className="flex items-center gap-1"><Star size={14} className="text-yellow-500" /> {course.rating}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
