
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImpactLevel } from "@/types/Initiative";

interface ImpactSectionProps {
  costImpact: ImpactLevel;
  productivityImpact: ImpactLevel;
  operationalImpact: ImpactLevel;
  onUpdate: (field: string, value: ImpactLevel) => void;
}

export const ImpactSection = ({
  costImpact,
  productivityImpact,
  operationalImpact,
  onUpdate,
}: ImpactSectionProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="space-y-2">
        <Label>Cost Impact</Label>
        <Select
          value={costImpact}
          onValueChange={(value: ImpactLevel) => onUpdate("costImpact", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Productivity Impact</Label>
        <Select
          value={productivityImpact}
          onValueChange={(value: ImpactLevel) => onUpdate("productivityImpact", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Operational Impact</Label>
        <Select
          value={operationalImpact}
          onValueChange={(value: ImpactLevel) => onUpdate("operationalImpact", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
