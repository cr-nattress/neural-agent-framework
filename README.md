# Neural Agent

> **Create AI-powered digital twins that think, remember, and respond just like the people they represent.**

![Build Status](https://img.shields.io/badge/status-alpha-yellow)
![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-5.9+-blue)

Neural Agent transforms unstructured information about individuals into sophisticated digital personas powered by multi-agent AI systems. Think of it as creating a digital twin that captures someone's personality, knowledge, communication style, and thought patterns.

## Table of Contents

- [What is Neural Agent?](#-what-is-neural-agent)
- [Quick Start](#-quick-start)
- [How It Works](#-how-it-works)
- [Features](#-features)
- [Architecture](#-architecture)
- [Development](#-development)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [Security & Privacy](#-security--privacy)
- [FAQ](#-faq)

---

## ✨ What is Neural Agent?

Neural Agent is a web application that enables digital replication of individuals through:

- 📝 **Data Collection** - Submit text blocks, links, and information about a person
- 🤖 **AI Processing** - LLMs analyze and structure the data into standardized personas
- 🧠 **Multi-Agent Simulation** - Brain-inspired agent architecture replicates thought patterns
- 💬 **Interactive Chat** - Converse with AI personas that embody real personalities

### Perfect For

- **Memory Preservation** - Capture the essence of loved ones for future generations
- **Research & Analysis** - Study personality patterns and communication styles
- **Creative Projects** - Generate realistic character interactions for stories or games
- **Personal AI Assistants** - Create specialized agents based on expert knowledge

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.0.0 or higher
- **npm** or **yarn**
- OpenAI API key ([get one here](https://platform.openai.com))
- Supabase account ([create one](https://supabase.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/cr-nattress/neural-agent-framework.git
cd neural-agent

# Install root dependencies
npm install

# Install UI application dependencies
cd apps/ui
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys
```

### Environment Variables

Create `.env.local` in `apps/ui/`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=sk-your_openai_api_key
```

### Hello World Example

```bash
# Start the development server
cd apps/ui
npm run dev

# Open http://localhost:3000 in your browser
```

**Create your first persona in 3 steps:**

1. Paste text about a person (bio, emails, social posts)
2. Add relevant links (profiles, articles)
3. Click "Create Persona" and watch AI structure the data

---

## 📖 How It Works

### Phase 1: Persona Creation

```
User Input (Text + Links)
         ↓
   Netlify Function
         ↓
   OpenAI Processing
         ↓
  Structured JSON Persona
         ↓
   Review & Approval
         ↓
  Supabase Storage
```

**Example Input:**

```javascript
const personaData = {
  textBlocks: [
    "Sarah is a UX designer with 5 years experience...",
    "She's passionate about accessibility and inclusive design...",
    "Known for her empathetic approach to user research..."
  ],
  links: [
    "https://linkedin.com/in/sarah-designer",
    "https://medium.com/@sarah/accessibility-matters"
  ]
};
```

**AI-Generated Output:**

```json
{
  "id": "persona_abc123",
  "name": "Sarah Chen",
  "occupation": "UX Designer",
  "traits": ["empathetic", "creative", "user-focused"],
  "interests": ["accessibility", "design thinking", "psychology"],
  "skills": ["Figma", "User Research", "Prototyping"],
  "values": ["inclusivity", "innovation", "user-centered design"],
  "communication_style": "Friendly, thoughtful, detail-oriented",
  "createdAt": "2025-11-05T12:00:00Z"
}
```

### Phase 2: Multi-Agent Chat (Coming Soon)

```
User Message
     ↓
Centralized Agent Orchestrator
     ↓
┌─────────┬──────────┬─────────────┐
│ Memory  │ Reasoning│ Personality │
│ Agent   │  Agent   │   Agent     │
└─────────┴──────────┴─────────────┘
     ↓
Persona-Aware Response
```

The multi-agent system mimics human brain architecture:

- 🧠 **Memory Agent** - Maintains conversation context and history
- 💭 **Reasoning Agent** - Processes logic and generates responses
- 🎭 **Personality Agent** - Applies persona traits to ensure authentic responses

---

## 🎯 Features

### Current (Phase 1 - In Development)

- 📥 **Flexible Input** - Accept unlimited text blocks and links
- ⚡ **AI Processing** - OpenAI-powered data cleaning and structuring
- 📊 **Structured Output** - Standardized JSON persona format
- 🔍 **Review Interface** - Verify AI-generated personas before saving
- 💾 **Cloud Storage** - Secure Supabase blob storage
- 📱 **Mobile-First Design** - Responsive UI built with Next.js and shadcn/ui
- 🔒 **Type-Safe** - Full TypeScript support with strict mode
- ⚡ **Performance** - Optimized for fast processing and minimal latency

### Roadmap

- [ ] **Multi-Agent Chat System** (Phase 2)
- [ ] **Persona Management Dashboard** (Phase 2)
- [ ] **Web Scraping** - Automatic link content extraction (Phase 3)
- [ ] **Conversation Memory** - Persistent chat history (Phase 2)
- [ ] **Authentication** - Magic link email auth (Phase 2)
- [ ] **Multi-User Support** - User accounts and profiles (Phase 7)
- [ ] **Behavioral Learning** - Personas that improve from interactions (Phase 6)
- [ ] **Export/Import** - Share and transfer personas (Phase 7)

---

## 🏗️ Architecture

### Monorepo Structure

```
neural-agent/
├── apps/
│   ├── ui/          # Next.js web interface (primary app)
│   ├── api/         # Backend API services (planned)
│   ├── agents/      # Multi-agent system (planned)
│   └── admin/       # Admin dashboard (planned)
├── packages/
│   └── libs/        # Shared libraries and utilities
├── docs/
│   ├── backlog/     # Project management (epics, stories, tasks)
│   └── prompts/     # AI agent prompts
├── .github/         # GitHub configuration
└── .claude/         # AI assistant configuration
```

### Technology Stack

**Frontend**

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.0+ | React framework with App Router |
| TypeScript | 5.9+ | Type-safe development |
| React | 19.2+ | UI library |
| Tailwind CSS | 4.1+ | Utility-first CSS |
| shadcn/ui | Latest | Accessible UI components |
| Zod | 4.1+ | Schema validation |

**Backend & Infrastructure**

| Technology | Purpose |
|-----------|---------|
| Netlify Functions | Serverless backend |
| OpenAI API | LLM processing (GPT-4/3.5-turbo) |
| Supabase | Database & blob storage |
| TypeScript | Type-safe backend code |

**Future: Multi-Agent System**

- LangChain or custom orchestration
- Specialized agent modules (Memory, Reasoning, Personality)
- Inter-agent communication protocol

### Service Architecture

The frontend uses a service abstraction pattern for type-safe API integration:

```typescript
// Service interface defines contract
interface IPersonaService {
  processPersona(input: PersonaInputPayload): Promise<ProcessPersonaResponse>;
  savePersona(payload: SavePersonaPayload): Promise<SavePersonaResponse>;
  getPersona(id: string): Promise<GetPersonaResponse>;
}

// Real implementation calls Netlify Functions
export const apiPersonaService: IPersonaService = {
  async processPersona(input) {
    return fetch('/.netlify/functions/process-persona', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
  }
};

// Service factory exports active implementation
export const personaService = apiPersonaService;
```

---

## 🛠️ Development

### Available Commands

```bash
# UI Application (apps/ui)
cd apps/ui

# Development
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run type-check   # TypeScript validation
npm run lint         # ESLint checking

# Root-level convenience commands
npm run dev:ui       # Run UI from project root
npm run build        # Build for production
npm run install:all  # Install all dependencies
```

### Project Structure

```typescript
apps/ui/
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Landing/builder page
│   ├── layout.tsx    # Root layout
│   └── api/          # API routes (if needed)
├── components/       # React components
│   ├── ui/           # shadcn/ui components
│   ├── persona/      # Persona-specific components
│   └── layout/       # Shared layout components
├── services/         # Service layer
│   ├── persona.service.ts        # Persona service interface
│   └── api/
│       └── apiPersonaService.ts  # API implementation
├── lib/              # Utilities
│   ├── supabase/     # Supabase client setup
│   └── types.ts      # TypeScript type definitions
├── public/           # Static assets
├── styles/           # Global styles
└── package.json      # Dependencies
```

### Development Workflow

```bash
# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes and test
npm run type-check   # Ensure no TypeScript errors
npm run lint         # Check code style

# Commit with descriptive message
git commit -m "feat: add amazing feature"

# Push to remote
git push origin feature/amazing-feature

# Create a Pull Request on GitHub
```

---

## 📚 Documentation

- 📖 **[OBJECTIVE.md](./OBJECTIVE.md)** - Project vision and phased roadmap
- 🗺️ **[PLAN.md](./PLAN.md)** - Detailed implementation plan and architecture
- 🤖 **[CLAUDE.md](./CLAUDE.md)** - AI assistant development guide
- 📋 **[Backlog](./docs/backlog/)** - Agile project management structure
- ℹ️ **[ABOUT.md](./.github/ABOUT.md)** - GitHub about section content

### Key Concepts

- **Persona** - Structured digital representation of an individual with traits, interests, and communication style
- **Multi-Agent System** - Collection of specialized AI agents working together (Memory, Reasoning, Personality)
- **Service Abstraction** - Interface-based design for type-safe API integration
- **Netlify Functions** - Serverless backend for persona processing and data storage

---

## 🤝 Contributing

Contributions are welcome! Neural Agent is in active development and we'd love your help.

### Ways to Contribute

- 🐛 **Report Bugs** - Found an issue? [Open a GitHub issue](https://github.com/cr-nattress/neural-agent-framework/issues)
- 💡 **Suggest Features** - Have ideas? We're listening
- 📝 **Improve Docs** - Help make the docs clearer
- 🔧 **Submit PRs** - Code contributions always welcome

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/neural-agent-framework.git
cd neural-agent

# Create a feature branch
git checkout -b feature/amazing-feature

# Install dependencies
npm install
cd apps/ui && npm install

# Make your changes
npm run dev          # Start dev server
npm run type-check   # Validate types
npm run lint         # Check style

# Commit and push
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature

# Create a Pull Request on GitHub
```

### Coding Guidelines

- ✅ Use TypeScript strict mode
- ✅ Follow mobile-first responsive design
- ✅ Write clear, descriptive commit messages
- ✅ Update documentation for API changes
- ✅ Format code with Prettier (configured in project)
- ✅ Run `npm run lint` before committing
- ✅ Ensure `npm run type-check` passes

---

## 🗺️ Roadmap

Neural Agent follows a 7-phase development plan:

- [x] **Phase 0** - Planning & Architecture ✅
- [ ] **Phase 1** - Foundation & Data Handling (Current)
  - Web interface for persona creation
  - OpenAI integration for data processing
  - Supabase storage implementation
  - Type-safe service architecture
- [ ] **Phase 2** - Chat Interface & Authentication
  - Interactive chat UI with multi-agent backend
  - Persona selection and retrieval
  - Magic-link email authentication
  - User profiles and data ownership
- [ ] **Phase 3** - Information Enrichment
  - Web scraping for links
  - Automated research capabilities
  - Data confidence scoring
- [ ] **Phase 4** - Single Agent Prototype
  - Conversational agent with memory
  - Personality trait extraction
  - Advanced context awareness
- [ ] **Phase 5** - Multi-Agent Architecture
  - Brain-inspired agent system
  - Agent orchestration and communication
  - Specialized agent roles
- [ ] **Phase 6** - Advanced Replication
  - Learning from interactions
  - Behavioral pattern recognition
  - Quality metrics and scoring
- [ ] **Phase 7** - Production Features
  - Admin dashboard
  - Privacy & security hardening
  - Export/Import capabilities
  - Scaling and performance optimization

See **[PLAN.md](./PLAN.md)** for detailed implementation steps.

---

## 🔒 Security & Privacy

Neural Agent handles sensitive personal information. Security considerations:

- 🔐 **API Keys** - Stored in environment variables, never committed to version control
- 🛡️ **Input Validation** - All user input sanitized before processing
- 🔒 **Data Encryption** - Supabase encryption at rest and in transit
- 🚫 **Access Control** - Bucket policies and RLS (row-level security) planned
- 📜 **Privacy Policy** - Clear disclosure of data usage required

⚠️ **Note:** This is early-stage software (Alpha). Do not use in production without thorough security review.

---

## ❓ FAQ

**Q: Is this ready for production use?**

A: No, Neural Agent is currently in Phase 1 (alpha). It's under active development. Do not use with sensitive data in production.

**Q: What LLM models are supported?**

A: Currently OpenAI GPT-4 and GPT-3.5-turbo. More models planned (Claude, Llama, etc.).

**Q: Can I self-host this?**

A: Yes! The architecture supports self-hosting. Detailed documentation coming soon.

**Q: How much does it cost to run?**

A: Costs depend on OpenAI API usage. Estimated $0.01-0.10 per persona creation. Supabase has a generous free tier.

**Q: Is my data shared or trained on?**

A: No. Your data is stored privately in your Supabase instance. OpenAI's [data usage policy](https://openai.com/enterprise-privacy) applies to API calls.

**Q: Can personas be exported?**

A: Export functionality is planned for Phase 7. Currently data is stored as JSON in Supabase and can be manually exported.

**Q: How do I report a security vulnerability?**

A: Please email security@example.com with details (or open a private security advisory on GitHub).

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

Copyright © 2025 Neural Agent Contributors

---

## 🙏 Acknowledgments

Neural Agent is inspired by:

- Brain-computer interface research and cognitive architectures
- Multi-agent systems in AI (AutoGPT, MetaGPT, CrewAI)
- Digital preservation and memory projects

Built with:

- [Next.js](https://nextjs.org/) - React framework
- [OpenAI API](https://openai.com/) - LLM processing
- [Supabase](https://supabase.com/) - Backend as a Service
- [shadcn/ui](https://ui.shadcn.com/) - Accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

Special thanks to the open-source community for the amazing tools and inspiration.

---

## 🚧 Project Status

**Current Phase:** Phase 1 - Foundation & Basic Data Handling
**Status:** Active Development (Alpha)
**Last Updated:** November 2025

### Recent Updates

- ✅ Project architecture defined
- ✅ Technology stack finalized
- ✅ Development roadmap created
- ✅ GitHub documentation setup
- 🚧 Frontend persona creation interface
- 🚧 Service layer and API integration
- ⏳ Backend integration (Netlify Functions)

---

## 💬 Community & Support

- 🐛 **[GitHub Issues](https://github.com/cr-nattress/neural-agent-framework/issues)** - Report bugs and request features
- 📖 **[Documentation](./docs)** - Browse project documentation
- 🗺️ **[Roadmap](./PLAN.md)** - View development roadmap
- 🤝 **[Contributing Guide](./CONTRIBUTING.md)** - Learn how to contribute

---

<div align="center">

**[Repository](https://github.com/cr-nattress/neural-agent-framework)** • **[Documentation](./docs)** • **[Roadmap](./PLAN.md)** • **[Contributing](./.github/CONTRIBUTING.md)**

Made with ❤️ by developers who believe in preserving human connections through technology

</div>
