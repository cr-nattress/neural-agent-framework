"use client";

import { Persona } from "@/types/persona";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Save, Download, ArrowLeft, MessageSquare } from "lucide-react";
import Link from "next/link";

interface PersonaReviewProps {
  persona: Persona;
  onSave: () => void;
  onBack: () => void;
  isSaving: boolean;
}

export function PersonaReview({
  persona,
  onSave,
  onBack,
  isSaving,
}: PersonaReviewProps) {
  const handleExport = () => {
    const dataStr = JSON.stringify(persona, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `persona-${persona.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Edit
        </Button>
        <div className="flex gap-2">
          {persona.id && (
            <Link href={`/chat?persona_id=${persona.id}`}>
              <Button variant="default" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat with Persona
              </Button>
            </Link>
          )}
          <Button
            variant="outline"
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export JSON
          </Button>
          <Button
            onClick={onSave}
            disabled={isSaving}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Persona"}
          </Button>
        </div>
      </div>

      {/* Main Persona Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{persona.name}</CardTitle>
          <CardDescription>
            {persona.age && `${persona.age} years old`}
            {persona.age && persona.occupation && " • "}
            {persona.occupation}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Background */}
          {persona.background && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Background</h3>
              <p className="text-sm text-muted-foreground">
                {persona.background}
              </p>
            </div>
          )}

          {/* Traits */}
          {persona.traits.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Personality Traits</h3>
              <div className="flex flex-wrap gap-2">
                {persona.traits.map((trait, index) => (
                  <Badge key={index} variant="secondary">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {persona.interests.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {persona.interests.map((interest, index) => (
                  <Badge key={index} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {persona.skills.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {persona.skills.map((skill, index) => (
                  <Badge key={index}>{skill}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Values */}
          {persona.values.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Core Values</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {persona.values.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Communication Style */}
          {persona.communication_style && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Communication Style</h3>
              <p className="text-sm text-muted-foreground">
                {persona.communication_style}
              </p>
            </div>
          )}

          {/* Personality Type */}
          {persona.personality_type && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Personality Type</h3>
              <p className="text-sm text-muted-foreground">
                {persona.personality_type}
              </p>
            </div>
          )}

          {/* Goals */}
          {persona.goals && persona.goals.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Goals</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {persona.goals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges */}
          {persona.challenges && persona.challenges.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Challenges</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {persona.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Metadata */}
          <div className="pt-4 border-t">
            <h3 className="text-sm font-semibold mb-2">Source Data</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                {persona.metadata.source_text_blocks} text block
                {persona.metadata.source_text_blocks !== 1 ? "s" : ""}
              </p>
              <p>
                {persona.metadata.source_links} link
                {persona.metadata.source_links !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
