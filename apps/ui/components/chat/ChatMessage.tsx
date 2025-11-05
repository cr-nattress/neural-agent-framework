/**
 * ChatMessage Component
 * Displays an individual chat message from user or agent
 */

import { ChatMessage as ChatMessageType } from "@/types/persona";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
  personaName?: string;
}

export function ChatMessage({ message, personaName }: ChatMessageProps) {
  const isAgent = message.role === "agent";

  return (
    <div
      className={cn(
        "flex gap-3 mb-4",
        isAgent ? "justify-start" : "justify-end"
      )}
    >
      {isAgent && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "flex flex-col max-w-[75%] sm:max-w-[70%]",
          !isAgent && "items-end"
        )}
      >
        {isAgent && personaName && (
          <span className="text-xs text-muted-foreground mb-1 ml-1">
            {personaName}
          </span>
        )}

        <div
          className={cn(
            "rounded-lg px-4 py-2",
            isAgent
              ? "bg-muted text-foreground"
              : "bg-primary text-primary-foreground"
          )}
        >
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>

        <span className="text-xs text-muted-foreground mt-1 mx-1">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {!isAgent && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
