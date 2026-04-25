'use client';
import React from 'react';
import { Medal, TrendingUp } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export function Leaderboard() {
  const users = [
    { rank: 1, name: 'سارة العمري', role: 'Editor', xp: '12,450', avatar: '/avatars/sara.jpg' },
    { rank: 2, name: 'محمد كمال', role: 'Colorist', xp: '10,200', avatar: '/avatars/mohamed.jpg' },
    { rank: 3, name: 'خالد عمر', role: 'Sound', xp: '9,800', avatar: '/avatars/khaled.jpg' },
    { rank: 4, name: 'يوسف أحمد', role: 'VFX', xp: '8,500', avatar: '/avatars/youssef.jpg' },
  ];

  return (
    <div className="bg-gradient-to-b from-indigo-900/20 to-slate-900 border border-white/10 rounded-xl p-6">
       <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-white flex items-center gap-2">
             <Medal className="text-yellow-400" /> أفضل المبدعين
          </h3>
          <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">هذا الأسبوع</span>
       </div>

       <div className="space-y-4">
          {users.map((user) => (
             <div key={user.rank} className="flex items-center gap-4 p-3 rounded-xl bg-black/20 border border-white/5 hover:bg-white/5 transition-colors">
                <div className={`text-xl font-black w-8 text-center ${
                   user.rank === 1 ? 'text-yellow-400' : 
                   user.rank === 2 ? 'text-slate-300' : 
                   user.rank === 3 ? 'text-orange-400' : 'text-slate-600'
                }`}>
                   {user.rank}
                </div>
                <Avatar src={user.avatar} fallback={user.name[0]} />
                <div className="flex-1">
                   <div className="font-bold text-white text-sm">{user.name}</div>
                   <div className="text-[10px] text-slate-400">{user.role}</div>
                </div>
                <div className="text-right">
                   <div className="font-bold text-indigo-400 text-sm">{user.xp} XP</div>
                   <div className="text-[10px] text-green-500 flex items-center justify-end gap-1">
                      <TrendingUp size={10} /> top 1%
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

