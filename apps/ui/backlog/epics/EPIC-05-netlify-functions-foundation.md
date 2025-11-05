# EPIC-05: Netlify Functions Foundation

---

## Metadata

- **Epic ID:** EPIC-05
- **Phase:** 1.2 (Backend Setup)
- **Priority:** P0 - Critical
- **Status:** Ready to Start (depends on EPIC-01)
- **Effort Estimate:** 3-4 days
- **Dependencies:** EPIC-01 (frontend infrastructure)

---

## Goal

Establish serverless backend infrastructure with Netlify Functions for processing and storing persona data.

---

## Objective

Build production-ready Netlify Functions foundation with proper TypeScript configuration, environment variable management, request/response validation, and error handling middleware that serves as the base for all backend operations.

---

## Business Value

- **Infrastructure Foundation:** Enables all subsequent backend features
- **Development Velocity:** Proper structure allows faster feature development
- **Cost Efficiency:** Serverless eliminates infrastructure overhead
- **Scalability:** Handles variable load without scaling servers
- **Type Safety:** TypeScript prevents runtime errors

---

## Current State

- Frontend application exists in `apps/ui/`
- No backend Netlify Functions directory structure
- No environment variable management
- No request validation layer
- No centralized error handling

---

## Target State

- `netlify/functions/` directory with proper structure
- TypeScript base handler classes
- Environment variable validation and loading
- Request/response validation schemas
- Centralized error handling middleware
- Logging infrastructure
- All functions deployable and testable locally

---

## Technical Approach

### Directory Structure

```
apps/ui/
├── netlify/
│   └── functions/
│       ├── process-persona.ts          # Process raw input via OpenAI
│       ├── save-persona.ts             # Save to Supabase
│       ├── get-persona.ts              # Retrieve persona by ID
│       ├── chat.ts                     # Chat handler (Phase 2)
│       └── lib/
│           ├── base-handler.ts         # Base function handler
│           ├── env.ts                  # Environment validation
│           ├── validation.ts           # Zod validation schemas
│           ├── errors.ts               # Custom error classes
│           ├── logger.ts               # Logging utility
│           └── types.ts                # Shared TypeScript types
```

### Key Components

**Base Handler Class:**
- Standard request/response handling
- Automatic error catching
- Request logging
- Response formatting

**Environment Management:**
- Validate all required env vars at startup
- Fail fast with clear error messages
- Support development and production modes

**Validation Layer:**
- Zod schemas for request/response
- Type-safe validation
- Clear error messages for invalid input

**Error Handling:**
- Custom error classes (ValidationError, OpenAIError, StorageError)
- Consistent error response format
- User-friendly error messages

---

## Acceptance Criteria

- [ ] `netlify/functions/` directory created with proper structure
- [ ] `netlify.toml` configured with function settings
- [ ] Base handler class implements standard patterns
- [ ] Environment variables validated at startup
- [ ] Zod schemas created for request/response validation
- [ ] Custom error classes implemented
- [ ] Logger utility created and integrated
- [ ] TypeScript configuration allows function imports
- [ ] Functions can be run locally with `netlify dev`
- [ ] All functions return standardized response format
- [ ] Error responses include user-friendly messages
- [ ] Development `.env.local` file documented (not committed)

---

## User Stories

### STORY-05-01: Create Netlify Functions Directory Structure

Create the foundational directory structure for all backend functions with proper TypeScript configuration.

[View Story Details →](../stories/STORY-05-01-netlify-structure.md)

**Key Tasks:**
- Create `netlify/functions/` directory
- Create `netlify/functions/lib/` for shared utilities
- Configure `netlify.toml` with function settings
- Create TypeScript configuration for functions
- Add necessary dependencies to `package.json`

---

### STORY-05-02: Implement Base Handler Class

Create a reusable base class for all function handlers with standard patterns.

[View Story Details →](../stories/STORY-05-02-base-handler.md)

**Key Tasks:**
- Implement BaseHandler class
- Add request logging
- Add response formatting
- Add error catching and handling
- Add TypeScript types for handler signature

---

### STORY-05-03: Implement Environment Variable Management

Create validation and loading system for environment variables.

[View Story Details →](../stories/STORY-05-03-env-management.md)

