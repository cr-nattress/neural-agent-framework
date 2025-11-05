# EPIC-03: Chat Interface

---

## Metadata
- **Epic ID:** EPIC-03
- **Phase:** 2.1-2.5
- **Priority:** P1 - High
- **Status:** Blocked (depends on EPIC-02)
- **Effort Estimate:** 10-14 days
- **Dependencies:** EPIC-02 (needs persona retrieval and storage)

---

## Goal
Build an interactive chat interface where users can converse with an AI agent powered by saved personas through a centralized multi-agent backend system.

---

## Objective
Create a conversational experience that leverages saved persona data to provide contextual, persona-aware AI responses through a coordinated multi-agent architecture.

---

## Success Criteria
- [ ] Chat UI built with persona selection and message display
- [ ] Mock chat service implemented for UI development
- [ ] Persona retrieval API functional
- [ ] Chat handler function processes messages
- [ ] Multi-agent backend orchestrates specialized agents
- [ ] Centralized agent applies persona context
- [ ] Conversation history maintained
- [ ] Real-time typing indicators and loading states
- [ ] Mobile-responsive chat interface
- [ ] End-to-end chat flow tested and deployed

---

## Business Value
- **User Engagement:** Interactive experience increases product value
- **Persona Utilization:** Demonstrates value of persona creation
- **AI Capabilities:** Showcases multi-agent intelligence
- **Product Differentiation:** Unique persona-powered conversations
- **Scalability:** Modular agent architecture enables future enhancements

---

## User Stories

### STORY-03-01: Chat UI with Mock Data
**Priority:** P0
**Effort:** 3-4 days

Build chat interface with persona selection and message display using mock services.

[View Story Details →](../stories/STORY-03-01-chat-ui-mock.md)

**Key Tasks:**
- Create chat page structure (/app/chat)
- Implement mock chat service with realistic responses
- Build PersonaSelector component
- Build ChatInterface with message display
- Create ChatInput with send functionality
- Add typing indicators and loading states

---

### STORY-03-02: Persona Retrieval API
**Priority:** P0
**Effort:** 1 day

Create Netlify Function to retrieve saved personas by ID from Supabase.

[View Story Details →](../stories/STORY-03-02-persona-retrieval.md)

**Key Tasks:**
- Create /get-persona function
- Integrate with Supabase storage
- Add caching for performance
- Handle not found errors
- Return persona data to frontend

---

### STORY-03-03: Chat Backend Handler
**Priority:** P0
**Effort:** 2-3 days

Implement chat endpoint that receives messages and coordinates with centralized agent.

[View Story Details →](../stories/STORY-03-03-chat-handler.md)

**Key Tasks:**
- Create /chat function
- Fetch persona from Supabase
- Send to centralized agent orchestrator
- Pass conversation history
- Return agent response
- Add error handling and timeouts

---

### STORY-03-04: Multi-Agent Backend
**Priority:** P0
**Effort:** 4-5 days

Develop centralized agent orchestrator and specialized multi-agent system.

[View Story Details →](../stories/STORY-03-04-multi-agent.md)

**Key Tasks:**
- Design agent architecture and framework
- Build centralized agent orchestrator
- Implement Memory Agent (conversation history)
- Implement Reasoning Agent (logic and responses)
- Implement Personality Agent (persona traits)
- Create agent communication protocol
- Add logging and debugging

---

### STORY-03-05: Chat Integration & Testing
**Priority:** P0
**Effort:** 2-3 days

Wire up frontend to backend, implement hooks, and test end-to-end chat flow.

[View Story Details →](../stories/STORY-03-05-chat-integration.md)

**Key Tasks:**
- Implement useChat hook
- Implement usePersona hook
- Connect ChatInput to backend
- Update MessageList with real responses
- Test on multiple devices
- Test with different personas
- Production deployment

---

## Technical Scope

### Technologies
- **Frontend:** Next.js, React, TypeScript, shadcn/ui
- **Backend:** Netlify Functions, OpenAI API
- **Agent Framework:** TBD (LangChain, AutoGPT, or custom)
- **Real-time:** Polling or Server-Sent Events (optional)

