'use client';
import React from 'react';
import { Move, Maximize, RotateCw, Video, Settings, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function RobotArmControl() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
       {/* 3D Visualizer Placeholder */}
       <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-xl relative overflow-hidden flex flex-col">
          <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded border border-white/10 text-xs font-mono text-green-400">
             CONNECTED: Bolt_X_Arm_01
          </div>
          
          <div className="flex-1 bg-grid-pattern relative">
             {/* Simulated 3D View */}
             <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <div className="w-64 h-64 border-2 border-indigo-500 rounded-full animate-spin-slow border-dashed"></div>
                <div className="absolute w-48 h-48 border-2 border-purple-500 rounded-full animate-reverse-spin border-dashed"></div>
             </div>
             
             <div className="absolute bottom-8 left-8 text-white font-mono text-xs space-y-1">
                <div>X: 1240.5 mm</div>
                <div>Y: -402.1 mm</div>
                <div>Z: 850.0 mm</div>
                <div>Pan: 45.0°</div>
                <div>Tilt: -15.0°</div>
             </div>
          </div>

          <div className="p-4 bg-slate-950 border-t border-white/10 flex justify-between items-center">
             <div className="flex gap-2">
                 <Button size="sm" variant="outline" className="border-white/10 text-white"><Settings size={16} className="mr-2"/> Calibrate</Button>
                 <Button size="sm" variant="outline" className="border-white/10 text-white"><Video size={16} className="mr-2"/> Focus Pull</Button>
             </div>
             <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8">
                <Play size={16} className="mr-2" /> EXECUTE MOVE
             </Button>
          </div>
       </div>

       {/* Keyframe Timeline */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-4 flex flex-col">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
             <Move size={18} className="text-blue-400" /> Keyframes
          </h3>
          
          <div className="flex-1 overflow-y-auto space-y-2 relative">
             <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-700"></div>
             
             {[
                { time: '0s', action: 'Start Position', pos: 'X:0, Y:0' },
                { time: '2s', action: 'Sweep Left', pos: 'X:-500, Y:200' },
                { time: '4s', action: 'Top Down', pos: 'Z: 1500, Tilt: -90' },
                { time: '5.5s', action: 'End Position', pos: 'X:0, Y:0' },
             ].map((kf, i) => (
                <div key={i} className="relative pl-10 py-2 group cursor-pointer">
                   <div className="absolute left-[13px] top-1/2 -translate-y-1/2 w-3 h-3 bg-slate-900 border-2 border-blue-500 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                   <div className="bg-black/40 p-3 rounded-lg border border-white/5 group-hover:border-blue-500/50 transition-colors">
                      <div className="flex justify-between items-center mb-1">
                         <span className="font-bold text-white text-sm">{kf.action}</span>
                         <span className="text-xs text-blue-400 font-mono">{kf.time}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">{kf.pos}</div>
                   </div>
                </div>
             ))}

             <div className="relative pl-10 py-4 opacity-50 hover:opacity-100 cursor-pointer">
                 <div className="absolute left-[13px] top-1/2 -translate-y-1/2 w-3 h-3 bg-slate-700 rounded-full"></div>
                 <div className="border-2 border-dashed border-white/10 p-2 rounded-lg text-center text-xs text-slate-400">
                    + Add Keyframe
                 </div>
             </div>
          </div>
       </div>
    </div>
  );
}
