
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConfidenceLevel, DataConfidenceLevel, ProcessFitLevel } from "@/types/Initiative";

interface ConfidenceSectionProps {
  hypothesisConfidence: ConfidenceLevel;
  dataConfidence: DataConfidenceLevel;
  processFit: ProcessFitLevel;
  onUpdate: (field: string, value: ConfidenceLevel | DataConfidenceLevel | ProcessFitLevel) => void;
}

export const ConfidenceSection = ({
  hypothesisConfidence,
  dataConfidence,
  processFit,
  onUpdate,
}: ConfidenceSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Confidence Dimensions</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Hypothesis Confidence</Label>
          <Select
            value={hypothesisConfidence}
            onValueChange={(value: ConfidenceLevel) => onUpdate("hypothesisConfidence", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unvalidated">Unvalidated</SelectItem>
              <SelectItem value="unexplored">Unexplored</SelectItem>
              <SelectItem value="validated">Validated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Data Confidence</Label>
          <Select
            value={dataConfidence}
            onValueChange={(value: DataConfidenceLevel) => onUpdate("dataConfidence", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unexplored">Unexplored</SelectItem>
              <SelectItem value="incomplete">Incomplete data</SelectItem>
              <SelectItem value="available">High quality data</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Process Fit</Label>
          <Select
            value={processFit}
            onValueChange={(value: ProcessFitLevel) => onUpdate("processFit", value)}
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
