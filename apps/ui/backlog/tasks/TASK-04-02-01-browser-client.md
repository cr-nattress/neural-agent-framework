# TASK-04-02-01: Create Browser Client Wrapper

---

## Metadata
- **Task ID:** TASK-04-02-01
- **Story:** STORY-04-02 (Supabase Client Setup)
- **Epic:** EPIC-04 (Magic Link Auth)
- **Priority:** P0 - Critical
- **Status:** Blocked
- **Effort:** S (2-4 hours)
- **Story Points:** 5

---

## Summary
Create Supabase browser client wrapper with proper "use client" directive for client-side authentication.

---

## Objective
Build a factory function that creates Supabase browser client for use in client components.

---

## Acceptance Criteria
- [ ] File created at `lib/supabase/client.ts`
- [ ] "use client" directive at top
- [ ] Uses createBrowserClient from @supabase/ssr
- [ ] Environment variables properly referenced
- [ ] Returns configured Supabase client
- [ ] No TypeScript errors
- [ ] Can be imported in client components

---

## Implementation

### File: `lib/supabase/client.ts`
```typescript
"use client";

import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
```

### Key Points
- Must have "use client" directive (client-side only)
- createBrowserClient from @supabase/ssr
- Returns client instance
- Uses exclamation marks (!) for required env vars
- Can be imported and used in client components

---

## Testing

### Test 1: Import in Client Component
```typescript
import { createClient } from "@/lib/supabase/client";

export default function MyComponent() {
  const supabase = createClient();
  // ... use supabase
}
```

### Test 2: TypeScript
```bash
npm run type-check
# Should have no errors
```

### Test 3: Build
```bash
npm run build
# Should build without errors
```

---

## Definition of Done
- [x] File created with correct content
- [x] "use client" directive present
- [x] Imports correct
- [x] Environment variables referenced
- [x] No TypeScript errors
- [x] Can be imported successfully

---

## Notes
- This is the browser-only version
- Separate server client will be created next
- Do not use in server components or API routes
- Use with "use client" directive

---

## Related Tasks
- TASK-04-02-02: Create Server Client Wrapper

---

## Created
2025-11-05

## Last Updated
2025-11-05
