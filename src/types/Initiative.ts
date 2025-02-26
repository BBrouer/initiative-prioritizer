
export type ImpactLevel = "low" | "medium" | "high";

export type Initiative = {
  id: string;
  title: string;
  hypothesis: string;
  description: string;
  costImpact: ImpactLevel;
  productivityImpact: ImpactLevel;
  operationalImpact: ImpactLevel;
  dataConfidence: ImpactLevel;
  marketConfidence: ImpactLevel;
  technicalConfidence: ImpactLevel;
  impact: number; // 1-5 (calculated)
  confidence: number; // 1-5 (calculated)
  ease: number; // 1-5
  status: "planned" | "in-progress" | "completed";
  createdAt: Date;
};

export type InitiativeFormData = Omit<Initiative, "id" | "createdAt" | "impact" | "confidence">;
