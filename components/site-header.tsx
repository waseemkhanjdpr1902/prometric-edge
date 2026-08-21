import { Activity, Menu } from "lucide-react";

export function SiteHeader() {
  return <header className="site-header"><a className="brand" href="/"><span><Activity size={22} /></span>Prometric <b>Edge</b></a><nav><a href="/exams">Exam tracks</a><a href="/dashboard">Dashboard</a><a href="/pricing">Pricing</a></nav><div className="header-actions"><a className="text-button" href="/login">Sign in</a><a className="small-cta" href="/exams">Start free</a><button className="menu-button" aria-label="Open menu"><Menu /></button></div></header>;
}
