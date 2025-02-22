import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  userData: null,
  setAuthState: (userData) => set({ userData }),
}));