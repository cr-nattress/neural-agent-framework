# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Neural Agent** is a web application that creates digital personas through AI-powered data processing and multi-agent simulation. Users submit text blocks and links about a person, which are processed by LLMs to create standardized, structured persona profiles. These personas can then interact through a chat interface powered by a multi-agent backend system (memory, reasoning, personality agents).

## Current Development Phase

**Phase 1**: Foundation & Basic Data Handling - Building the persona creation web application
**Phase 2**: Agent Chat Interface - Interactive chat with persona-powered multi-agent system

The project is currently in planning/initial setup phase. Most implementation work is ahead.

## Architecture

### Monorepo Structure

```
neural-agent/
├── apps/
│   ├── ui/          # Next.js frontend (persona creation + chat interface)
│   ├── api/         # Backend API services (future)
│   ├── agents/      # Multi-agent system (future)
│   └── admin/       # Admin dashboard (future)
├── packages/
│   └── libs/        # Shared libraries
├── docs/
│   ├── backlog/     # Agile backlog (epics, stories, tasks)
│   └── prompts/     # AI agent prompts
└── .claude/         # Claude Code configuration
    ├── commands/    # Slash commands
    └── skills/      # Custom skills
```

### Technology Stack

**Frontend (`apps/ui`)**:
- Next.js 14+ (App Router)
- TypeScript (strict mode)
- shadcn/ui component library
- Tailwind CSS
- Mobile-first responsive design

**Backend** (Future):
- Netlify Functions (serverless)
- OpenAI API for persona processing
- Supabase Blob Storage for persona data
- Multi-agent system (LangChain or custom)

### Key Data Flow

1. **Persona Creation**: User input (text blocks + links) → Netlify Function → OpenAI processing → Structured JSON → Display for review → Save to Supabase
2. **Chat Interface**: User message + persona ID → Netlify Function → Retrieve persona from Supabase → Centralized agent orchestrator → Multi-agent backend (Memory/Reasoning/Personality agents) → Response

### Service Architecture

The frontend integrates with live APIs through typed service interfaces:
- Service interfaces define contracts (`services/persona.service.ts`, `services/chat.service.ts`)
- Real implementations call Netlify Functions (`services/api/api[Name]Service.ts`)
- Service factory (`services/serviceFactory.ts`) exports active service implementations

## Development Commands

### Git Operations
```bash
# View repository status
git status

# View recent commits
git log --oneline -10

# Create feature branch
git checkout -b feature/your-feature-name

# Commit changes (use heredoc format for multi-line messages)
git commit -m "$(cat <<'EOF'
Your commit message here.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

### Future Commands (when apps/ui is initialized)
```bash
# Install dependencies
cd apps/ui && npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## Important TypeScript Types

Refer to PLAN.md lines 482-594 for complete type definitions. Key types:

- `PersonaInputPayload`: Raw input from user (text blocks + links)
- `Persona`: Structured persona data with traits, interests, background, etc.
- `ProcessPersonaResponse`: Response from OpenAI processing
- `SavePersonaResponse`: Response from Supabase save operation
- `ChatRequest`/`ChatResponse`: Chat interface request/response
- `ChatMessage`: Individual chat message structure
- `Conversation`: Full conversation with messages and metadata

## Key Architectural Patterns

### Service Abstraction Pattern
All API calls go through typed service interfaces with live implementations:
- Define interface in `services/[name].service.ts`
- Implement in `services/api/api[Name]Service.ts`
- Service factory (`services/serviceFactory.ts`) exports active implementations
- Type-safe integration with Netlify Functions backend

### Component Organization
- `components/ui/`: shadcn components (never edit these directly)
- `components/persona/`: Persona-specific components
- `components/chat/`: Chat-specific components (Phase 2)
- `components/layout/`: Shared layout components

### Mobile-First Design
All UI components should be designed mobile-first with progressive enhancement:
- Start with 320px mobile layout
- Add tablet breakpoints at 768px
- Add desktop breakpoints at 1024px+
- Touch targets minimum 44px × 44px

## Project Planning Files

- **OBJECTIVE.md**: High-level project goals and phased roadmap
- **PLAN.md**: Detailed implementation plan with architecture, tech stack, user flows, type definitions, and next steps
- **docs/backlog/**: Agile backlog structure with epics, stories, and tasks
- **apps/ui/backlog/**: UI-specific backlog items

## Slash Commands

Available custom slash commands in `.claude/commands/`:
- `/persona`: Generate developer personas for AI personalization
- `/backlog`: Convert implementation plans to Agile backlogs
- `/analyze-solver`: Analyze problem-solving approaches
- `/psych-profile`: Create psychological profiles
- `/plan`: Generate implementation plans from objectives

## Critical Development Guidelines

### Security
- Never commit API keys (OpenAI, Supabase) - use environment variables
- Store all secrets in Netlify environment variables
- Sanitize user input before processing
- Validate JSON structures before saving
- Use Supabase service role key only in backend

### Code Quality
- Use TypeScript strict mode
- All components should be typed
- Prefer functional components with hooks
- Use shadcn/ui components (don't reinvent UI)
- Follow mobile-first responsive design

### API Integration
- All services connect to live Netlify Functions
- Design API services to match service interface exactly
- Implement comprehensive error handling for all API calls
- Test functionality against actual backend

### Error Handling
- All API calls should have try/catch blocks
- Display user-friendly error messages via Toast/Alert
- Log errors for debugging
- Handle network failures gracefully
- Provide loading states during async operations

## Phase-Specific Notes

### Phase 1 Focus (Current)
Building persona creation form with:
1. Text block input (dynamic array)
2. Link input (dynamic array)
3. Submit → Netlify Function for OpenAI processing
4. Display structured persona
5. Save to Supabase storage

### Phase 2 Focus (Future)
Building chat interface with:
1. Persona selector
2. Chat UI (messages, input, typing indicators)
3. Integration with centralized agent
4. Multi-agent backend (Memory/Reasoning/Personality agents)

## Environment Variables

### Development (.env.local)
```bash
# Supabase Configuration
SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_URL=https://...
SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# OpenAI API
OPENAI_API_KEY=sk-...

# Application Configuration
NODE_ENV=development
LOG_LEVEL=debug
```

### Production (Netlify)
```bash
# OpenAI API
OPENAI_API_KEY=sk-...

# Supabase
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## Git Workflow

This is an early-stage project with active development. When working on features:
1. Check current phase in PLAN.md before starting work
2. Reference backlog items for structured tasks
3. Create feature branches for significant work
4. Commit frequently with descriptive messages
5. Update PLAN.md if architecture decisions change

## Reference Documentation

- **PLAN.md**: Complete implementation details (lines 1-1532)
  - Architecture diagrams (lines 10-256)
  - Tech stack (lines 352-398)
  - Type definitions (lines 479-594)
  - File structure (lines 597-673)
  - Implementation phases (lines 956-1231)
- **OBJECTIVE.md**: Project objectives and phased roadmap
- **apps/ui/backlog/**: Detailed task breakdowns for UI development
