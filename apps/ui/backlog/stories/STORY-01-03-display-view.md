# STORY-01-03: Structured Display View

---

## Metadata
- **Story ID:** STORY-01-03
- **Epic:** [EPIC-01: Frontend with Mock Data](../epics/EPIC-01-frontend-mock.md)
- **Priority:** P0 - Critical
- **Status:** Blocked (depends on STORY-01-02)
- **Effort Estimate:** 1-2 days
- **Dependencies:** STORY-01-02 (Form must submit successfully)

---

## User Story
**As a** user
**I want** to review the structured persona data in a beautiful, readable format
**So that** I can verify the information before saving

---

## Description
Create a component that displays processed persona data in an organized, visually appealing format. Include functionality to save the persona (via mock service) and export as JSON.

---

## Acceptance Criteria
- [ ] Persona data displays in structured, readable format
- [ ] All persona fields shown (name, traits, interests, skills, etc.)
- [ ] Beautiful card-based layout using shadcn components
- [ ] "Save Persona" button triggers mock savePersona service
- [ ] Success message shows after mock save completes
- [ ] Export button downloads persona as JSON file
- [ ] Loading state during save operation
- [ ] Mobile-responsive design
- [ ] Optional: Edit mode to refine data before save
- [ ] Optional: "Create Another" button to restart flow

---

## Tasks

### TASK-01-03-01: Create PersonaReview Component
**Effort:** M (4-6 hours)

Build component that renders structured persona data.

**AI Prompt:**
```
Create apps/ui/components/persona/PersonaReview.tsx

Display persona data in organized format:
- Use shadcn Card for sections
- Use Badge for traits, interests, skills
- Typography hierarchy (headings, body text)
- Grid layout for multi-column sections
- Collapsible sections for long content (optional)

Props:
- persona: Persona
- onSave?: () => void
- onExport?: () => void
- onEdit?: () => void (optional)

Sections to display:
- Basic Info (name, age, occupation)
- Background
- Personality Traits (badges)
- Interests (badges)
- Skills (badges)
- Values (badges)
- Communication Style
- Goals/Challenges (if present)
- Metadata (source counts, created date)
```

---

### TASK-01-03-02: Implement Save Functionality
**Effort:** S (2-3 hours)

Connect "Save Persona" button to mock savePersona service.

**AI Prompt:**
```
In PersonaReview or parent component:

1. Add save handler that calls personaService.savePersona()
2. Show loading state during save
3. On success:
   - Display success toast/alert
   - Show persona ID
   - Offer "Create Another" option
4. On error:
   - Display error message
   - Allow retry

Handle edge cases:
- Prevent double saves
- Validate persona data before save
```

---

### TASK-01-03-03: Add Export Functionality
**Effort:** S (1-2 hours)

Implement JSON export/download feature.

**AI Prompt:**
```
Add export button to PersonaReview:

Function to download persona as JSON file:
1. Convert persona object to JSON string
2. Create blob with JSON data
3. Trigger download with filename: persona_[name]_[date].json
4. Show success toast

Code example:
const exportPersona = () => {
  const json = JSON.stringify(persona, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `persona_${persona.name}_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
```

---

### TASK-01-03-04: Add Success Confirmation UI
**Effort:** S (2-3 hours)

Create success state after persona is saved.

**AI Prompt:**
```
Create success confirmation view:
- Show checkmark icon
- Display "Persona saved successfully!"
- Show persona ID (from save response)
- Offer actions:
  - Create Another Persona (reset form)
  - View Saved Personas (navigate to list - Phase 2)
  - Download JSON
- Use shadcn Alert or Dialog component
```

---

### TASK-01-03-05: Polish UI/UX
**Effort:** S (2-4 hours)

Refine visual design and user experience.

**Tasks:**
- Add transitions/animations
- Ensure consistent spacing
- Add icons where appropriate
- Test color contrast for accessibility
- Add hover states for interactive elements
- Test with long/short content
- Mobile responsive refinement

---

## Technical Details

### Component Structure
```
components/persona/
├── PersonaReview.tsx         # Main review component
├── PersonaCard.tsx           # Individual persona card (reusable)
├── PersonaSection.tsx        # Section component (optional)
└── SuccessConfirmation.tsx   # Post-save confirmation
```

### shadcn Components Used
- Card
- Badge
- Button
- Alert
- Dialog (for confirmation)
- Separator
- ScrollArea (if long content)

### Display Layout Example
```
┌─────────────────────────────────────┐
│ Persona: [Name]                     │
├─────────────────────────────────────┤
│ Basic Information                   │
│ Age: 32 | Occupation: Engineer      │
├─────────────────────────────────────┤
│ Background                          │
│ [Background text...]                │
├─────────────────────────────────────┤
│ Traits                              │
│ [analytical] [creative] [focused]   │
├─────────────────────────────────────┤
│ Interests                           │
│ [coding] [hiking] [reading]         │
├─────────────────────────────────────┤
│ Skills                              │
│ [TypeScript] [React] [Design]       │
├─────────────────────────────────────┤
│ [Save Persona] [Export JSON]        │
└─────────────────────────────────────┘
```

---

## Definition of Done
- [ ] All tasks completed
- [ ] Persona displays beautifully
- [ ] Save button works with mock service
- [ ] Export downloads JSON file
- [ ] Success confirmation shows
- [ ] Mobile responsive
- [ ] No TypeScript errors
- [ ] User can complete full flow: input → process → review → save

---

**Created:** 2025-11-04
**Last Updated:** 2025-11-04
**Assigned To:** Frontend Developer
