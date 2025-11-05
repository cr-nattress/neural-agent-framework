# STORY-02-03: Real API Services

---

## Metadata
- **Story ID:** STORY-02-03
- **Epic:** [EPIC-02: Backend API & Storage](../epics/EPIC-02-backend-api.md)
- **Priority:** P0 - Critical
- **Status:** Blocked (depends on STORY-02-02)
- **Effort Estimate:** 1 day

---

## User Story
**As a** frontend developer
**I want** real API service implementations
**So that** I can switch from mock to production services seamlessly

---

## Acceptance Criteria
- [ ] services/api/apiPersonaService.ts created
- [ ] Implements IPersonaService interface (same as mock)
- [ ] processPersona calls /.netlify/functions/process-persona
- [ ] savePersona calls /.netlify/functions/save-persona
- [ ] getPersona calls /.netlify/functions/get-persona
- [ ] Error handling and type validation
- [ ] Service factory updated to switch based on env var
- [ ] TypeScript types match responses

---

## Implementation

```typescript
// services/api/apiPersonaService.ts
export const apiPersonaService: IPersonaService = {
  async processPersona(input: PersonaInputPayload) {
    const response = await fetch('/.netlify/functions/process-persona', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    return response.json();
  },
  // ... other methods
};
```

---

**Created:** 2025-11-04
