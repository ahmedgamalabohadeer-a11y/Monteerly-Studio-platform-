'use client';
import React, { useState } from 'react';
import { Grid, Scissors, Type, Music, Play, Save, Download, RotateCcw } from 'lucide-react';

export function StreamDeckMapper() {
  const [buttons, setButtons] = useState(Array(15).fill(null)); // 3x5 Grid

  const actions = [
     { id: 'cut', label: 'Cut Blade', icon: Scissors, color: 'bg-red-500' },
     { id: 'play', label: 'Play/Pause', icon: Play, color: 'bg-green-500' },
     { id: 'text', label: 'Add Text', icon: Type, color: 'bg-blue-500' },
     { id: 'audio', label: 'Audio Duck', icon: Music, color: 'bg-purple-500' },
     { id: 'save', label: 'Quick Save', icon: Save, color: 'bg-yellow-500' },
     { id: 'export', label: 'Export 4K', icon: Download, color: 'bg-orange-500' },
  ];

  const handleDrop = (index: number, actionId: string) => {
    const action = actions.find(a => a.id === actionId);
    const newButtons = [...buttons];
    newButtons[index] = action;
    setButtons(newButtons);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       {/* Device View */}
       <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-xl p-8 flex flex-col items-center">
          <h3 className="text-white font-bold mb-8 flex items-center gap-2">
             <Grid /> Stream Deck XL (Connected)
          </h3>
          
          <div className="bg-black p-4 rounded-2xl border-4 border-slate-800 shadow-2xl">
             <div className="grid grid-cols-5 gap-2">
                {buttons.map((btn, i) => (
                   <div 
                     key={i}
                     onDragOver={(e) => e.preventDefault()}
                     onDrop={(e) => {
                        const actionId = e.dataTransfer.getData('actionId');
                        handleDrop(i, actionId);
                     }}
                     className={`w-20 h-20 rounded-xl flex flex-col items-center justify-center cursor-pointer border-2 transition-all ${
                        btn ? `${btn.color} border-transparent text-white` : 'bg-slate-800 border-slate-700 text-slate-600 hover:border-slate-500'
                     }`}
                   >
                      {btn ? (
                         <>
                            <btn.icon size={24} className="mb-1" />
                            <span className="text-[9px] font-bold uppercase">{btn.label}</span>
                         </>
                      ) : (
                         <span className="text-[9px] opacity-50">{i + 1}</span>
                      )}
                   </div>
                ))}
             </div>
          </div>
          
          <div className="mt-8 flex gap-4">
             <button onClick={() => setButtons(Array(15).fill(null))} className="flex items-center gap-2 text-red-400 hover:text-white text-sm">
                <RotateCcw size={14} /> Reset Layout
             </button>
             <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700">
                Sync to Device
             </button>
          </div>
       </div>

       {/* Actions Sidebar */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
          <h4 className="font-bold text-white mb-4">Actions Library</h4>
          <div className="grid grid-cols-2 gap-3">
             {actions.map(action => (
                <div 
                  key={action.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('actionId', action.id)}
                  className="bg-black/30 border border-white/5 p-3 rounded-lg flex flex-col items-center justify-center cursor-grab active:cursor-grabbing hover:bg-white/5 transition-colors"
                >
                   <div className={`p-2 rounded-full ${action.color} text-white mb-2`}>
                      <action.icon size={16} />
                   </div>
                   <span className="text-xs text-slate-300 font-bold">{action.label}</span>
                </div>
             ))}
          </div>
          <div className="mt-6 p-4 bg-indigo-900/20 border border-indigo-500/20 rounded-lg text-xs text-indigo-200">
             Tip: Drag and drop actions onto the virtual deck to map them.
          </div>
       </div>
    </div>
  );
}

