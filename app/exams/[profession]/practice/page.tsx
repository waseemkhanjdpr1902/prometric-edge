import { notFound } from "next/navigation";
import { ExamApp } from "@/components/exam-app";

export default async function PracticePage({ params }: { params: Promise<{ profession: string }> }) {
  const { profession } = await params;
  if (profession !== "pharmacist" && profession !== "nurse") notFound();
  return <main className="practice-page"><ExamApp profession={profession} /></main>;
}
