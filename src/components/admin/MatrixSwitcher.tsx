'use client';
import React, { useState, useEffect } from 'react';
import { Layers, ChevronDown, ChevronUp, Check, X, Eye } from 'lucide-react';

// Defining the roles locally for the switcher component to be self-contained in this batch
const LAYERS = {
  Core: { color: 'bg-blue-500', roles: ['المبدع المبتدئ', 'العميل السريع', 'الضيف المراجع'] },
  Growth: { color: 'bg-green-500', roles: ['المستقل المحترف', 'بائع الأصول', 'مدير المشروع', 'وكيل المواهب'] },
  Enterprise: { color: 'bg-purple-600', roles: ['مدير الوكالة', 'العميل المؤسسي', 'مسؤول الامتثال', 'مدير الأمان', 'المحاسب'] },
  Tech: { color: 'bg-orange-500', roles: ['مهندس البث', 'مدقق الجودة (QC)', 'مزود الخدمة (Vendor)', 'المطور الداخلي'] },
  Intelligence: { color: 'bg-pink-500', roles: ['محلل البيانات', 'الراعي / المعلن', 'المشتري بالجملة'] },
  Passive: { color: 'bg-slate-500', roles: ['المالك الصامت', 'المدرب المعتمد', 'مشرف المجتمع'] },
};

export function MatrixSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedLayer, setExpandedLayer] = useState<string | null>('Core');
  const [currentRole, setCurrentRole] = useState('المبدع المبتدئ');

  // Keyboard shortcut (Ctrl + Shift + U)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'U' && e.shiftKey && (e.ctrlKey || e.metaKey)) {
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  if (!isOpen) return (
    <div className="fixed bottom-4 left-4 z-[9999] flex flex-col gap-2">
       {/* Role Indicator (Mini) */}
       <div className="bg-slate-900/90 backdrop-blur border border-white/10 rounded-full px-3 py-1.5 text-[10px] text-white flex items-center gap-2 shadow-lg">
          <Eye size={12} className="text-indigo-400" />
          <span>{currentRole}</span>
       </div>
       
       {/* Toggle Button */}
       <button 
         onClick={() => setIsOpen(true)}
         className="self-start p-3 bg-slate-900 border border-white/20 rounded-full shadow-2xl hover:bg-slate-800 text-white transition-all group"
         title="Open Matrix Switcher (Ctrl+Shift+U)"
       >
         <Layers size={20} className="group-hover:rotate-180 transition-transform duration-500" />
       </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
      <div 
        className="w-full max-w-2xl bg-slate-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-900">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers size={20} className="text-indigo-400" /> 
              مصفوفة المستخدمين (User Matrix)
            </h2>
            <p className="text-xs text-slate-400">محاكاة تجربة الـ 22 دوراً الاستراتيجي.</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {Object.entries(LAYERS).map(([layer, data]) => (
            <div key={layer} className="border border-white/5 rounded-xl overflow-hidden bg-white/[0.02]">
              <button 
                onClick={() => setExpandedLayer(expandedLayer === layer ? null : layer)}
                className="w-full p-3 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${data.color}`} />
                  <span className="font-bold text-white text-sm">{layer} Layer</span>
                  <span className="text-xs text-slate-500">({data.roles.length} roles)</span>
                </div>
                {expandedLayer === layer ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
              </button>
              
              {expandedLayer === layer && (
                <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-2 bg-black/20 border-t border-white/5">
                  {data.roles.map(role => (
                    <button
                      key={role}
                      onClick={() => { setCurrentRole(role); setIsOpen(false); }}
                      className={`flex items-start gap-3 p-3 rounded-lg text-left transition-all border ${
                        currentRole === role 
                          ? 'bg-indigo-600/20 border-indigo-500/50 ring-1 ring-indigo-500' 
                          : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/5'
                      }`}
                    >
                      <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${data.color}`} />
                      <div>
                        <div className="flex items-center gap-2">
                           <span className={`text-sm font-bold ${currentRole === role ? 'text-indigo-300' : 'text-slate-200'}`}>
                              {role}
                           </span>
                           {currentRole === role && <Check size={12} className="text-indigo-400" />}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-900 border-t border-white/10 text-center">
          <p className="text-[10px] text-slate-500">Simulation Mode Active • Changes UI & Access Rights</p>
        </div>
      </div>
    </div>
  );
}

################################################################################