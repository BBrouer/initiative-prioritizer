
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
import { EaseSection } from "./initiative-form/EaseSection";

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
    experienceEase: "low",
    complexityEase: "low",
    competenceEase: "low",
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
        experienceEase: initiative.experienceEase,
        complexityEase: initiative.complexityEase,
        competenceEase: initiative.competenceEase,
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

          <EaseSection
            experienceEase={formData.experienceEase}
            complexityEase={formData.complexityEase}
            competenceEase={formData.competenceEase}
            onUpdate={handleUpdate}
          />

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
