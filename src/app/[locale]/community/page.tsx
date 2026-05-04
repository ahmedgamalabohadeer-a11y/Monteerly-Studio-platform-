'use client'
import React from 'react';
import { Users, DownloadCloud, Heart, MessageCircle } from 'lucide-react';

export default function CommunityPage() {
  const assets = [
    { title: "حزمة ألوان سينمائية (Teal & Orange)", type: "LUTs", author: "طارق زياد", downloads: 1240, price: "مجاني" },
    { title: "انتقالات احترافية لبريمير برو", type: "Premiere Presets", author: "سارة محمد", downloads: 856, price: "$15" },
    { title: "مؤثرات صوتية (Whooshes & Impacts)", type: "SFX", author: "أحمد جمال", downloads: 3200, price: "مجاني" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-6 text-center">
          <div className="inline-block bg-rose-500/10 p-4 rounded-full mb-4">
            <Users className="w-10 h-10 text-rose-500" />
          </div>
          <h1 className="text-4xl font-black mb-2">مجتمع MCOS ومخزن الأصول</h1>
          <p className="text-slate-400">شارك أدواتك، حمل ملحقات المونتاج، وابنِ شبكتك الإبداعية.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feed / Discussions */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black mb-4">أحدث النقاشات</h2>
            {[1, 2].map((post) => (
              <div key={post} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-full"></div>
                  <div>
                    <h4 className="font-bold text-sm">مبدع MCOS #{post}</h4>
                    <p className="text-xs text-slate-500">منذ ساعتين</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  هل وجدتم طريقة أفضل للتعامل مع رندر الـ 4K داخل الـ Workspace الجديد؟ أعتقد أن توزيع الأحمال على Cloudflare R2 سرّع العملية بشكل لا يصدق.
                </p>
                <div className="flex gap-4 text-slate-500 text-sm font-bold border-t border-slate-800 pt-4">
                  <button className="flex items-center gap-1 hover:text-rose-400 transition-colors"><Heart className="w-4 h-4" /> 24</button>
                  <button className="flex items-center gap-1 hover:text-indigo-400 transition-colors"><MessageCircle className="w-4 h-4" /> 5</button>
                </div>
              </div>
            ))}
          </div>

          {/* Vault / Asset Marketplace */}
          <aside className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl h-fit">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
              <DownloadCloud className="w-5 h-5 text-emerald-400" /> مخزن الأصول (Vault)
            </h2>
            <div className="space-y-4">
              {assets.map((asset, i) => (
                <div key={i} className="bg-slate-950 p-4 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] bg-slate-950 text-slate-300 px-2 py-1 rounded font-black">{asset.type}</span>
                    <span className={`text-xs font-black ${asset.price === 'مجاني' ? 'text-emerald-400' : 'text-indigo-400'}`}>{asset.price}</span>
                  </div>
                  <h4 className="font-bold text-sm mb-1">{asset.title}</h4>
                  <p className="text-xs text-slate-500 mb-3">بواسطة: {asset.author}</p>
                  <button className="w-full bg-slate-950 hover:bg-emerald-600 text-white py-2 rounded-xl text-xs font-bold transition-all">
                    تحميل إلى مكتبتي
                  </button>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
