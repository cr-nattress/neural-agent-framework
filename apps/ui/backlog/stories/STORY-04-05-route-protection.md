# STORY-04-05: Route Protection & Middleware

---

## Metadata
- **Story ID:** STORY-04-05
- **Epic:** EPIC-04 (Magic Link Auth)
- **Priority:** P1 - High
- **Status:** Blocked
- **Effort Estimate:** 1 day
- **Story Points:** 5

---

## Summary
Implement Next.js middleware to protect routes, manage sessions server-side, and redirect unauthenticated users.

---

## Objective
Create middleware that checks authentication on every request, refreshes sessions, protects routes, and manages redirects based on auth status.

---

## User Story
As a user, I want protected pages to redirect me to login if I'm not authenticated so that my data remains secure.

---

## Acceptance Criteria

### Middleware Implementation
- [ ] `middleware.ts` created in project root
- [ ] Runs on all requests (configurable matcher)
- [ ] Creates Supabase server client
- [ ] Calls getUser() to check auth status
- [ ] Properly handles cookies in request/response

### Protected Routes
- [ ] /dashboard routes require authentication
- [ ] Unauthenticated users redirected to /auth/login
- [ ] Authenticated users allowed to access
- [ ] Redirects preserve original URL for after-login

### Public Routes
- [ ] /auth/login accessible to everyone
- [ ] / (home) accessible to everyone
- [ ] /auth/callback must be publicly accessible

### Auth Redirects
- [ ] Authenticated users accessing /auth/login redirect to /
- [ ] Unauthenticated users accessing /dashboard redirect to /auth/login
- [ ] Callback redirect preserved after login

### Session Management
- [ ] Session automatically refreshed on each request
- [ ] Session tokens updated in cookies
- [ ] Expired sessions handled gracefully
- [ ] User info available to components

---

## Tasks
1. TASK-04-05-01: Create Middleware File
2. TASK-04-05-02: Implement Auth Check
3. TASK-04-05-03: Implement Route Protection
4. TASK-04-05-04: Implement Redirects
5. TASK-04-05-05: Configure Matcher
6. TASK-04-05-06: Test Middleware

---

## Implementation Details

### Middleware Flow
```
Request arrives
  ├─ Create Supabase server client
  ├─ Get current user
  ├─ Check route
  │   ├─ If dashboard + no user → redirect to /auth/login
  │   ├─ If /auth/login + user → redirect to /
  │   └─ Otherwise → allow request
  └─ Response with updated cookies
```

### Matcher Configuration
- Match all routes except static assets
- Exclude _next/static, _next/image, favicon.ico
- Apply to all application routes

### Cookie Handling
- Read cookies from request
- Set cookies in response
- Maintain session persistence

---

## Testing Strategy

### Route Protection Tests
1. Access /dashboard without auth → redirect to /auth/login
2. Access /dashboard with auth → allow access
3. Access /auth/login without auth → allow access
4. Access /auth/login with auth → redirect to /

### Session Tests
1. Login and refresh page → session persists
2. Logout and refresh page → session cleared
3. Session timeout → redirect to login

---

## Definition of Done
- [x] Middleware created and configured
- [x] Route protection working
- [x] Redirects functioning correctly
- [x] Session persists across requests
- [x] No infinite redirect loops
- [x] Ready for integration

---

## Blockers/Dependencies
- STORY-04-03: Auth Service Implementation
- STORY-04-04: Login UI & Magic Link Flow

---

## Related Stories
- STORY-04-06: Integration & Testing (tests this)

---

## Notes
- Middleware runs on every request - keep it fast
- Session refresh happens automatically
- Matcher pattern prevents middleware on static assets
- Cookie management is critical for session persistence

---

## Created
2025-11-05

## Last Updated
2025-11-05
