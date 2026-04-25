'use client';
import React from 'react';
import { Avatar } from '@/components/ui/Avatar';
import { Trophy, ArrowUp } from 'lucide-react';

export function LeaderboardTable() {
  const users = [
    { rank: 1, name: 'سارة أحمد', role: 'Video Editor', points: 12500, avatar: '/avatars/sara.jpg' },
    { rank: 2, name: 'محمد علي', role: 'Motion Designer', points: 11200, avatar: '/avatars/mohamed.jpg' },
    { rank: 3, name: 'أحمد كمال', role: 'VFX Artist', points: 9800, avatar: '/avatars/ahmed.jpg' },
    { rank: 4, name: 'خالد عمر', role: 'Colorist', points: 8500, avatar: '/images/user.jpg' },
    { rank: 5, name: 'ليلى حسن', role: 'Sound Design', points: 7200, avatar: '/avatars/layla.jpg' },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
       <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-indigo-900/20 to-slate-900">
          <h3 className="font-bold text-white flex items-center gap-2">
             <Trophy size={18} className="text-yellow-500" /> أفضل المبدعين هذا الشهر
          </h3>
          <span className="text-xs text-slate-400">يتم التحديث كل 24 ساعة</span>
       </div>
       
       <div className="divide-y divide-white/5">
          {users.map((user) => (
             <div key={user.rank} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                <div className={`w-8 h-8 flex items-center justify-center font-bold rounded-full ${
                   user.rank === 1 ? 'bg-yellow-500 text-black' : 
                   user.rank === 2 ? 'bg-slate-300 text-black' : 
                   user.rank === 3 ? 'bg-orange-700 text-white' : 'bg-slate-800 text-slate-500'
                }`}>
                   {user.rank}
                </div>
                
                <Avatar src={user.avatar} fallback={user.name[0]} />
                
                <div className="flex-1">
                   <h4 className="font-bold text-white text-sm">{user.name}</h4>
                   <p className="text-xs text-slate-500">{user.role}</p>
                </div>
                
                <div className="text-right">
                   <div className="font-mono font-bold text-indigo-400">{user.points.toLocaleString()} XP</div>
                   <div className="text-[10px] text-green-500 flex items-center justify-end gap-1">
                      <ArrowUp size={10} /> top 1%
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

################################################################################