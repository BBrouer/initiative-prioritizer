
export type Initiative = {
  id: string;
  title: string;
  description: string;
  impact: number; // 1-5
  confidence: number; // 1-5 (replaces urgency)
  ease: number; // 1-5 (replaces effort)
  status: "planned" | "in-progress" | "completed";
  createdAt: Date;
};

export type InitiativeFormData = Omit<Initiative, "id" | "createdAt">;
