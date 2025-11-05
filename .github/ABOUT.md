# Neural Agent

**AI-Powered Digital Persona Creation & Multi-Agent Simulation Platform**

## About

Neural Agent is a web application that transforms text-based information about people into interactive digital personas powered by artificial intelligence. Submit information about a person through text blocks and links, and our system uses advanced LLMs to create structured, standardized persona profiles that can engage in intelligent conversations through a multi-agent backend system.

## Key Features

- **Intelligent Persona Creation**: Transform unstructured user input (text blocks, links) into rich, standardized digital personas
- **AI-Powered Processing**: Leverage OpenAI APIs to analyze and structure persona information
- **Multi-Agent System**: Interactive personas powered by specialized agents (Memory, Reasoning, Personality)
- **Chat Interface**: Engage with created personas through an intuitive conversation interface
- **Structured Data Output**: Generate standardized JSON persona profiles for consistent formatting
- **Mobile-First Design**: Fully responsive web application optimized for all devices

## Technology Stack

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode)
- **UI Library**: shadcn/ui component system
- **Styling**: Tailwind CSS
- **Design Approach**: Mobile-first responsive architecture

### Backend & Infrastructure
- **Serverless**: Netlify Functions
- **AI Processing**: OpenAI API
- **Data Storage**: Supabase Blob Storage
- **Agent System**: Multi-agent orchestration (LangChain or custom)

## Project Phases

### Phase 1: Foundation & Basic Data Handling (Current)
- Persona creation web application
- User input form (text blocks + links)
- LLM-powered persona processing
- Structured persona display and review
- Supabase storage integration

### Phase 2: Agent Chat Interface
- Interactive chat with persona-powered agents
- Persona selection and management
- Multi-agent backend system (Memory, Reasoning, Personality agents)
- Conversation history and context management

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Netlify CLI (for development)

### Development Setup

```bash
# Clone repository
git clone https://github.com/cr-nattress/neural-agent-framework.git
cd neural-agent

# Install dependencies
cd apps/ui
npm install

# Configure environment variables (.env.local)
# - SUPABASE_URL
# - SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
# - OPENAI_API_KEY

# Run development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build
```

## Project Structure

```
neural-agent/
├── apps/
│   ├── ui/              # Next.js frontend application
│   ├── api/             # Backend API services (future)
│   ├── agents/          # Multi-agent system (future)
│   └── admin/           # Admin dashboard (future)
├── packages/
│   └── libs/            # Shared libraries and utilities
├── docs/
│   ├── backlog/         # Agile backlog (epics, stories, tasks)
│   └── prompts/         # AI agent prompts
└── .github/             # GitHub configuration and documentation
```

## Architecture Overview

### Data Flow

**Persona Creation**:
1. User submits text blocks and links
2. Netlify Function receives input
3. OpenAI API processes and structures data
4. Generates standardized JSON persona
5. Display for user review
6. Save to Supabase Blob Storage

**Chat Interface**:
1. User sends message to persona
2. Netlify Function retrieves persona from Supabase
3. Centralized agent orchestrator processes request
4. Multi-agent backend generates response
5. Response returned to user interface

### Service Architecture

- **Service Interfaces**: Define contracts for all API interactions
- **Service Implementations**: Real implementations calling Netlify Functions
- **Service Factory**: Exports active service implementations for dependency injection

## Development Guidelines

### Code Quality
- TypeScript with strict mode enforcement
- Mobile-first responsive design
- Comprehensive error handling
- Component composition with shadcn/ui
- Proper state management patterns

### Security
- Never commit API keys (use environment variables)
- Store secrets in Netlify environment variables
- Sanitize user input before processing
- Validate JSON structures before storage
- Use Supabase service role key only in backend

### Git Workflow
- Feature branches for significant work
- Descriptive commit messages
- Regular updates to PLAN.md for architecture changes
- Reference backlog items in commit messages

## Documentation

- **OBJECTIVE.md**: High-level project goals and roadmap
- **PLAN.md**: Detailed implementation plan with architecture and type definitions
- **docs/backlog/**: Agile backlog structure with epics and stories
- **CLAUDE.md**: Development guidelines and best practices

## Contributing

We welcome contributions! Please:
1. Check existing issues and pull requests
2. Create a feature branch from `main`
3. Follow the code quality guidelines
4. Write clear commit messages
5. Submit a pull request with a detailed description

## License

[Add your project license here]

## Support

For issues, feature requests, or questions:
- Open an issue on GitHub
- Check existing documentation in `/docs`
- Review the PLAN.md for architecture details

## Project Status

**Current Phase**: Phase 1 - Foundation & Basic Data Handling

**Active Development**: Building persona creation web application with LLM integration

**Next Milestones**:
- Complete Phase 1 persona creation system
- Deploy to production environment
- Begin Phase 2 agent chat interface development
