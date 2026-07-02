'use client';

import React, { useState } from 'react';
import { User, Briefcase, GraduationCap, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { InteractiveButton } from '@/components/system/InteractiveButton';

export function WelcomeTour() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'student',
      icon: GraduationCap,
      title: 'طالب / مبتدئ',
      desc: 'أريد تعلم المونتاج وبناء معرض أعمالي.',
    },
    {
      id: 'freelancer',
      icon: User,
      title: 'مستقل (Freelancer)',
      desc: 'أريد بيع خدماتي وإدارة عملائي.',
    },
    {
      id: 'agency',
      icon: Briefcase,
      title: 'شركة إنتاج',
      desc: 'أريد إدارة فريق وعقود ضخمة.',
    },
  ];

  if (step === 3) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#111] border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="p-8">
          {step === 1 && (
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">👋</span>
              </div>
              <h2 className="text-3xl font-black text-white mb-4">مرحباً بك في Monteerly OS</h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                لنقم بضبط النظام ليناسب احتياجاتك. إجابتك ستحدد الأدوات التي ستظهر لك.
              </p>
              <InteractiveButton
                onClick={() => setStep(2)}
                className="w-48 mx-auto"
                icon={<ArrowRight size={18} />}
              >
                ابدأ التخصيص
              </InteractiveButton>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">من أنت؟</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {roles.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`p-6 rounded-xl border cursor-pointer transition-all ${
                      role === r.id
                        ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/50'
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <r.icon
                      size={32}
                      className={`mb-4 ${role === r.id ? 'text-indigo-400' : 'text-slate-400'}`}
                    />
                    <h3 className="font-bold text-white mb-2">{r.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{r.desc}</p>
                    {role === r.id && (
                      <div className="mt-4 flex justify-end">
                        <Check size={16} className="text-indigo-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <InteractiveButton
                  onClick={() => setStep(3)}
                  disabled={!role}
                  icon={<Check size={18} />}
                >
                  إكمال الإعداد
                </InteractiveButton>
              </div>
            </div>
          )}
        </div>

        <div className="h-1 bg-white/5 w-full">
          <motion.div
            className="h-full bg-indigo-600"
            initial={{ width: '0%' }}
            animate={{ width: step === 1 ? '50%' : '100%' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
