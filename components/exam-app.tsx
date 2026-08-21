"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, RotateCcw, XCircle } from "lucide-react";
import { questions } from "@/lib/exams";

export function ExamApp({ profession }: { profession: "pharmacist" | "nurse" }) {
  const bank = useMemo(() => questions.filter((q) => q.profession === profession), [profession]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const current = bank[index];
  const selected = answers[current.id];

  if (submitted) {
    const correct = bank.filter((q) => answers[q.id] === q.answer).length;
    const score = Math.round((correct / bank.length) * 100);
    return (
      <section className="result-card">
        <div className="score-ring" style={{ "--score": `${score * 3.6}deg` } as React.CSSProperties}><span>{score}%</span></div>
        <p className="eyebrow">Practice test complete</p>
        <h1>{score >= 70 ? "Strong start." : "Keep building your edge."}</h1>
        <p>You answered {correct} of {bank.length} questions correctly. Review the explanations, then try again.</p>
        <div className="result-stats"><span><b>{correct}</b> Correct</span><span><b>{bank.length - correct}</b> Review</span><span><b>{Math.max(0, 70 - score)}%</b> To target</span></div>
        <button className="primary-button" onClick={() => { setAnswers({}); setIndex(0); setSubmitted(false); }}><RotateCcw size={18} /> Retake practice</button>
      </section>
    );
  }

  return (
    <section className="quiz-shell">
      <div className="quiz-topline">
        <a href="/exams"><ArrowLeft size={18} /> Exit practice</a>
        <span className="timer"><Clock3 size={17} /> Untimed practice</span>
      </div>
      <div className="progress"><span style={{ width: `${((index + 1) / bank.length) * 100}%` }} /></div>
      <div className="question-meta"><span>{current.topic}</span><span>Question {index + 1} of {bank.length}</span></div>
      <h1 className="question-stem">{current.stem}</h1>
      <div className="options">
        {current.options.map((option, optionIndex) => {
          const chosen = selected === optionIndex;
          const revealed = selected !== undefined;
          const state = revealed && optionIndex === current.answer ? "correct" : revealed && chosen ? "incorrect" : chosen ? "selected" : "";
          return <button key={option} className={`option ${state}`} disabled={revealed} onClick={() => setAnswers((a) => ({ ...a, [current.id]: optionIndex }))}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}{state === "correct" && <CheckCircle2 size={20} />}{state === "incorrect" && <XCircle size={20} />}</button>;
        })}
      </div>
      {selected !== undefined && <div className="explanation"><strong>Clinical explanation</strong><p>{current.explanation}</p></div>}
      <div className="quiz-actions">
        <button className="ghost-button" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}><ArrowLeft size={18} /> Previous</button>
        {index < bank.length - 1 ? <button className="primary-button" disabled={selected === undefined} onClick={() => setIndex((i) => i + 1)}>Next question <ArrowRight size={18} /></button> : <button className="primary-button" disabled={selected === undefined} onClick={() => setSubmitted(true)}>View result <ArrowRight size={18} /></button>}
      </div>
    </section>
  );
}
