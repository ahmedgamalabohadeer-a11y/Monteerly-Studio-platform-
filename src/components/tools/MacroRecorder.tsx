'use client';
import React, { useState, useEffect } from 'react';
import { Radio, Square, Play, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function MacroRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const addStep = () => {
     // Simulation: In real app, this listens to global events
     const actions = ["Cut Clip", "Add Cross Dissolve", "Normalize Audio", "Apply Color Grade"];
     const randomAction = actions[Math.floor(Math.random() * actions.length)];
     setSteps([...steps, randomAction]);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4">
       <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`} />
             <h3 className="font-bold text-sm">Macro Recorder</h3>
          </div>
          {isRecording && <span className="font-mono text-xs text-red-500">00:0{timer}</span>}
       </div>

       <div className="min-h-[150px] bg-muted/20 border border-border rounded-lg mb-4 p-2 space-y-1">
          {steps.length === 0 ? (
             <div className="h-full flex items-center justify-center text-xs text-muted-foreground italic">
                اضغط تسجيل لبدء تتبع الخطوات...
             </div>
          ) : (
             steps.map((step, i) => (
                <div key={i} className="text-xs bg-background border border-border px-2 py-1.5 rounded flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                   <span className="text-muted-foreground font-mono">{i + 1}.</span>
                   {step}
                </div>
             ))
          )}
       </div>

       <div className="flex gap-2">
          {!isRecording ? (
             <Button 
                className="flex-1 text-red-500 border-red-200 hover:bg-red-50" 
                variant="outline" 
                onClick={() => setIsRecording(true)}
                icon={<Radio size={14} />}
             >
                تسجيل
             </Button>
          ) : (
             <>
                <Button className="flex-1" variant="ghost" onClick={addStep} icon={<Plus size={14} />}>محاكاة خطوة</Button>
                <Button className="flex-1" variant="primary" onClick={() => setIsRecording(false)} icon={<Square size={14} />}>إيقاف وحفظ</Button>
             </>
          )}
          {steps.length > 0 && !isRecording && (
             <Button variant="outline" onClick={() => setSteps([])}><Trash size={14} /></Button>
          )}
       </div>
    </div>
  );
}

