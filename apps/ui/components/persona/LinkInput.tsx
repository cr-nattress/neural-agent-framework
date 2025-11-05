"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

interface LinkInputProps {
  links: string[];
  onChange: (links: string[]) => void;
}

export function LinkInput({ links, onChange }: LinkInputProps) {
  const handleAddLink = () => {
    onChange([...links, ""]);
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    onChange(newLinks);
  };

  const handleUpdateLink = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    onChange(newLinks);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Links</CardTitle>
        <p className="text-sm text-muted-foreground">
          Add URLs to profiles, articles, or any online content about the person
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {links.map((link, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={`link-${index}`}>Link {index + 1}</Label>
              {links.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveLink(index)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove link {index + 1}</span>
                </Button>
              )}
            </div>
            <Input
              id={`link-${index}`}
              type="url"
              placeholder="https://example.com/profile"
              value={link}
              onChange={(e) => handleUpdateLink(index, e.target.value)}
            />
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={handleAddLink}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another Link
        </Button>
      </CardContent>
    </Card>
  );
}
