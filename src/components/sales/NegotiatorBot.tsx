'use client';
import React, { useState } from 'react';
import { Send, Bot, User, Check, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function NegotiatorBot() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'مرحباً! أنا المساعد الذكي لمحمد. كيف يمكنني مساعدتك في مشروعك القادم؟' },
    { id: 2, sender: 'user', text: 'أريد فيديو موشن جرافيك مدته دقيقة واحدة.' },
    { id: 3, sender: 'bot', text: 'رائع! هل لديك السيناريو جاهز أم نحتاج لكتابته؟ وهل هناك تعليق صوتي؟' },
    { id: 4, sender: 'user', text: 'السيناريو جاهز، أحتاج فقط التحريك والتعليق الصوتي.' },
    { id: 5, sender: 'bot', text: 'فهمت. بناءً على أسعار السوق وجودة أعمال محمد، السعر التقديري هو $450 - $600. هل هذا ضمن ميزانيتك؟' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if(!input) return;
    setMessages([...messages, { id: Date.now(), sender: 'user', text: input }]);
    setInput('');
    // Simulate bot response
    setTimeout(() => {
       setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: 'جاري تحضير عرض السعر الرسمي... لحظة من فضلك.' }]);
    }, 1000);
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl flex flex-col h-[600px] max-w-md mx-auto shadow-2xl">
       {/* Header */}
       <div className="p-4 border-b border-white/10 bg-slate-950 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
             <Bot size={20} />
          </div>
          <div>
             <h3 className="font-bold text-white text-sm">Monteerly Negotiator</h3>
             <span className="text-[10px] text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/> متصل الآن
             </span>
          </div>
       </div>

       {/* Chat Area */}
       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
          {messages.map((msg) => (
             <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                   msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none'
                }`}>
                   {msg.text}
                </div>
             </div>
          ))}
          
          {/* Offer Card Simulation */}
          <div className="flex justify-start">
             <div className="max-w-[85%] bg-slate-800 rounded-2xl rounded-tl-none border border-white/5 overflow-hidden">
                <div className="p-4 border-b border-white/5">
                   <div className="text-xs text-slate-400 uppercase mb-1">Official Quote</div>
                   <div className="text-xl font-bold text-white">$550.00</div>
                   <div className="text-xs text-slate-400">شاملة التحريك والتعليق الصوتي</div>
                </div>
                <div className="p-2">
                   <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold gap-2">
                      <Check size={14} /> قبول العرض
                   </Button>
                </div>
             </div>
          </div>
       </div>

       {/* Input */}
       <div className="p-3 border-t border-white/10 bg-slate-950 flex gap-2">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            type="text" 
            placeholder="اكتب ردك هنا..." 
            className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 text-white text-sm focus:border-indigo-500 outline-none"
          />
          <button onClick={handleSend} className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
             <Send size={18} />
          </button>
       </div>
    </div>
  );
}

################################################################################