# EPIC-01: Frontend with Mock Data

---

## Metadata
- **Epic ID:** EPIC-01
- **Phase:** 1.1
- **Priority:** P0 - Critical
- **Status:** Ready to Start
- **Effort Estimate:** 5-7 days
- **Dependencies:** None (starting point)

---

## Goal
Build a complete, responsive data input interface with Next.js, TypeScript, and shadcn/ui using mock services for independent frontend development.

---

## Objective
Enable frontend development to proceed in parallel with backend work by implementing a service abstraction layer with mock data. This allows the UI to be fully functional, tested, and refined before the real APIs are available.

---

## Success Criteria
- [ ] Next.js 14+ project initialized with TypeScript and Tailwind CSS
- [ ] shadcn/ui configured and integrated
- [ ] Service abstraction layer implemented (mock/real API switching)
- [ ] Mock services return realistic persona data with simulated delays
- [ ] Persona input form complete with text blocks and links
- [ ] Structured display view renders mock persona data beautifully
- [ ] Mobile-first responsive design (320px → tablet → desktop)
- [ ] All loading states and error handling implemented
- [ ] Environment variable toggles between mock and real services

---

## Business Value
- **Parallel Development:** Frontend and backend teams can work independently
- **Faster Iteration:** UI can be tested and refined without waiting for backend
- **Risk Reduction:** Identify UX issues early before backend investment
- **Demo Ready:** Can showcase UI to stakeholders before backend complete
- **Easy Migration:** Single environment variable switches to real APIs

---

## User Stories

### STORY-01-01: Mock Service Infrastructure
**Priority:** P0
**Effort:** 1-2 days

Create service abstraction layer with mock implementations for persona processing, saving, and retrieval.

[View Story Details →](../stories/STORY-01-01-mock-services.md)

**Key Tasks:**
- Setup Next.js project with TypeScript
- Install and configure shadcn/ui
- Create service interfaces and mock implementations
- Implement mock data fixtures
- Add environment-based service factory

---

### STORY-01-02: Persona Input Form
**Priority:** P0
**Effort:** 2-3 days

Build responsive form for collecting text blocks and links, connected to mock processing service.

[View Story Details →](../stories/STORY-01-02-persona-form.md)

**Key Tasks:**
- Create TextBlockInput component (dynamic array)
- Create LinkInput component (dynamic array)
- Build PersonaForm page with mobile-first layout
- Integrate with mock processPersona service
- Add loading states and error handling

---

### STORY-01-03: Structured Display View
**Priority:** P0
**Effort:** 1-2 days

Render processed persona data in a beautiful, user-friendly format with save functionality.

[View Story Details →](../stories/STORY-01-03-display-view.md)

**Key Tasks:**
- Create PersonaReview component
- Display structured persona fields (traits, interests, etc.)
- Add "Save Persona" button with mock savePersona service
- Show success confirmation after mock save
- Add export functionality (JSON download)

---

## Technical Scope

### Technologies
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **UI Library:** React 18+
- **Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Design:** Mobile-first responsive

### shadcn Components Needed
- Button, Input, Textarea, Card, Label
- Badge, Alert, Toast, Dialog, Skeleton
- ScrollArea, Separator

### File Structure Created
```
apps/ui/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/              # shadcn components
│   ├── persona/         # Persona-specific components
│   └── layout/          # Layout components
├── services/
│   ├── persona.service.ts
│   ├── serviceFactory.ts
│   └── mock/
│       ├── mockPersonaService.ts
│       └── data/
│           └── personas.ts
├── types/
│   └── persona.ts
├── lib/
│   ├── utils.ts
│   └── api.ts
└── .env.local
```

---

## Acceptance Criteria

### Functional Requirements
- [ ] User can add/remove multiple text blocks
- [ ] User can add/remove multiple links
- [ ] Submit button triggers mock processing with loading state
- [ ] Mock service returns structured persona after simulated delay (1-2s)
- [ ] Persona data displays in formatted, readable view
- [ ] Save button triggers mock save with success message
- [ ] All error states handled gracefully with user-friendly messages

### Technical Requirements
- [ ] TypeScript strict mode enabled, no type errors
- [ ] All components properly typed
- [ ] Service interface defines contract for mock/real implementations
- [ ] Environment variable (NEXT_PUBLIC_USE_MOCK_DATA) controls service selection
- [ ] Mock delays simulate realistic network latency
- [ ] Code follows Next.js 14 App Router best practices

### UX Requirements
- [ ] Mobile-first design (tested at 320px width)
- [ ] Responsive at tablet (768px) and desktop (1024px+) breakpoints
- [ ] Touch targets minimum 44px × 44px for mobile
- [ ] Loading spinners/skeletons during processing
- [ ] Success/error toasts for user feedback
- [ ] Form validation with clear error messages
- [ ] Accessible (keyboard navigation, ARIA labels)

---

## Testing Checklist

### Functional Tests
- [ ] Add/remove text blocks works correctly
- [ ] Add/remove links works correctly
- [ ] Submit triggers mock processing
- [ ] Mock persona data displays correctly
- [ ] Save triggers mock save function
- [ ] Success message shows after save
- [ ] Export downloads JSON file

### Responsive Tests
- [ ] Test on mobile (320px, 375px, 414px widths)
- [ ] Test on tablet (768px, 1024px widths)
- [ ] Test on desktop (1280px, 1920px widths)
- [ ] Test in portrait and landscape orientations

### Error Handling Tests
- [ ] Empty form submission shows validation error
- [ ] Invalid URL format shows error (if validation enabled)
- [ ] Mock service errors display user-friendly message
- [ ] Network simulation failure handled gracefully

---

## Migration Path

**Phase 1.1 (Current):** Use mock services
```typescript
// .env.local
NEXT_PUBLIC_USE_MOCK_DATA=true
```

**Phase 1.5 (After backend ready):** Switch to real APIs
```typescript
// .env.local
NEXT_PUBLIC_USE_MOCK_DATA=false
```

**Phase 2.0 (Cleanup):** Remove mock services (optional)

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Mock data doesn't match real API | High | Define TypeScript interfaces first, validate both implementations |
| UI design requires backend changes | Medium | Keep UI flexible, use progressive enhancement |
| Performance issues with real APIs | Medium | Implement loading states, optimize queries |
| Responsive design issues | Low | Test early and often on real devices |

---

## Dependencies

### Blockers
- None (this is the starting epic)

### Blocks
- EPIC-02 (Backend development can start in parallel)

---

## Notes

### Design Decisions
- **Mobile-first:** Primary users likely on smartphones
- **Progressive enhancement:** Start simple, add features incrementally
- **shadcn/ui:** Pre-built accessible components, faster development
- **Mock services:** Enable parallel dev, reduce coupling

### Future Enhancements
- Real-time preview as user types
- Drag & drop file upload
- Template personas
- Auto-save drafts

---

**Created:** 2025-11-04
**Last Updated:** 2025-11-04
**Owner:** Frontend Team
