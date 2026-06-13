'use client';

import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const PRODUCT_TOUR_STEPS = [
  {
    title: 'مرحباً بك في Monteerly 👋',
    desc: 'دعنا نأخذك في جولة سريعة لنعرفك على أدوات النظام.',
  },
  {
    title: 'السوق (Marketplace)',
    desc: 'هنا تجد لقطات فيديو، موسيقى، وقوالب جاهزة لمشاريعك.',
  },
  {
    title: 'مساحة العمل',
    desc: 'أدر مشاريعك، تواصل مع فريقك، وراجع الفيديوهات لحظة بلحظة.',
  },
] as const;

function getInitialProductTourVisibility(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return !localStorage.getItem('tour_completed');
}

export function ProductTour() {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState<boolean>(() => getInitialProductTourVisibility());

  const handleComplete = () => {
    localStorage.setItem('tour_completed', 'true');
    setIsVisible(false);
  };

  const handleNext = () => {
    if (step < PRODUCT_TOUR_STEPS.length - 1) {
      setStep((currentStep) => currentStep + 1);
      return;
    }

    handleComplete();
  };

  const handlePrevious = () => {
    setStep((currentStep) => Math.max(currentStep - 1, 0));
  };

  if (!isVisible) return null;

  const currentStep = PRODUCT_TOUR_STEPS[step];

  return (
    <div
      className="fixed bottom-8 right-8 z-[100] w-80 rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-2xl animate-in slide-in-from-bottom-10"
      role="dialog"
      aria-live="polite"
      aria-label="جولة تعريفية بالمنتج"
    >
      <button
        type="button"
        onClick={handleComplete}
        className="absolute left-4 top-4 text-slate-400 transition hover:text-white"
        aria-label="إغلاق الجولة"
      >
        <X size={16} />
      </button>

      <div className="mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          خطوة {step + 1} من {PRODUCT_TOUR_STEPS.length}
        </span>
        <h3 className="mt-2 text-xl font-bold">{currentStep.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">{currentStep.desc}</p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-1" aria-label="مؤشر خطوات الجولة">
          {PRODUCT_TOUR_STEPS.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === step ? 'bg-primary' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          {step > 0 && (
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={handlePrevious}
            >
              <ArrowRight size={16} />
            </Button>
          )}

          <Button size="sm" variant="primary" onClick={handleNext}>
            {step < PRODUCT_TOUR_STEPS.length - 1 ? 'التالي' : 'ابدأ الآن'}
            {step < PRODUCT_TOUR_STEPS.length - 1 && <ArrowLeft size={16} className="mr-1" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
