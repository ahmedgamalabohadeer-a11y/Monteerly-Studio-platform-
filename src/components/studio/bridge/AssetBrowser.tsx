'use client';

import React, { useMemo, useState } from 'react';
import {
  Search,
  Music,
  Video,
  Image as ImageIcon,
  Play,
  Pause,
  ShoppingCart,
  Sparkles,
  AudioWaveform,
  Clapperboard,
  SlidersHorizontal,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

type AssetTab = 'audio' | 'video' | 'vfx';

type AssetItem = {
  id: number;
  title: string;
  author: string;
  price: string;
  duration: string;
  type: 'audio' | 'video' | 'image';
  featured?: boolean;
};

const assetsMap: Record<AssetTab, AssetItem[]> = {
  audio: [
    { id: 1, title: 'Epic Cinematic Build', author: 'Hans Zimmer Clone', price: '$15', duration: '02:10', type: 'audio', featured: true },
    { id: 2, title: 'Lo-Fi Chill Beat', author: 'Study Girl', price: '$5', duration: '03:00', type: 'audio' },
    { id: 3, title: 'Horror Suspense', author: 'Scary Sound', price: '$10', duration: '01:45', type: 'audio' },
  ],
  video: [
    { id: 4, title: 'Aerial Dubai 4K', author: 'Drone Master', price: '$45', duration: '00:15', type: 'video', featured: true },
    { id: 5, title: 'Green Screen Fire', author: 'VFX Pro', price: '$12', duration: '00:05', type: 'video' },
  ],
  vfx: [
    { id: 6, title: 'Dust Particles Overlay', author: 'Studio X', price: '$8', duration: '-', type: 'image' },
  ],
};

const tabMeta: Record<
  AssetTab,
  {
    label: string;
    icon: React.ReactNode;
    emptyTitle: string;
    emptySubtitle: string;
  }
> = {
  audio: {
    label: 'الصوتيات',
    icon: <Music size={18} />,
    emptyTitle: 'لا توجد نتائج صوتية',
    emptySubtitle: 'جرّب كلمات بحث أخرى أو بدّل إلى تبويب مختلف.',
  },
  video: {
    label: 'الفيديو',
    icon: <Video size={18} />,
    emptyTitle: 'لا توجد مقاطع فيديو مطابقة',
    emptySubtitle: 'وسّع البحث أو راجع العناصر المميزة في المتجر.',
  },
  vfx: {
    label: 'المؤثرات',
    icon: <ImageIcon size={18} />,
    emptyTitle: 'لا توجد عناصر VFX حالياً',
    emptySubtitle: 'قد تتم إضافة حزم جديدة إلى السوق لاحقًا.',
  },
};

export function AssetBrowser() {
  const [activeTab, setActiveTab] = useState<AssetTab>('audio');
  const [playing, setPlaying] = useState<number | null>(null);
  const [purchasing, setPurchasing] = useState<number | null>(null);
  const [query, setQuery] = useState('');

  const filteredAssets = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return assetsMap[activeTab].filter((item) => {
      if (!normalized) return true;

      return (
        item.title.toLowerCase().includes(normalized) ||
        item.author.toLowerCase().includes(normalized) ||
        item.price.toLowerCase().includes(normalized)
      );
    });
  }, [activeTab, query]);

  const handleBuy = (id: number) => {
    setPurchasing(id);

    setTimeout(() => {
      setPurchasing(null);
      alert('تم الشراء وإضافة الملف إلى مشروعك!');
    }, 1500);
  };

  const activeMeta = tabMeta[activeTab];

  return (
    <aside className="w-80 bg-[#111] border-r border-white/10 flex flex-col h-full">
      <div className="border-b border-white/10 px-4 py-4 bg-gradient-to-b from-white/[0.03] to-transparent">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-400" />
              متجر الأصول
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              استعرض وأضف العناصر مباشرة إلى مشروعك.
            </p>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-400/20">
            Live Market
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(tabMeta) as AssetTab[]).map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`py-2.5 rounded-lg flex flex-col items-center justify-center gap-1 transition-all border ${
                  isActive
                    ? 'text-indigo-300 border-indigo-400/30 bg-indigo-500/10'
                    : 'text-slate-400 border-white/5 bg-white/[0.02] hover:text-white hover:bg-white/5'
                }`}
                aria-label={`فتح تبويب ${tabMeta[tab].label}`}
              >
                {tabMeta[tab].icon}
                <span className="text-[10px] font-bold">{tabMeta[tab].label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-3 border-b border-white/10 space-y-3">
        <div className="relative">
          <Search
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="بحث في المتجر..."
            className="w-full bg-black border border-white/10 rounded-lg pr-9 pl-3 py-2 text-xs text-white focus:border-indigo-500 outline-none"
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <SlidersHorizontal size={12} />
            {activeMeta.label}
          </span>
          <span>{filteredAssets.length} نتيجة</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {filteredAssets.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-12 h-12 rounded-full bg-white/5 text-slate-400 flex items-center justify-center mb-3">
              {activeMeta.icon}
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              {activeMeta.emptyTitle}
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {activeMeta.emptySubtitle}
            </p>
          </div>
        ) : (
          filteredAssets.map((item) => {
            const isPlaying = playing === item.id;
            const isPurchasing = purchasing === item.id;

            return (
              <article
                key={item.id}
                className="bg-[#1a1a1a] border border-white/5 rounded-lg p-3 group hover:border-white/20 transition-all cursor-grab active:cursor-grabbing"
              >
                <div className="flex justify-between items-start mb-2 gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <div className="font-bold text-white text-sm line-clamp-1">
                        {item.title}
                      </div>

                      {item.featured && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-400/20">
                          <Sparkles size={10} />
                          مميز
                        </span>
                      )}
                    </div>

                    <div className="text-[10px] text-slate-500 flex items-center gap-2 flex-wrap">
                      <span>{item.author}</span>
                      <span>•</span>
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  <div className="text-green-400 font-bold text-sm shrink-0">
                    {item.price}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/5">
                    {item.type === 'audio' ? (
                      <AudioWaveform size={11} />
                    ) : item.type === 'video' ? (
                      <Clapperboard size={11} />
                    ) : (
                      <ImageIcon size={11} />
                    )}
                    {item.type === 'audio'
                      ? 'جاهز للمكساج'
                      : item.type === 'video'
                      ? 'جاهز للتايملاين'
                      : 'Overlay / VFX'}
                  </span>

                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/5">
                    <CheckCircle2 size={11} />
                    ترخيص مباشر
                  </span>
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setPlaying(isPlaying ? null : item.id)}
                    className="p-2 bg-white/10 rounded hover:bg-white/20 text-white transition-colors"
                    aria-label={
                      isPlaying
                        ? `إيقاف معاينة ${item.title}`
                        : `تشغيل معاينة ${item.title}`
                    }
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </button>

                  <Button
                    onClick={() => handleBuy(item.id)}
                    disabled={isPurchasing}
                    size="sm"
                    className={`flex-1 h-9 text-xs font-bold ${
                      isPurchasing
                        ? 'bg-slate-700 hover:bg-slate-700'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    } text-white`}
                    aria-label={`شراء الأصل ${item.title}`}
                  >
                    {isPurchasing ? (
                      <span className="flex items-center gap-1 animate-pulse">
                        جاري التحميل...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <ShoppingCart size={12} />
                        شراء واستخدام
                      </span>
                    )}
                  </Button>
                </div>
              </article>
            );
          })
        )}
      </div>

      <div className="p-3 bg-gradient-to-r from-indigo-900 to-purple-900 border-t border-white/10">
        <div className="text-xs text-white font-bold mb-1">Monteerly Pro</div>
        <p className="text-[10px] text-indigo-200 mb-2">
          احصل على خصم 50% على كل الأصول وإدراج فوري داخل المشروع.
        </p>
        <button
          type="button"
          className="w-full bg-white text-indigo-900 text-xs font-bold py-2 rounded hover:bg-slate-100 transition-colors"
        >
          ترقية الآن
        </button>
      </div>
    </aside>
  );
}
