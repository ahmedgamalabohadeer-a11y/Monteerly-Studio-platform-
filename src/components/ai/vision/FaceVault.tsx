'use client';
import React from 'react';
import { User, Plus } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
export function FaceVault() {
  const people = [
    { id: 1, name: 'محمد كمال', role: 'Main Actor', appearances: 142, image: '/avatars/mohamed.jpg' },
    { id: 2, name: 'سارة علي', role: 'Director', appearances: 56, image: '/avatars/sara.jpg' },
    { id: 3, name: 'خالد عمر', role: 'Guest Star', appearances: 12, image: '/avatars/khaled.jpg' },
    { id: 4, name: 'مجهول #1', role: 'Unknown', appearances: 8, image: '/avatars/ahmed.jpg' },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
       <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-white flex items-center gap-2">
             <User className="text-blue-400" /> الأشخاص (People Vault)
          </h3>
          <p className="text-xs text-slate-400">تم التعرف على 24 شخصاً في مكتبتك.</p>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {people.map((person) => (
             <div key={person.id} className="bg-black/20 border border-white/5 rounded-xl p-4 flex flex-col items-center hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="relative mb-3">
                   <Avatar src={person.image} size="lg" />
                   <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-black">
                      {person.appearances}
                   </div>
                </div>
                <h4 className="font-bold text-white text-sm text-center mb-1">{person.name}</h4>
                <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded">{person.role}</span>
                
                {/* Hover Actions */}
                <div className="mt-3 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="w-full py-1 bg-white text-black text-[10px] font-bold rounded hover:bg-slate-200">
                      عرض المشاهد
                   </button>
                </div>
             </div>
          ))}

          {/* Add New */}
          <div className="border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-4 hover:border-white/20 hover:bg-white/5 transition-colors cursor-pointer text-slate-500 hover:text-white">
             <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-2">
                <Plus size={24} />
             </div>
             <span className="text-xs font-bold">تعريف وجه جديد</span>
          </div>
       </div>
    </div>
  );
}

