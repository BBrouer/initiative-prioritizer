
export type ImpactLevel = "low" | "medium" | "high";
export type ConfidenceLevel = "unvalidated" | "unexplored" | "validated";
export type DataConfidenceLevel = "unexplored" | "incomplete" | "available";
export type ProcessFitLevel = "low" | "medium" | "high";

export type Initiative = {
  id: string;
  title: string;
  hypothesis: string;
  description: string;
  costImpact: ImpactLevel;
  productivityImpact: ImpactLevel;
  operationalImpact: ImpactLevel;
  hypothesisConfidence: ConfidenceLevel;
  dataConfidence: DataConfidenceLevel;
  processFit: ProcessFitLevel;
  experienceEase: ImpactLevel;
  complexityEase: ImpactLevel;
  competenceEase: ImpactLevel;
  impact: number; // 1-5 (calculated)
  confidence: number; // 1-5 (calculated)
  ease: number; // 1-5 (calculated)
  status: "planned" | "in-progress" | "completed";
  createdAt: Date;
};

export type InitiativeFormData = Omit<Initiative, "id" | "createdAt" | "impact" | "confidence" | "ease">;
