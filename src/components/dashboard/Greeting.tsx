'use client';
import React from 'react';
import { Sun, Moon, Coffee } from 'lucide-react';

export function Greeting({ userName }: { userName: string }) {
  const hour = new Date().getHours();

  const timeData =
    hour >= 5 && hour < 12
      ? { greeting: 'صباح الخير', icon: Coffee }
      : hour >= 12 && hour < 18
        ? { greeting: 'طاب يومك', icon: Sun }
        : { greeting: 'مساء الخير', icon: Moon };

  const Icon = timeData.icon;

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold font-heading flex items-center gap-3">
        <Icon className="text-yellow-500" />
        {timeData.greeting}، {userName}
      </h1>
      <p className="text-muted-foreground mt-1">جاهز للإبداع اليوم؟ إليك ملخص سريع لأعمالك.</p>
    </div>
  );
}
