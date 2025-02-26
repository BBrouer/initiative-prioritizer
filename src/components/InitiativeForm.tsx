
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Initiative, InitiativeFormData, ImpactLevel } from "@/types/Initiative";
import { InitiativeFormFields } from "./initiative-form/InitiativeFormFields";
import { ImpactSection } from "./initiative-form/ImpactSection";
import { ConfidenceSection } from "./initiative-form/ConfidenceSection";

interface InitiativeFormProps {
  onSubmit: (data: InitiativeFormData, editId?: string) => void;
  onCancel: () => void;
  initiative?: Initiative;
}

export const InitiativeForm = ({ onSubmit, onCancel, initiative }: InitiativeFormProps) => {
  const [formData, setFormData] = useState<InitiativeFormData>({
    title: "",
    hypothesis: "",
    description: "",
    costImpact: "low",
    productivityImpact: "low",
    operationalImpact: "low",
    dataConfidence: "low",
    marketConfidence: "low",
    technicalConfidence: "low",
    ease: 3,
    status: "planned",
  });

  useEffect(() => {
    if (initiative) {
      setFormData({
        title: initiative.title,
        hypothesis: initiative.hypothesis,
        description: initiative.description,
        costImpact: initiative.costImpact,
        productivityImpact: initiative.productivityImpact,
        operationalImpact: initiative.operationalImpact,
        dataConfidence: initiative.dataConfidence,
        marketConfidence: initiative.marketConfidence,
        technicalConfidence: initiative.technicalConfidence,
        ease: initiative.ease,
        status: initiative.status,
      });
    }
  }, [initiative]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, initiative?.id);
  };

  const handleUpdate = (field: string, value: string | ImpactLevel | number) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Card className="w-full max-w-lg mx-auto animate-fadeIn">
      <CardHeader>
        <CardTitle>{initiative ? "Edit Initiative" : "New Initiative"}</CardTitle>
        <CardDescription>
          {initiative ? "Modify" : "Add"} an initiative using ICE scoring (Impact, Confidence, Ease)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InitiativeFormFields
            title={formData.title}
            hypothesis={formData.hypothesis}
            description={formData.description}
            onUpdate={handleUpdate}
          />

          <ImpactSection
            costImpact={formData.costImpact}
            productivityImpact={formData.productivityImpact}
            operationalImpact={formData.operationalImpact}
            onUpdate={handleUpdate}
          />

          <ConfidenceSection
            dataConfidence={formData.dataConfidence}
            marketConfidence={formData.marketConfidence}
            technicalConfidence={formData.technicalConfidence}
            onUpdate={handleUpdate}
          />

          <div className="space-y-2">
            <Label>Ease (1-5)</Label>
            <Slider
              value={[formData.ease]}
              onValueChange={(value) =>
                handleUpdate("ease", value[0])
              }
              min={1}
              max={5}
              step={1}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{initiative ? "Save Changes" : "Add Initiative"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
