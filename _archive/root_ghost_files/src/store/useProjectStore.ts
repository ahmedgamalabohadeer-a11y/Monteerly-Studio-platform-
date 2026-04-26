import { create } from 'zustand';

interface ProjectState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  securityAlert: boolean; // حالة القبة الحديدية
  setIsPlaying: (status: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setSecurityAlert: (status: boolean) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  securityAlert: false,
  setIsPlaying: (status) => set({ isPlaying: status }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration: duration }),
  setSecurityAlert: (status) => set({ securityAlert: status }),
}));

################################################################################