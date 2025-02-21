
import { useState } from "react";
import { Initiative, InitiativeFormData } from "@/types/Initiative";
import { InitiativeForm } from "@/components/InitiativeForm";
import { PriorityMatrix } from "@/components/PriorityMatrix";
import { InitiativeList } from "@/components/InitiativeList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (formData: InitiativeFormData) => {
    const newInitiative: Initiative = {
      ...formData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    setInitiatives([...initiatives, newInitiative]);
    setShowForm(false);
    toast({
      title: "Initiative added",
      description: "Your new initiative has been successfully added.",
    });
  };

  const handleInitiativeClick = (initiative: Initiative) => {
    toast({
      title: initiative.title,
      description: `Score: ${(
        initiative.impact * 0.4 +
        initiative.urgency * 0.4 +
        (6 - initiative.effort) * 0.2
      ).toFixed(1)}`,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Initiative Prioritizer</h1>
            <p className="text-muted-foreground">
              Organize and prioritize your initiatives effectively
            </p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="animate-fadeIn"
            size="lg"
          >
            Add Initiative
          </Button>
        </div>

        {showForm ? (
          <InitiativeForm
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <Tabs defaultValue="matrix" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="matrix">Priority Matrix</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <TabsContent value="matrix" className="mt-6">
              <PriorityMatrix
                initiatives={initiatives}
                onInitiativeClick={handleInitiativeClick}
              />
            </TabsContent>
            <TabsContent value="list" className="mt-6">
              <InitiativeList
                initiatives={initiatives}
                onInitiativeClick={handleInitiativeClick}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Index;
