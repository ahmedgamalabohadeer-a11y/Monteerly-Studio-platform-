'use client';
import React, { useState } from 'react';
import { Mail, Smartphone, Slack, Bell } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export function NotificationMatrix() {
  const { addToast } = useToast();
  
  // Mock State for Matrix
  const [matrix, setMatrix] = useState({
    comments: { email: true, push: true, slack: false },
    mentions: { email: true, push: true, slack: true },
    project_status: { email: true, push: false, slack: true },
    marketing: { email: false, push: false, slack: false },
  });

  const toggle = (category: keyof typeof matrix, channel: 'email' | 'push' | 'slack') => {
    setMatrix(prev => ({
      ...prev,
      [category]: { ...prev[category], [channel]: !prev[category][channel] }
    }));
  };

  const handleSave = () => {
    addToast('success', 'تم حفظ تفضيلات الإشعارات بنجاح.');
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
       <div className="flex justify-between items-center mb-8">
          <div>
             <h3 className="font-bold text-white">تفضيلات التنبيهات</h3>
             <p className="text-slate-400 text-sm">تحكم في متى وكيف نصل إليك.</p>
          </div>
          <Button onClick={handleSave} className="bg-indigo-600 text-white font-bold">حفظ التغييرات</Button>
       </div>

       <div className="overflow-x-auto">
          <table className="w-full text-sm">
             <thead>
                <tr className="border-b border-white/10">
                   <th className="p-4 text-right font-bold text-slate-300 w-1/3">نوع الحدث</th>
                   <th className="p-4 text-center text-slate-400"><Mail className="mx-auto mb-1" size={18} /> البريد</th>
                   <th className="p-4 text-center text-slate-400"><Smartphone className="mx-auto mb-1" size={18} /> الجوال</th>
                   <th className="p-4 text-center text-slate-400"><Slack className="mx-auto mb-1" size={18} /> Slack</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                <tr>
                   <td className="p-4">
                      <div className="font-bold text-white">تعليقات جديدة</div>
                      <div className="text-xs text-slate-500">عندما يعلق شخص على الفيديو الخاص بك</div>
                   </td>
                   <td className="p-4 text-center"><input type="checkbox" checked={matrix.comments.email} onChange={() => toggle('comments', 'email')} className="accent-indigo-600 h-4 w-4" /></td>
                   <td className="p-4 text-center"><input type="checkbox" checked={matrix.comments.push} onChange={() => toggle('comments', 'push')} className="accent-indigo-600 h-4 w-4" /></td>
                   <td className="p-4 text-center"><input type="checkbox" checked={matrix.comments.slack} onChange={() => toggle('comments', 'slack')} className="accent-indigo-600 h-4 w-4" /></td>
                </tr>
                <tr>
                   <td className="p-4">
                      <div className="font-bold text-white">الإشارة إليك (@Mentions)</div>
                      <div className="text-xs text-slate-500">عندما يذكرك شخص في محادثة</div>
                   </td>
                   <td className="p-4 text-center"><input type="checkbox" checked={matrix.mentions.email} onChange={() => toggle('mentions', 'email')} className="accent-indigo-600 h-4 w-4" /></td>
                   <td className="p-4 text-center"><input type="checkbox" checked={matrix.mentions.push} onChange={() => toggle('mentions', 'push')} className="accent-indigo-600 h-4 w-4" /></td>
                   <td className="p-4 text-center"><input type="checkbox" checked={matrix.mentions.slack} onChange={() => toggle('mentions', 'slack')} className="accent-indigo-600 h-4 w-4" /></td>
                </tr>
                <tr>
                   <td className="p-4">
                      <div className="font-bold text-white">حالة المشروع</div>
                      <div className="text-xs text-slate-500">عند اكتمال الـ Render أو الموافقة</div>
                   </td>
                   <td className="p-4 text-center"><input type="checkbox" checked={matrix.project_status.email} onChange={() => toggle('project_status', 'email')} className="accent-indigo-600 h-4 w-4" /></td>
                   <td className="p-4 text-center"><input type="checkbox" checked={matrix.project_status.push} onChange={() => toggle('project_status', 'push')} className="accent-indigo-600 h-4 w-4" /></td>
                   <td className="p-4 text-center"><input type="checkbox" checked={matrix.project_status.slack} onChange={() => toggle('project_status', 'slack')} className="accent-indigo-600 h-4 w-4" /></td>
                </tr>
                <tr>
                   <td className="p-4">
                      <div className="font-bold text-white">أخبار وعروض</div>
                      <div className="text-xs text-slate-500">نشرات بريدية وتحديثات المنتج</div>
                   </td>
                   <td className="p-4 text-center"><input type="checkbox" checked={matrix.marketing.email} onChange={() => toggle('marketing', 'email')} className="accent-indigo-600 h-4 w-4" /></td>
                   <td className="p-4 text-center"><input type="checkbox" checked={matrix.marketing.push} onChange={() => toggle('marketing', 'push')} className="accent-indigo-600 h-4 w-4" /></td>
                   <td className="p-4 text-center"><input type="checkbox" checked={matrix.marketing.slack} onChange={() => toggle('marketing', 'slack')} className="accent-indigo-600 h-4 w-4" /></td>
                </tr>
             </tbody>
          </table>
       </div>
    </div>
  );
}
