import { ArrowRight, CheckCircle2, FlaskConical } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { examTracks } from "@/lib/exams";

export default function ExamsPage() {
  return <main><SiteHeader /><section className="catalog-hero"><span className="eyebrow">Exam preparation</span><h1>Choose your professional track.</h1><p>Testing access is enabled: every currently available practice, mock and analytics feature is open without payment.</p></section><section className="catalog-grid">{examTracks.map((track) => <article className="catalog-card" key={track.slug}><div className="catalog-head"><div><span>{track.subtitle}</span><h2>{track.title}</h2></div><span className="status-pill">Test access open</span></div><p>Structured coverage, detailed answer rationales and exam-mode practice. The live bank count is shown accurately while the reviewed 450-question target bank is being developed.</p><div className="plan-list"><span><CheckCircle2 /> Free diagnostic practice</span><span><CheckCircle2 /> Topic-wise learning</span><span><FlaskConical /> Full mock exams · Open for testing</span><span><FlaskConical /> Weak-area analytics · Open for testing</span></div><a className="primary-button" href={`/exams/${track.slug}`}>Open track <ArrowRight size={18} /></a></article>)}</section></main>;
}
