import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { examTracks } from "@/lib/exams";

export default function ExamsPage() {
  return <main><SiteHeader /><section className="catalog-hero"><span className="eyebrow">Exam preparation</span><h1>Choose your professional track.</h1><p>Start with a free diagnostic practice set. Upgrade only when you are ready for the complete preparation programme.</p></section><section className="catalog-grid">{examTracks.map((track) => <article className="catalog-card" key={track.slug}><div className="catalog-head"><div><span>{track.subtitle}</span><h2>{track.title}</h2></div><span className="status-pill">Available</span></div><p>Structured coverage, detailed answer rationales and exam-mode practice for licensing candidates.</p><div className="plan-list"><span><CheckCircle2 /> Free diagnostic practice</span><span><CheckCircle2 /> Topic-wise learning</span><span><LockKeyhole /> Full mock exams · Pro</span><span><LockKeyhole /> Weak-area analytics · Pro</span></div><a className="primary-button" href={`/exams/${track.slug}`}>Open track <ArrowRight size={18} /></a></article>)}</section></main>;
}
