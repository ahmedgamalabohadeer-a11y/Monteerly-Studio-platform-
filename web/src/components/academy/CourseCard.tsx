'use client';
import React from 'react';
import { PlayCircle, Clock, Users } from 'lucide-react';
// استخدام مكون الزر الأساسي
import { Button } from '@/components/ui/Button';

interface CourseProps {
  title: string;
  instructor: string;
  duration: string;
  students: number;
  image: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: string;
}

export function CourseCard({ title, instructor, duration, students, image, level, price }: CourseProps) {
  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all flex flex-col h-full shadow-lg">
       <div className="relative h-48 overflow-hidden bg-slate-800">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" />
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-white border border-white/10 font-bold">
             {level}
          </div>
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             <PlayCircle size={48} className="text-white drop-shadow-lg" />
          </div>
       </div>
       
       <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">{title}</h3>
          <p className="text-sm text-slate-400 mb-4">بواسطة: {instructor}</p>
          
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
             <span className="flex items-center gap-1"><Clock size={14} /> {duration}</span>
             <span className="flex items-center gap-1"><Users size={14} /> {students} طالب</span>
          </div>
          
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-800">
             <span className="font-bold text-white text-lg">{price}</span>
             <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
               التفاصيل
             </button>
          </div>
       </div>
    </div>
  );
}
