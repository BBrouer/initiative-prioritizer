
export type Initiative = {
  id: string;
  title: string;
  description: string;
  impact: number; // 1-5
  effort: number; // 1-5
  urgency: number; // 1-5
  status: "planned" | "in-progress" | "completed";
  createdAt: Date;
};

export type InitiativeFormData = Omit<Initiative, "id" | "createdAt">;
