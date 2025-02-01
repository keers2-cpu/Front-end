import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      login: async (email: string, password: string) => {
        // Mock login - in production, this would call an API
        const mockUser: User = {
          id: '1',
          name: email.split('@')[0],
          email,
          role: 'admin' as UserRole,
        };
        set({ user: mockUser });
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);