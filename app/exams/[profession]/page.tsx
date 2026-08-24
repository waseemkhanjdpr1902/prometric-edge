import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock3, FileQuestion, Target } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { examTracks } from "@/lib/exams";

export function generateStaticParams() { return examTracks.map((track) => ({ profession: track.slug })); }

export default async function TrackPage({ params }: { params: Promise<{ profession: string }> }) {
  const { profession } = await params;
  const track = examTracks.find((item) => item.slug === profession);
  if (!track) notFound();
  return <main><SiteHeader /><section className="track-hero"><div><span className="eyebrow">{track.subtitle}</span><h1>{track.title}<br />exam preparation.</h1><p>Practise clinical judgement, patient-safety decisions and calculation skills through a condensed UAE licensing-style simulation.</p><a className="primary-button" href={`/exams/${track.slug}/practice`}>Open full test access <ArrowRight size={18} /></a></div><div className="exam-overview"><span>Preparation snapshot</span><div><FileQuestion /><p><b>{track.questions}</b>Curated questions</p></div><div><Clock3 /><p><b>{track.time}</b>Realistic timing</p></div><div><Target /><p><b>70% target</b>Readiness benchmark</p></div></div></section><section className="syllabus"><div><span className="eyebrow">Coverage blueprint</span><h2>Study what matters.</h2><p>All currently available questions, simulation mode and analytics are open for testing. The live 20-question bank uses application and analysis scenarios aligned to UAE professional scope and safety expectations. It is independent preparation—not official authority exam content.</p></div><div className="topic-list">{(track.slug === "pharmacist" ? ["Pharmacology & therapeutics", "Pharmacy practice", "Calculations", "Patient safety", "Law & ethics"] : ["Adult health nursing", "Medication safety", "Maternal & child health", "Infection control", "Leadership & ethics"]).map((topic, i) => <div key={topic}><span>0{i + 1}</span><b>{topic}</b><CheckCircle2 /></div>)}</div></section></main>;
}
