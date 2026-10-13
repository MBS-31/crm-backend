import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept, Origin",
    "Access-Control-Allow-Credentials": "true",
  };

  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Root endpoint: return API server operational info
  if (pathname === "/") {
    return NextResponse.json(
      {
        status: "OK",
        name: "CRM Backend API Server",
        message: "Backend server is running",
        version: "1.0.0",
        endpoints: {
          health: "/api/health",
          v1: "/api/v1",
        },
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  }

  // Allow all API routes to pass through to their handlers
  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  // Intercept any non-API requests (such as /dashboard, /login, /deals, etc.)
  // Prevent rendering frontend UI from backend
  return NextResponse.json(
    {
      status: 404,
      error: "Not Found",
      message: "This is an independent API server. The frontend UI is served separately at http://localhost:5173",
      healthCheck: "/api/health",
      apiBase: "/api/v1",
    },
    {
      status: 404,
      headers: corsHeaders,
    }
  );
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for internal Next.js assets
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
