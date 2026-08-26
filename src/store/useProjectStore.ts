import { create } from 'zustand';

export interface ProjectStore {
  isPlaying: boolean;
  currentTime: number;
  securityAlert: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (currentTime: number) => void;
  setSecurityAlert: (active: boolean) => void;
}
export const useProjectStore = create<ProjectStore>((set) => ({
  isPlaying: false,
  currentTime: 0,
  securityAlert: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setSecurityAlert: (securityAlert) => set({ securityAlert }),
}));
