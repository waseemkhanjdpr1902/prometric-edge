"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, ExternalLink, FileCheck2, HelpCircle, Printer, ShieldAlert } from "lucide-react";
import { getGuidance, type Authority, type CareerStage, type LicenceStage, type NavigatorAnswers, type WorkType } from "@/lib/license-guidance";
import styles from "@/app/license-navigator/license-navigator.module.css";

const initial: NavigatorAnswers = { workType: "clinical", careerStage: "applying", authority: "unsure", licenceStage: "none", hasProfessionalRegistration: false, hasGoodStanding: false, hasLongPracticeGap: false, documentsReady: false };

function SelectField<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (value: T) => void; options: Array<[T, string]> }) {
  return <label className={styles.field}><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value as T)}>{options.map(([key, text]) => <option key={key} value={key}>{text}</option>)}</select></label>;
}

export function LicenseNavigator() {
  const [answers, setAnswers] = useState(initial);
  const result = useMemo(() => getGuidance(answers), [answers]);
  const update = <K extends keyof NavigatorAnswers,>(key: K, value: NavigatorAnswers[K]) => setAnswers((current) => ({ ...current, [key]: value }));

  return <>
    <section className={styles.hero}><div><span className={styles.eyebrow}><ShieldAlert size={15} /> UAE healthcare licence navigator</span><h1>Can I apply for the job <em>without a licence?</em></h1><p>Separate job eligibility from permission to practise. Get a practical next-step plan for DHA, DoH, or MOHAP in about two minutes.</p></div><div className={styles.heroNote}><b>Important distinction</b><span>Applying for a job</span><ArrowRight /><span>Registration or eligibility</span><ArrowRight /><span>Facility activates licence</span><ArrowRight /><strong>Clinical practice</strong></div></section>

    <section className={styles.tool} aria-label="Healthcare licence navigator">
      <div className={styles.formCard}><div className={styles.cardHeading}><span>01</span><div><h2>Tell us where you are</h2><p>No account or personal documents required.</p></div></div>
        <div className={styles.fields}>
          <SelectField<WorkType> label="Type of work" value={answers.workType} onChange={(value) => update("workType", value)} options={[["clinical", "Clinical / patient-care role"], ["non-clinical", "Non-clinical healthcare role"], ["unsure", "I am not sure"]]} />
          <SelectField<CareerStage> label="Job stage" value={answers.careerStage} onChange={(value) => update("careerStage", value)} options={[["exploring", "Just exploring"], ["applying", "Applying or interviewing"], ["offer", "I have an offer"], ["starting", "Preparing to start"]]} />
          <SelectField<Authority> label="Work location / authority" value={answers.authority} onChange={(value) => update("authority", value)} options={[["unsure", "Not sure yet"], ["dha", "Dubai — DHA"], ["doh", "Abu Dhabi — DoH"], ["mohap", "Northern Emirates — MOHAP"]]} />
          <SelectField<LicenceStage> label="Current licensing stage" value={answers.licenceStage} onChange={(value) => update("licenceStage", value)} options={[["none", "Not started"], ["assessment", "Self-assessment completed"], ["verification", "DataFlow / verification in progress"], ["evaluation", "Exam / evaluation completed"], ["registered", "Registration / eligibility issued"], ["active", "Active professional licence"]]} />
        </div>
        <fieldset className={styles.checks}><legend>Documents and history</legend>
          <label><input type="checkbox" checked={answers.documentsReady} onChange={(e) => update("documentsReady", e.target.checked)} /><span>Qualifications and experience documents ready</span></label>
          <label><input type="checkbox" checked={answers.hasProfessionalRegistration} onChange={(e) => update("hasProfessionalRegistration", e.target.checked)} /><span>Professional registration from country of practice</span></label>
          <label><input type="checkbox" checked={answers.hasGoodStanding} onChange={(e) => update("hasGoodStanding", e.target.checked)} /><span>Good-standing evidence available</span></label>
          <label><input type="checkbox" checked={answers.hasLongPracticeGap} onChange={(e) => update("hasLongPracticeGap", e.target.checked)} /><span>I may have a practice gap longer than two years</span></label>
        </fieldset>
      </div>

      <aside className={styles.resultCard} aria-live="polite"><div className={styles.status}>{result.status}</div><h2>{result.title}</h2><p className={styles.summary}>{result.summary}</p><div className={styles.meter}><div><span>Preparation progress</span><b>{result.readiness}%</b></div><div><span style={{ width: `${result.readiness}%` }} /></div><small>This is a preparation indicator, not an official eligibility decision.</small></div><h3><FileCheck2 /> Your next actions</h3><ol>{result.actions.map((action) => <li key={action}>{action}</li>)}</ol><button className={styles.print} onClick={() => window.print()}><Printer size={17} /> Print or save this plan</button></aside>
    </section>

    <section className={styles.questions}><div><span className={styles.eyebrow}><HelpCircle size={15} /> Before accepting an offer</span><h2>Ask the employer these questions</h2></div><ul>{result.employerQuestions.map((question) => <li key={question}><CheckCircle2 />{question}</li>)}</ul></section>

    <section className={styles.path}><span className={styles.eyebrow}>Typical clinical pathway</span><h2>Seven stages people often confuse</h2><div className={styles.steps}>{["Clarify role and authority", "Check PQR / self-assessment", "Primary-source verification", "Exam or evaluation if required", "Registration / eligibility", "Facility activates licence", "Begin clinical practice"].map((step, index) => <div key={step}><b>{index + 1}</b><span>{step}</span></div>)}</div></section>

    <section className={styles.sources}><div><h2>Verify with official sources</h2><p>Requirements can change and vary by profession, title, education, experience, and evidence.</p></div><div className={styles.sourceLinks}><a href="https://www.doh.gov.ae/en/pqr" target="_blank" rel="noreferrer">Unified PQR <ExternalLink /></a><a href="https://dha.gov.ae/sheryan/wps/portal/home/faq" target="_blank" rel="noreferrer">DHA licensing FAQ <ExternalLink /></a><a href="https://mohap.gov.ae/en/w/licensing-or-re-licensing-of-health-professional" target="_blank" rel="noreferrer">MOHAP licensing service <ExternalLink /></a></div></section>
    <p className={styles.disclaimer}>Prometric Edge is an independent guidance and exam-preparation platform. This tool does not issue eligibility, legal advice, registration, or a professional licence. Always confirm your case with the relevant authority and hiring facility.</p>
  </>;
}
