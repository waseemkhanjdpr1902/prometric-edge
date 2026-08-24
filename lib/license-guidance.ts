export type WorkType = "clinical" | "non-clinical" | "unsure";
export type CareerStage = "exploring" | "applying" | "offer" | "starting";
export type Authority = "dha" | "doh" | "mohap" | "unsure";
export type LicenceStage = "none" | "assessment" | "verification" | "evaluation" | "registered" | "active";

export interface NavigatorAnswers {
  workType: WorkType;
  careerStage: CareerStage;
  authority: Authority;
  licenceStage: LicenceStage;
  hasProfessionalRegistration: boolean;
  hasGoodStanding: boolean;
  hasLongPracticeGap: boolean;
  documentsReady: boolean;
}

export interface GuidanceResult {
  status: "Apply now" | "Apply while progressing" | "Facility action needed" | "Clarify the role first";
  title: string;
  summary: string;
  actions: string[];
  employerQuestions: string[];
  readiness: number;
}

export const authorityNames: Record<Authority, string> = {
  dha: "Dubai Health Authority (DHA)",
  doh: "Department of Health – Abu Dhabi (DoH)",
  mohap: "Ministry of Health and Prevention (MOHAP)",
  unsure: "the relevant UAE health authority",
};

export function getGuidance(a: NavigatorAnswers): GuidanceResult {
  const authority = authorityNames[a.authority];
  const actions: string[] = [];
  const employerQuestions = [
    "Is this role clinical, and what professional title will appear on the licence?",
    `Will you accept an applicant whose ${authority} process is still in progress?`,
    "Will the hiring facility activate or sponsor the professional licence?",
  ];

  if (a.workType === "non-clinical") {
    return {
      status: "Clarify the role first",
      title: "A clinical licence may not be required for this role",
      summary: "A job with no regulated patient-care duties may be open without a clinical professional licence. The actual duties and employer classification matter more than the job title alone.",
      actions: ["Ask for the written job description.", "Confirm that the role has no regulated clinical duties.", "Do not perform clinical work unless the appropriate licence is active."],
      employerQuestions,
      readiness: 70,
    };
  }

  if (a.workType === "unsure") {
    actions.push("Get a written job description and confirm whether it includes patient assessment, treatment, dispensing, or another regulated duty.");
  }
  if (a.authority === "unsure") actions.push("Confirm the work location and licensing authority with the employer.");
  if (!a.documentsReady) actions.push("Prepare clear qualification, transcript, experience, ID, and legally translated documents where required.");
  if (!a.hasProfessionalRegistration) actions.push("Check whether valid home-country registration is required for your professional title.");
  if (!a.hasGoodStanding) actions.push("Check the authority's current good-standing certificate requirement before applying.");
  if (a.hasLongPracticeGap) actions.push("Review the current PQR practice-gap and training requirements before relying on an eligibility result.");
  if (a.licenceStage === "none") actions.push(`Use the official self-assessment/PQR for ${authority}; exam and verification requirements vary by title.`);
  if (a.licenceStage === "assessment") actions.push("Confirm whether primary-source verification (often DataFlow) and an examination/evaluation are required.");
  if (a.licenceStage === "verification") actions.push("Track verification results and resolve discrepancies before booking or completing the required evaluation.");
  if (a.licenceStage === "evaluation") actions.push("Complete the remaining registration/eligibility steps and keep the result valid while job hunting.");
  if (a.licenceStage === "registered") actions.push("Ask the hiring facility to activate the registration into a licence before your clinical start date.");
  if (a.licenceStage === "active") actions.push("Verify that the licence is active for the correct authority, facility, title, and intended start date.");

  const progress = { none: 10, assessment: 25, verification: 45, evaluation: 65, registered: 82, active: 100 }[a.licenceStage];
  const evidence = [a.documentsReady, a.hasProfessionalRegistration, a.hasGoodStanding].filter(Boolean).length * 5;
  const readiness = Math.min(100, progress + evidence - (a.hasLongPracticeGap ? 10 : 0));

  if (a.licenceStage === "active") {
    return { status: "Apply now", title: "Your licence stage appears ready for clinical work", summary: "You can apply now. Before starting, verify the licence is active and matches the facility, authority, and professional title for this job.", actions, employerQuestions, readiness };
  }
  if (a.licenceStage === "registered") {
    return { status: "Facility action needed", title: "You can job hunt, but registration is not permission to practise", summary: "Registration or eligibility can support applications. A hiring facility must activate the appropriate licence before you begin regulated clinical work.", actions, employerQuestions, readiness };
  }
  return {
    status: a.workType === "unsure" ? "Clarify the role first" : "Apply while progressing",
    title: "You can usually apply before the active licence is issued",
    summary: "You may search, apply, and interview while completing licensing steps. Do not begin regulated clinical practice until the appropriate facility-linked licence is active.",
    actions,
    employerQuestions,
    readiness,
  };
}
