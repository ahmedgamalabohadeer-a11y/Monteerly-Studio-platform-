'use client';
import React from 'react';
import { Star, MapPin, BadgeCheck, Heart } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

interface TalentProps {
  name: string;
  role: string;
  rating: number;
  reviews: number;
  rate: string;
  skills: string[];
  image: string;
  verified?: boolean;
}

export function TalentCard({ name, role, rating, reviews, rate, skills, image, verified }: TalentProps) {
  return (
    <div className="group bg-slate-900 border border-white/10 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col h-full">
       {/* Cover Area */}
       <div className="h-24 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 relative">
          <button className="absolute top-3 left-3 text-white/50 hover:text-red-500 transition-colors">
             <Heart size={18} />
          </button>
       </div>
       
       <div className="px-6 pb-6 flex-1 flex flex-col">
          {/* Avatar & Badge */}
          <div className="relative -mt-10 mb-4 flex justify-between items-end">
             <div className="relative">
                <Avatar src={image} fallback={name[0]} size="xl" className="border-4 border-slate-900 w-20 h-20" />
                {verified && (
                   <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-2 border-slate-900" title="تم التحقق من الهوية">
                      <BadgeCheck size={14} />
                   </div>
                )}
             </div>
             <div className="text-right">
                <div className="text-lg font-bold text-white mb-0.5">{rate}</div>
                <div className="text-xs text-slate-400">ساعة / مشروع</div>
             </div>
          </div>

          {/* Info */}
          <div className="mb-4">
             <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">{name}</h3>
             <p className="text-sm text-slate-400 mb-2">{role}</p>
             <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <MapPin size={12} /> السعودية، الرياض
             </div>
             <div className="flex items-center gap-1 text-yellow-500 text-sm">
                <Star size={14} fill="currentColor" />
                <span className="font-bold text-white">{rating}</span>
                <span className="text-slate-500">({reviews})</span>
             </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-6">
             {skills.slice(0, 3).map(skill => (
                <span key={skill} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[10px] text-slate-300">
                   {skill}
                </span>
             ))}
             {skills.length > 3 && <span className="text-[10px] text-slate-500 py-1">+2</span>}
          </div>

          {/* Action */}
          <div className="mt-auto">
             <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/5">
                عرض الملف
             </Button>
          </div>
       </div>
    </div>
  );
}

