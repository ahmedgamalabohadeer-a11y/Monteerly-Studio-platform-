'use client';
import React from 'react';
import { Hash, Volume2, Lock, Plus } from 'lucide-react';

export function TeamChannels() {
  return (
    <div className="w-64 bg-muted/10 border-r border-border h-full p-4 hidden md:flex flex-col">
       <div className="flex justify-between items-center mb-6 px-2">
          <h3 className="font-bold text-sm text-muted-foreground uppercase">القنوات</h3>
          <button className="text-muted-foreground hover:text-primary"><Plus size={16} /></button>
       </div>

       <div className="space-y-1 flex-1">
          <ChannelItem name="عام (General)" active />
          <ChannelItem name="إعلانات هامة" icon={Volume2} />
          <ChannelItem name="أفكار عشوائية" />
          <ChannelItem name="المالية" icon={Lock} />
       </div>

       <div className="pt-4 border-t border-border mt-4">
          <h3 className="font-bold text-sm text-muted-foreground uppercase mb-3 px-2">المتواجدون (3)</h3>
          <div className="flex -space-x-2 space-x-reverse px-2">
             <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-background" />
             <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-background" />
             <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-background" />
          </div>
       </div>
    </div>
  );
}

function ChannelItem({ name, icon: Icon = Hash, active }: unknown) {
    return (
        <button className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${active ? 'bg-primary/10 text-primary font-bold' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
            <Icon size={16} />
            <span>{name}</span>
        </button>
    )
}

