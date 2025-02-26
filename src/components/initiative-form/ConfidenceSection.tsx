
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImpactLevel } from "@/types/Initiative";

interface ConfidenceSectionProps {
  dataConfidence: ImpactLevel;
  marketConfidence: ImpactLevel;
  technicalConfidence: ImpactLevel;
  onUpdate: (field: string, value: ImpactLevel) => void;
}

export const ConfidenceSection = ({
  dataConfidence,
  marketConfidence,
  technicalConfidence,
  onUpdate,
}: ConfidenceSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Confidence Dimensions</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Data Confidence</Label>
          <Select
            value={dataConfidence}
            onValueChange={(value: ImpactLevel) => onUpdate("dataConfidence", value)}
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
          <Label>Market Confidence</Label>
          <Select
            value={marketConfidence}
            onValueChange={(value: ImpactLevel) => onUpdate("marketConfidence", value)}
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
          <Label>Technical Confidence</Label>
          <Select
            value={technicalConfidence}
            onValueChange={(value: ImpactLevel) => onUpdate("technicalConfidence", value)}
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
    </div>
  );
};
