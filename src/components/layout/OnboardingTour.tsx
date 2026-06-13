'use client';

import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const TOUR_STEPS = [
  {
    title: 'مرحباً بك في الاستوديو 👋',
    desc: 'لنأخذ جولة سريعة في مساحة العمل الجديدة الخاصة بك.',
  },
  {
    title: 'مكتبة الوسائط 📁',
    desc: 'هنا تجد جميع ملفات الفيديو والصوت والصور الخاصة بالمشروع.',
  },
  {
    title: 'التايم لاين الذكي 🎬',
    desc: 'اسحب الملفات هنا للبدء في المونتاج والقص والترتيب.',
  },
  {
    title: 'أدوات التعاون 💬',
    desc: 'اترك تعليقات دقيقة وارسم على الفيديو للتواصل مع فريقك.',
  },
] as const;

function getInitialTourVisibility(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return !localStorage.getItem('monteerly_tour_seen');
}

export function OnboardingTour() {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState<boolean>(() => getInitialTourVisibility());

  const handleFinish = () => {
    localStorage.setItem('monteerly_tour_seen', 'true');
    setShow(false);
  };

  const handleNext = () => {
    setStep((currentStep) => Math.min(currentStep + 1, TOUR_STEPS.length - 1));
  };

  const handlePrevious = () => {
    setStep((currentStep) => Math.max(currentStep - 1, 0));
  };

  if (!show) return null;

  const currentStep = TOUR_STEPS[step];

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
      <div
        className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl animate-in zoom-in-95"
        role="dialog"
        aria-modal="true"
        aria-label="جولة تعريفية"
      >
        <button
          type="button"
          onClick={handleFinish}
          className="absolute right-4 top-4 text-muted-foreground transition hover:text-foreground"
          aria-label="إغلاق الجولة التعريفية"
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
            جولة تعريفية {step + 1}/{TOUR_STEPS.length}
          </div>
          <h2 className="mb-3 text-2xl font-bold">{currentStep.title}</h2>
          <p className="leading-relaxed text-muted-foreground">{currentStep.desc}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1" aria-label="مؤشر خطوات الجولة">
            {TOUR_STEPS.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === step ? 'w-8 bg-primary' : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {step > 0 && (
              <Button variant="ghost" onClick={handlePrevious} icon={<ArrowRight size={16} />}>
                السابق
              </Button>
            )}

            {step < TOUR_STEPS.length - 1 ? (
              <Button variant="primary" onClick={handleNext}>
                التالي
                <ArrowLeft size={16} className="mr-2" />
              </Button>
            ) : (
              <Button variant="primary" onClick={handleFinish}>
                ابدأ العمل 🚀
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
