// Base API Client abstraction targeting /api/v1 with fallback to local mock state

export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "/api/v1";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  fallbackData?: T
): Promise<T> {
  const url = `${BASE_API_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
    });

    if (!res.ok) {
      if (fallbackData !== undefined) {
        return fallbackData;
      }
      throw new Error(`API Error ${res.status}: ${res.statusText}`);
    }

    return (await res.json()) as T;
  } catch (err) {
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw err;
  }
}
