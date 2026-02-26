'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { User } from '@/types';

interface AuthState {
  user:    User | null;
  loading: boolean;
  login:   (token: string) => Promise<void>;
  logout:  () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router  = useRouter();
  const [user,    setUser]    = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Hydrate user from stored token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }

    api.get<{ user: User }>('/api/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (token: string) => {
    localStorage.setItem('token', token);
    const res = await api.get<{ user: User }>('/api/auth/me');
    setUser(res.data.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    router.replace('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside <AuthProvider>');
  return ctx;
}
