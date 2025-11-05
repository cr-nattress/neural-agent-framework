/**
 * ChatInput Component
 * Textarea with send button and keyboard shortcuts
 */

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = "Type your message...",
  maxLength = 2000,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [rows, setRows] = useState(1);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      const lineHeight = 24; // approximate line height
      const maxRows = 6;
      const minRows = 1;

      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const calculatedRows = Math.min(
        maxRows,
        Math.max(minRows, Math.floor(scrollHeight / lineHeight))
      );
      setRows(calculatedRows);
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) {
        onSend();
      }
    }
  };

  const remainingChars = maxLength - value.length;
  const showCharCount = remainingChars <= 100;

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            rows={rows}
            className={cn(
              "resize-none pr-12",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          />
          {showCharCount && (
            <div
              className={cn(
                "absolute bottom-2 right-2 text-xs",
                remainingChars < 0
                  ? "text-destructive"
                  : remainingChars < 50
                  ? "text-orange-500"
                  : "text-muted-foreground"
              )}
            >
              {remainingChars}
            </div>
          )}
        </div>

        <Button
          onClick={onSend}
          disabled={disabled || !value.trim() || remainingChars < 0}
          size="icon"
          className="h-auto self-end"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd> to
        send, <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Shift+Enter</kbd>{" "}
        for new line
      </p>
    </div>
  );
}
