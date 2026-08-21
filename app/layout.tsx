import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./fonts.css";
import "./exam.css";
import "./launch.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://prometric-edge.vercel.app"),
  title: { default: "Prometric Edge | Healthcare Licensing Exam Preparation", template: "%s | Prometric Edge" },
  description: "Prepare for DHA, DOH and MOHAP healthcare licensing exams with focused practice, realistic mock tests and detailed explanations.",
  manifest: "/manifest.webmanifest",
  openGraph: { title: "Prometric Edge", description: "Your edge for Gulf healthcare licensing exams.", type: "website" },
};

export const viewport: Viewport = { themeColor: "#071d19", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
