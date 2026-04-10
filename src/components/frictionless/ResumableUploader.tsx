'use client';
import React, { useState, useEffect } from 'react';
import { UploadCloud, X, Pause, Play, CheckCircle, AlertTriangle, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ResumableUploader() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'uploading' | 'paused' | 'error' | 'completed'>('uploading');
  const [speed, setSpeed] = useState('12 MB/s');

  // Simulate upload process with random network failure
  useEffect(() => {
    if (status !== 'uploading') return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setStatus('completed');
          return 100;
        }
        // Simulate random network error at 45%
        if (prev > 40 && prev < 45 && Math.random() > 0.8) {
           setStatus('error');
           return prev;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [status]);

  const handleResume = () => {
    setStatus('uploading');
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6 max-w-lg mx-auto">
       <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-white flex items-center gap-2">
             <UploadCloud className="text-indigo-400" /> مدير الرفع (Upload Center)
          </h3>
          <span className="text-xs text-slate-500 font-mono">
             {status === 'completed' ? 'Done' : status === 'error' ? 'Failed' : `${progress}%`}
          </span>
       </div>

       {/* File Item */}
       <div className="bg-black/30 border border-white/5 rounded-lg p-4 relative overflow-hidden">
          <div className="flex justify-between items-start mb-2 relative z-10">
             <div>
                <div className="font-bold text-white text-sm">Documentary_Raw_Footage_CamA.mxf</div>
                <div className="text-xs text-slate-400">42.5 GB • {status === 'uploading' ? speed : status}</div>
             </div>
             
             {/* Action Buttons */}
             <div className="flex gap-2">
                {status === 'uploading' && (
                   <button onClick={() => setStatus('paused')} className="p-1.5 bg-slate-800 rounded hover:bg-slate-700 text-white"><Pause size={14}/></button>
                )}
                {status === 'paused' && (
                   <button onClick={handleResume} className="p-1.5 bg-green-600 rounded hover:bg-green-700 text-white"><Play size={14}/></button>
                )}
                {status === 'error' && (
                   <button onClick={handleResume} className="px-3 py-1.5 bg-indigo-600 rounded hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1">
                      <WifiOff size={12} /> استئناف (Resume)
                   </button>
                )}
                {status === 'completed' && (
                   <div className="text-green-400"><CheckCircle size={20} /></div>
                )}
             </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
             {status === 'error' && (
                <motion.div 
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: 'auto', opacity: 1 }}
                   exit={{ height: 0, opacity: 0 }}
                   className="bg-red-500/10 border border-red-500/20 rounded px-3 py-2 mb-3 flex items-center gap-2"
                >
                   <AlertTriangle size={14} className="text-red-500" />
                   <span className="text-xs text-red-200">انقطع الاتصال. تم حفظ التقدم (42%). اضغط استئناف للمتابعة.</span>
                </motion.div>
             )}
          </AnimatePresence>

          {/* Progress Bar Container */}
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden relative">
             {/* Actual Progress */}
             <motion.div 
               className={`h-full ${status === 'error' ? 'bg-red-500' : status === 'completed' ? 'bg-green-500' : 'bg-indigo-500'}`}
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               transition={{ ease: "linear" }}
             />
             {/* Resume Marker (Ghost Progress) */}
             {status === 'error' && (
                <div className="absolute top-0 h-full w-1 bg-white/50" style={{ left: `${progress}%` }} />
             )}
          </div>
       </div>
       
       <p className="text-[10px] text-slate-500 mt-4 text-center">
          نستخدم بروتوكول TUS لضمان عدم ضياع أي بايت عند انقطاع الإنترنت.
       </p>
    </div>
  );
}
