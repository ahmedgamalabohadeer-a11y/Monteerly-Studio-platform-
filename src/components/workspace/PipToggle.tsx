'use client';
import React from 'react';
import { PictureInPicture } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function PipToggle() {
  const handlePip = async () => {
    const video = document.querySelector('video');
    if (video) {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } else {
       alert("No video element found to pop out.");
    }
  };

  return (
    <Button 
       variant="ghost" 
       size="sm" 
       onClick={handlePip}
       title="صورة داخل صورة (Picture in Picture)"
       className="text-white hover:bg-white/10"
    >
       <PictureInPicture size={18} />
    </Button>
  );
}
