import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserEntity } from '../api/auth/auth.type';

interface AuthState {
  accessToken: string | null;
  user: UserEntity | null;

  login: (token: string, user: UserEntity) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,

      login: (token, user) =>
        set({
          accessToken: token,
          user,
        }),

      logout: () =>
        set({
          accessToken: null,
          user: null,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
