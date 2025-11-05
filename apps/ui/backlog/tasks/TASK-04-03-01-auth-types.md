# TASK-04-03-01: Define Auth Types

---

## Metadata
- **Task ID:** TASK-04-03-01
- **Story:** STORY-04-03 (Auth Service Implementation)
- **Epic:** EPIC-04 (Magic Link Auth)
- **Priority:** P0 - Critical
- **Status:** Blocked
- **Effort:** S (2-4 hours)
- **Story Points:** 5

---

## Summary
Create comprehensive TypeScript type definitions for authentication in `types/auth.ts`.

---

## Objective
Define all auth-related types that will be used throughout the authentication system.

---

## Acceptance Criteria
- [ ] File created at `types/auth.ts`
- [ ] All types properly exported
- [ ] User interface defined
- [ ] Session interface defined
- [ ] Response interfaces defined
- [ ] AuthState interface defined
- [ ] All types use proper TypeScript syntax
- [ ] No circular dependencies
- [ ] Proper documentation comments

---

## Implementation

### File: `types/auth.ts`

```typescript
/**
 * Response from sending magic link
 */
export interface SendMagicLinkResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Authenticated user
 */
export interface User {
  id: string;
  email: string;
  user_metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

/**
 * User session with tokens
 */
export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  token_type: string;
}

/**
 * Current auth state
 */
export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
}
```

### Type Details

#### SendMagicLinkResponse
- `success`: boolean indicating if magic link was sent
- `message`: optional success message
- `error`: optional error message

#### User
- `id`: Unique user identifier (UUID from Supabase)
- `email`: User's email address
- `user_metadata`: Optional custom metadata
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

#### Session
- `access_token`: JWT for API requests
- `refresh_token`: Token to refresh access token
- `expires_in`: Seconds until expiry
- `expires_at`: Unix timestamp of expiry
- `token_type`: Always "Bearer"

#### AuthState
- `user`: Current user or null if not authenticated
- `session`: Current session or null if not authenticated
- `isLoading`: Whether auth state is loading
- `error`: Error message if auth failed

---

## Testing

### Test 1: Import Types
```typescript
import type { User, Session, AuthState, SendMagicLinkResponse } from "@/types/auth";
```

### Test 2: Use in Code
```typescript
const user: User = {
  id: "123",
  email: "test@example.com",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const state: AuthState = {
  user,
  session: null,
  isLoading: false,
  error: null,
};
```

### Test 3: TypeScript
```bash
npm run type-check
# Should have no errors
```

---

## Definition of Done
- [x] File created with all types
- [x] Types properly exported
- [x] Types properly documented
- [x] No TypeScript errors
- [x] Can be imported successfully

---

## Notes
- These types are foundational for auth system
- User interface mirrors Supabase user structure
- Session interface contains all auth tokens
- AuthState used by useAuth hook
- Add new types here if needed later

---

## Related Tasks
- TASK-04-03-02: Create Auth Service Interface

---

## Created
2025-11-05

## Last Updated
2025-11-05
