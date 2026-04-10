'use client';
import React from 'react';
import { Ticket, Calendar, Users, MessageSquare, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export function FestivalHall() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
       {/* Hero Section */}
       <div className="relative h-[500px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
          <img src="/images/features/live.jpg" className="w-full h-full object-cover opacity-60" />
          
          <div className="absolute bottom-0 left-0 w-full p-12 z-20 flex items-end justify-between">
             <div className="max-w-2xl">
                <div className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded mb-4 animate-pulse">
                   LIVE PREMIERE • STARTING IN 10:00
                </div>
                <h1 className="text-6xl font-black mb-4 tracking-tight">THE LAST SAND</h1>
                <p className="text-lg text-slate-300 mb-8 line-clamp-2">
                   قصة ملحمية عن البقاء في الربع الخالي. حصرياً العرض الأول بحضور المخرج وطاقم العمل للإجابة على أسئلتكم.
                </p>
                <div className="flex gap-4">
                   <Button className="bg-white text-black font-bold h-12 px-8 text-lg gap-2 hover:bg-slate-200">
                      <Ticket size={20} /> حجز مقعد ($15)
                   </Button>
                   <Button variant="outline" className="border-white/20 text-white h-12 px-8 text-lg gap-2 hover:bg-white/10">
                      مشاهدة الإعلان
                   </Button>
                </div>
             </div>

             <div className="hidden md:block text-right">
                <div className="text-sm font-bold text-slate-400 mb-2">Hosted by</div>
                <div className="flex items-center gap-3 justify-end">
                   <div className="text-right">
                      <div className="font-bold">Monteerly Originals</div>
                      <div className="text-xs text-slate-500">Production House</div>
                   </div>
                   <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center font-bold">M</div>
                </div>
             </div>
          </div>
       </div>

       {/* Interactive Lobby */}
       <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Schedule */}
          <div className="lg:col-span-2 space-y-8">
             <h2 className="text-2xl font-bold border-l-4 border-indigo-600 pl-4">جدول العرض</h2>
             <div className="space-y-4">
                <div className="flex gap-6 p-4 bg-slate-900/50 border border-white/5 rounded-xl hover:border-white/20 transition-all cursor-pointer">
                   <div className="text-center min-w-[80px]">
                      <div className="text-xl font-bold text-white">20:00</div>
                      <div className="text-xs text-slate-500">GMT+3</div>
                   </div>
                   <div>
                      <h3 className="font-bold text-lg text-white mb-1">Red Carpet & Pre-Show</h3>
                      <p className="text-sm text-slate-400">مقابلات حصرية مع الممثلين خلف الكواليس.</p>
                   </div>
                   <div className="ml-auto flex items-center">
                      <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">Active</span>
                   </div>
                </div>

                <div className="flex gap-6 p-4 bg-slate-900/50 border border-white/5 rounded-xl opacity-50">
                   <div className="text-center min-w-[80px]">
                      <div className="text-xl font-bold text-white">20:30</div>
                      <div className="text-xs text-slate-500">GMT+3</div>
                   </div>
                   <div>
                      <h3 className="font-bold text-lg text-white mb-1">Feature Film Screening</h3>
                      <p className="text-sm text-slate-400">مدة العرض: 124 دقيقة. جودة 4K Dolby Atmos.</p>
                   </div>
                </div>

                <div className="flex gap-6 p-4 bg-slate-900/50 border border-white/5 rounded-xl opacity-50">
                   <div className="text-center min-w-[80px]">
                      <div className="text-xl font-bold text-white">22:45</div>
                      <div className="text-xs text-slate-500">GMT+3</div>
                   </div>
                   <div>
                      <h3 className="font-bold text-lg text-white mb-1">Live Q&A with Director</h3>
                      <p className="text-sm text-slate-400">فرصة لطرح الأسئلة مباشرة.</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Live Chat / Social */}
          <div className="bg-slate-900 border border-white/10 rounded-xl flex flex-col h-[500px]">
             <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-950 rounded-t-xl">
                <div className="font-bold flex items-center gap-2 text-sm"><MessageSquare size={16}/> Live Chat</div>
                <div className="flex items-center gap-1 text-xs text-green-400"><Users size={12}/> 1,204 Online</div>
             </div>
             
             <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {[1,2,3,4,5].map(i => (
                   <div key={i} className="flex gap-3">
                      <Avatar src={`/avatars/${i%2===0 ? 'ahmed' : 'sara'}.jpg`} size="sm" />
                      <div>
                         <div className="flex items-baseline gap-2">
                            <span className="text-xs font-bold text-slate-300">User_{i*92}</span>
                            <span className="text-[10px] text-slate-600">10:0{i} PM</span>
                         </div>
                         <p className="text-xs text-white">متحمس جداً للعرض! هل سيتوفر الفيلم للتحميل لاحقاً؟</p>
                      </div>
                   </div>
                ))}
             </div>

             <div className="p-3 border-t border-white/10 bg-slate-950 rounded-b-xl">
                <input type="text" placeholder="اشترِ تذكرة للمشاركة في الدردشة..." disabled className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-xs text-white cursor-not-allowed" />
             </div>
          </div>
       </div>
    </div>
  );
}
