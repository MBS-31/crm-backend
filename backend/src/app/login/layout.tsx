import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — LOGIP AI Enterprise CRM",
  description: "Sign in to your LOGIP AI-Native Enterprise CRM platform.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