### shadcn Components Added
- Select (persona dropdown)
- Avatar (user/agent icons)
- ScrollArea (message list)
- Popover (chat options)
- DropdownMenu (chat actions)

### File Structure Created
```
apps/ui/
├── app/
│   └── chat/
│       ├── page.tsx              # Chat interface page
│       └── [persona_id]/
│           └── page.tsx          # Chat with specific persona
├── components/
│   └── chat/
│       ├── ChatInterface.tsx
│       ├── ChatMessage.tsx
│       ├── ChatInput.tsx
│       ├── MessageList.tsx
│       ├── TypingIndicator.tsx
│       └── ChatHeader.tsx
├── hooks/
│   ├── useChat.ts
│   └── usePersona.ts
├── services/
│   └── mock/
│       ├── mockChatService.ts
│       └── data/
│           ├── conversations.ts
│           └── responses.ts
└── types/
    └── chat.ts

netlify/functions/
├── chat.ts                       # Main chat handler
├── get-persona.ts                # Retrieve persona
└── agents/                       # Multi-agent system
    ├── orchestrator.ts           # Centralized agent
    ├── memoryAgent.ts            # Conversation history
    ├── reasoningAgent.ts         # Logic processing
    └── personalityAgent.ts       # Persona traits
```

---

## Acceptance Criteria

### Functional Requirements
- [ ] User can select a persona from dropdown
- [ ] User can type and send messages
- [ ] Messages appear in conversation thread
- [ ] Agent responses display after processing
- [ ] Typing indicator shows while agent processes
- [ ] Conversation history maintained
- [ ] Clear conversation functionality works
- [ ] Export conversation functionality works
- [ ] Switch persona mid-conversation (optional)

### Technical Requirements
- [ ] useChat hook manages message state
- [ ] usePersona hook fetches persona data
- [ ] Chat endpoint receives message + persona_id + history
- [ ] Centralized agent loads persona context
- [ ] Multi-agent backend processes messages
- [ ] Agents coordinate through orchestrator
- [ ] Response reflects persona traits
- [ ] Error handling for all failure scenarios

### UX Requirements
- [ ] Mobile-first responsive design
- [ ] Auto-scroll to latest message
- [ ] Timestamp on each message
- [ ] User vs agent message styling distinct
- [ ] Loading states during processing
- [ ] Error messages user-friendly
- [ ] Empty state when no messages
- [ ] Accessible (keyboard navigation)

### Performance Requirements
- [ ] Message send/receive < 3 seconds
- [ ] Agent response time < 5 seconds (typical)
- [ ] UI remains responsive during processing
- [ ] Handle 50+ message conversations
- [ ] No memory leaks on long sessions

---

## Testing Checklist

### Functional Tests
- [ ] Send message triggers chat handler
- [ ] Agent response appears in UI
- [ ] Persona selector loads personas
- [ ] Typing indicator shows/hides correctly
- [ ] Clear conversation empties messages
- [ ] Export downloads conversation

### Chat Flow Tests
- [ ] First message in conversation
- [ ] Multiple back-and-forth exchanges
- [ ] Long conversation (20+ messages)
- [ ] Switch persona mid-conversation
- [ ] Empty message not sent

### Agent Tests
- [ ] Memory agent recalls previous messages
- [ ] Reasoning agent provides logical responses
- [ ] Personality agent reflects persona traits
- [ ] Orchestrator coordinates agents correctly
- [ ] Agent failures handled gracefully

### Responsive Tests
- [ ] Mobile (320px-767px)
- [ ] Tablet (768px-1023px)
- [ ] Desktop (1024px+)
- [ ] Portrait and landscape orientations

### Error Tests
- [ ] Persona not found
- [ ] Chat API failure
- [ ] Agent timeout
- [ ] Network disconnection
- [ ] Invalid persona ID

---

## Multi-Agent Architecture

### Centralized Agent Orchestrator
**Role:** Main coordinator that receives user messages and orchestrates specialized agents

