import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./fonts.css";
import "./exam.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://prometric-edge.vercel.app"),
  title: { default: "Prometric Edge | Healthcare Licensing Exam Preparation", template: "%s | Prometric Edge" },
  description: "Understand UAE healthcare job and licence requirements, then prepare for DHA, DoH and MOHAP exams with focused practice and detailed explanations.",
  manifest: "/manifest.webmanifest",
  openGraph: { title: "Prometric Edge", description: "Your edge for Gulf healthcare licensing exams.", type: "website" },
};

export const viewport: Viewport = { themeColor: "#071d19", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
