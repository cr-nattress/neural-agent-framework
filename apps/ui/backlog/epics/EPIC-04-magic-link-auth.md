# EPIC-04: Magic Link Authentication with Supabase

---

## Metadata
- **Epic ID:** EPIC-04
- **Phase:** 1.2
- **Priority:** P1 - High
- **Status:** Ready to Start
- **Effort Estimate:** 6-7 days
- **Dependencies:** EPIC-01 (frontend foundation)

---

## Goal
Implement passwordless magic link authentication using Supabase, enabling secure user registration and login without password management.

---

## Objective
Add production-ready Supabase magic link authentication to the Neural Agent UI. Users will receive secure email links to sign in, with proper session management via cookies and server-side route protection.

---

## Success Criteria
- [ ] Supabase dependencies installed and configured
- [ ] Browser and server Supabase client wrappers created
- [ ] Auth types and interfaces defined
- [ ] Auth service interface implements all required methods
- [ ] Real auth service implementation connects to Supabase
- [ ] Login page with email input functional
- [ ] Callback handler processes magic link tokens
- [ ] Auth middleware protects routes and manages sessions
- [ ] useAuth hook provides consistent state management
- [ ] Existing persona features integrated with user ownership
- [ ] All environment variables properly configured
- [ ] Complete end-to-end magic link flow tested locally
- [ ] Ready for production deployment with zero mock data

---

## Business Value
- **Passwordless UX:** Eliminates password management burden for users
- **Security:** PKCE flow + HttpOnly cookies protect authentication tokens
- **User Ownership:** Links personas to authenticated users
- **Compliance:** Email-based auth meets many security frameworks
- **Scalability:** Delegates auth to Supabase, proven production service
- **Zero Maintenance:** No password reset flows or password recovery needed

---

## Technical Details

### Core Components
1. **Supabase Client Wrappers** - Browser and server clients for different contexts
2. **Auth Service** - Interface and implementation for all auth operations
3. **Login Page** - Email input interface for magic link requests
4. **Callback Handler** - Processes magic link tokens from Supabase
5. **Auth Middleware** - Protects routes and manages session on server
6. **useAuth Hook** - React hook for auth state management
7. **Integration Layer** - Connects auth to existing persona features

### Technology Stack
- `@supabase/ssr` - Modern SSR auth management
- `@supabase/supabase-js` - Supabase JavaScript client
- Next.js 16 middleware for server-side auth checks
- HttpOnly cookies for secure token storage

### Security Model
- **PKCE Flow:** Automatic - handled by Supabase
- **Token Storage:** HttpOnly cookies - prevents XSS access
- **Server Access:** Middleware can read session safely
- **Rate Limiting:** 60-second limit between magic link requests
- **Link Expiry:** 1-hour expiration on magic links
- **No Passwords:** Eliminates password-related vulnerabilities

---

## User Stories

### STORY-04-01: Foundation & Dependencies
Effort: 2 days | Priority: P0

### STORY-04-02: Supabase Client Setup
Effort: 1-2 days | Priority: P0

### STORY-04-03: Auth Service Implementation
Effort: 2-3 days | Priority: P1

### STORY-04-04: Login UI & Magic Link Flow
Effort: 1-2 days | Priority: P1

### STORY-04-05: Route Protection & Middleware
Effort: 1 day | Priority: P1

### STORY-04-06: Integration & Testing
Effort: 1-2 days | Priority: P1

---

## Acceptance Criteria

### Functional Requirements
- Users can enter email on login page
- Magic link is sent within 5 seconds
- User clicks link and is authenticated
- Session persists across page reloads
- Signing out clears session completely
- Protected routes redirect unauthenticated users to login
- Authenticated users cannot access /auth/login page
- Rate limiting prevents link spam (60-second window)
- Expired links show clear error messages

### Non-Functional Requirements
- All Supabase API calls handled correctly
- No sensitive data in browser localStorage
- CORS and security headers proper
- Error messages are user-friendly
- Loading states indicate progress
- Mobile-responsive auth flow
- Works on all modern browsers

