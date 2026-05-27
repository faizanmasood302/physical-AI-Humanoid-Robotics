import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { getSession, login as apiLogin, signup as apiSignup, logout as apiLogout, AuthUser } from './authClient';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    ExecutionEnvironment.canUseDOM ? localStorage.getItem('auth_token') : null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getSession(token).then((u) => {
        if (u) setUser(u);
        else { localStorage.removeItem('auth_token'); setToken(null); }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiLogin(email, password);
    localStorage.setItem('auth_token', res.token);
    setToken(res.token);
    setUser(res.user);
  }, []);

  const signup = useCallback(async (email: string, password: string, name?: string) => {
    const res = await apiSignup(email, password, name);
    if (res.token) {
      localStorage.setItem('auth_token', res.token);
      setToken(res.token);
      setUser(res.user);
    } else {
      await login(email, password);
    }
  }, [login]);

  const logout = useCallback(async () => {
    if (token) await apiLogout(token);
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
    window.location.href = '/physical-AI-Humanoid-Robotics/';
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthHeader(): Record<string, string> {
  const { token } = useAuth();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
