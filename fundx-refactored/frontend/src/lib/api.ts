const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api/v1";

export interface ApiFetchOptions extends Omit<RequestInit, "headers"> {
  authToken?: string;
}

export async function apiFetch<T>(path: string, options?: ApiFetchOptions): Promise<T> {
  const url = `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options?.authToken) {
    headers.Authorization = `Bearer ${options.authToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage = body?.error?.message || body?.message || response.statusText || "Request failed";
    throw new Error(errorMessage);
  }

  if (body && body.success === false) {
    throw new Error(body.error?.message || "Request failed");
  }

  return (body?.data ?? body) as T;
}
