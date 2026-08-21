export type Question = {
  id: string;
  profession: "pharmacist" | "nurse";
  topic: string;
  stem: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const questions: Question[] = [
  {
    id: "pharm-001", profession: "pharmacist", topic: "Pharmacology",
    stem: "Which counselling point is most important for a patient starting warfarin?",
    options: ["Avoid all green vegetables", "Keep vitamin K intake consistent", "Take double doses after a missed dose", "Stop INR monitoring once stable"],
    answer: 1,
    explanation: "Warfarin response is affected by vitamin K. Patients should maintain a consistent intake rather than eliminate vitamin K foods, and continue INR monitoring.",
  },
  {
    id: "pharm-002", profession: "pharmacist", topic: "Patient Safety",
    stem: "A prescription contains a dose that appears ten times higher than usual. What should the pharmacist do first?",
    options: ["Dispense as written", "Ask the patient to decide", "Hold dispensing and clarify with the prescriber", "Reduce the dose without informing anyone"],
    answer: 2,
    explanation: "A potentially unsafe dose requires verification with the prescriber before dispensing. The intervention should also be documented.",
  },
  {
    id: "pharm-003", profession: "pharmacist", topic: "Calculations",
    stem: "A 100 mL solution contains 500 mg of a medicine. What volume provides a 125 mg dose?",
    options: ["10 mL", "20 mL", "25 mL", "50 mL"],
    answer: 2,
    explanation: "The concentration is 5 mg/mL. Therefore, 125 mg ÷ 5 mg/mL = 25 mL.",
  },
  {
    id: "nurse-001", profession: "nurse", topic: "Adult Health",
    stem: "Which finding in a patient with suspected sepsis requires the most immediate escalation?",
    options: ["Temperature 38.1°C", "Respiratory rate 26/min with new confusion", "Heart rate 96/min", "Reduced appetite"],
    answer: 1,
    explanation: "Tachypnoea with altered mental status suggests organ dysfunction and requires urgent sepsis assessment and escalation.",
  },
  {
    id: "nurse-002", profession: "nurse", topic: "Medication Safety",
    stem: "Before administering insulin, which action best prevents a medication error?",
    options: ["Ask another patient to identify the dose", "Verify the prescription, glucose result and patient identity", "Administer before checking the meal", "Document before administration"],
    answer: 1,
    explanation: "Safe insulin administration requires verification of the order, current glucose, correct patient, dose, timing and meal availability.",
  },
  {
    id: "nurse-003", profession: "nurse", topic: "Infection Control",
    stem: "After caring for a patient with suspected Clostridioides difficile, the nurse should perform hand hygiene using:",
    options: ["Alcohol rub only", "Soap and water", "Sterile water only", "No hand hygiene if gloves were worn"],
    answer: 1,
    explanation: "Soap and water is preferred because mechanical washing helps remove C. difficile spores; gloves do not replace hand hygiene.",
  },
];

export const examTracks = [
  { slug: "pharmacist", title: "Gulf Pharmacist", subtitle: "DHA · DOH · MOHAP", questions: "450+ planned", time: "150 min mock", accent: "amber" },
  { slug: "nurse", title: "Registered Nurse", subtitle: "DHA · DOH · MOHAP", questions: "450+ planned", time: "150 min mock", accent: "mint" },
] as const;
