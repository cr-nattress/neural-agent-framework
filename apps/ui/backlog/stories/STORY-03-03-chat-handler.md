# STORY-03-03: Chat Backend Handler

---

## Metadata
- **Story ID:** STORY-03-03
- **Epic:** [EPIC-03: Chat Interface](../epics/EPIC-03-chat-interface.md)
- **Priority:** P0 - Critical
- **Status:** Blocked (depends on STORY-03-02)
- **Effort Estimate:** 2-3 days

---

## User Story
**As a** system
**I want** a chat endpoint that processes messages with persona context
**So that** users receive persona-aware AI responses

---

## Acceptance Criteria
- [ ] /functions/chat.ts created
- [ ] Receives message + persona_id + conversation history
- [ ] Fetches persona from Supabase
- [ ] Sends to centralized agent orchestrator
- [ ] Returns agent response to frontend
- [ ] Handles errors and timeouts
- [ ] Response time < 5 seconds
- [ ] Conversation context included

---

## Request/Response Format

```typescript
// Request
{
  message: string;
  persona_id: string;
  conversation_id?: string;
  history?: ChatMessage[];
}

// Response
{
  success: boolean;
  response?: string;
  conversation_id?: string;
  message_id?: string;
  metadata?: {
    tokens_used: number;
    processing_time_ms: number;
  }
}
```

---

**Created:** 2025-11-04
