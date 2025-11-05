/**
 * ChatHeader Component
 * Header with persona info and action buttons
 */

import { Persona } from "@/types/persona";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Trash2 } from "lucide-react";
import Link from "next/link";

interface ChatHeaderProps {
  persona: Persona;
  onClear: () => void;
  onExport: () => void;
}

export function ChatHeader({ persona, onClear, onExport }: ChatHeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Back button and persona info */}
          <div className="flex items-center gap-4 min-w-0">
            <Link href="/">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to home</span>
              </Button>
            </Link>

            <div className="min-w-0">
              <h1 className="text-lg font-semibold truncate">{persona.name}</h1>
              <div className="flex items-center gap-2 flex-wrap">
                {persona.occupation && (
                  <span className="text-sm text-muted-foreground">
                    {persona.occupation}
                  </span>
                )}
                {persona.age && (
                  <Badge variant="secondary" className="text-xs">
                    {persona.age} years
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Right: Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="hidden sm:flex"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={onExport}
              className="sm:hidden"
            >
              <Download className="h-4 w-4" />
              <span className="sr-only">Export conversation</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onClear}
              className="hidden sm:flex"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={onClear}
              className="sm:hidden"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Clear conversation</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
