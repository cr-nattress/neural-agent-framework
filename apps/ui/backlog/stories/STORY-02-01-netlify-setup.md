# STORY-02-01: Netlify Functions Setup

---

## Metadata
- **Story ID:** STORY-02-01
- **Epic:** [EPIC-02: Backend API & Storage](../epics/EPIC-02-backend-api.md)
- **Priority:** P0 - Critical
- **Status:** Ready to Start (can start in parallel with Epic 01)
- **Effort Estimate:** 1 day
- **Dependencies:** None (backend can develop in parallel)

---

## User Story
**As a** backend developer
**I want** Netlify Functions infrastructure configured
**So that** I can deploy serverless functions for persona processing

---

## Description
Set up Netlify Functions directory structure, configuration files, environment variables, and basic function templates. Establish local development workflow and deployment pipeline.

---

## Acceptance Criteria
- [ ] netlify/functions directory created
- [ ] netlify.toml configuration file created
- [ ] Environment variables configured (OpenAI, Supabase keys)
- [ ] Basic function handler template works
- [ ] Local development workflow functional (netlify dev)
- [ ] TypeScript configured for functions
- [ ] Test function deploys successfully
- [ ] CORS headers configured for API calls
- [ ] Error handling utilities created
- [ ] Response formatting utilities created

---

## Tasks

### Create netlify/functions directory structure
### Configure netlify.toml
### Set up environment variables (.env)
### Create lib/ for shared utilities (OpenAI client, Supabase client, validation)
### Create test function to verify deployment
### Test local development with netlify dev
### Configure TypeScript for functions
### Add CORS and error handling middleware

---

## Technical Details

### Directory Structure
```
netlify/
├── functions/
│   ├── process-persona.ts    # (to be created in STORY-02-02)
│   ├── save-persona.ts       # (to be created in STORY-02-04)
│   ├── get-persona.ts        # (to be created in STORY-02-04)
│   ├── test-function.ts      # Test function
│   └── lib/
│       ├── openai.ts         # OpenAI client config
│       ├── supabase.ts       # Supabase client config
│       ├── validation.ts     # Input validation
│       ├── response.ts       # Response formatting
│       └── cors.ts           # CORS middleware
└── netlify.toml
```

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "apps/ui/.next"

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### Environment Variables
```bash
# .env (not committed to git)
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4-turbo
MAX_TOKENS=2000

SUPABASE_URL=https://....supabase.co
SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_ROLE_KEY=eyJh...
```

---

## Definition of Done
- [ ] All tasks completed
- [ ] Test function deploys and runs
- [ ] Environment variables secured
- [ ] Local development workflow documented
- [ ] Ready for OpenAI integration

---

**Created:** 2025-11-04
