'use client';

import { useState, useRef } from 'react';
import { Guardian } from '@/lib/guardian';
import { Send, AlertTriangle, ShieldCheck, Image as ImageIcon, Loader2 } from 'lucide-react';

// Guardian Adapter
const validateMessage = async (text: string) => {
  const result = await Guardian.validateText(text);
  return result;
};

type Message = {
  id: number;
  text: string;
  sender: 'me' | 'other';
  blocked?: boolean;
  isImage?: boolean;
};

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'مرحباً، هل يمكنني رؤية صور للمنتج؟', sender: 'other' }
  ]);
  const [warning, setWarning] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTyping = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInput(text);
    const check = await validateMessage(text);
    if (!check.isValid) setWarning(check.error || 'محتوى مخالف');
    else setWarning(null);
  };

  const handleSendText = async () => {
    if (!input.trim()) return;
    const check = await validateMessage(input);
    if (!check.isValid) {
      addBlockedMessage('🚫 تم حجب النص لمخالفتها السياسات.');
      return;
    }
    addMessage(input, 'me');
    setInput('');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setWarning('🔍 جاري فحص الصورة بالذكاء الاصطناعي...');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!data.safe) {
        addBlockedMessage(data.message);
        setWarning('⛔ ' + data.message);
      } else {
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          text: '📷 [صورة آمنة تم التحقق منها]', 
          sender: 'me',
          isImage: true 
        }]);
        setWarning(null);
      }
    } catch (err) {
      setWarning('❌ حدث خطأ أثناء الفحص');
    } finally {
      setIsAnalyzing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const addMessage = (text: string, sender: 'me' | 'other') => {
    setMessages(prev => [...prev, { id: Date.now(), text, sender }]);
  };

  const addBlockedMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'me', blocked: true }]);
  };

  return (
    <div className="flex h-[600px] w-full max-w-md flex-col overflow-hidden rounded-2xl border bg-white shadow-xl">
      <div className="bg-slate-900 p-4 text-white flex items-center gap-2">
        <ShieldCheck size={20} className="text-green-400" />
        <div>
          <h2 className="font-bold">نظام الحارس الذكي</h2>
          <p className="text-xs text-slate-400">حماية نشطة ضد التسريب</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
              msg.blocked 
                ? 'bg-red-50 text-red-600 border border-red-200 text-sm'
                : msg.sender === 'me'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-800 shadow-sm border'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isAnalyzing && (
          <div className="flex justify-center py-2">
            <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full animate-pulse">
              <Loader2 size={16} className="animate-spin" />
              جاري مسح الصورة ضوئياً...
            </div>
          </div>
        )}
      </div>

      {warning && !isAnalyzing && (
        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 text-sm text-amber-700 border-t border-amber-100">
          <AlertTriangle size={16} />
          <span>{warning}</span>
        </div>
      )}

      <div className="border-t p-4 bg-white">
        <div className="flex gap-2">
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*"
            onChange={handleImageUpload}
          />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzing}
            className="flex items-center justify-center rounded-full bg-slate-100 p-3 text-slate-600 transition hover:bg-slate-200 disabled:opacity-50"
          >
            <ImageIcon size={20} />
          </button>

          <input
            type="text"
            value={input}
            onChange={handleTyping}
            placeholder="اكتب رسالة..."
            disabled={isAnalyzing}
            className={`flex-1 rounded-full border px-4 py-2 outline-none transition ${
              warning ? 'border-amber-300' : 'border-slate-200 focus:border-blue-500'
            }`}
            onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
          />
          
          <button 
            onClick={handleSendText}
            disabled={!!warning || isAnalyzing}
            className="flex items-center justify-center rounded-full bg-blue-600 p-3 text-white transition hover:bg-blue-700 disabled:bg-slate-300"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
