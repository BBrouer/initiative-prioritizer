
import { Initiative } from "@/types/Initiative";

export const calculateScore = (initiative: Initiative): number => {
  const impactWeight = 0.4;
  const urgencyWeight = 0.4;
  const effortWeight = 0.2;

  const effortInverse = 6 - initiative.effort; // Invert effort so lower effort = higher score
  
  return (
    initiative.impact * impactWeight +
    initiative.urgency * urgencyWeight +
    effortInverse * effortWeight
  );
};

export const getQuadrant = (impact: number, effort: number): string => {
  const highImpact = impact > 3;
  const highEffort = effort > 3;

  if (highImpact && !highEffort) return "Quick Wins";
  if (highImpact && highEffort) return "Major Projects";
  if (!highImpact && !highEffort) return "Fill Ins";
  return "Thankless Tasks";
};
