import { create } from 'zustand';

export const useStore = create((set) => ({
  open: true,
  toggle: () => set((s) => ({ open: !s.open }))
}));
