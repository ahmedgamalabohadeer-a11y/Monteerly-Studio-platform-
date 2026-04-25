'use client';
import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function AuthForm() {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <div className="w-full max-w-md mx-auto bg-card border border-border rounded-2xl p-8 shadow-xl">
       {/* Tabs */}
       <div className="flex bg-muted p-1 rounded-xl mb-8">
          <button 
             onClick={() => setMode('login')}
             className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'login' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
          >
             تسجيل دخول
          </button>
          <button 
             onClick={() => setMode('register')}
             className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'register' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
          >
             حساب جديد
          </button>
       </div>

       {/* Form */}
       <form className="space-y-4">
          {mode === 'register' && (
             <div className="animate-in slide-in-from-left-4">
                <Input icon={<User size={18} />} placeholder="الاسم الكامل" />
             </div>
          )}
          
          <Input icon={<Mail size={18} />} type="email" placeholder="البريد الإلكتروني" />
          <Input icon={<Lock size={18} />} type="password" placeholder="كلمة المرور" />
          
          {mode === 'login' && (
             <div className="text-right">
                <a href="#" className="text-xs text-primary hover:underline">نسيت كلمة المرور؟</a>
             </div>
          )}

          <Button className="w-full" variant="primary" size="lg">
             {mode === 'login' ? 'الدخول للمنصة' : 'إنشاء الحساب مجاناً'} <ArrowRight size={18} className="mr-2" />
          </Button>
       </form>

       {/* Social Login */}
       <div className="mt-8">
          <div className="relative">
             <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
             <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">أو الاستمرار بواسطة</span></div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
             <Button variant="outline" className="w-full">Google</Button>
             <Button variant="outline" className="w-full" icon={<Github size={16} />}>Github</Button>
          </div>
       </div>
    </div>
  );
}

################################################################################