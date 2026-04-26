'use client';
import React, { useState } from 'react';
import { Sparkles, Copy, RefreshCw, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

export function AiScriptWriter() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generateScript = () => {
    if (!prompt) return;
    setLoading(true);
    // Simulation of AI API Call
    setTimeout(() => {
      setResult(`[المشهد 1: لقطة واسعة - نهار]\nتظهر المدينة مزدحمة، صوت أبواق السيارات يملأ المكان.\n\nالمعلق الصوتي (بصوت هادئ):\n"في وسط كل هذا الضجيج... هل بحثت يوماً عن لحظة هدوء؟"\n\n[المشهد 2: قطع سريع - لقطة مقربة]\nشخص يرتدي سماعات Monteerly العازلة للضوضاء، يبتسم وتختفي أصوات الشارع.`);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 h-full flex flex-col">
       <div className="flex items-center gap-2 mb-4 text-purple-600">
          <Sparkles size={20} />
          <h3 className="font-bold text-lg">مساعد الكتابة الذكي (AI)</h3>
       </div>

       <div className="space-y-4 mb-4">
          <Textarea 
             placeholder="أوصف فكرة الفيديو... (مثلاً: إعلان لسماعات عازلة للضوضاء مدته 30 ثانية بأسلوب تشويقي)"
             value={prompt}
             onChange={(e) => setPrompt(e.target.value)}
             className="h-24 bg-muted/30"
          />
          <Button 
             onClick={generateScript} 
             disabled={loading || !prompt} 
             className="w-full bg-gradient-to-r from-purple-600 to-blue-600 border-none text-white hover:opacity-90"
             icon={loading ? <RefreshCw className="animate-spin" size={16} /> : <Wand2 size={16} />}
          >
             {loading ? 'جاري التفكير...' : 'توليد السكربت'}
          </Button>
       </div>

       {result && (
          <div className="flex-1 bg-muted/50 border border-border rounded-xl p-4 relative animate-in fade-in slide-in-from-bottom-2">
             <button 
                onClick={() => navigator.clipboard.writeText(result)}
                className="absolute top-2 left-2 p-1.5 hover:bg-white/50 rounded-lg text-muted-foreground hover:text-primary transition-colors"
                title="نسخ النص"
             >
                <Copy size={16} />
             </button>
             <pre className="text-sm font-medium whitespace-pre-wrap leading-relaxed font-sans text-foreground">
                {result}
             </pre>
          </div>
       )}
    </div>
  );
}

