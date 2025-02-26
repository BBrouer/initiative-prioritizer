
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface InitiativeFormFieldsProps {
  title: string;
  hypothesis: string;
  description: string;
  onUpdate: (field: string, value: string) => void;
}

export const InitiativeFormFields = ({
  title,
  hypothesis,
  description,
  onUpdate,
}: InitiativeFormFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => onUpdate("title", e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="hypothesis">Hypothesis</Label>
        <Textarea
          id="hypothesis"
          value={hypothesis}
          onChange={(e) => onUpdate("hypothesis", e.target.value)}
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
          value={description}
          onChange={(e) => onUpdate("description", e.target.value)}
          required
        />
      </div>
    </>
  );
};
