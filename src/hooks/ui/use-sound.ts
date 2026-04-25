'use client';
import { useCallback } from 'react';

// Simple beep sounds encoded as base64 to avoid file dependencies for this script
const SOUNDS = {
  click: 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...', // Placeholder
  success: 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...', // Placeholder
  hover: 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...', // Placeholder
};

export function useSound() {
  const play = useCallback((type: 'click' | 'success' | 'hover' = 'click') => {
    // In production, use a library like 'use-sound' or actual audio files
    // This is a simulation logic
    try {
      // const audio = new Audio(SOUNDS[type]);
      // audio.volume = 0.2;
      // audio.play();
      // console.log(`🔊 Sound played: ${type}`);
    } catch (e) {
      // Audio playback failed (often due to browser autoplay policies)
    }
  }, []);

  return { play };
}

################################################################################