**Responsibilities:**
- Load persona data from Supabase
- Route messages to specialized agents
- Aggregate agent outputs
- Apply persona context to final response
- Return unified response to frontend

### Memory Agent
**Role:** Maintain and retrieve conversation history

**Responsibilities:**
- Store conversation messages
- Provide relevant context from history
- Manage context window (last N messages)
- Summarize older messages if needed

### Reasoning Agent
**Role:** Process user messages and generate logical responses

**Responsibilities:**
- Understand user intent
- Generate appropriate responses
- Handle question-answering
- Perform logical reasoning

### Personality Agent
**Role:** Apply persona traits to responses

**Responsibilities:**
- Adjust response tone based on persona
- Ensure communication style matches persona
- Apply personality traits to language
- Maintain persona consistency

### Agent Communication Protocol
```typescript
interface AgentMessage {
  from: string;           // Agent identifier
  to: string;             // Target agent
  type: 'request' | 'response';
  payload: any;           // Agent-specific data
  timestamp: string;
}

interface AgentContext {
  persona: Persona;
  conversation: ChatMessage[];
  userMessage: string;
}

interface AgentResponse {
  agent: string;
  output: string;
  confidence: number;
  metadata?: any;
}
```

---

## Chat Types

### TypeScript Definitions
```typescript
// Individual chat message
interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
  metadata?: {
    tokens_used?: number;
    processing_time_ms?: number;
  };
}

// Chat request
interface ChatRequest {
  message: string;
  persona_id: string;
  conversation_id?: string;
  history?: ChatMessage[];
}

// Chat response
interface ChatResponse {
  success: boolean;
  response?: string;
  conversation_id?: string;
  message_id?: string;
  error?: string;
  metadata?: {
    tokens_used: number;
    processing_time_ms: number;
    agents_involved?: string[];
  };
}

// Conversation
interface Conversation {
  id: string;
  persona_id: string;
  persona_name: string;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}
```

---

## Migration Path

### Phase 1: Mock Chat UI (STORY-03-01)
- Build chat interface
- Use mock chat service
- Test UX independently

### Phase 2: Backend Functions (STORY-03-02, 03-03)
- Implement persona retrieval
- Implement chat handler
- Test backend independently

### Phase 3: Multi-Agent (STORY-03-04)
- Build agent orchestrator
- Implement specialized agents
- Test agent coordination

### Phase 4: Integration (STORY-03-05)
- Connect frontend to backend
- Switch from mock to real services
- End-to-end testing

### Phase 5: Production
- Deploy to production
- Monitor performance
- Iterate on agent logic

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Multi-agent complexity | High | Start simple, add agents incrementally |
| Agent response time too slow | High | Optimize prompts, parallel processing, caching |
| Inconsistent persona application | Medium | Refine personality agent, add validation |
| Context window limits | Medium | Implement summarization, smart context selection |
| Agent framework learning curve | Medium | Thorough research, prototyping before commitment |

---

## Dependencies

### Blockers
- EPIC-02 completed (persona storage and retrieval)
- OpenAI API access
- Supabase configured
- Agent framework selected

### Blocks
- Future chat enhancements (Phase 3+)

---

## Cost Estimates

### OpenAI API (Chat)
- **Model:** GPT-4-turbo
- **Avg tokens per message:** 500 input + 200 output
- **Cost per message:** ~$0.01
- **100 messages/user/month:** ~$1/user

### Estimated Monthly Costs (100 active users)
- Chat API: ~$100
- Persona retrieval: negligible (caching)
- Netlify Functions: within free tier
- **Total:** ~$100/month

---

## Notes

### Optimization Opportunities
- Cache persona data in memory/Redis
- Parallel agent processing
- Stream responses token-by-token
- Summarize long conversations
- Use GPT-3.5 for simple responses

### Future Enhancements
- Voice input/output
- File attachments in chat
- Multi-persona conversations
- Agent marketplace (custom agents)
- Conversation branching
- Suggested responses
- Sentiment analysis

---

**Created:** 2025-11-04
**Last Updated:** 2025-11-04
**Owner:** Full Stack Team
