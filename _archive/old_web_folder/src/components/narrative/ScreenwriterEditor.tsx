'use client';
import React, { useState } from 'react';
import { AlignLeft, User, MessageSquare, MapPin, Save, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ScreenwriterEditor() {
  const [mode, setMode] = useState<'scene' | 'action' | 'character' | 'dialogue'>('scene');
  
  // Simulated Content (In a real app, this would be a rich text editor state)
  const scriptContent = [
    { type: 'scene', text: 'INT. COFFEE SHOP - DAY' },
    { type: 'action', text: 'AHMED (30s) sits nervously, tapping his fingers on the table. The cafe is buzzing.' },
    { type: 'character', text: 'AHMED' },
    { type: 'dialogue', text: 'She is late. She is never late.' },
    { type: 'character', text: 'BARISTA (O.S)' },
    { type: 'dialogue', text: 'Order for table five!' },
    { type: 'action', text: 'Ahmed looks up sharply.' },
  ];

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6">
       {/* Toolbar */}
       <div className="w-16 bg-slate-900 border border-white/10 rounded-xl flex flex-col items-center py-4 gap-4">
          <button 
            onClick={() => setMode('scene')} 
            className={`p-3 rounded-lg transition-colors ${mode === 'scene' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
            title="Scene Heading (INT/EXT)"
          >
             <MapPin size={20} />
          </button>
          <button 
            onClick={() => setMode('action')} 
            className={`p-3 rounded-lg transition-colors ${mode === 'action' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
            title="Action"
          >
             <AlignLeft size={20} />
          </button>
          <button 
            onClick={() => setMode('character')} 
            className={`p-3 rounded-lg transition-colors ${mode === 'character' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
            title="Character"
          >
             <User size={20} />
          </button>
          <button 
            onClick={() => setMode('dialogue')} 
            className={`p-3 rounded-lg transition-colors ${mode === 'dialogue' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
            title="Dialogue"
          >
             <MessageSquare size={20} />
          </button>
          
          <div className="flex-1" />
          
          <button className="p-3 text-green-400 hover:bg-green-500/10 rounded-lg" title="Auto-Save On">
             <Save size={20} />
          </button>
       </div>

       {/* Editor Canvas (Paper) */}
       <div className="flex-1 bg-[#1a1a1a] rounded-xl overflow-y-auto flex justify-center p-8 border border-white/10">
          <div className="w-full max-w-3xl bg-white min-h-[800px] shadow-2xl p-16 font-mono text-black leading-relaxed">
             {scriptContent.map((line, i) => (
                <div 
                  key={i} 
                  className={`mb-4 ${
                     line.type === 'scene' ? 'font-bold uppercase mb-6' :
                     line.type === 'character' ? 'font-bold uppercase text-center mt-6 w-1/2 mx-auto' :
                     line.type === 'dialogue' ? 'text-center w-2/3 mx-auto' :
                     ''
                  }`}
                >
                   {line.text}
                </div>
             ))}
             
             {/* Cursor Line */}
             <div className={`border-l-2 border-black animate-pulse h-6 mt-4 ${
                mode === 'scene' ? '' :
                mode === 'character' ? 'mx-auto w-1/2 text-center pl-2' :
                mode === 'dialogue' ? 'mx-auto w-2/3 text-center pl-2' :
                ''
             }`}>
                <span className="text-slate-300 select-none">Start typing...</span>
             </div>
          </div>
       </div>

       {/* Actions */}
       <div className="w-64 bg-slate-900 border border-white/10 rounded-xl p-4 flex flex-col gap-4">
          <div className="p-4 bg-black/30 rounded-lg border border-white/5">
             <h4 className="font-bold text-white text-sm mb-2">إحصائيات</h4>
             <div className="space-y-2 text-xs text-slate-400">
                <div className="flex justify-between"><span>الصفحات:</span> <span className="text-white">1</span></div>
                <div className="flex justify-between"><span>المشاهد:</span> <span className="text-white">1</span></div>
                <div className="flex justify-between"><span>مدة القراءة:</span> <span className="text-white">45s</span></div>
             </div>
          </div>

          <Button className="w-full bg-white text-black font-bold gap-2">
             <Download size={16} /> تصدير PDF
          </Button>
          <Button variant="outline" className="w-full border-white/10 text-white gap-2 text-xs">
             <FileText size={16} /> تصدير Final Draft (.fdx)
          </Button>
       </div>
    </div>
  );
}

