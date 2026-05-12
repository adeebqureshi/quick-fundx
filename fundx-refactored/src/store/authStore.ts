import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type { User, UserRole } from "@/types";
import { apiClient, tokenStore, type RegisterInput } from "@/lib/api/client";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: "LOGIN"; user: User }
  | { type: "LOGOUT" };

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<User>;
  register: (input: RegisterInput) => Promise<User>;
  logout: () => Promise<void>;
}

const STORAGE_KEY = "qfx-auth";

function normalizeRole(role: string): UserRole {
  return role.toLowerCase() as UserRole;
}

export function roleToPath(role: UserRole): string {
  const map: Record<UserRole, string> = {
    admin: "/admin",
    dsa: "/dsa",
    lender: "/lender",
    customer: "/customer",
  };
  return map[role];
}

function normalizeUser(user: User): User {
  return { ...user, role: normalizeRole(user.role) };
}

function loadState(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AuthState;
  } catch {
    // ignore parse errors
  }
  return { user: null, isAuthenticated: false };
}

function saveState(state: AuthState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { user: action.user, isAuthenticated: true };
    case "LOGOUT":
      return { user: null, isAuthenticated: false };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [state, dispatch] = useReducer(authReducer, undefined, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const login = async (email: string, password: string): Promise<User> => {
    const { user, accessToken, refreshToken } = await apiClient.auth.login({ email, password });
    tokenStore.set(accessToken, refreshToken);
    const normalized = normalizeUser(user);
    dispatch({ type: "LOGIN", user: normalized });
    return normalized;
  };

  const register = async (input: RegisterInput): Promise<User> => {
    const { user, accessToken, refreshToken } = await apiClient.auth.register(input);
    tokenStore.set(accessToken, refreshToken);
    const normalized = normalizeUser(user);
    dispatch({ type: "LOGIN", user: normalized });
    return normalized;
  };

  const logout = async (): Promise<void> => {
    try {
      if (tokenStore.accessToken) await apiClient.auth.logout();
    } finally {
      tokenStore.clear();
      localStorage.removeItem(STORAGE_KEY);
      dispatch({ type: "LOGOUT" });
    }
  };

  return React.createElement(AuthContext.Provider, { value: { ...state, login, register, logout } }, children);
}

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
