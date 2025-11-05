# TASK-04-01-01: Install Supabase Dependencies

---

## Metadata
- **Task ID:** TASK-04-01-01
- **Story:** STORY-04-01 (Foundation & Dependencies)
- **Epic:** EPIC-04 (Magic Link Auth)
- **Priority:** P0 - Critical
- **Status:** Ready to Start
- **Effort:** XS (< 2 hours)
- **Story Points:** 3

---

## Summary
Install required Supabase packages for magic link authentication.

---

## Objective
Add `@supabase/ssr` and `@supabase/supabase-js` to project dependencies without breaking existing packages.

---

## Acceptance Criteria
- [ ] @supabase/ssr ^0.4.0 installed
- [ ] @supabase/supabase-js ^2.43.0 installed
- [ ] npm install completes without errors
- [ ] No peer dependency warnings
- [ ] Packages appear in package.json
- [ ] Packages appear in node_modules

---

## Instructions

### Step 1: Install Packages
```bash
cd apps/ui
npm install @supabase/ssr @supabase/supabase-js
```

### Step 2: Verify Installation
```bash
npm list @supabase/ssr @supabase/supabase-js
```

### Step 3: Check package.json
Verify both packages listed in dependencies:
```json
{
  "@supabase/ssr": "^0.4.0",
  "@supabase/supabase-js": "^2.43.0"
}
```

### Step 4: TypeScript Check
```bash
npm run type-check
```

---

## Testing
- [ ] No TypeScript errors
- [ ] npm install successful
- [ ] packages in package.json
- [ ] npm test runs without dependency errors

---

## Notes
- @supabase/ssr is the modern approach (Auth Helpers deprecated)
- Install both packages together in one command
- No configuration needed at this stage

---

## Created
2025-11-05

## Last Updated
2025-11-05
