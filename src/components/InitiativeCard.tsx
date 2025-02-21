
import { Initiative } from "@/types/Initiative";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { calculateScore } from "@/lib/priorityUtils";

interface InitiativeCardProps {
  initiative: Initiative;
  onClick?: () => void;
}

export const InitiativeCard = ({ initiative, onClick }: InitiativeCardProps) => {
  const score = calculateScore(initiative);
  
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
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {initiative.description}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Badge variant="secondary">Impact: {initiative.impact}</Badge>
          <Badge variant="secondary">Effort: {initiative.effort}</Badge>
        </div>
        <Badge 
          className={`
            ${score >= 4 ? "bg-success" : ""}
            ${score >= 3 && score < 4 ? "bg-neutral" : ""}
            ${score < 3 ? "bg-urgent" : ""}
          `}
        >
          Score: {score.toFixed(1)}
        </Badge>
      </div>
    </Card>
  );
};
