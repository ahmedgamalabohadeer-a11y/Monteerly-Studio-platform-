'use client';
import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MonitorUp, MessageSquare, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
export function MeetingRoom() {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  return (
    <div className="flex flex-col h-full bg-slate-950 text-white rounded-xl overflow-hidden border border-slate-800">
       {/* Main Stage */}
       <div className="flex-1 p-4 flex items-center justify-center relative">
          <div className="grid grid-cols-2 gap-4 w-full max-w-4xl h-full max-h-[600px]">
             {/* Local User */}
             <div className="bg-slate-900 rounded-2xl relative overflow-hidden border border-slate-800 flex items-center justify-center">
                {camOn ? (
                   <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center text-slate-600">[Camera Feed]</div>
                ) : (
                   <Avatar size="xl" fallback="ME" />
                )}
                <div className="absolute bottom-4 left-4 bg-black/60 px-2 py-1 rounded text-xs">أنت</div>
             </div>
             {/* Remote User */}
             <div className="bg-slate-900 rounded-2xl relative overflow-hidden border border-slate-800 flex items-center justify-center">
                <Avatar size="xl" fallback="CL" className="bg-blue-600" />
                <div className="absolute bottom-4 left-4 bg-black/60 px-2 py-1 rounded text-xs">العميل (أحمد)</div>
                <div className="absolute top-4 right-4 bg-red-500 w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_red]" />
             </div>
          </div>
       </div>
       {/* Controls Bar */}
       <div className="h-20 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-4 px-6">
          <ControlBtn 
             icon={micOn ? Mic : MicOff} 
             active={micOn} 
             onClick={() => setMicOn(!micOn)} 
             label="Mic"
          />
          <ControlBtn 
             icon={camOn ? Video : VideoOff} 
             active={camOn} 
             onClick={() => setCamOn(!camOn)} 
             label="Cam"
          />
          <div className="w-[1px] h-8 bg-slate-700 mx-2" />
          <ControlBtn icon={MonitorUp} label="Share" />
          <ControlBtn icon={MessageSquare} label="Chat" badge={2} />
          <ControlBtn icon={Users} label="People" />
          <div className="w-[1px] h-8 bg-slate-700 mx-2" />
          <Button variant="danger" className="rounded-full px-6 h-12 bg-red-600 hover:bg-red-700 border-none shadow-lg shadow-red-900/20">
             <PhoneOff size={20} className="mr-2" /> إنهاء
          </Button>
       </div>
    </div>
  );
}
function ControlBtn({ icon: Icon, active = true, onClick, label, badge }: any) {
    return (
        <button 
           onClick={onClick}
           className={`relative p-3 rounded-full transition-all flex flex-col items-center gap-1 ${active ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'}`}
        >
           <Icon size={20} />
           {badge && <span className="absolute top-0 right-0 w-4 h-4 bg-blue-500 text-[10px] rounded-full flex items-center justify-center border border-slate-900">{badge}</span>}
        </button>
    )
}
