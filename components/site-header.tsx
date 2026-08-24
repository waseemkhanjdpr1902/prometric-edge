import { Activity, Menu } from "lucide-react";

export function SiteHeader() {
  return <header className="site-header"><a className="brand" href="/"><span><Activity size={22} /></span>Prometric <b>Edge</b></a><nav><a href="/license-navigator">Licence navigator</a><a href="/exams">Exam tracks</a><a href="/#how">How it works</a><a href="/#pricing">Pricing</a></nav><div className="header-actions"><button className="text-button">Sign in</button><a className="small-cta" href="/license-navigator">Check my status</a><button className="menu-button" aria-label="Open menu"><Menu /></button></div></header>;
}
