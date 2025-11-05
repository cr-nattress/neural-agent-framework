# Neural Agent

> **Create AI-powered digital twins that think, remember, and respond just like the people they represent.**

<!-- TODO: Add status badges once CI/CD is set up -->
<!--
![Build Status](https://github.com/USER/neural-agent/workflows/CI/badge.svg)
![Version](https://img.shields.io/badge/version-0.1.0--alpha-blue)
![License](https://img.shields.io/badge/license-MIT-green)
-->

Neural Agent transforms unstructured information about individuals into sophisticated digital personas powered by multi-agent AI systems. Think of it as creating a digital twin that captures someone's personality, knowledge, communication style, and thought patterns.

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

> **Note:** Neural Agent is currently in early development (Phase 1). The following represents the planned functionality.

### Prerequisites

- Node.js 20+ and npm
- OpenAI API key (for persona processing)
- Supabase account (for data storage)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/neural-agent.git
cd neural-agent

# Install dependencies
cd apps/ui
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys
```

### Hello World Example

```bash
# Start the development server
npm run dev

# Open http://localhost:3000
```

Create your first persona in 3 steps:
1. Paste text about a person (bio, emails, social posts)
2. Add relevant links (profiles, articles)
3. Click "Create Persona" and watch AI structure the data

---

## 📖 How It Works

### Phase 1: Persona Creation

```
User Input (Text + Links)
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
  "name": "Sarah Chen",
  "occupation": "UX Designer",
  "traits": ["empathetic", "creative", "user-focused"],
  "interests": ["accessibility", "design thinking", "psychology"],
  "skills": ["Figma", "User Research", "Prototyping"],
  "values": ["inclusivity", "innovation", "user-centered design"],
  "communication_style": "Friendly, thoughtful, detail-oriented"
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

### Roadmap

- [ ] **Multi-Agent Chat System** (Phase 2)
- [ ] **Persona Management Dashboard** (Phase 2)
- [ ] **Web Scraping** - Automatic link content extraction (Phase 3)
- [ ] **Conversation Memory** - Persistent chat history (Phase 2)
- [ ] **Multi-User Support** - User accounts and authentication (Phase 7)
- [ ] **Behavioral Learning** - Personas that improve from interactions (Phase 6)
- [ ] **Export/Import** - Share and transfer personas (Phase 7)

---

## 🏗️ Architecture

### Monorepo Structure

```
neural-agent/
├── apps/
│   ├── ui/          # Next.js web interface
│   ├── api/         # Backend API services (future)
│   ├── agents/      # Multi-agent system (future)
│   └── admin/       # Admin dashboard (future)
├── packages/
│   └── libs/        # Shared libraries and utilities
├── docs/
│   └── backlog/     # Project management (epics, stories, tasks)
└── .claude/         # AI assistant configuration
```

### Technology Stack

**Frontend**
- Next.js 14+ (App Router)
- TypeScript (Strict Mode)
- shadcn/ui + Tailwind CSS
- Mobile-first responsive design

**Backend**
- Netlify Functions (Serverless)
- OpenAI API (GPT-4/3.5-turbo)
- Supabase (Storage & Database)

**Future: Multi-Agent System**
- LangChain or custom orchestration
- Specialized agent modules
- Inter-agent communication protocol

---

## 🛠️ Development

### Available Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run type-check   # TypeScript validation
npm run lint         # ESLint checking

# Testing (coming soon)
npm test             # Run test suite
npm run test:watch   # Watch mode
npm run test:e2e     # End-to-end tests
```

### Project Structure

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
    return fetch('/.netlify/functions/process-persona', { ... });
  },
  // ...
};
```

---

## 📚 Documentation

- 📖 **[OBJECTIVE.md](./OBJECTIVE.md)** - Project vision and phased roadmap
- 🗺️ **[PLAN.md](./PLAN.md)** - Detailed implementation plan and architecture
- 🤖 **[CLAUDE.md](./CLAUDE.md)** - AI assistant development guide
- 📋 **[Backlog](./docs/backlog/)** - Agile project management structure

### Key Concepts

- **Persona** - Structured digital representation of an individual
- **Multi-Agent System** - Collection of specialized AI agents working together
- **Service Abstraction** - Interface-based design for type-safe API integration
- **Netlify Functions** - Serverless backend for persona processing and data storage

---

## 🤝 Contributing

Contributions are welcome! Neural Agent is in active development and we'd love your help.

### Ways to Contribute

- 🐛 **Report Bugs** - Found an issue? Let us know!
- 💡 **Suggest Features** - Have ideas? We're listening
- 📝 **Improve Docs** - Help make the docs clearer
- 🔧 **Submit PRs** - Code contributions always welcome

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/neural-agent.git
cd neural-agent

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes and commit
git commit -m "feat: add amazing feature"

# Push and create a Pull Request
git push origin feature/amazing-feature
```

### Coding Guidelines

- ✅ Use TypeScript strict mode
- ✅ Follow mobile-first responsive design
- ✅ Write clear, descriptive commit messages
- ✅ Add tests for new features (when test suite is ready)
- ✅ Update documentation for API changes

<!-- TODO: Create CONTRIBUTING.md with detailed guidelines -->

---

## 🗺️ Roadmap

Neural Agent follows a 7-phase development plan:

- [x] **Phase 0** - Planning & Architecture ✅
- [ ] **Phase 1** - Foundation & Data Handling (Current)
  - Web interface for persona creation
  - OpenAI integration for data processing
  - Supabase storage implementation
- [ ] **Phase 2** - Chat Interface
  - Interactive chat UI
  - Persona selection and retrieval
  - Basic agent integration
- [ ] **Phase 3** - Information Enrichment
  - Web scraping for links
  - Automated research
  - Data confidence scoring
- [ ] **Phase 4** - Single Agent Prototype
  - Conversational agent
  - Personality trait extraction
  - Memory management
- [ ] **Phase 5** - Multi-Agent Architecture
  - Brain-inspired agent system
  - Agent orchestration
  - Inter-agent communication
- [ ] **Phase 6** - Advanced Replication
  - Learning from interactions
  - Behavioral pattern recognition
  - Quality metrics
- [ ] **Phase 7** - Production Features
  - User authentication
  - Multi-user support
  - Admin dashboard
  - Privacy & security hardening

See **[PLAN.md](./PLAN.md)** for detailed implementation steps.

---

## 🔒 Security & Privacy

Neural Agent handles sensitive personal information. Security considerations:

- 🔐 **API Keys** - Stored in environment variables, never committed
- 🛡️ **Input Validation** - All user input sanitized before processing
- 🔒 **Data Encryption** - Supabase encryption at rest
- 🚫 **Access Control** - Bucket policies and RLS (future)
- 📜 **Privacy Policy** - Clear disclosure of data usage (TODO)

**Note:** This is early-stage software. Do not use in production without thorough security review.

---

## ❓ FAQ

**Q: Is this ready for production use?**
A: No, Neural Agent is currently in Phase 1 (alpha). It's under active development.

**Q: What LLM models are supported?**
A: Currently OpenAI GPT-4 and GPT-3.5-turbo. More models planned (Claude, Llama, etc.).

**Q: Can I self-host this?**
A: Yes! The architecture supports self-hosting. Documentation coming soon.

**Q: How much does it cost to run?**
A: Costs depend on OpenAI API usage. Estimated $0.01-0.10 per persona creation.

**Q: Is my data shared or trained on?**
A: No. Your data is stored privately in your Supabase instance. OpenAI's data usage policy applies to API calls.

**Q: Can personas be exported?**
A: Export functionality is planned for Phase 7. Currently data is in JSON format in Supabase.

---

## 📄 License

<!-- TODO: Add LICENSE file -->

This project will be licensed under the MIT License. See [LICENSE](LICENSE) for details.

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
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling

Special thanks to the open-source community for the amazing tools and inspiration.

---

## 🚧 Project Status

**Current Phase:** Phase 1 - Foundation & Basic Data Handling
**Status:** Active Development (Alpha)
**Last Updated:** November 2025

### Recent Updates

- ✅ Project architecture defined
- ✅ Technology stack selected
- ✅ Development roadmap created
- 🚧 Frontend setup in progress
- 🚧 Mock service implementation
- ⏳ Backend integration pending

---

## 💬 Community & Support

<!-- TODO: Set up community channels -->

- 💬 **GitHub Discussions** - [Coming Soon]
- 🐛 **GitHub Issues** - [Report bugs and request features](https://github.com/YOUR_USERNAME/neural-agent/issues)
- 📧 **Email** - [Contact] (TODO)
- 🐦 **Twitter** - [Follow for updates] (TODO)

---

<div align="center">
  
  **[Website](https://neural-agent.example.com)** • **[Documentation](./docs)** • **[Roadmap](./PLAN.md)** • **[Contributing](./CONTRIBUTING.md)**
  
  Made with ❤️ by developers who believe in preserving human connections through technology
  
 </div>
 
 ---
 
 ## Landing Page and Authentication Plan
 
 ### Smiile-inspired UI/UX Summary
 - Hero with playful tone and strong CTA.
 - Three-step "How it works" explainer.
 - Social proof (testimonials/logos).
 - Use cases section.
 - Minimal copy, generous whitespace, friendly icons/illustrations.
 
 ### Information Architecture & Routing (Next.js App Router)
 - `/` — Marketing landing (public).
 - `/auth/login` — Magic-link email capture (public).
 - `/auth/callback` — Supabase callback to set session and redirect (public).
 - `/builder` — Persona builder (auth required).
 - `/chat` — Chat experience (auth required).
 - Optional: `/demo` — Read-only demo.
 
 ### Landing Page Sections
 - Navbar (brand, anchors, primary CTA).
 - Hero (headline/subheadline, CTAs to login/demo).
 - How it works (3 steps mapped to product flow: add sources → generate persona → chat/validate).
 - Social proof (quotes/logos).
 - Use cases (research, product discovery, buyer personas, UX research).
 - CTA strip (restate value + "Get started free").
 - Footer (links, legal, socials).
 - Visual system: shadcn/ui + Tailwind; `lucide-react` icons; light, inviting palette.
 
 ### Authentication Flow (Supabase Magic Link)
 - Deps: `@supabase/ssr`, `@supabase/supabase-js`.
 - Clients: `lib/supabase/client.ts` (browser) and `lib/supabase/server.ts` (SSR).
 - Service layer: `services/auth.service.ts` interface + `apiAuthService` implementation; export via `serviceFactory`.
 - Pages: `app/auth/login/page.tsx` (email capture) and `app/auth/callback` (session + redirect).
 - Guards: Protect `/builder` and `/chat`; redirect unauthenticated users to `/auth/login`.
 - Profile bootstrap (optional): `profiles` table with RLS; create row on first sign-in.
 
 ### Implementation Plan (Phases)
 - **Phase 1 — Foundations**: Add deps, env vars, Supabase clients, auth service layer.
 - **Phase 2 — Routing**: Move current `app/page.tsx` → `app/builder/page.tsx`; create new landing at `/`.
 - **Phase 3 — Auth Pages**: Implement login and callback; post-login redirect to `/builder`.
 - **Phase 4 — Route Protection**: Enforce auth on `/builder` and `/chat` with SSR-aware checks.
 - **Phase 5 — Marketing Components**: Navbar, Hero, HowItWorks, Testimonials, UseCases, CTA, Footer.
 - **Phase 6 — Profiles & Data**: Supabase `profiles` with RLS; ownership for personas.
 - **Phase 7 — QA & Analytics**: Responsive/a11y, e2e login → builder, metadata/OG, optional analytics.
 - **Phase 8 — Deployment**: Configure env and email sender; verify auth site URL.
 
 ### Deliverables
 - Marketing landing at `/` that mirrors the structure above.
 - Working magic-link authentication with SSR session handling.
 - Auth-protected `/builder` and `/chat` with smooth redirects.
 - Optional user profiles with RLS.
 
 ### Acceptance Criteria
 - Landing includes Hero, 3-step explainer, testimonials, use cases, and strong CTAs.
 - Magic-link flow works end-to-end; callback signs in and redirects to `/builder`.
 - Unauthorized access to `/builder` or `/chat` redirects to `/auth/login`.
 - Responsive layouts and basic accessibility checks pass.
 - Content is easily editable (copy and assets).
 
 ### Open Questions
 - Branding: preferred palette/typography and logo assets?
 - Public `/demo` route desired?
 - Email sender: Supabase default vs custom SMTP/domain?
 - Post-login redirect: `/builder` acceptable or prefer `/dashboard`?
 - Real testimonials/logos available now vs placeholders?
 
 ### Recommended Next Actions
 - Confirm answers to open questions above.
 - Approve Phase 1–2 work (deps/env + routing restructure + landing scaffolding).
 - See [MAGIC_LINK_AUTH_PLAN.md](./MAGIC_LINK_AUTH_PLAN.md) for deeper technical details and code examples.
