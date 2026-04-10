'use client';
import React from 'react';
import { CheckCircle, Circle, Lock } from 'lucide-react';

export function MilestoneTracker() {
  const steps = [
     { name: 'الدفعة المقدمة (30%)', status: 'paid', date: 'Jan 10' },
     { name: 'المسودة الأولى (40%)', status: 'current', date: 'Pending' },
     { name: 'التسليم النهائي (30%)', status: 'locked', date: 'Future' },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
       <h3 className="font-bold mb-6">دفعات المشروع (Milestones)</h3>
       <div className="relative">
          {steps.map((step, i) => (
             <div key={i} className="flex items-start gap-4 mb-6 last:mb-0 relative z-10">
                <div className={`mt-0.5 ${step.status === 'paid' ? 'text-emerald-500' : step.status === 'current' ? 'text-blue-500' : 'text-muted-foreground'}`}>
                   {step.status === 'paid' ? <CheckCircle size={20} /> : step.status === 'locked' ? <Lock size={20} /> : <Circle size={20} />}
                </div>
                <div className="flex-1">
                   <div className={`font-bold text-sm ${step.status === 'locked' ? 'text-muted-foreground' : ''}`}>{step.name}</div>
                   <div className="text-xs text-muted-foreground">{step.date}</div>
                </div>
                {step.status === 'current' && (
                   <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700">دفع الآن</button>
                )}
             </div>
          ))}
          {/* Connecting Line */}
          <div className="absolute top-2 bottom-6 left-2.5 w-0.5 bg-border -z-0" />
       </div>
    </div>
  );
}
