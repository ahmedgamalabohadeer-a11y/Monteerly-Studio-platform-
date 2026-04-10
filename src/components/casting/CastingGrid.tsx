'use client';
import React from 'react';
import { Play, Star, Mic, Video, FileText, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CastingGrid() {
  const talents = [
    { id: 1, name: 'ليلى العمري', role: 'Actress', age: 24, type: 'Lead', rating: 4.8, image: '/avatars/sara.jpg', status: 'Shortlisted' },
    { id: 2, name: 'عمر خالد', role: 'Voice Over', age: 30, type: 'Narrator', rating: 5.0, image: '/avatars/khaled.jpg', status: 'Auditioned' },
    { id: 3, name: 'يوسف سالم', role: 'Actor', age: 45, type: 'Father', rating: 4.2, image: '/avatars/ahmed.jpg', status: 'Rejected' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {talents.map((talent) => (
          <div key={talent.id} className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden group hover:border-indigo-500/50 transition-all">
             <div className="h-64 relative bg-black">
                <img src={talent.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                
                {/* Status Badge */}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded text-[10px] font-bold uppercase ${
                   talent.status === 'Shortlisted' ? 'bg-green-500 text-black' :
                   talent.status === 'Rejected' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'
                }`}>
                   {talent.status}
                </div>

                {/* Play Audition */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="w-14 h-14 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/40 hover:scale-110 transition-transform">
                      <Play size={24} className="text-white ml-1" />
                   </button>
                </div>

                <div className="absolute bottom-2 left-2 flex gap-1">
                   {talent.role === 'Voice Over' ? (
                      <div className="bg-black/60 text-white p-1 rounded"><Mic size={14}/></div>
                   ) : (
                      <div className="bg-black/60 text-white p-1 rounded"><Video size={14}/></div>
                   )}
                </div>
             </div>

             <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                   <div>
                      <h3 className="font-bold text-white text-lg">{talent.name}</h3>
                      <div className="text-xs text-slate-400">{talent.role} • Age: {talent.age}</div>
                   </div>
                   <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
                      <Star size={12} fill="currentColor" /> {talent.rating}
                   </div>
                </div>

                <div className="flex gap-2 mb-4">
                   <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-300">{talent.type}</span>
                   <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-300">Arabic (Native)</span>
                </div>

                <div className="flex gap-2 pt-3 border-t border-white/5">
                   <Button size="sm" variant="outline" className="flex-1 border-white/10 text-white text-xs gap-1">
                      <FileText size={12} /> السيرة الذاتية
                   </Button>
                   <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs gap-1">
                      <CheckCircle size={12} /> قبول
                   </Button>
                   <Button size="sm" variant="outline" className="w-8 px-0 border-white/10 text-slate-500 hover:text-red-400 hover:bg-red-500/10">
                      <XCircle size={14} />
                   </Button>
                </div>
             </div>
          </div>
       ))}
    </div>
  );
}
