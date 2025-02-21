
import { useState } from "react";
import { Initiative, InitiativeFormData } from "@/types/Initiative";
import { InitiativeForm } from "@/components/InitiativeForm";
import { PriorityMatrix } from "@/components/PriorityMatrix";
import { InitiativeList } from "@/components/InitiativeList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { calculateICEScore } from "@/lib/priorityUtils";

const Index = () => {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingInitiative, setEditingInitiative] = useState<Initiative | undefined>();
  const { toast } = useToast();

  const handleSubmit = (formData: InitiativeFormData, editId?: string) => {
    if (editId) {
      // Update existing initiative
      setInitiatives(initiatives.map(initiative => 
        initiative.id === editId 
          ? { ...initiative, ...formData }
          : initiative
      ));
      toast({
        title: "Initiative updated",
        description: "Your initiative has been successfully updated.",
      });
    } else {
      // Add new initiative
      const newInitiative: Initiative = {
        ...formData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      };
      setInitiatives([...initiatives, newInitiative]);
      toast({
        title: "Initiative added",
        description: "Your new initiative has been successfully added.",
      });
    }
    setShowForm(false);
    setEditingInitiative(undefined);
  };

  const handleInitiativeClick = (initiative: Initiative) => {
    setEditingInitiative(initiative);
    setShowForm(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Initiative Prioritizer (ICE)</h1>
            <p className="text-muted-foreground">
              Prioritize initiatives using ICE scoring (Impact, Confidence, Ease)
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingInitiative(undefined);
              setShowForm(true);
            }}
            className="animate-fadeIn"
            size="lg"
          >
            Add Initiative
          </Button>
        </div>

        {showForm ? (
          <InitiativeForm
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingInitiative(undefined);
            }}
            initiative={editingInitiative}
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
