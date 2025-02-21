
import { Initiative } from "@/types/Initiative";

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
