
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InitiativeFormData } from "@/types/Initiative";

interface InitiativeFormProps {
  onSubmit: (data: InitiativeFormData) => void;
  onCancel: () => void;
}

export const InitiativeForm = ({ onSubmit, onCancel }: InitiativeFormProps) => {
  const [formData, setFormData] = useState<InitiativeFormData>({
    title: "",
    description: "",
    impact: 3,
    confidence: 3,
    ease: 3,
    status: "planned",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-lg mx-auto animate-fadeIn">
      <CardHeader>
        <CardTitle>New Initiative</CardTitle>
        <CardDescription>
          Add a new initiative using ICE scoring (Impact, Confidence, Ease)
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

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Impact (1-5)</Label>
              <Slider
                value={[formData.impact]}
                onValueChange={(value) =>
                  setFormData({ ...formData, impact: value[0] })
                }
                min={1}
                max={5}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label>Confidence (1-5)</Label>
              <Slider
                value={[formData.confidence]}
                onValueChange={(value) =>
                  setFormData({ ...formData, confidence: value[0] })
                }
                min={1}
                max={5}
                step={1}
              />
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
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Add Initiative</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
