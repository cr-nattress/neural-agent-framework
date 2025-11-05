# STORY-04-03: Auth Service Implementation

---

## Metadata
- **Story ID:** STORY-04-03
- **Epic:** EPIC-04 (Magic Link Auth)
- **Priority:** P1 - High
- **Status:** Blocked
- **Effort Estimate:** 2-3 days
- **Story Points:** 13

---

## Summary
Implement auth service interface and complete real implementation connecting to Supabase for all authentication operations.

---

## Objective
Create a production-ready auth service that handles magic link sending, user retrieval, session management, and auth state listeners using Supabase APIs.

---

## User Story
As a developer, I want a fully implemented auth service that provides all authentication operations so that components can easily interact with Supabase auth.

---

## Acceptance Criteria

### Auth Service Interface
- [ ] `services/auth.service.ts` defines IAuthService interface
- [ ] Interface includes all required methods
- [ ] Methods properly typed with TypeScript
- [ ] Documentation for each method

### Auth Types
- [ ] `types/auth.ts` defines all auth types
- [ ] User interface with id, email, metadata, timestamps
- [ ] Session interface with tokens and expiry
- [ ] SendMagicLinkResponse with success/error
- [ ] AuthState interface for hook usage

### Auth Service Implementation
- [ ] `services/api/apiAuthService.ts` implements interface
- [ ] sendMagicLink() calls Supabase signInWithOtp
- [ ] getCurrentUser() retrieves authenticated user
- [ ] getCurrentSession() retrieves active session
- [ ] signOut() clears user session
- [ ] onAuthStateChange() subscribes to auth events

### Error Handling
- [ ] Network errors caught and returned in response
- [ ] User-friendly error messages provided
- [ ] Errors logged for debugging
- [ ] No unhandled promise rejections

### Service Factory
- [ ] `services/serviceFactory.ts` updated
- [ ] exports authService singleton
- [ ] Routes to real implementation (no mock)

---

## Tasks
1. TASK-04-03-01: Define Auth Types
2. TASK-04-03-02: Create Auth Service Interface
3. TASK-04-03-03: Implement Magic Link Service
4. TASK-04-03-04: Implement Session Management
5. TASK-04-03-05: Implement Auth State Listener
6. TASK-04-03-06: Add Error Handling
7. TASK-04-03-07: Update Service Factory
8. TASK-04-03-08: Test Auth Service

---

## Implementation Details

### sendMagicLink(email: string)
- Calls supabase.auth.signInWithOtp()
- Passes emailRedirectTo: /auth/callback
- Returns success/error response

### getCurrentUser()
- Calls supabase.auth.getUser()
- Maps Supabase user to our User type
- Returns null if no user

### getCurrentSession()
- Calls supabase.auth.getSession()
- Maps Supabase session to our Session type
- Returns null if no session

### signOut()
- Calls supabase.auth.signOut()
- Clears local session state
- Handles errors gracefully

### onAuthStateChange(callback)
- Subscribes to auth state changes
- Calls callback with user or null
- Returns unsubscribe function

---

## Testing Strategy

### Unit Tests
- Test each service method independently
- Mock Supabase responses
- Verify error handling

### Integration Tests
- Test with real Supabase project
- Verify email sending
- Verify session creation
- Verify logout

---

## Definition of Done
- [x] All auth types properly defined
- [x] Service interface fully documented
- [x] Service implementation complete
- [x] All methods tested
- [x] Error handling comprehensive
- [x] Service factory updated
- [x] Ready for login page implementation

---

## Blockers/Dependencies
- STORY-04-01: Foundation & Dependencies
- STORY-04-02: Supabase Client Setup

---

## Related Stories
- STORY-04-04: Login UI & Magic Link Flow (uses this service)
- STORY-04-05: Route Protection & Middleware (uses this service)
- STORY-04-06: Integration & Testing (tests this service)

---

## Notes
- No mock implementations - all real Supabase calls
- Service abstraction allows future changes without affecting components
- Error handling critical for user experience
- Auth state listener enables real-time updates

---

## Created
2025-11-05

## Last Updated
2025-11-05
