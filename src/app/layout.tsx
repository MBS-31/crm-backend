import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenCRM — Sponsored Open-Source & Self-Hosted Enterprise CRM",
  description:
    "An open-source, self-hosted CRM built for modern sales teams. Omni-channel communications via Email, Voice, WhatsApp and SMS, 5-Tier RBAC, and native MinIO object storage.",
  keywords: [
    "Open Source CRM",
    "Self-Hosted CRM",
    "Enterprise CRM",
    "Omnichannel Comms",
    "WhatsApp CRM",
    "WebRTC Softphone",
    "Docker CRM",
    "MinIO S3"
  ],
  authors: [{ name: "OpenCRM Team" }],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#070913] text-slate-100 min-h-screen antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
