"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

interface TextBlockInputProps {
  textBlocks: string[];
  onChange: (textBlocks: string[]) => void;
}

export function TextBlockInput({ textBlocks, onChange }: TextBlockInputProps) {
  const handleAddBlock = () => {
    onChange([...textBlocks, ""]);
  };

  const handleRemoveBlock = (index: number) => {
    const newBlocks = textBlocks.filter((_, i) => i !== index);
    onChange(newBlocks);
  };

  const handleUpdateBlock = (index: number, value: string) => {
    const newBlocks = [...textBlocks];
    newBlocks[index] = value;
    onChange(newBlocks);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Text Blocks</CardTitle>
        <p className="text-sm text-muted-foreground">
          Add any text about the person - bios, emails, social media posts, etc.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {textBlocks.map((block, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={`text-block-${index}`}>
                Text Block {index + 1}
              </Label>
              {textBlocks.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveBlock(index)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove block {index + 1}</span>
                </Button>
              )}
            </div>
            <Textarea
              id={`text-block-${index}`}
              placeholder="Paste text about the person here..."
              value={block}
              onChange={(e) => handleUpdateBlock(index, e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={handleAddBlock}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another Text Block
        </Button>
      </CardContent>
    </Card>
  );
}
