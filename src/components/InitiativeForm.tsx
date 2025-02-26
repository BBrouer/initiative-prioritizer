import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Initiative, InitiativeFormData, ImpactLevel } from "@/types/Initiative";
import { calculateImpactScore, calculateConfidenceScore } from "@/lib/priorityUtils";

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
    const baseInitiative = { 
      ...formData, 
      id: "", 
      createdAt: new Date(),
    };
    // Calculate impact and confidence scores
    const calculatedData = {
      ...formData,
      impact: calculateImpactScore(baseInitiative),
      confidence: calculateConfidenceScore(baseInitiative),
    };
    onSubmit(calculatedData, initiative?.id);
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
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hypothesis">Hypothesis</Label>
            <Textarea
              id="hypothesis"
              value={formData.hypothesis}
              onChange={(e) =>
                setFormData({ ...formData, hypothesis: e.target.value })
              }
              placeholder="We believe that... [your hypothesis]
Baseline metric: [current value]
Target metric: [target value]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Cost Impact</Label>
              <Select
                value={formData.costImpact}
                onValueChange={(value: ImpactLevel) =>
                  setFormData({ ...formData, costImpact: value })
                }
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
                value={formData.productivityImpact}
                onValueChange={(value: ImpactLevel) =>
                  setFormData({ ...formData, productivityImpact: value })
                }
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
                value={formData.operationalImpact}
                onValueChange={(value: ImpactLevel) =>
                  setFormData({ ...formData, operationalImpact: value })
                }
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

          <div className="space-y-4 mt-6">
            <h3 className="font-medium">Confidence Dimensions</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Data Confidence</Label>
                <Select
                  value={formData.dataConfidence}
                  onValueChange={(value: ImpactLevel) =>
                    setFormData({ ...formData, dataConfidence: value })
                  }
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
                  value={formData.marketConfidence}
                  onValueChange={(value: ImpactLevel) =>
                    setFormData({ ...formData, marketConfidence: value })
                  }
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
                  value={formData.technicalConfidence}
                  onValueChange={(value: ImpactLevel) =>
                    setFormData({ ...formData, technicalConfidence: value })
                  }
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

          <div className="space-y-2">
            <Label>Ease (1-5)</Label>
            <Slider
              value={[formData.ease]}
              onValueChange={(value) =>
                setFormData({ ...formData, ease: value[0] })
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
