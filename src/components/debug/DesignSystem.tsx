'use client';
import React from 'react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { Play, Pause, Check, AlertTriangle, Shield, User } from 'lucide-react';

export function DesignSystem() {
  const { addToast } = useToast();

  return (
    <div className="space-y-12">
       {/* Buttons Section */}
       <section>
          <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">1. الأزرار (Buttons)</h3>
          <div className="flex flex-wrap gap-4 items-center">
             <Button>Primary Button</Button>
             <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Brand Color</Button>
             <Button variant="outline" className="text-white border-white/20">Outline</Button>
             <Button className="bg-red-500 hover:bg-red-600 text-white">Destructive</Button>
             <Button className="bg-green-500 hover:bg-green-600 text-white gap-2"><Play size={16}/> With Icon</Button>
             <Button disabled className="bg-slate-700 text-slate-400 cursor-not-allowed">Disabled</Button>
          </div>
       </section>

       {/* Feedback & Toasts */}
       <section>
          <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">2. التنبيهات (Feedback System)</h3>
          <div className="flex flex-wrap gap-4">
             <Button onClick={() => addToast('success', 'تم حفظ التغييرات بنجاح!')} className="bg-green-900/50 border border-green-500/50 text-green-400">
                Trigger Success
             </Button>
             <Button onClick={() => addToast('error', 'فشل الاتصال بالسيرفر.')} className="bg-red-900/50 border border-red-500/50 text-red-400">
                Trigger Error
             </Button>
             <Button onClick={() => addToast('warning', 'مساحة التخزين قاربت على الامتلاء.')} className="bg-yellow-900/50 border border-yellow-500/50 text-yellow-400">
                Trigger Warning
             </Button>
             <Button onClick={() => addToast('info', 'لديك رسالة جديدة من سارة.')} className="bg-blue-900/50 border border-blue-500/50 text-blue-400">
                Trigger Info
             </Button>
          </div>
       </section>

       {/* Typography & Colors */}
       <section>
          <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">3. الألوان والخطوط (Theme)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="p-4 rounded-xl bg-indigo-600 text-white text-center font-bold">Brand Primary</div>
             <div className="p-4 rounded-xl bg-purple-600 text-white text-center font-bold">Brand Secondary</div>
             <div className="p-4 rounded-xl bg-slate-900 text-slate-400 text-center border border-white/10">Surface Dark</div>
             <div className="p-4 rounded-xl bg-black text-white text-center border border-white/10">Background</div>
          </div>
       </section>
    </div>
  );
}

################################################################################