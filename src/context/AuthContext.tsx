import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from '../services/auth';
import { getCurrentSession, login as doLogin, logout as doLogout, register as doRegister } from '../services/auth';

export type AuthState = {
  loading: boolean;
  user: User | null;
  token: string | null;
};

export type AuthContextType = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ loading: true, user: null, token: null });

  useEffect(() => {
    (async () => {
      const session = await getCurrentSession();
      if (session) setState({ loading: false, user: session.user, token: session.token });
      else setState({ loading: false, user: null, token: null });
    })();
  }, []);

  const value = useMemo<AuthContextType>(() => ({
    ...state,
    login: async (email, password) => {
      const { token, user } = await doLogin(email, password);
      setState({ loading: false, token, user });
    },
    register: async (email, password, name) => {
      const { token, user } = await doRegister(email, password, name);
      setState({ loading: false, token, user });
    },
    logout: async () => {
      await doLogout();
      setState({ loading: false, token: null, user: null });
    },
  }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
