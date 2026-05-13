import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_USER = "qfx_user";
const STORAGE_ACCESS = "qfx_access_token";
const STORAGE_REFRESH = "qfx_refresh_token";

const loadAuthState = (): AuthState => {
  const rawUser = localStorage.getItem(STORAGE_USER);
  const user = rawUser ? (JSON.parse(rawUser) as User) : null;
  return {
    user,
    accessToken: localStorage.getItem(STORAGE_ACCESS),
    refreshToken: localStorage.getItem(STORAGE_REFRESH),
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({ user: null, accessToken: null, refreshToken: null });

  useEffect(() => {
    const loaded = loadAuthState();
    setState(loaded);
  }, []);

  const login = (user: User, accessToken: string, refreshToken: string) => {
    localStorage.setItem(STORAGE_USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_ACCESS, accessToken);
    localStorage.setItem(STORAGE_REFRESH, refreshToken);
    setState({ user, accessToken, refreshToken });
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_USER);
    localStorage.removeItem(STORAGE_ACCESS);
    localStorage.removeItem(STORAGE_REFRESH);
    setState({ user: null, accessToken: null, refreshToken: null });
  };

  const value = useMemo(
    () => ({
      ...state,
      isAuthenticated: Boolean(state.user && state.accessToken),
      login,
      logout,
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
