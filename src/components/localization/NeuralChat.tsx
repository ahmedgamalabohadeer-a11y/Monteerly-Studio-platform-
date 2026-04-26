'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Send, Globe, Languages, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  sender: 'me' | 'other';
  original: string;
  translated: string;
  lang: 'en' | 'ar';
}

export function NeuralChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'other', original: "Hi, I need changes on the intro scene.", translated: "مرحباً، أحتاج إلى تعديلات على مشهد المقدمة.", lang: 'en' },
    { id: 2, sender: 'me', original: "تمام، سأقوم بذلك حالاً. هل الألوان جيدة؟", translated: "Sure, I'll do it right away. Are the colors okay?", lang: 'ar' },
  ]);
  const [input, setInput] = useState('');
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      sender: 'me',
      original: input,
      translated: "Translating...", // Placeholder for demo
      lang: 'ar'
    };
    setMessages([...messages, newMsg]);
    setInput('');
    
    // Simulate AI Translation Response
    setTimeout(() => {
       setMessages(prev => prev.map(m => m.id === newMsg.id ? {...m, translated: "The colors look fantastic, thank you!"} : m));
    }, 1000);

    // Simulate Reply
    setTimeout(() => setIsTyping(true), 2000);
    setTimeout(() => {
       setIsTyping(false);
       setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'other',
          original: "Yes, perfect! Please export in 4K.",
          translated: "نعم، ممتازة! يرجى التصدير بدقة 4K.",
          lang: 'en'
       }]);
    }, 4000);
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden h-[600px] flex flex-col max-w-2xl mx-auto shadow-2xl">
       {/* Header */}
       <div className="p-4 border-b border-white/10 bg-[#0a0a0a] flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">J</div>
             <div>
                <div className="font-bold text-white">John Doe (Client)</div>
                <div className="text-xs text-green-400 flex items-center gap-1">
                   <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/> Online • New York
                </div>
             </div>
          </div>
          <button 
            onClick={() => setAutoTranslate(!autoTranslate)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${autoTranslate ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-400'}`}
          >
             <Languages size={14} /> {autoTranslate ? 'الترجمة نشطة' : 'الترجمة متوقفة'}
          </button>
       </div>

       {/* Messages Area */}
       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
          {messages.map((msg) => (
             <motion.div 
               key={msg.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
             >
                <div className={`max-w-[80%] rounded-2xl p-4 ${msg.sender === 'me' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-800 text-white rounded-bl-none'}`}>
                   {/* Primary Text (Translated if Auto is On, otherwise Original) */}
                   <div className="text-sm font-medium leading-relaxed">
                      {autoTranslate && msg.sender === 'other' ? msg.translated : msg.original}
                      {autoTranslate && msg.sender === 'me' ? msg.original : null}
                   </div>
                   
                   {/* Secondary Text (Original) - subtle */}
                   {autoTranslate && (
                      <div className={`mt-2 pt-2 border-t text-xs opacity-50 ${msg.sender === 'me' ? 'border-indigo-400/30' : 'border-slate-600'}`}>
                         <div className="flex items-center gap-1 mb-0.5 text-[9px] uppercase tracking-wider">
                            <Globe size={10} /> {msg.sender === 'other' ? 'Original (English)' : 'Translated (English)'}
                         </div>
                         {msg.sender === 'other' ? msg.original : msg.translated}
                      </div>
                   )}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">{new Date().toLocaleTimeString()}</span>
             </motion.div>
          ))}
          
          {isTyping && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-slate-500 text-xs px-4">
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"/>
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-100"/>
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-200"/>
                <span className="ml-2">John is typing...</span>
             </motion.div>
          )}
       </div>

       {/* Input Area */}
       <div className="p-4 bg-[#0a0a0a] border-t border-white/10">
          <div className="flex items-center gap-2 bg-slate-900 border border-white/10 rounded-xl px-4 py-2 focus-within:border-indigo-500 transition-colors">
             <input 
               className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none h-10"
               placeholder="اكتب رسالتك بالعربية..."
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
             />
             <button 
               onClick={handleSend}
               className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
             >
                <Send size={18} />
             </button>
          </div>
          <div className="text-center mt-2 text-[10px] text-slate-600">
             يتم ترجمة الرسائل فورياً باستخدام Monteerly Neural Engine™
          </div>
       </div>
    </div>
  );
}