**Key Tasks:**
- Create env validation module
- Validate required variables at startup
- Document required environment variables
- Create `.env.local.example` template
- Implement different modes (dev, prod)

---

### STORY-05-04: Create Validation Schemas

Implement Zod schemas for request/response validation.

[View Story Details →](../stories/STORY-05-04-validation-schemas.md)

**Key Tasks:**
- Install Zod dependency
- Create persona input validation schema
- Create persona output validation schema
- Create chat request/response schemas
- Create save persona schemas
- Add schema documentation

---

### STORY-05-05: Implement Error Handling & Logging

Create custom error classes and logging infrastructure.

[View Story Details →](../stories/STORY-05-05-error-logging.md)

**Key Tasks:**
- Create custom error classes
- Implement logger utility
- Add structured logging
- Create error response formatter
- Add error middleware to base handler

---

## Technical Scope

### Technologies

- **Runtime:** Netlify Functions (Node.js 18+)
- **Language:** TypeScript (strict mode)
- **Validation:** Zod
- **Logging:** Built-in console with structured format
- **Environment:** dotenv for local development

### Dependencies to Add

```json
{
  "zod": "^3.22.0",
  "dotenv": "^16.3.0",
  "nanoid": "^4.0.0"
}
```

### Environment Variables Required

```bash
# OpenAI
OPENAI_API_KEY=sk-...

# Supabase
SUPABASE_URL=https://...supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Application
NODE_ENV=development|production
LOG_LEVEL=debug|info|warn|error
```

---

## Success Criteria

### Functional

- [ ] All functions run locally with `netlify dev`
- [ ] Request validation prevents malformed input
- [ ] Response validation ensures correct output format
- [ ] Error handling catches all exceptions
- [ ] Environment variables required for deployment

### Technical

- [ ] TypeScript types correct for all functions
- [ ] No `any` types in function signatures
- [ ] All functions deployable without errors
- [ ] Error handling middleware works for all functions
- [ ] Logging provides debugging information

### Quality

- [ ] Functions respond within 2 seconds
- [ ] All requests properly validated
- [ ] Zero unhandled errors in logs
- [ ] Error messages are actionable
- [ ] Code follows TypeScript best practices

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Environment variable leaks in git | High | Use `.gitignore` for `.env*`, add to docs, use Netlify secrets |
| Cold start latency (serverless) | Medium | Monitor performance, optimize imports, consider warmup |
| Validation overhead | Low | Validate only at boundaries, cache schemas |
| TypeScript compilation errors | Medium | Set up proper tsconfig, use strict mode early |
| Testing functions locally difficult | Medium | Use `netlify dev`, mock services, integration tests |

---

## Success Metrics

- [ ] Functions deploy without errors (100%)
- [ ] Response time < 2 seconds (average)
- [ ] Invalid inputs rejected cleanly (100%)
- [ ] Validation catches 100% of invalid schemas
- [ ] Zero unhandled errors in production
- [ ] All developers can run `netlify dev` locally

---

## Definition of Done

- [ ] Directory structure created
- [ ] TypeScript configured
- [ ] Base handler implemented and tested
- [ ] Environment validation working
- [ ] Validation schemas created
- [ ] Error handling implemented
- [ ] Logging infrastructure in place
- [ ] Local development workflow documented
- [ ] All functions can be run with `netlify dev`
- [ ] Documentation complete

---

## Testing Checklist

### Local Development
- [ ] `netlify dev` starts successfully
- [ ] Functions reload on file changes
- [ ] Environment variables loaded correctly
- [ ] Error handling catches exceptions

### Validation
- [ ] Valid requests pass validation
- [ ] Invalid requests rejected with clear messages
- [ ] Response format matches schema
- [ ] Type checking enforced

### Integration
- [ ] Functions can be called from frontend
- [ ] Error responses formatted correctly
- [ ] Logging captures all operations

---

## Next Steps

1. Create Netlify Functions directory structure
2. Configure `netlify.toml`
3. Implement base handler class
4. Add environment variable validation
5. Create validation schemas
6. Implement error handling and logging
7. Test local development workflow

---

**Estimated Story Points:** 13

**Created:** 2025-11-05
**Last Updated:** 2025-11-05
**Owner:** Backend Team
