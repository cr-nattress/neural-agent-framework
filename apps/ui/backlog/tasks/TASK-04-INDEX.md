# Task Index - EPIC-04: Magic Link Authentication

Complete breakdown of all tasks for the Magic Link Authentication Epic.

---

## Epic 04: Magic Link Authentication with Supabase

**Total Tasks:** 24 | **Total Effort:** 6-7 days | **Priority:** P1-High

---

## Story 04-01: Foundation & Dependencies (6 tasks)

### TASK-04-01-01: Install Supabase Dependencies
**Effort:** XS | **Status:** Ready
- Install @supabase/ssr ^0.4.0
- Install @supabase/supabase-js ^2.43.0
- Verify installation
[Full Details](./TASK-04-01-01-install-dependencies.md)

### TASK-04-01-02: Setup Supabase Project
**Effort:** S | **Status:** Ready
- Create Supabase account (if needed)
- Create new Supabase project
- Get project URL and anon key
- Save credentials

### TASK-04-01-03: Configure Environment Variables
**Effort:** S | **Status:** Ready
- Create .env.local file
- Add NEXT_PUBLIC_SUPABASE_URL
- Add NEXT_PUBLIC_SUPABASE_ANON_KEY
- Update .env.example with template

### TASK-04-01-04: Create Directory Structure
**Effort:** S | **Status:** Ready
- Create lib/supabase/ directory
- Create app/auth/ directory
- Create hooks/ directory
- Create services/api/ directory if not exists

### TASK-04-01-05: Setup TypeScript Types Skeleton
**Effort:** S | **Status:** Ready
- Create types/auth.ts (empty placeholder)
- Create types/persona.ts updates plan
- Document type structure

### TASK-04-01-06: Document Setup Process
**Effort:** S | **Status:** Ready
- Create setup guide
- Document all environment variables
- List all created directories
- Add troubleshooting notes

---

## Story 04-02: Supabase Client Setup (5 tasks)

### TASK-04-02-01: Create Browser Client Wrapper
**Effort:** S | **Status:** Blocked
- Create lib/supabase/client.ts
- Implement createClient factory
- Add "use client" directive
- Proper TypeScript types
[Full Details](./TASK-04-02-01-browser-client.md)

### TASK-04-02-02: Create Server Client Wrapper
**Effort:** S | **Status:** Blocked
- Create lib/supabase/server.ts
- Implement async createClient function
- Integrate with Next.js cookies()
- Cookie get/set handlers

### TASK-04-02-03: Setup Cookie Handlers
**Effort:** S | **Status:** Blocked
- Implement getAll() for cookie reading
- Implement setAll() for cookie writing
- Verify secure cookie options
- Test cookie persistence

### TASK-04-02-04: Test Client Creation
**Effort:** S | **Status:** Blocked
- Test browser client instantiation
- Test server client instantiation
- Verify types work correctly
- Check for any import errors

### TASK-04-02-05: Add Type Definitions
**Effort:** S | **Status:** Blocked
- Add types for Supabase client
- Add return type annotations
- Document client usage
- Export types properly

---

## Story 04-03: Auth Service Implementation (8 tasks)

### TASK-04-03-01: Define Auth Types
**Effort:** S | **Status:** Blocked
- Create types/auth.ts
- Define User interface
- Define Session interface
- Define SendMagicLinkResponse
- Define AuthState interface
[Full Details](./TASK-04-03-01-auth-types.md)

### TASK-04-03-02: Create Auth Service Interface
**Effort:** S | **Status:** Blocked
- Create services/auth.service.ts
- Define IAuthService interface
- Define all required methods
- Add JSDoc documentation

### TASK-04-03-03: Implement Magic Link Service
**Effort:** M | **Status:** Blocked
- Create services/api/apiAuthService.ts
- Implement sendMagicLink()
- Use supabase.auth.signInWithOtp()
- Handle Supabase errors

### TASK-04-03-04: Implement Session Management
**Effort:** M | **Status:** Blocked
- Implement getCurrentUser()
- Implement getCurrentSession()
- Map Supabase response to our types
- Handle null responses

### TASK-04-03-05: Implement Auth State Listener
**Effort:** M | **Status:** Blocked
- Implement onAuthStateChange()
- Subscribe to auth events
- Call callback on state changes
- Return unsubscribe function

### TASK-04-03-06: Implement Sign Out
**Effort:** S | **Status:** Blocked
- Implement signOut()
- Call supabase.auth.signOut()
- Clear local state
- Handle errors

### TASK-04-03-07: Update Service Factory
**Effort:** S | **Status:** Blocked
- Update services/serviceFactory.ts
- Export authService
- Only export real implementation
- Add to factory exports

### TASK-04-03-08: Test Auth Service
**Effort:** S | **Status:** Blocked
- Unit test each method
- Test error handling
- Test with real Supabase
- Verify all operations work

---

## Story 04-04: Login UI & Magic Link Flow (7 tasks)

### TASK-04-04-01: Create Login Page Layout
**Effort:** S | **Status:** Blocked
- Create app/auth/login/page.tsx
- Build page structure
- Use Card component from shadcn
- Mobile-first responsive design

### TASK-04-04-02: Implement Email Input Form
**Effort:** S | **Status:** Blocked
- Create email input field
- Add form validation
- Implement submit handler
- Show loading state

### TASK-04-04-03: Implement Confirmation Message
**Effort:** S | **Status:** Blocked
- Show after email submission
- Display email confirmation
- Show helpful hints
- Option to go back

