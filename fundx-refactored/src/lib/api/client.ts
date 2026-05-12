import type { User } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api/v1";
const TOKEN_KEY = "qfx-access-token";
const REFRESH_TOKEN_KEY = "qfx-refresh-token";

export interface ApiEnvelope<T> { success: boolean; data: T; message?: string }
export interface AuthPayload { user: User; accessToken: string; refreshToken: string }
export interface LoginInput { email: string; password: string }
export interface RegisterInput { name: string; email: string; password: string; role: "CUSTOMER" | "DSA" | "LENDER" | "ADMIN"; phone?: string }

export class ApiError extends Error {
  constructor(message: string, public status: number, public details?: unknown) { super(message); }
}

export const tokenStore = {
  get accessToken() { return localStorage.getItem(TOKEN_KEY); },
  set(accessToken: string, refreshToken?: string) {
    localStorage.setItem(TOKEN_KEY, accessToken);
    if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  clear() { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(REFRESH_TOKEN_KEY); },
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
  const token = tokenStore.accessToken;
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers, credentials: "include" });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(payload.message ?? "Request failed", response.status, payload.details);
  return payload.data as T;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) => request<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
  auth: {
    login: (input: LoginInput) => request<AuthPayload>("/auth/login", { method: "POST", body: JSON.stringify(input) }),
    register: (input: RegisterInput) => request<AuthPayload>("/auth/register", { method: "POST", body: JSON.stringify(input) }),
    logout: () => request<{ message: string }>("/auth/logout", { method: "POST" }),
  },
};
