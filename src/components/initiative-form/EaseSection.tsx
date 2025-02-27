
import { ImpactLevel } from "@/types/Initiative";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EaseSectionProps {
  experienceEase: ImpactLevel;
  complexityEase: ImpactLevel;
  competenceEase: ImpactLevel;
  onUpdate: (field: string, value: ImpactLevel) => void;
}

export const EaseSection = ({
  experienceEase,
  complexityEase,
  competenceEase,
  onUpdate,
}: EaseSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Ease Assessment</h3>
      
      <div className="space-y-2">
        <Label htmlFor="experienceEase">Experience (Team's familiarity with this type of work)</Label>
        <Select
          value={experienceEase}
          onValueChange={(value: ImpactLevel) => onUpdate("experienceEase", value)}
        >
          <SelectTrigger id="experienceEase">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low (Limited experience)</SelectItem>
            <SelectItem value="medium">Medium (Some experience)</SelectItem>
            <SelectItem value="high">High (Extensive experience)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="complexityEase">Complexity (Technical difficulty of implementation)</Label>
        <Select
          value={complexityEase}
          onValueChange={(value: ImpactLevel) => onUpdate("complexityEase", value)}
        >
          <SelectTrigger id="complexityEase">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low (Highly complex)</SelectItem>
            <SelectItem value="medium">Medium (Moderately complex)</SelectItem>
            <SelectItem value="high">High (Simple implementation)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="competenceEase">Competence (Required skills availability)</Label>
        <Select
          value={competenceEase}
          onValueChange={(value: ImpactLevel) => onUpdate("competenceEase", value)}
        >
          <SelectTrigger id="competenceEase">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low (Missing key skills)</SelectItem>
            <SelectItem value="medium">Medium (Most skills available)</SelectItem>
            <SelectItem value="high">High (All required skills available)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
