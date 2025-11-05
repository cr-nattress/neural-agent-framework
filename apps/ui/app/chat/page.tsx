"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ChatMessage as ChatMessageType, Persona } from "@/types/persona";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageList } from "@/components/chat/MessageList";
import { ChatInput } from "@/components/chat/ChatInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { usePersona } from "@/hooks/usePersona";
import { useChat } from "@/hooks/useChat";

export default function ChatPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const personaId = searchParams.get("persona_id");

  const { persona, loading: personaLoading, error: personaError } = usePersona(personaId);
  const {
    messages,
    isTyping,
    sendMessage,
    clearConversation,
    exportConversation,
  } = useChat(personaId);

  const [inputValue, setInputValue] = useState("");

  // Show error toast if persona fails to load
  useEffect(() => {
    if (personaError) {
      toast({
        title: "Error Loading Persona",
        description: personaError,
        variant: "destructive",
      });
    }
  }, [personaError, toast]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    if (!personaId) {
      toast({
        title: "No Persona Selected",
        description: "Please select a persona to chat with",
        variant: "destructive",
      });
      return;
    }

    const success = await sendMessage(inputValue);
    if (success) {
      setInputValue("");
    } else {
      toast({
        title: "Message Failed",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    clearConversation();
    toast({
      title: "Conversation Cleared",
      description: "Chat history has been cleared",
    });
  };

  const handleExport = () => {
    exportConversation();
    toast({
      title: "Conversation Exported",
      description: "Chat history has been downloaded",
    });
  };

  // Loading state
  if (personaLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading persona...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (!personaId || !persona) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold">No Persona Selected</h1>
          <p className="text-muted-foreground">
            Please go back and select a persona to start chatting.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Go to Home
          </a>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ChatHeader
        persona={persona}
        onClear={handleClear}
        onExport={handleExport}
      />

      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl flex flex-col">
        <MessageList messages={messages} persona={persona} />

        {isTyping && <TypingIndicator personaName={persona.name} />}

        <div className="mt-4">
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
            disabled={isTyping}
          />
        </div>
      </div>
    </div>
  );
}
