'use client';
import React from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function GuestReviewView() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
       <div className="bg-slate-900 p-4 flex justify-between items-center border-b border-slate-800">
          <div className="text-white font-bold">Monteerly Review</div>
          <div className="flex items-center gap-2">
             <div className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                <Eye size={12} className="inline mr-1" /> Guest Mode
             </div>
             <Button size="sm" variant="primary">Approve Video</Button>
          </div>
       </div>
       <div className="flex-1 flex items-center justify-center text-slate-500">
          Video Player Component Here
       </div>
    </div>
  );
}

################################################################################