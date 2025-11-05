/**
 * MessageList Component
 * Displays list of chat messages with auto-scroll
 */

import { useEffect, useRef } from "react";
import { ChatMessage as ChatMessageType, Persona } from "@/types/persona";
import { ChatMessage } from "./ChatMessage";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface MessageListProps {
  messages: ChatMessageType[];
  persona: Persona;
}

export function MessageList({ messages, persona }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Empty state
  if (messages.length === 0) {
    return (
      <Card className="flex-1 flex items-center justify-center p-8 mb-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Start a conversation with {persona.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Ask questions, have a discussion, or just chat. The AI agent will
              respond based on {persona.name}'s persona traits and background.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex-1 overflow-y-auto p-4 mb-4">
      <div className="space-y-1">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            personaName={persona.name}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </Card>
  );
}
