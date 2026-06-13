import { create } from 'zustand';

export const useStore = create((set) => ({
  open: true,
  toggle: () => set((s: unknown) => ({ open: !s.open }))
}));
