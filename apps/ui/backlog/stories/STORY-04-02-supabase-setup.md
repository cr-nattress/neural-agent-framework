# STORY-04-02: Supabase Client Setup

---

## Metadata
- **Story ID:** STORY-04-02
- **Epic:** EPIC-04 (Magic Link Auth)
- **Priority:** P0 - Critical
- **Status:** Ready to Start
- **Effort Estimate:** 1-2 days
- **Story Points:** 8

---

## Summary
Create Supabase client wrappers for both browser and server contexts with proper cookie handling for Next.js App Router.

---

## Objective
Implement Supabase client factories that handle authentication context appropriately for client and server components, with proper cookie management for session persistence.

---

## User Story
As a developer, I want separate Supabase clients for browser and server contexts so that authentication works correctly in both environments.

---

## Acceptance Criteria

### Browser Client (Client-Side)
- [ ] `lib/supabase/client.ts` created with "use client" directive
- [ ] Browser client imports from @supabase/ssr
- [ ] Environment variables properly referenced
- [ ] Factory function returns configured client
- [ ] No TypeScript errors

### Server Client (Server-Side)
- [ ] `lib/supabase/server.ts` created
- [ ] Server client imports from @supabase/ssr
- [ ] Uses Next.js cookies() API
- [ ] Proper cookie get/set methods implemented
- [ ] Async function for async cookie access
- [ ] No TypeScript errors

### Configuration
- [ ] Both clients use same Supabase URL
- [ ] Both clients use same anon key
- [ ] Environment variables match between clients
- [ ] Proper error handling for missing env vars

### Testing
- [ ] Browser client instantiates without errors
- [ ] Server client instantiates without errors
- [ ] Types properly inferred
- [ ] Can be imported in components and API routes

---

## Tasks
1. TASK-04-02-01: Create Browser Client Wrapper
2. TASK-04-02-02: Create Server Client Wrapper
3. TASK-04-02-03: Setup Cookie Handlers
4. TASK-04-02-04: Test Client Creation
5. TASK-04-02-05: Add Type Definitions

---

## Implementation Notes

### Browser Client
- Must have "use client" directive
- Uses createBrowserClient from @supabase/ssr
- Simple instantiation - no cookie handling needed

### Server Client
- No "use client" directive (server-side only)
- Uses createServerClient from @supabase/ssr
- Implements cookie getAll/setAll methods
- Uses Next.js cookies() API (async)

### Cookie Security
- HttpOnly: Supabase handles automatically
- SameSite: Supabase handles automatically
- Secure: Only in production (HTTPS)
- Both clients work together for persistence

---

## Testing
- Import both clients in test files
- Verify they initialize correctly
- Check browser client works in client component
- Check server client works in API route

---

## Definition of Done
- [x] Both client wrappers created
- [x] Cookie handling implemented
- [x] Types properly configured
- [x] No TypeScript errors
- [x] Ready for auth service implementation

---

## Blockers/Dependencies
- STORY-04-01: Foundation & Dependencies (must complete first)

---

## Related Stories
- STORY-04-03: Auth Service Implementation (uses these clients)
- STORY-04-04: Login UI & Magic Link Flow (uses browser client)

---

## Notes
- Supabase SSR package handles cookie security automatically
- No need for explicit HttpOnly configuration
- Both clients necessary for proper Next.js SSR + CSR auth

---

## Created
2025-11-05

## Last Updated
2025-11-05
