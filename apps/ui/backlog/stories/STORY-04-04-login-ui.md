# STORY-04-04: Login UI & Magic Link Flow

---

## Metadata
- **Story ID:** STORY-04-04
- **Epic:** EPIC-04 (Magic Link Auth)
- **Priority:** P1 - High
- **Status:** Blocked
- **Effort Estimate:** 1-2 days
- **Story Points:** 8

---

## Summary
Implement login page UI and callback handler for Supabase magic link authentication flow.

---

## Objective
Build user-facing login interface with email input and confirmation page, plus backend callback handler to process magic link tokens.

---

## User Story
As a user, I want to enter my email and receive a magic link to sign in so that I don't have to remember a password.

---

## Acceptance Criteria

### Login Page UI
- [ ] Page accessible at /auth/login
- [ ] Clean, centered layout with Neural Agent branding
- [ ] Email input field with proper placeholder
- [ ] Submit button with loading state
- [ ] Form validation for email format
- [ ] Error messages displayed via toast
- [ ] Loading spinner during email sending
- [ ] Mobile-responsive design

### Confirmation State
- [ ] After email submitted, show confirmation message
- [ ] Display email address that link was sent to
- [ ] Show helpful hints (check spam, link expires in 1 hour)
- [ ] Option to go back and try different email
- [ ] No form submission possible in confirmation state

### Callback Handler
- [ ] Route handler at /auth/callback
- [ ] Extracts code from URL query parameter
- [ ] Calls exchangeCodeForSession()
- [ ] Redirects to home page on success
- [ ] Shows error page on failure
- [ ] Handles network errors gracefully

### Integration
- [ ] Uses authService.sendMagicLink()
- [ ] Shows toast notifications for feedback
- [ ] Proper error messages to user
- [ ] Loading states prevent double submission
- [ ] Email input accessible and focused

---

## Tasks
1. TASK-04-04-01: Create Login Page Layout
2. TASK-04-04-02: Implement Email Input Form
3. TASK-04-04-03: Implement Confirmation Message
4. TASK-04-04-04: Create Callback Handler
5. TASK-04-04-05: Add Error Handling
6. TASK-04-04-06: Test Login Flow
7. TASK-04-04-07: Mobile Responsive Testing

---

## Implementation Details

### Login Page Structure
```
min-h-screen flex items-center justify-center
  ├── Card component
  │   ├── Header (Neural Agent, Sign in with email)
  │   └── Form
  │       ├── Email input
  │       ├── Submit button
  │       └── Helper text
```

### Form Validation
- Email format validation
- Required field check
- Display errors inline
- Prevent submission if invalid

### Confirmation Screen
- Show after successful submission
- Display the email address
- List helpful hints
- Button to go back

### Callback Handler
- Extract ?code= from URL
- Call supabase.auth.exchangeCodeForSession()
- On success: redirect to /
- On error: redirect to /auth/login?error=...

---

## Testing Strategy

### Manual Testing
1. Navigate to /auth/login
2. Enter email address
3. Click "Send Magic Link"
4. Verify toast notification appears
5. Check email for link
6. Click link in email
7. Verify redirected to home page
8. Verify authenticated

### Edge Cases
- Empty email submission
- Invalid email format
- Multiple submissions
- Network error during submission
- Expired magic link
- Clicking link twice

---

## Definition of Done
- [x] Login page fully functional
- [x] Confirmation message displays
- [x] Callback handler processes tokens
- [x] Error handling working
- [x] Mobile responsive
- [x] Ready for route protection

---

## Blockers/Dependencies
- STORY-04-03: Auth Service Implementation

---

## Related Stories
- STORY-04-05: Route Protection & Middleware (redirects to this)
- STORY-04-06: Integration & Testing (tests this)

---

## Notes
- Use shadcn/ui Card, Button, Input components
- Leverage existing toast notification system
- Keep design consistent with app theme
- Focus on user experience and clarity

---

## Created
2025-11-05

## Last Updated
2025-11-05
