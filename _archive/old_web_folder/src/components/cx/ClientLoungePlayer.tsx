'use client';
import React, { useState } from 'react';
import { Play, CheckCircle, MessageSquare, Download, Share2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export function ClientLoungePlayer() {
  const [status, setStatus] = useState<'review' | 'approved' | 'paid'>('review');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
       {/* Cinematic Header */}
       <header className="h-20 flex justify-between items-center px-8 border-b border-white/5 bg-black/50 backdrop-blur fixed top-0 w-full z-50">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl">M</div>
             <div>
                <h1 className="font-bold text-lg">إعلان رمضان - النسخة النهائية (v4)</h1>
                <p className="text-xs text-slate-400">تم الرفع بواسطة: محمد كمال</p>
             </div>
          </div>
          
          <div className="flex gap-4">
             {status === 'review' && (
                <>
                   <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 gap-2">
                      <MessageSquare size={16}/> طلب تعديلات
                   </Button>
                   <Button onClick={() => setStatus('approved')} className="bg-green-600 hover:bg-green-700 text-white font-bold gap-2">
                      <CheckCircle size={16}/> اعتماد الفيديو
                   </Button>
                </>
             )}
             
             {status === 'approved' && (
                <Button onClick={() => setStatus('paid')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2 animate-pulse">
                   <CreditCard size={16}/> دفع باقي المستحقات ($500)
                </Button>
             )}

             {status === 'paid' && (
                <Button className="bg-white text-black hover:bg-slate-200 font-bold gap-2">
                   <Download size={16}/> تحميل الملف الأصلي (4K)
                </Button>
             )}
          </div>
       </header>

       {/* Main Content */}
       <main className="flex-1 flex flex-col items-center justify-center pt-20 pb-10 px-4">
          <div className="w-full max-w-6xl aspect-video bg-black rounded-2xl shadow-[0_0_100px_rgba(79,70,229,0.1)] border border-white/10 relative overflow-hidden group">
             <img src="/images/features/live.jpg" className="w-full h-full object-cover" />
             
             {/* Play Button */}
             <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-24 h-24 bg-white/10 backdrop-blur rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-transform group-hover:bg-white/20">
                   <Play size={48} className="text-white ml-2" />
                </button>
             </div>

             {/* Watermark (If unpaid) */}
             {status !== 'paid' && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20 rotate-[-15deg]">
                   <span className="text-[10vw] font-black text-white">PREVIEW</span>
                </div>
             )}
          </div>

          {/* Context Info */}
          <div className="w-full max-w-6xl mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="md:col-span-2">
                <h3 className="text-xl font-bold mb-4">ملاحظات المونتير</h3>
                <div className="bg-slate-900 border border-white/10 rounded-xl p-6 flex gap-4">
                   <Avatar src="/avatars/mohamed.jpg" />
                   <div>
                      <p className="text-slate-300 text-sm leading-relaxed mb-2">
                         أهلاً أستاذ خالد، قمت بتعديل الألوان في المشهد الثالث كما طلبت، وقمت بموازنة الصوت.
                         يرجى الملاحظة أن الموسيقى الآن مرخصة بالكامل. بانتظار اعتمادكم الكريم.
                      </p>
                      <span className="text-xs text-slate-500">منذ ساعتين</span>
                   </div>
                </div>
             </div>
             
             <div>
                <h3 className="text-xl font-bold mb-4">تفاصيل الملف</h3>
                <div className="bg-slate-900 border border-white/10 rounded-xl p-6 space-y-4">
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-400">الدقة</span>
                      <span className="text-white font-mono">3840x2160 (4K)</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-400">الإطارات</span>
                      <span className="text-white font-mono">24 fps</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-400">الحجم</span>
                      <span className="text-white font-mono">1.2 GB</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-400">الكوديك</span>
                      <span className="text-white font-mono">H.264 / AAC</span>
                   </div>
                </div>
             </div>
          </div>
       </main>
    </div>
  );
}

