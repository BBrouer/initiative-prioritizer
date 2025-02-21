
import { Initiative } from "@/types/Initiative";
import { InitiativeCard } from "./InitiativeCard";
import { calculateScore } from "@/lib/priorityUtils";

interface InitiativeListProps {
  initiatives: Initiative[];
  onInitiativeClick: (initiative: Initiative) => void;
}

export const InitiativeList = ({
  initiatives,
  onInitiativeClick,
}: InitiativeListProps) => {
  const sortedInitiatives = [...initiatives].sort(
    (a, b) => calculateScore(b) - calculateScore(a)
  );

  return (
    <div className="space-y-4 p-4 animate-fadeIn">
      {sortedInitiatives.map((initiative) => (
        <InitiativeCard
          key={initiative.id}
          initiative={initiative}
          onClick={() => onInitiativeClick(initiative)}
        />
      ))}
    </div>
  );
};
