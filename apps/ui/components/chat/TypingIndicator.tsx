/**
 * TypingIndicator Component
 * Shows when agent is typing/processing
 */

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

interface TypingIndicatorProps {
  personaName: string;
}

export function TypingIndicator({ personaName }: TypingIndicatorProps) {
  return (
    <div className="flex gap-3 mb-4">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground mb-1 ml-1">
          {personaName}
        </span>

        <div className="bg-muted rounded-lg px-4 py-3 flex items-center gap-1">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
          </div>
          <span className="text-xs text-muted-foreground ml-2">typing...</span>
        </div>
      </div>
    </div>
  );
}
