'use client';
import React, { useState } from 'react';
import { CheckCircle, Circle, Gift, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function OnboardingChecklist() {
  const [steps, setSteps] = useState([
    { id: 1, title: 'إنشاء حسابك', completed: true },
    { id: 2, title: 'رفع أول فيديو تجريبي', completed: false },
    { id: 3, title: 'دعوة عضو للفريق', completed: false },
    { id: 4, title: 'توصيل قناة يوتيوب', completed: false },
  ]);

  const completedCount = steps.filter(s => s.completed).length;
  const progress = (completedCount / steps.length) * 100;

  const toggleStep = (id: number) => {
    setSteps(steps.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-black border border-white/10 rounded-xl p-6 relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Gift size={120} />
       </div>

       <div className="relative z-10">
          <div className="flex justify-between items-end mb-4">
             <div>
                <h3 className="font-bold text-white text-lg">ابدأ رحلتك 🚀</h3>
                <p className="text-xs text-indigo-200">أكمل الخطوات لفتح 5GB مساحة إضافية.</p>
             </div>
             <div className="text-right">
                <span className="text-2xl font-black text-white">{Math.round(progress)}%</span>
             </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-800 rounded-full mb-6 overflow-hidden">
             <motion.div 
               className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
             />
          </div>

          <div className="space-y-3">
             {steps.map((step) => (
                <motion.div 
                  key={step.id}
                  onClick={() => toggleStep(step.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${step.completed ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-black/20 border border-white/5 hover:bg-white/5'}`}
                  whileHover={{ x: 5 }}
                >
                   {step.completed ? (
                      <CheckCircle size={20} className="text-indigo-400 shrink-0" />
                   ) : (
                      <Circle size={20} className="text-slate-500 shrink-0" />
                   )}
                   <span className={`text-sm font-medium ${step.completed ? 'text-white line-through opacity-50' : 'text-slate-200'}`}>
                      {step.title}
                   </span>
                   {!step.completed && <ChevronRight size={16} className="ml-auto text-slate-600" />}
                </motion.div>
             ))}
          </div>

          {progress === 100 && (
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-center"
             >
                <div className="text-green-400 font-bold text-sm mb-1">🎉 مبروك!</div>
                <p className="text-xs text-green-200">تم إضافة 5GB إلى حسابك بنجاح.</p>
             </motion.div>
          )}
       </div>
    </div>
  );
}

