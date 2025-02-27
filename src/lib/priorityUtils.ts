
import { Initiative, ImpactLevel, ConfidenceLevel, DataConfidenceLevel, ProcessFitLevel } from "@/types/Initiative";

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

const getHypothesisConfidenceScore = (level: ConfidenceLevel): number => {
  switch (level) {
    case "validated":
      return 5;
    case "unexplored":
      return 3;
    case "unvalidated":
      return 1;
    default:
      return 0;
  }
};

const getDataConfidenceScore = (level: DataConfidenceLevel): number => {
  switch (level) {
    case "available":
      return 5;
    case "incomplete":
      return 3;
    case "unexplored":
      return 1;
    default:
      return 0;
  }
};

const getProcessFitScore = (level: ProcessFitLevel): number => {
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

  // Calculate average confidence from all three dimensions
  const avgConfidence = (
    getHypothesisConfidenceScore(initiative.hypothesisConfidence) +
    getDataConfidenceScore(initiative.dataConfidence) +
    getProcessFitScore(initiative.processFit)
  ) / 3;

  // Round to nearest whole number
  return Math.round(avgConfidence);
};

export const calculateEaseScore = (initiative: Initiative): number => {
  // Calculate average ease from all three dimensions
  const avgEase = (
    getImpactScore(initiative.experienceEase) +
    getImpactScore(initiative.complexityEase) +
    getImpactScore(initiative.competenceEase)
  ) / 3;

  // Round to nearest whole number
  return Math.round(avgEase);
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
