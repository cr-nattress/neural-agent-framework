# STORY-01-02: Persona Input Form

---

## Metadata
- **Story ID:** STORY-01-02
- **Epic:** [EPIC-01: Frontend with Mock Data](../epics/EPIC-01-frontend-mock.md)
- **Priority:** P0 - Critical
- **Status:** Blocked (depends on STORY-01-01)
- **Effort Estimate:** 2-3 days
- **Dependencies:** STORY-01-01 (Mock services must exist)

---

## User Story
**As a** user
**I want** to input multiple text blocks and links
**So that** I can create a digital persona from my unstructured data

---

## Description
Build a responsive, mobile-first form that allows users to add/remove text blocks and links dynamically. The form connects to the mock persona processing service and displays loading states during submission.

---

## Acceptance Criteria
- [ ] User can add unlimited text blocks (dynamic textarea array)
- [ ] User can remove individual text blocks
- [ ] User can add unlimited links (dynamic input array)
- [ ] User can remove individual links
- [ ] Submit button triggers mock processPersona service
- [ ] Loading state shows during processing (spinner/skeleton)
- [ ] Form disables during processing
- [ ] Client-side validation (non-empty text blocks)
- [ ] Mobile-first responsive design (320px → desktop)
- [ ] Touch-friendly tap targets (44px minimum)
- [ ] Error handling displays user-friendly messages
- [ ] Success transitions to display view with persona data

---

## Tasks

### TASK-01-02-01: Create TextBlockInput Component
**Effort:** M (4-5 hours)

Build reusable component for managing dynamic array of text blocks with add/remove functionality.

**AI Prompt:**
```
Create apps/ui/components/persona/TextBlockInput.tsx

A React component that manages an array of text blocks with:
- Dynamic add/remove buttons
- shadcn Textarea components
- Proper TypeScript typing
- Mobile-responsive layout
- Accessible labels and ARIA attributes

Props:
- value: string[]
- onChange: (blocks: string[]) => void
- maxBlocks?: number (default: unlimited)

Features:
- Add new textarea button
- Remove button for each textarea
- Placeholder text
- Character counter (optional)
```

---

### TASK-01-02-02: Create LinkInput Component
**Effort:** S (2-3 hours)

Build component for managing dynamic array of link inputs.

**AI Prompt:**
```
Create apps/ui/components/persona/LinkInput.tsx

Similar to TextBlockInput but for URLs:
- shadcn Input components
- URL validation (optional)
- Add/remove functionality
- Link icon indicators

Props:
- value: string[]
- onChange: (links: string[]) => void
- maxLinks?: number
```

---

### TASK-01-02-03: Build PersonaForm Component
**Effort:** M (4-6 hours)

Create main form page that integrates text blocks, links, and submission logic.

**AI Prompt:**
```
Create apps/ui/app/page.tsx (or components/persona/PersonaForm.tsx)

Main persona creation form with:
- Import TextBlockInput and LinkInput
- State management for form data
- Submit handler using personaService.processPersona()
- Loading states (disable form, show spinner)
- Error handling (toast/alert on failure)
- Success handling (navigate to review or show inline)
- Mobile-first responsive layout
- shadcn Button, Card, Alert components
```

---

### TASK-01-02-04: Add Form Validation
**Effort:** S (2-3 hours)

Implement client-side validation for form inputs.

**AI Prompt:**
```
Add validation to PersonaForm:
- At least 1 text block required
- Text blocks cannot be empty strings
- Links must be valid URLs (if validation enabled)
- Show validation errors inline
- Prevent submission if invalid
- Clear error messages
```

---

### TASK-01-02-05: Implement Loading States
**Effort:** S (2-3 hours)

Add comprehensive loading states for better UX during processing.

**AI Prompt:**
```
Enhance PersonaForm with loading states:
- Disable form inputs during processing
- Show loading spinner on submit button
- Add skeleton loader for processing feedback
- Prevent double submission
- Cancel button (optional)
- Progress indicator if multi-step (optional)
```

---

### TASK-01-02-06: Mobile Responsive Testing
**Effort:** S (2-4 hours)

Test and refine responsive behavior across devices.

**Tasks:**
- Test on mobile (320px, 375px, 414px)
- Test on tablet (768px, 1024px)
- Test on desktop (1280px+)
- Adjust layouts for each breakpoint
- Ensure touch targets 44px+
- Test landscape and portrait modes

---

## Technical Details

### Components Structure
```
components/persona/
├── PersonaForm.tsx       # Main form container
├── TextBlockInput.tsx    # Text blocks manager
├── LinkInput.tsx         # Links manager
└── FormActions.tsx       # Submit/Clear buttons (optional)
```

### State Management
```typescript
interface PersonaFormState {
  textBlocks: string[];
  links: string[];
  isProcessing: boolean;
  error: string | null;
  processedPersona: Persona | null;
}
```

### shadcn Components Used
- Button
- Input
- Textarea
- Card
- Label
- Alert
- Toast (for notifications)
- Skeleton (loading states)

---

## Definition of Done
- [ ] All tasks completed
- [ ] All acceptance criteria met
- [ ] Form works with mock service
- [ ] Mobile responsive (tested on real devices)
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Code reviewed
- [ ] User can successfully create persona with mock data

---

**Created:** 2025-11-04
**Last Updated:** 2025-11-04
**Assigned To:** Frontend Developer
