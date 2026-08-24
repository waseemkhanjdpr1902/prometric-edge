import type { Metadata } from "next";
import { LicenseNavigator } from "@/components/license-navigator";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Do I Need a DHA, DoH or MOHAP Licence?",
  description: "Find out whether you can apply for a UAE healthcare job before licensing, and get a practical DHA, DoH or MOHAP next-step plan.",
};

export default function LicenseNavigatorPage() {
  return <main><SiteHeader /><LicenseNavigator /></main>;
}
