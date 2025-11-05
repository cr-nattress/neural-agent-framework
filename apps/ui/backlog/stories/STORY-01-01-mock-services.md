# STORY-01-01: Mock Service Infrastructure

---

## Metadata
- **Story ID:** STORY-01-01
- **Epic:** [EPIC-01: Frontend with Mock Data](../epics/EPIC-01-frontend-mock.md)
- **Priority:** P0 - Critical
- **Status:** Ready to Start
- **Effort Estimate:** 1-2 days
- **Dependencies:** None (starting story)

---

## User Story
**As a** frontend developer
**I want** a service abstraction layer with mock implementations
**So that** I can develop and test the UI independently of backend availability

---

## Description
Create the foundational infrastructure for mock-first development, including project setup, service interfaces, mock implementations, and environment-based switching. This enables parallel frontend/backend development and faster iteration.

---

## Acceptance Criteria
- [ ] Next.js 14+ project initialized with TypeScript and Tailwind CSS
- [ ] shadcn/ui configured and first components installed
- [ ] Project structure created (app/, components/, lib/, types/, services/)
- [ ] TypeScript strict mode enabled
- [ ] Service interface defined for persona operations
- [ ] Mock persona service implemented with realistic data
- [ ] Mock data fixtures created (sample personas)
- [ ] Service factory switches between mock and real based on env variable
- [ ] Simulated network delays added to mock services (500-2000ms)
- [ ] Environment variable NEXT_PUBLIC_USE_MOCK_DATA controls service selection

---

## Technical Details

### Technologies
- Next.js 14+ (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- shadcn/ui

### File Structure
```
apps/ui/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── favicon.ico
├── components/
│   ├── ui/                       # shadcn components
│   ├── persona/                  # Persona components (to be added)
│   └── layout/                   # Layout components (to be added)
├── lib/
│   ├── utils.ts                  # Utility functions (cn, delay)
│   └── api.ts                    # API helpers
├── types/
│   └── persona.ts                # Persona type definitions
├── services/
│   ├── persona.service.ts        # Service interface
│   ├── serviceFactory.ts         # Factory for mock/real switching
│   └── mock/
│       ├── mockPersonaService.ts # Mock implementation
│       └── data/
│           └── personas.ts       # Sample persona data
├── .env.local                    # Environment variables
├── components.json               # shadcn config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── next.config.js                # Next.js config
└── package.json
```

---

## Tasks

### TASK-01-01-01: Initialize Next.js Project
**Effort:** XS (< 1 hour)

[View Task Details →](../tasks/TASK-01-01-01-nextjs-setup.md)

Initialize Next.js project with TypeScript, Tailwind CSS, and App Router.

---

### TASK-01-01-02: Install shadcn/ui
**Effort:** XS (< 1 hour)

[View Task Details →](../tasks/TASK-01-01-02-shadcn-install.md)

Configure shadcn/ui and install initial components (Button, Input, Card).

---

### TASK-01-01-03: Create Project Structure
**Effort:** XS (< 1 hour)

[View Task Details →](../tasks/TASK-01-01-03-project-structure.md)

Set up directories for components, lib, types, and services.

---

### TASK-01-01-04: Define TypeScript Types
**Effort:** S (2-3 hours)

[View Task Details →](../tasks/TASK-01-01-04-typescript-types.md)

Create type definitions for Persona, API requests/responses, and service interfaces.

---

### TASK-01-01-05: Create Service Interface
**Effort:** S (2-3 hours)

[View Task Details →](../tasks/TASK-01-01-05-service-interface.md)

Define IPersonaService interface with processPersona, savePersona, getPersona methods.

---

### TASK-01-01-06: Implement Mock Service
**Effort:** M (4-6 hours)

[View Task Details →](../tasks/TASK-01-01-06-mock-service.md)

Create mockPersonaService with simulated delays and realistic responses.

---

### TASK-01-01-07: Create Mock Data Fixtures
**Effort:** S (2-3 hours)

[View Task Details →](../tasks/TASK-01-01-07-mock-data.md)

Generate sample persona data for testing and development.

---

### TASK-01-01-08: Build Service Factory
**Effort:** S (2-3 hours)

[View Task Details →](../tasks/TASK-01-01-08-service-factory.md)

Create factory that returns mock or real service based on environment variable.

---

## Testing Checklist

### Unit Tests
- [ ] Service interface defines all required methods
- [ ] Mock service implements interface correctly
- [ ] Mock delays simulate realistic latency
- [ ] Service factory returns correct implementation based on env var

### Integration Tests
- [ ] Next.js project builds without errors
- [ ] TypeScript compiles with no errors (strict mode)
- [ ] shadcn components render correctly
- [ ] Mock service returns valid persona data

### Manual Tests
- [ ] Run `npm run dev` successfully
- [ ] Load homepage in browser
- [ ] No console errors
- [ ] TypeScript types work in IDE (autocomplete, type checking)

---

## Definition of Done
- [ ] All tasks completed
- [ ] All acceptance criteria met
- [ ] Code reviewed (self or peer)
- [ ] TypeScript compiles with no errors
- [ ] No console warnings in development
- [ ] Documentation updated (README if needed)
- [ ] Committed to version control

---

## Notes

### Design Decisions
- **Mock-First:** Enables parallel development
- **Service Abstraction:** Clean separation, easy to swap implementations
- **Type Safety:** TypeScript catches errors early
- **Realistic Delays:** Makes mock feel like real API

### Future Enhancements
- Add request/response logging
- Mock error scenarios (timeouts, failures)
- Randomize mock delays for variability

---

**Created:** 2025-11-04
**Last Updated:** 2025-11-04
**Assigned To:** Frontend Developer
