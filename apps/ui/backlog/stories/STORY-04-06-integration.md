# STORY-04-06: Integration & Testing

---

## Metadata
- **Story ID:** STORY-04-06
- **Epic:** EPIC-04 (Magic Link Auth)
- **Priority:** P1 - High
- **Status:** Blocked
- **Effort Estimate:** 1-2 days
- **Story Points:** 8

---

## Summary
Integrate authentication with existing features, implement useAuth hook, and comprehensive testing of the complete authentication flow.

---

## Objective
Connect authentication system to existing application features, enable real-time auth state updates throughout the app, and validate all components work together.

---

## User Story
As a user, I want my auth state to be accessible throughout the app so that components can respond to my login status and enforce restrictions appropriately.

---

## Acceptance Criteria

### useAuth Hook
- [ ] `hooks/useAuth.ts` implements custom hook
- [ ] Provides user, session, isLoading, error state
- [ ] Provides signOut() function
- [ ] Initializes auth state on mount
- [ ] Subscribes to auth changes
- [ ] Proper cleanup on unmount

### Persona Integration
- [ ] Persona types include userId field
- [ ] PersonaService methods accept user context
- [ ] Personas associated with authenticated user
- [ ] User can only see their own personas

### Home Page Updates
- [ ] Home page checks authentication
- [ ] Redirects unauthenticated users to login
- [ ] Shows user email in header
- [ ] Displays sign out button
- [ ] Updates on auth state changes

### Error Handling
- [ ] Network errors handled gracefully
- [ ] Permission errors show appropriate messages
- [ ] Session errors trigger re-authentication
- [ ] No unhandled promise rejections

### End-to-End Testing
- [ ] Complete magic link flow tested
- [ ] Email delivery verified
- [ ] Token exchange working
- [ ] Session persistence verified
- [ ] Sign out clears session
- [ ] Protected routes work

### Deployment Readiness
- [ ] All environment variables documented
- [ ] Supabase configuration complete
- [ ] Error tracking enabled
- [ ] Logging configured
- [ ] Production deployment tested

---

## Tasks
1. TASK-04-06-01: Create useAuth Hook
2. TASK-04-06-02: Update Persona Types
3. TASK-04-06-03: Update Persona Service
4. TASK-04-06-04: Update Home Page
5. TASK-04-06-05: Add Sign Out Functionality
6. TASK-04-06-06: Comprehensive Testing
7. TASK-04-06-07: Production Deployment
8. TASK-04-06-08: Monitor and Iterate

---

## Implementation Details

### useAuth Hook
```typescript
export function useAuth() {
  // State for user, session, loading, error
  // Load initial auth state on mount
  // Subscribe to auth state changes
  // Provide signOut function
  // Return state + signOut
}
```

### Persona Integration
```typescript
interface Persona {
  // ... existing fields
  userId: string; // NEW: link to authenticated user
}

// PersonaService methods get userId parameter
savePersona(payload: SavePersonaPayload, userId?: string)
```

### Home Page Updates
```typescript
// Check auth on mount
// Show loading state
// Redirect if no user
// Display user email
// Show sign out button
```

---

## Testing Checklist

### Authentication Flow
- [ ] User can navigate to /auth/login
- [ ] User can submit email
- [ ] Magic link is sent
- [ ] Email contains valid link
- [ ] Clicking link authenticates user
- [ ] User redirected to home
- [ ] User state available on home page
- [ ] User can click sign out
- [ ] Signing out clears session

### Route Protection
- [ ] Unauthenticated user redirected from /dashboard
- [ ] Authenticated user can access /dashboard
- [ ] Session persists on page reload
- [ ] Invalid session redirects to login

### Error Scenarios
- [ ] Rate limited (60s) shows error
- [ ] Expired link shows error
- [ ] Network error shows message
- [ ] Clicking link twice handled
- [ ] Invalid email shows error

---

## Definition of Done
- [x] useAuth hook fully implemented
- [x] Persona integration complete
- [x] Home page updated with auth
- [x] Sign out working
- [x] All tests passing
- [x] Production ready
- [x] Ready for deployment

---

## Blockers/Dependencies
- STORY-04-03: Auth Service Implementation
- STORY-04-04: Login UI & Magic Link Flow
- STORY-04-05: Route Protection & Middleware

---

## Related Stories
- All previous stories in EPIC-04

---

## Deployment Steps

1. Ensure all code reviewed and tested
2. Verify environment variables set in Netlify
3. Configure Supabase redirect URLs for production
4. Deploy to staging environment
5. Run end-to-end tests on staging
6. Monitor for errors
7. Deploy to production
8. Monitor production auth logs

---

## Monitoring & Maintenance

### Key Metrics to Monitor
- Magic link request rate
- Email delivery success rate
- Login success rate
- Session timeout frequency
- Error frequency

### Logs to Check
- Supabase authentication logs
- Application error logs
- Netlify function logs

---

## Notes
- This is the final story for authentication
- After completion, authentication is production-ready
- Focus on user experience and error handling
- Comprehensive testing critical before production
- Monitor real usage patterns post-deployment

---

## Created
2025-11-05

## Last Updated
2025-11-05
