
import { Initiative, ImpactLevel } from "@/types/Initiative";

const getImpactScore = (level: ImpactLevel): number => {
  switch (level) {
    case "high":
      return 5;
    case "medium":
      return 3;
    case "low":
      return 1;
    default:
      return 0;
  }
};

export const calculateImpactScore = (initiative: Initiative): number => {
  // If no hypothesis, impact score is minimum
  if (!initiative.hypothesis.trim()) {
    return 1;
  }

  // Calculate average impact from all three dimensions
  const avgImpact = (
    getImpactScore(initiative.costImpact) +
    getImpactScore(initiative.productivityImpact) +
    getImpactScore(initiative.operationalImpact)
  ) / 3;

  // Round to nearest whole number since impact is stored as integer
  return Math.round(avgImpact);
};

export const calculateConfidenceScore = (initiative: Initiative): number => {
  // If no hypothesis, confidence is minimum
  if (!initiative.hypothesis.trim()) {
    return 1;
  }

  // Count how many confidence dimensions are "high"
  const highConfidenceCount = [
    initiative.dataConfidence,
    initiative.marketConfidence,
    initiative.technicalConfidence
  ].filter(confidence => confidence === "high").length;

  // Count how many confidence dimensions are at least "medium"
  const mediumOrHighConfidenceCount = [
    initiative.dataConfidence,
    initiative.marketConfidence,
    initiative.technicalConfidence
  ].filter(confidence => confidence === "high" || confidence === "medium").length;

  // Determine confidence level based on validation state
  if (highConfidenceCount >= 2) {
    // Hypothesis validated (at least 2 high confidence dimensions)
    return 5;
  } else if (mediumOrHighConfidenceCount >= 2) {
    // Hypothesis supported (at least 2 medium or higher confidence dimensions)
    return 3;
  } else {
    // Hypothesis not supported
    return 1;
  }
};

export const calculateICEScore = (initiative: Initiative): number => {
  // Equal weights for ICE scoring (1/3 each)
  const weight = 1/3;
  
  return (
    initiative.impact * weight +
    initiative.confidence * weight +
    initiative.ease * weight
  );
};

export const getQuadrant = (impact: number, ease: number): string => {
  const highImpact = impact > 3;
  const highEase = ease > 3;

  if (highImpact && highEase) return "Quick Wins";
  if (highImpact && !highEase) return "Major Projects";
  if (!highImpact && highEase) return "Fill Ins";
  return "Thankless Tasks";
};
