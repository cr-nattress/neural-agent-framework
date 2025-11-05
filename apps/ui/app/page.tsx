"use client";

import { useState } from "react";
import { PersonaInputPayload, Persona } from "@/types/persona";
import { personaService, isMockMode } from "@/services/serviceFactory";
import { TextBlockInput } from "@/components/persona/TextBlockInput";
import { LinkInput } from "@/components/persona/LinkInput";
import { PersonaReview } from "@/components/persona/PersonaReview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Sparkles } from "lucide-react";

type ViewMode = "form" | "review";

export default function Home() {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<ViewMode>("form");
  const [textBlocks, setTextBlocks] = useState<string[]>([""]);
  const [links, setLinks] = useState<string[]>([""]);
  const [persona, setPersona] = useState<Persona | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty blocks and links
    const filteredTextBlocks = textBlocks.filter((block) => block.trim() !== "");
    const filteredLinks = links.filter((link) => link.trim() !== "");

    // Validation
    if (filteredTextBlocks.length === 0 && filteredLinks.length === 0) {
      toast({
        title: "Input Required",
        description: "Please add at least one text block or link",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const payload: PersonaInputPayload = {
        textBlocks: filteredTextBlocks,
        links: filteredLinks,
      };

      const response = await personaService.processPersona(payload);

      if (response.success && response.persona) {
        setPersona(response.persona);
        setViewMode("review");
        toast({
          title: "Persona Created!",
          description: "Review the structured persona data below",
        });
      } else {
        toast({
          title: "Processing Failed",
          description: response.error || "Failed to process persona data",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = async () => {
    if (!persona) return;

    setIsSaving(true);

    try {
      const response = await personaService.savePersona({ persona });

      if (response.success) {
        toast({
          title: "Persona Saved!",
          description: `Persona saved successfully with ID: ${response.persona_id}`,
        });
      } else {
        toast({
          title: "Save Failed",
          description: response.error || "Failed to save persona",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while saving",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    setViewMode("form");
  };

  const handleReset = () => {
    setTextBlocks([""]);
    setLinks([""]);
    setPersona(null);
    setViewMode("form");
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-4xl font-bold tracking-tight">Neural Agent</h1>
            {isMockMode() && (
              <Badge variant="outline" className="text-xs">
                Mock Mode
              </Badge>
            )}
          </div>
          <p className="text-lg text-muted-foreground">
            Create AI-powered digital personas through data processing
          </p>
        </div>

        {/* Form View */}
        {viewMode === "form" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create a Persona</CardTitle>
                <CardDescription>
                  Add text blocks and links about the person you want to model
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <TextBlockInput
                  textBlocks={textBlocks}
                  onChange={setTextBlocks}
                />
                <LinkInput links={links} onChange={setLinks} />
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                type="submit"
                size="lg"
                disabled={isProcessing}
                className="flex-1 gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Create Persona
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleReset}
                disabled={isProcessing}
              >
                Reset
              </Button>
            </div>

            {isMockMode() && (
              <Card className="bg-muted">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    <strong>Mock Mode:</strong> Using simulated data for development.
                    The persona will be generated from mock data with a realistic delay (1.5-2s).
                  </p>
                </CardContent>
              </Card>
            )}
          </form>
        )}

        {/* Review View */}
        {viewMode === "review" && persona && (
          <PersonaReview
            persona={persona}
            onSave={handleSave}
            onBack={handleBack}
            isSaving={isSaving}
          />
        )}
      </div>
    </main>
  );
}
