'use client';
import React, { useState } from 'react';
import { LayoutTemplate, Monitor, Smartphone } from 'lucide-react';

export function VideoOverlays() {
  const [activeOverlay, setActiveOverlay] = useState<'none' | 'broadcast' | 'social'>('none');

  return (
    <div className="absolute top-4 right-4 z-40">
       <div className="bg-black/60 backdrop-blur rounded-lg p-1 flex gap-1 border border-white/10">
          <OverlayBtn 
             icon={LayoutTemplate} 
             active={activeOverlay === 'none'} 
             onClick={() => setActiveOverlay('none')} 
             tooltip="Off"
          />
          <OverlayBtn 
             icon={Monitor} 
             active={activeOverlay === 'broadcast'} 
             onClick={() => setActiveOverlay('broadcast')} 
             tooltip="Broadcast Safe (TV)"
          />
          <OverlayBtn 
             icon={Smartphone} 
             active={activeOverlay === 'social'} 
             onClick={() => setActiveOverlay('social')} 
             tooltip="Social Safe (9:16)"
          />
       </div>

       {/* The Overlay Layer (This sits on top of the video) */}
       {activeOverlay !== 'none' && (
          <div className="absolute top-0 right-0 w-[800px] h-[450px] pointer-events-none mt-12 origin-top-right scale-50 opacity-50 border-2 border-red-500/0"> 
             {/* Note: In real usage, this div wraps the video player directly */}
             
             {activeOverlay === 'broadcast' && (
                <>
                   <div className="absolute inset-[10%] border-2 border-dashed border-green-500/50" title="Title Safe" />
                   <div className="absolute inset-[5%] border-2 border-green-500/30" title="Action Safe" />
                   <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-green-500/20" /> {/* Crosshair */}
                   <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-green-500/20" />
                </>
             )}

             {activeOverlay === 'social' && (
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[30%] border-l-2 border-r-2 border-dashed border-yellow-500/50 h-full">
                   <div className="absolute top-[15%] bottom-[15%] left-0 right-0 border-t-2 border-b-2 border-yellow-500/30" /> {/* UI Clear Zone */}
                </div>
             )}
          </div>
       )}
    </div>
  );
}

function OverlayBtn({ icon: Icon, active, onClick, tooltip }: any) {
    return (
        <button 
           onClick={onClick}
           title={tooltip}
           className={`p-2 rounded transition-colors ${active ? 'bg-primary text-white' : 'text-slate-300 hover:bg-white/10'}`}
        >
           <Icon size={16} />
        </button>
    )
}
