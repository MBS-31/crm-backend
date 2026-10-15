/**
 * API client to communicate with the CRM Backend server.
 * Points to the backend server (default http://localhost:3000).
 */
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

/**
 * Health check endpoint test
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/health`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Backend health check failed:", error);
    return {
      status: "ERROR",
      message: error instanceof Error ? error.message : "Unable to reach backend",
    };
  }
}

/**
 * Fetch from backend API
 */
export async function fetchBackendApi(endpoint, options = {}) {
  const url = `${BACKEND_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  return await res.json();
}
