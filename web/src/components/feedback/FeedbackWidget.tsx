'use client';
import React, { useState, useRef } from 'react';
import { MessageSquare, Camera, Mic, X, Send, Image as ImageIcon, ThumbsUp, AlertCircle, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveButton } from '@/components/system/InteractiveButton'; // Using our system button

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'bug' | 'feature'>('bug');
  const [isRecording, setIsRecording] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Simulated Screenshot Function
  const takeScreenshot = () => {
    // In real implementation, we'd use html2canvas here
    setIsOpen(false); // Hide widget momentarily
    setTimeout(() => {
       setIsOpen(true);
       setScreenshot('/images/features/live.jpg'); // Mock screenshot
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate API call including system info
    const systemInfo = {
       url: window.location.href,
       userAgent: navigator.userAgent,
       resolution: `${window.innerWidth}x${window.innerHeight}`,
       timestamp: new Date().toISOString()
    };
    console.log("Sending Feedback Report:", systemInfo);
    
    setTimeout(() => {
       setSending(false);
       setSent(true);
       setTimeout(() => {
          setSent(false);
          setIsOpen(false);
          setScreenshot(null);
       }, 2000);
    }, 1500);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-[0_0_30px_rgba(79,70,229,0.4)] flex items-center gap-2 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-bold text-sm">
           رأيك يهمنا
        </span>
      </motion.button>

      {/* The Panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:justify-end sm:p-6 pointer-events-none">
            {/* Backdrop for mobile */}
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/50 sm:hidden pointer-events-auto"
               onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="bg-[#111] border border-white/10 w-full sm:w-96 rounded-t-2xl sm:rounded-2xl shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
                 <h3 className="font-bold text-white">ساهم في تطوير Monteerly</h3>
                 <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><X size={20}/></button>
              </div>

              {sent ? (
                 <div className="p-12 flex flex-col items-center justify-center text-center h-64">
                    <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                       <Check size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">شكراً لك!</h4>
                    <p className="text-slate-400 text-sm">تم استلام ملاحظاتك وسيراجعها الفريق الهندسي فوراً.</p>
                 </div>
              ) : (
                 <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-y-auto">
                    {/* Tabs */}
                    <div className="flex p-2 gap-2 bg-[#0a0a0a]">
                       <button 
                         type="button"
                         onClick={() => setActiveTab('bug')}
                         className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'bug' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'text-slate-400 hover:bg-white/5'}`}
                       >
                          <AlertCircle size={14} /> الإبلاغ عن مشكلة
                       </button>
                       <button 
                         type="button"
                         onClick={() => setActiveTab('feature')}
                         className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'feature' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-white/5'}`}
                       >
                          <ThumbsUp size={14} /> اقتراح ميزة
                       </button>
                    </div>

                    <div className="p-4 space-y-4">
                       {/* Text Area */}
                       <div>
                          <label className="block text-xs font-bold text-slate-400 mb-2">
                             {activeTab === 'bug' ? 'ماذا حدث؟ (صِف المشكلة)' : 'ما هي فكرتك العبقرية؟'}
                          </label>
                          <textarea 
                             className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-indigo-500 outline-none h-32 resize-none"
                             placeholder={activeTab === 'bug' ? 'كنت أحاول رفع فيديو وظهر خطأ...' : 'أتمنى لو كان هناك زر لـ...'}
                             required
                          />
                       </div>

                       {/* Media Controls */}
                       <div className="flex gap-2">
                          <button 
                             type="button"
                             onClick={takeScreenshot}
                             className={`flex-1 py-3 rounded-xl border border-dashed flex flex-col items-center justify-center gap-1 transition-colors ${screenshot ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-white/20 text-slate-400 hover:bg-white/5'}`}
                          >
                             {screenshot ? <Check size={20}/> : <Camera size={20} />}
                             <span className="text-[10px] font-bold">{screenshot ? 'تم الالتقاط' : 'لقطة شاشة'}</span>
                          </button>
                          
                          <button 
                             type="button"
                             onClick={() => setIsRecording(!isRecording)}
                             className={`flex-1 py-3 rounded-xl border border-dashed flex flex-col items-center justify-center gap-1 transition-colors ${isRecording ? 'border-red-500 bg-red-500/10 text-red-500 animate-pulse' : 'border-white/20 text-slate-400 hover:bg-white/5'}`}
                          >
                             {isRecording ? <div className="w-5 h-5 bg-red-500 rounded-sm" /> : <Mic size={20} />}
                             <span className="text-[10px] font-bold">{isRecording ? 'إيقاف (00:12)' : 'تسجيل صوتي'}</span>
                          </button>
                       </div>

                       {/* Screenshot Preview */}
                       {screenshot && (
                          <div className="relative rounded-lg overflow-hidden border border-white/10 group">
                             <img src={screenshot} alt="Preview" className="w-full h-24 object-cover opacity-50" />
                             <button 
                                type="button" 
                                onClick={() => setScreenshot(null)}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                             >
                                <X size={12} />
                             </button>
                             <div className="absolute bottom-1 left-2 text-[10px] text-white bg-black/50 px-1 rounded">screenshot_debug.jpg</div>
                          </div>
                       )}

                       {/* Auto-System Info (Hidden but implied) */}
                       <div className="text-[10px] text-slate-600 flex items-center gap-2 p-2 bg-black rounded border border-white/5">
                          <Loader2 size={10} className="animate-spin" />
                          سيتم إرفاق بيانات التشخيص (OS: MacIntel, Browser: Chrome) تلقائياً.
                       </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-white/10 bg-[#1a1a1a] mt-auto">
                       <InteractiveButton 
                         type="submit" 
                         loading={sending}
                         className="w-full"
                         icon={<Send size={16} />}
                       >
                          {sending ? 'جاري الإرسال...' : 'إرسال الملاحظات'}
                       </InteractiveButton>
                    </div>
                 </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

