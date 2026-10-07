import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  title: {
    default: "LOGIP — AI-Native Enterprise CRM & Intelligence Platform",
    template: "%s | LOGIP CRM",
  },
  description:
    "AI that understands your customers, predicts your pipeline, automates your workflow, and unifies every conversation. One Customer. One Intelligence Layer. One CRM.",
  keywords: [
    "Enterprise CRM",
    "AI Sales Intelligence",
    "Customer 360",
    "Predictive Lead Scoring",
    "Sales Automation",
    "WhatsApp CRM",
    "Omnichannel",
    "Deal Pipeline",
    "AI Copilot",
  ],
  authors: [{ name: "LOGIP AI" }],
  openGraph: {
    title: "LOGIP — AI-Native Enterprise CRM",
    description: "Understand. Predict. Automate. Grow.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#080c14] text-slate-100 min-h-screen">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
