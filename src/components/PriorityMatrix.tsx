
import { Initiative } from "@/types/Initiative";
import { Card } from "@/components/ui/card";
import { InitiativeCard } from "./InitiativeCard";

interface PriorityMatrixProps {
  initiatives: Initiative[];
  onInitiativeClick: (initiative: Initiative) => void;
}

export const PriorityMatrix = ({
  initiatives,
  onInitiativeClick,
}: PriorityMatrixProps) => {
  const quadrants = [
    { title: "Quick Wins", color: "border-success" },
    { title: "Major Projects", color: "border-neutral" },
    { title: "Fill Ins", color: "border-muted" },
    { title: "Thankless Tasks", color: "border-urgent" },
  ];

  const getQuadrantInitiatives = (quadrantTitle: string) => {
    return initiatives.filter((initiative) => {
      const highImpact = initiative.impact > 3;
      const highEffort = initiative.effort > 3;

      switch (quadrantTitle) {
        case "Quick Wins":
          return highImpact && !highEffort;
        case "Major Projects":
          return highImpact && highEffort;
        case "Fill Ins":
          return !highImpact && !highEffort;
        case "Thankless Tasks":
          return !highImpact && highEffort;
        default:
          return false;
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 animate-fadeIn">
      {quadrants.map((quadrant) => (
        <Card
          key={quadrant.title}
          className={`p-4 border-l-4 ${quadrant.color}`}
        >
          <h3 className="font-semibold mb-4">{quadrant.title}</h3>
          <div className="space-y-4">
            {getQuadrantInitiatives(quadrant.title).map((initiative) => (
              <InitiativeCard
                key={initiative.id}
                initiative={initiative}
                onClick={() => onInitiativeClick(initiative)}
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
