import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type { User, UserRole } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: "LOGIN"; user: User }
  | { type: "LOGOUT" };

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => void;
  logout: () => void;
}

const STORAGE_KEY = "qfx-auth";

function deriveRole(email: string): UserRole {
  if (email.includes("admin")) return "admin";
  if (email.includes("dsa") || email.includes("partner")) return "dsa";
  if (email.includes("lender")) return "lender";
  return "customer";
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

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const [state, dispatch] = useReducer(authReducer, undefined, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const login = (email: string, _password: string): void => {
    const role = deriveRole(email);
    const user: User = {
      id: Math.random().toString(36).slice(2),
      name: email.split("@")[0] ?? "User",
      email,
      role,
    };
    dispatch({ type: "LOGIN", user });
  };

  const logout = (): void => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: "LOGOUT" });
  };

  const providerValue = {
    ...state,
    login,
    logout,
  };

  return (
    React.createElement(AuthContext.Provider, { value: providerValue }, children)
  );
}

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
