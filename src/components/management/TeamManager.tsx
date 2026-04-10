'use client';
import React from 'react';
import { UserPlus, Shield, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export function TeamManager() {
  const members = [
    { name: 'محمد كمال', email: 'mohamed@example.com', role: 'Admin', avatar: '/avatars/mohamed.jpg' },
    { name: 'سارة علي', email: 'sara@example.com', role: 'Editor', avatar: '/avatars/sara.jpg' },
    { name: 'خالد عمر', email: 'khaled@example.com', role: 'Viewer', avatar: '/avatars/khaled.jpg' },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6 h-full">
       <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-white">أعضاء الفريق</h3>
          <Button size="sm" className="bg-white text-black hover:bg-slate-200 text-xs font-bold">
             <UserPlus size={14} className="mr-1" /> دعوة
          </Button>
       </div>

       <div className="space-y-4">
          {members.map((member, i) => (
             <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3">
                   <Avatar src={member.avatar} fallback={member.name[0]} size="sm" />
                   <div>
                      <div className="text-sm font-bold text-white">{member.name}</div>
                      <div className="text-xs text-slate-500">{member.email}</div>
                   </div>
                </div>
                
                <div className="flex items-center gap-3">
                   <span className={`text-[10px] px-2 py-0.5 rounded border ${
                      member.role === 'Admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                      member.role === 'Editor' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-slate-500/10 text-slate-400 border-slate-500/20'
                   }`}>
                      {member.role}
                   </span>
                   <button className="text-slate-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={16} />
                   </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}