### Code Quality Requirements
- TypeScript strict mode enforced
- All types properly defined
- Service interface followed
- Error handling comprehensive
- No console warnings
- Code comments for complex logic
- Ready for production deployment

---

## Risks & Mitigations

### Risk: Email Deliverability Issues
- **Severity:** Medium
- **Mitigation:** Test with real email in staging first, monitor deliverability

### Risk: Cookie/Session Issues
- **Severity:** Medium
- **Mitigation:** Thorough testing on multiple browsers and devices

### Risk: PKCE Implementation Errors
- **Severity:** Low
- **Mitigation:** Use Supabase SSR package (handles automatically)

### Risk: Rate Limiting Confusion
- **Severity:** Low
- **Mitigation:** Clear UI messaging about 60-second limit

---

## Implementation Notes

### Phase Overview
1. **Days 1-2:** Install dependencies, create Supabase clients, define types
2. **Days 2-3:** Implement auth service with all Supabase operations
3. **Days 3-4:** Build login page and callback handler
4. **Days 4-5:** Implement middleware and route protection
5. **Days 5-6:** Integrate with existing features, comprehensive testing
6. **Day 6-7:** Final testing, production readiness, deployment

### Key Decision: No Mock Services
Unlike earlier epics, this epic focuses exclusively on real Supabase implementation:
- No mock auth services
- No simulated email responses
- All service calls real from the start
- Production-ready from day one

### Integration Points
- Persona types: Add `userId` field to associate personas with users
- Persona service: Include user context in API requests
- Home page: Add auth checks and sign out button
- Existing toast/error handling: Reuse for auth messages

---

## Files to Create

### Core Auth Files
```
apps/ui/
├── lib/supabase/
│   ├── client.ts
│   └── server.ts
├── app/auth/
│   ├── login/page.tsx
│   └── callback/route.ts
├── services/
│   ├── auth.service.ts
│   └── api/apiAuthService.ts
├── types/auth.ts
├── hooks/useAuth.ts
└── middleware.ts
```

### Backlog Files
```
apps/ui/backlog/
├── epics/EPIC-04-magic-link-auth.md (this file)
├── stories/
│   ├── STORY-04-01-foundation.md
│   ├── STORY-04-02-supabase-setup.md
│   ├── STORY-04-03-auth-service.md
│   ├── STORY-04-04-login-ui.md
│   ├── STORY-04-05-route-protection.md
│   └── STORY-04-06-integration.md
└── tasks/
    ├── TASK-04-01-01-install-dependencies.md
    ├── TASK-04-01-02-supabase-project-setup.md
    ... (24 tasks total)
```

---

## Testing Strategy

### Local Testing
1. Test magic link with real Supabase
2. Verify email delivery
3. Test callback handler with token
4. Verify session persistence
5. Test middleware route protection
6. Test signing out

### Edge Cases
- Rate limited requests (< 60 seconds)
- Expired magic links (> 1 hour)
- Clicking link twice
- Network errors during callback
- Session timeout

### Production Testing
- Test on staging environment first
- Verify email deliverability
- Test across browsers and devices
- Monitor for auth errors

---

## Deployment Steps

1. Create Supabase project (if not exists)
2. Configure redirect URLs in Supabase dashboard
3. Add environment variables to Netlify
4. Deploy to staging environment
5. Run end-to-end tests
6. Deploy to production
7. Monitor auth logs

---

## Success Metrics

- [ ] 100% of users can complete magic link flow
- [ ] Magic links sent within 5 seconds
- [ ] Zero session loss on page reload
- [ ] Sign out properly clears authentication
- [ ] Protected routes redirect unauthorized users
- [ ] Error messages are clear and helpful
- [ ] No sensitive data exposed in logs
- [ ] Ready for production deployment

---

## Related Documentation
- [MAGIC_LINK_AUTH_PLAN.md](../../../MAGIC_LINK_AUTH_PLAN.md) - Comprehensive implementation plan
- [Supabase Magic Link Docs](https://supabase.com/docs/guides/auth/auth-magic-link)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

---

## Created
2025-11-05

## Last Updated
2025-11-05
