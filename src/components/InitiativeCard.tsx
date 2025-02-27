
import { Initiative } from "@/types/Initiative";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { calculateICEScore } from "@/lib/priorityUtils";

interface InitiativeCardProps {
  initiative: Initiative;
  onClick?: () => void;
}

export const InitiativeCard = ({ initiative, onClick }: InitiativeCardProps) => {
  const score = calculateICEScore(initiative);
  
  // Get confidence level name based on score
  const getConfidenceLabel = (confidenceScore: number): string => {
    switch (confidenceScore) {
      case 5:
        return "Validated";
      case 3:
        return "Supported";
      case 1:
        return "Unvalidated";
      default:
        return `${confidenceScore}`;
    }
  };
  
  return (
    <Card
      className="p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer animate-fadeIn"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg">{initiative.title}</h3>
        <Badge
          variant="outline"
          className={`
            ${initiative.status === "completed" && "bg-success text-success-foreground"}
            ${initiative.status === "in-progress" && "bg-neutral text-neutral-foreground"}
          `}
        >
          {initiative.status}
        </Badge>
      </div>
      <div className="space-y-2 mb-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          <span className="font-medium">Hypothesis:</span> {initiative.hypothesis}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {initiative.description}
        </p>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline">Cost: {initiative.costImpact}</Badge>
          <Badge variant="outline">Productivity: {initiative.productivityImpact}</Badge>
          <Badge variant="outline">Operational: {initiative.operationalImpact}</Badge>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Badge variant="secondary">Impact: {initiative.impact}</Badge>
          <Badge variant="secondary">Confidence: {getConfidenceLabel(initiative.confidence)}</Badge>
          <Badge variant="secondary">Ease: {initiative.ease}</Badge>
        </div>
        <Badge 
          className={`
            ${score >= 4 ? "bg-success" : ""}
            ${score >= 3 && score < 4 ? "bg-neutral" : ""}
            ${score < 3 ? "bg-urgent" : ""}
          `}
        >
          ICE: {score.toFixed(1)}
        </Badge>
      </div>
    </Card>
  );
};
