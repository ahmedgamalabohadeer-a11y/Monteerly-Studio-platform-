'use client';
import React from 'react';
import { User, MapPin, Globe } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export function ProfileForm() {
  return (
    <div className="space-y-8">
       {/* Avatar Upload */}
       <div className="flex items-center gap-6">
          <Avatar size="xl" src="/images/avatar_placeholder.png" />
          <div>
             <div className="flex gap-2 mb-2">
                <Button size="sm" variant="outline">تغيير الصورة</Button>
                <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">حذف</Button>
             </div>
             <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size 800K</p>
          </div>
       </div>

       {/* Fields */}
       <div className="grid md:grid-cols-2 gap-4">
          <Input label="الاسم الأول" placeholder="أحمد" icon={<User size={16} />} />
          <Input label="الاسم الأخير" placeholder="جمال" icon={<User size={16} />} />
       </div>

       <Input label="المسمى الوظيفي" placeholder="مثلاً: Video Editor & Animator" />
       
       <Textarea label="نبذة عنك (Bio)" placeholder="أكتب وصفاً مختصراً لخبراتك ومهاراتك..." className="h-32" />

       <div className="grid md:grid-cols-2 gap-4">
          <Input label="الموقع الجغرافي" placeholder="القاهرة، مصر" icon={<MapPin size={16} />} />
          <Input label="الموقع الإلكتروني" placeholder="https://portfolio.com" icon={<Globe size={16} />} />
       </div>

       <div className="pt-4 border-t border-border flex justify-end">
          <Button variant="primary">حفظ التغييرات</Button>
       </div>
    </div>
  );
}
