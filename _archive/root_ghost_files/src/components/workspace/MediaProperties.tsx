'use client';
import React from 'react';
import { Info, Film, Aperture, Maximize, FileType } from 'lucide-react';

export function MediaProperties() {
  const meta = {
    filename: "Scene_01_Take_04.mov",
    codec: "ProRes 422 HQ",
    resolution: "3840 x 2160 (4K UHD)",
    framerate: "23.976 fps",
    colorSpace: "Rec.709",
    bitdepth: "10-bit",
    audio: "48kHz / 24-bit / Stereo",
    duration: "00:04:12:15",
    size: "4.2 GB",
    created: "2026-01-12 14:30:00"
  };

  return (
    <div className="w-80 bg-card border-l border-border h-full flex flex-col">
       <div className="p-4 border-b border-border flex items-center gap-2 bg-muted/10">
          <Info size={16} className="text-primary" />
          <h3 className="font-bold text-sm">الخصائص التقنية (Metadata)</h3>
       </div>

       <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <Section title="معلومات الملف">
             <MetaRow label="الاسم" value={meta.filename} icon={FileType} />
             <MetaRow label="الحجم" value={meta.size} />
             <MetaRow label="تاريخ الإنشاء" value={meta.created} />
          </Section>

          <Section title="خصائص الفيديو">
             <MetaRow label="الترميز (Codec)" value={meta.codec} icon={Film} highlight />
             <MetaRow label="الأبعاد" value={meta.resolution} icon={Maximize} />
             <MetaRow label="الإطارات/ثانية" value={meta.framerate} />
          </Section>

          <Section title="الألوان والإضاءة">
             <MetaRow label="مساحة اللون" value={meta.colorSpace} icon={Aperture} />
             <MetaRow label="عمق الألوان" value={meta.bitdepth} />
          </Section>

          <Section title="الصوت">
             <MetaRow label="التنسيق" value={meta.audio} />
          </Section>
       </div>
    </div>
  );
}

function Section({ title, children }: any) {
    return (
        <div>
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">{title}</h4>
            <div className="space-y-3">{children}</div>
        </div>
    )
}

function MetaRow({ label, value, icon: Icon, highlight }: any) {
    return (
        <div className="flex justify-between items-start text-sm group">
            <span className="text-muted-foreground flex items-center gap-2">
               {Icon && <Icon size={12} />} {label}
            </span>
            <span className={`font-mono text-right select-all ${highlight ? 'text-primary font-bold' : 'text-foreground'}`}>
               {value}
            </span>
        </div>
    )
}

################################################################################