### TASK-04-04-04: Create Callback Handler
**Effort:** S | **Status:** Blocked
- Create app/auth/callback/route.ts
- Extract code from URL
- Call exchangeCodeForSession()
- Redirect on success/failure

### TASK-04-04-05: Add Error Handling
**Effort:** S | **Status:** Blocked
- Show error messages
- Handle network errors
- Display rate limit errors
- Show expired link errors

### TASK-04-04-06: Test Login Flow
**Effort:** S | **Status:** Blocked
- Manual testing of login
- Test email submission
- Test callback handler
- Verify redirects

### TASK-04-04-07: Mobile Responsive Testing
**Effort:** S | **Status:** Blocked
- Test on mobile (320px)
- Test on tablet (768px)
- Test on desktop (1024px+)
- Verify touch targets (44px+)

---

## Story 04-05: Route Protection & Middleware (6 tasks)

### TASK-04-05-01: Create Middleware File
**Effort:** S | **Status:** Blocked
- Create middleware.ts in project root
- Set up middleware structure
- Configure matchers
- Import dependencies

### TASK-04-05-02: Implement Auth Check
**Effort:** S | **Status:** Blocked
- Create Supabase server client in middleware
- Call getUser()
- Check if user authenticated
- Handle errors

### TASK-04-05-03: Implement Route Protection
**Effort:** S | **Status:** Blocked
- Protect /dashboard routes
- Allow public routes (/auth/login, /)
- Check auth before allowing access
- Return proper response

### TASK-04-05-04: Implement Redirects
**Effort:** S | **Status:** Blocked
- Redirect unauthenticated to /auth/login
- Redirect authenticated away from /auth/login
- Preserve original URL for redirect
- No infinite redirect loops

### TASK-04-05-05: Configure Matcher
**Effort:** S | **Status:** Blocked
- Match all routes
- Exclude _next/static
- Exclude _next/image
- Exclude favicon.ico

### TASK-04-05-06: Test Middleware
**Effort:** S | **Status:** Blocked
- Test protected routes
- Test public routes
- Test redirects
- Test session persistence

---

## Story 04-06: Integration & Testing (7 tasks)

### TASK-04-06-01: Create useAuth Hook
**Effort:** M | **Status:** Blocked
- Create hooks/useAuth.ts
- Implement state management
- Implement signOut function
- Add proper cleanup

### TASK-04-06-02: Update Persona Types
**Effort:** S | **Status:** Blocked
- Add userId field to Persona
- Document field purpose
- Update related interfaces
- Check for breaking changes

### TASK-04-06-03: Update Persona Service
**Effort:** S | **Status:** Blocked
- Update processPersona method
- Update savePersona method
- Add userId parameter
- Update request payload

### TASK-04-06-04: Update Home Page
**Effort:** M | **Status:** Blocked
- Add useAuth hook
- Check authentication
- Show loading state
- Redirect if not authenticated
- Display user email
- Add sign out button

### TASK-04-06-05: Add Sign Out Functionality
**Effort:** S | **Status:** Blocked
- Create sign out button
- Call authService.signOut()
- Clear local state
- Redirect to login

### TASK-04-06-06: Comprehensive Testing
**Effort:** M | **Status:** Blocked
- End-to-end magic link flow
- Test all error scenarios
- Test on multiple browsers
- Test on mobile
- Document test cases

### TASK-04-06-07: Production Deployment
**Effort:** M | **Status:** Blocked
- Deploy to staging
- Run smoke tests
- Configure production variables
- Deploy to production
- Monitor logs

---

## Summary Statistics

**Total Tasks:** 24

### By Story
- **STORY-04-01:** 6 tasks
- **STORY-04-02:** 5 tasks
- **STORY-04-03:** 8 tasks
- **STORY-04-04:** 7 tasks
- **STORY-04-05:** 6 tasks
- **STORY-04-06:** 7 tasks

### By Effort
- **XS (< 2h):** 1 task
- **S (2-4h):** 18 tasks
- **M (4-8h):** 5 tasks

### By Status
- **Ready:** 6 tasks (STORY-04-01)
- **Blocked:** 18 tasks (all others)

### Estimated Timeline
- **Days 1-2:** Foundation & Setup (STORY-04-01)
- **Days 2-3:** Client Configuration (STORY-04-02)
- **Days 3-4:** Auth Service (STORY-04-03)
- **Days 4-5:** Login UI (STORY-04-04)
- **Days 5-6:** Route Protection (STORY-04-05)
- **Days 6-7:** Integration & Testing (STORY-04-06)

---

## Dependency Graph

```
STORY-04-01 (Foundation)
    ↓
STORY-04-02 (Client Setup)
    ↓
STORY-04-03 (Auth Service)
    ├─→ STORY-04-04 (Login UI)
    ├─→ STORY-04-05 (Route Protection)
    └─→ STORY-04-06 (Integration & Testing)
```

---

## Key Files to Create/Modify

### Create
- lib/supabase/client.ts
- lib/supabase/server.ts
- app/auth/login/page.tsx
- app/auth/callback/route.ts
- services/auth.service.ts
- services/api/apiAuthService.ts
- types/auth.ts
- hooks/useAuth.ts
- middleware.ts

### Modify
- package.json (add dependencies)
- services/serviceFactory.ts (export authService)
- types/persona.ts (add userId field)
- app/page.tsx (add auth check)
- .env.example (add variables)

---

## Notes
- All tasks use production Supabase (no mocking)
- Dependencies show proper task sequencing
- Effort estimates include all work required
- Each task has clear acceptance criteria
- Integration testing crucial before deployment

---

## Created
2025-11-05

## Last Updated
2025-11-05
