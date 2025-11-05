# Magic Link Authentication Implementation Plan for Neural Agent UI

## Executive Summary

This document provides a comprehensive plan to implement magic link authentication with Supabase in the Neural Agent UI application. Magic links provide a passwordless authentication method where users receive an email with a unique link to sign in. This plan focuses exclusively on production-ready Supabase implementation without mock services.

---

## 1. Current State Assessment

### Existing Infrastructure
- **Framework**: Next.js 16.0.1 with App Router
- **UI Components**: shadcn/ui with Tailwind CSS
- **Authentication**: Currently not implemented
- **Service Architecture**: Service factory pattern with interface-based design
- **State Management**: React hooks (useState, custom hooks)
- **Toast Notifications**: Existing Toast component system

### Key Files
- `apps/ui/package.json` - Dependencies (Supabase not yet added)
- `apps/ui/services/` - Service factory pattern for API calls
- `apps/ui/types/persona.ts` - Existing type definitions
- `apps/ui/app/layout.tsx` - Root layout with Toaster

### Current Architecture Approach
The project uses a service abstraction pattern where:
1. Services are defined as interfaces
2. Service factory (`serviceFactory.ts`) manages the exports
3. This pattern should extend to authentication services
4. **Note**: No mock implementations - all services call real Supabase APIs

---

## 2. Technology Stack

### Dependencies to Add
```json
{
  "@supabase/ssr": "^0.4.0",
  "@supabase/supabase-js": "^2.43.0"
}
```

**Why @supabase/ssr**:
- Modern approach recommended by Supabase
- Automatically manages cookies for SSR
- Works seamlessly with Next.js App Router
- Enables server-side access to auth state without exposing tokens to browser

---

## 3. Architecture Design

### 3.1 Service Layer Design

Follow the existing service abstraction pattern with only real implementations:

```typescript
// services/auth.service.ts - Interface
export interface IAuthService {
  // Magic Link
  sendMagicLink(email: string): Promise<SendMagicLinkResponse>;

  // Session Management
  getCurrentUser(): Promise<User | null>;
  getCurrentSession(): Promise<Session | null>;
  signOut(): Promise<void>;

  // Auth State Listener
  onAuthStateChange(callback: (user: User | null) => void): () => void;
}

// services/api/apiAuthService.ts - Real Implementation Only
export const apiAuthService: IAuthService = {
  async sendMagicLink(email: string) { /* ... */ },
  async getCurrentUser() { /* ... */ },
  async getCurrentSession() { /* ... */ },
  async signOut() { /* ... */ },
  onAuthStateChange(callback) { /* ... */ },
}

// services/serviceFactory.ts - Updated
export const authService: IAuthService = apiAuthService;
```

### 3.2 Supabase Client Configuration

Create Supabase client wrappers for both browser and server contexts:

#### Browser Client (Client-Side)
```typescript
// lib/supabase/client.ts
"use client";

import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
```

#### Server Client (Server-Side)
```typescript
// lib/supabase/server.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
};
```

### 3.3 Type Definitions

Add auth-specific types:

```typescript
// types/auth.ts
export interface SendMagicLinkResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  user_metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  token_type: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
}
```

---

## 4. Magic Link Flow Implementation

### 4.1 Step 1: Email Input Page (`/auth/login`)

```typescript
// app/auth/login/page.tsx
"use client";

import { useState } from "react";
import { authService } from "@/services/serviceFactory";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.sendMagicLink(email);

      if (response.success) {
        setIsSubmitted(true);
        toast({
          title: "Check Your Email",
          description: `We've sent a magic link to ${email}`,
        });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to send magic link",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Magic link error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Check Your Email</CardTitle>
              <CardDescription>
                We've sent a magic link to <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Click the link in the email to sign in</p>
                <p>• The link will expire in 1 hour</p>
                <p>• Check spam folder if you don't see it</p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsSubmitted(false)}
              >
                Back to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Neural Agent</CardTitle>
            <CardDescription>Sign in with your email</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Magic Link"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                We'll send you a secure link to sign in. No password needed.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
```

### 4.2 Step 2: Callback Handler (`/auth/callback`)

Supabase redirects to this endpoint after user clicks the magic link:

```typescript
// app/auth/callback/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    try {
      // Exchange the auth code for a session
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        // Redirect to dashboard or home page
        return NextResponse.redirect(new URL("/", request.url));
      }

      console.error("Auth exchange error:", error);
    } catch (error) {
      console.error("Unexpected callback error:", error);
    }
  }

  // Return an error page if something went wrong
  return NextResponse.redirect(
    new URL("/auth/login?error=authentication_failed", request.url)
  );
}
```

### 4.3 Step 3: Protected Routes with Middleware

Implement middleware to check authentication and protect routes:

```typescript
// middleware.ts (Root level, alongside next.config.mjs)
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Refresh session if expired
  const { data, error } = await supabase.auth.getUser();

  // Redirect unauthenticated users trying to access protected routes
  if (!data.user && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect authenticated users away from auth pages
  if (data.user && request.nextUrl.pathname === "/auth/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
```

### 4.4 Auth Service Implementation

```typescript
// services/api/apiAuthService.ts
import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { IAuthService } from "@/services/auth.service";
import type { User, Session } from "@/types/auth";

export const apiAuthService: IAuthService = {
  async sendMagicLink(email: string) {
    try {
      const supabase = createBrowserClient();

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        return {
          success: false,
          error: error.message || "Failed to send magic link",
        };
      }

      return {
        success: true,
        message: "Magic link sent successfully",
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const supabase = createBrowserClient();
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        return null;
      }

      return {
        id: data.user.id,
        email: data.user.email || "",
        user_metadata: data.user.user_metadata,
        created_at: data.user.created_at,
        updated_at: data.user.updated_at,
      };
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },

  async getCurrentSession(): Promise<Session | null> {
    try {
      const supabase = createBrowserClient();
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        return null;
      }

      return {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token || "",
        expires_in: data.session.expires_in || 3600,
        expires_at: data.session.expires_at || Date.now() + 3600000,
        token_type: "Bearer",
      };
    } catch (error) {
      console.error("Error getting session:", error);
      return null;
    }
  },

  async signOut(): Promise<void> {
    try {
      const supabase = createBrowserClient();
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  },

  onAuthStateChange(
    callback: (user: User | null) => void
  ): (() => void) {
    const supabase = createBrowserClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        callback({
          id: session.user.id,
          email: session.user.email || "",
          user_metadata: session.user.user_metadata,
          created_at: session.user.created_at,
          updated_at: session.user.updated_at,
        });
      } else {
        callback(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  },
};
```

---

## 5. Environment Variables

### Required Environment Variables

```bash
# .env.local (Development)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### Production Deployment (Netlify)

Set these environment variables in your Netlify dashboard (Settings > Build & Deploy > Environment):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### Supabase Configuration

1. **Email Provider Setup**
   - Go to Supabase Dashboard > Authentication > Providers
   - Email/password provider should be enabled by default
   - No configuration needed for basic magic link

2. **Redirect URLs**
   - Navigate to Authentication > URL Configuration
   - Add allowed redirect URLs:
     - Development: `http://localhost:3000/auth/callback`
     - Production: `https://yourdomain.com/auth/callback`
   - These are the only URLs users can be redirected to after clicking the magic link

3. **Email Template (Optional)**
   - Navigate to Authentication > Email Templates
   - Edit the "Confirm signup" template
   - Ensure `{{ .ConfirmationURL }}` is included (Supabase adds this automatically)
   - Customize the email content as needed

4. **Email Settings (Optional)**
   - Go to Authentication > Email Settings
   - Configure custom email domain if desired
   - Default: Supabase sends from noreply@mail.supabase.io

---

## 6. Custom Hook for Auth State

Create a reusable hook to manage auth state throughout the application:

```typescript
// hooks/useAuth.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import { authService } from "@/services/serviceFactory";
import type { User, Session, AuthState } from "@/types/auth";

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    error: null,
  });

  // Load initial auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const [user, session] = await Promise.all([
          authService.getCurrentUser(),
          authService.getCurrentSession(),
        ]);

        setState({
          user,
          session,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load auth state";
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: message,
        }));
      }
    };

    initAuth();
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((user) => {
      setState(prev => ({
        ...prev,
        user,
      }));
    });

    return () => unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authService.signOut();
      setState({
        user: null,
        session: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to sign out";
      setState(prev => ({
        ...prev,
        error: message,
      }));
    }
  }, []);

  return { ...state, signOut };
}
```

---

## 7. Integration with Existing Features

### 7.1 Update Persona Types

Extend persona to include user ownership:

```typescript
// types/persona.ts
export interface Persona {
  id: string;
  userId: string; // Associate persona with authenticated user
  name: string;
  traits: string[];
  interests: string[];
  background: string;
  personality: string;
  createdAt: string;
  updatedAt: string;
}
```

### 7.2 Update Persona Service

Include user context when processing/saving personas:

```typescript
// services/api/apiPersonaService.ts
export const apiPersonaService: IPersonaService = {
  async processPersona(input: PersonaInputPayload, userId?: string) {
    // Add userId to request
    const response = await fetch("/api/personas/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...input, userId }),
    });

    return response.json();
  },

  async savePersona(payload: SavePersonaPayload, userId?: string) {
    // Add userId to request
    const response = await fetch("/api/personas/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, userId }),
    });

    return response.json();
  },
};
```

### 7.3 Update Home Page with Auth

```typescript
// app/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user, isLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Neural Agent</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Rest of your content */}
      </div>
    </main>
  );
}
```

---

## 8. Implementation Phases

### Phase 1: Foundation (Days 1-2)
- [ ] Install Supabase dependencies (`@supabase/ssr`, `@supabase/supabase-js`)
- [ ] Create Supabase client wrappers (browser + server)
- [ ] Define auth types (`types/auth.ts`)
- [ ] Create auth service interface (`services/auth.service.ts`)
- [ ] Setup `.env.local` with Supabase credentials

### Phase 2: Service Implementation (Days 2-3)
- [ ] Implement real auth service (`services/api/apiAuthService.ts`)
- [ ] Update service factory to export auth service
- [ ] Create `useAuth()` hook
- [ ] Test basic auth flow locally

### Phase 3: UI Implementation (Days 3-4)
- [ ] Create login page (`app/auth/login/page.tsx`)
- [ ] Implement callback handler (`app/auth/callback/route.ts`)
- [ ] Add sign out button to home page
- [ ] Test email flow with Supabase

### Phase 4: Route Protection (Days 4-5)
- [ ] Implement middleware for route protection
- [ ] Protect persona creation routes
- [ ] Redirect unauthenticated users
- [ ] Test middleware with real auth flow

### Phase 5: Integration (Days 5-6)
- [ ] Update persona types with userId
- [ ] Update persona service to include user context
- [ ] Update home page with auth checks
- [ ] Test complete user flow

### Phase 6: Deployment (Days 6-7)
- [ ] Add environment variables to Netlify
- [ ] Configure redirect URL for production domain
- [ ] Test magic link flow in production
- [ ] Monitor for any issues

---

## 9. Security Considerations

### 9.1 PKCE Flow
- Supabase automatically implements PKCE (Proof Key for Code Exchange)
- Most secure OAuth-like flow for single-page and mobile applications
- No manual configuration needed - handled by `@supabase/ssr`

### 9.2 Cookie Storage
- `@supabase/ssr` stores session tokens in HttpOnly cookies
- HttpOnly prevents XSS attacks from accessing tokens
- Cookies sent only to same domain and HTTPS in production
- Server can safely read session from cookies

### 9.3 Session Management
- Sessions automatically refreshed by Supabase client
- Tokens expire according to Supabase settings
- User session cleared on sign out
- Middleware refreshes session on each request

### 9.4 Sensitive Data Protection
- Never store API keys in code or version control
- Always use environment variables
- Service role key (if used in backend functions) never exposed to client
- Supabase anon key is public - safe for client-side use

### 9.5 Rate Limiting
- Supabase enforces 60-second rate limit between magic link requests
- Magic links expire after 1 hour by default
- Implement UI feedback to prevent spam

---

## 10. Deployment Checklist

- [ ] Add `NEXT_PUBLIC_SUPABASE_URL` to Netlify environment variables
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Netlify environment variables
- [ ] Configure production redirect URL in Supabase Authentication > URL Configuration
- [ ] Test magic link flow end-to-end in production
- [ ] Verify email deliverability (check spam folder)
- [ ] Monitor auth errors in Supabase logs
- [ ] Setup error tracking/alerting
- [ ] Create user documentation for sign-in process
- [ ] Test on mobile devices and different browsers

---

## 11. Testing Strategy

### 11.1 Local Development Testing

```bash
# Start development server
npm run dev

# Test magic link flow:
1. Navigate to http://localhost:3000/auth/login
2. Enter test email address
3. Go to Supabase Dashboard > Authentication > Users
4. Find the user and locate the magic link in the notification
5. Click the link (or manually visit callback URL with code param)
6. Verify redirects to home page and user is authenticated
```

### 11.2 Edge Cases to Test

- Email not in database (should still send link for signup)
- Expired magic link (should redirect to login with error)
- Multiple requests within 60 seconds (rate limiting)
- Clicking link twice (should be rejected)
- Network errors during callback
- Signing out properly clears session
- Protected routes redirect unauthenticated users
- Authenticated users cannot access /auth/login

### 11.3 Production Testing

- Use staging environment first
- Test with actual email domain
- Verify email deliverability
- Test on mobile devices
- Test across browsers (Chrome, Firefox, Safari, Edge)
- Monitor error logs after deployment

---

## 12. Files to Create/Modify

### New Files to Create

```
apps/ui/
├── lib/
│   └── supabase/
│       ├── client.ts
│       └── server.ts
├── app/
│   └── auth/
│       ├── login/
│       │   └── page.tsx
│       └── callback/
│           └── route.ts
├── services/
│   ├── auth.service.ts
│   └── api/
│       └── apiAuthService.ts
├── types/
│   └── auth.ts
├── hooks/
│   └── useAuth.ts
└── middleware.ts (in root of apps/ui)
```

### Files to Modify

```
apps/ui/
├── package.json (add Supabase dependencies)
├── services/serviceFactory.ts (export authService)
├── types/persona.ts (add userId field)
├── app/page.tsx (add auth check and sign out button)
├── app/layout.tsx (optional: add auth context provider)
└── .env.example (add Supabase environment variables)
```

---

## 13. Environment File Template

Create `.env.example` for documentation:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

---

## 14. Common Issues & Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| "Magic link not received" | Email provider not configured | Check Supabase dashboard > Authentication > Email Settings |
| "Callback fails silently" | Redirect URL not in allowed list | Add URL to Authentication > URL Configuration |
| "Code parameter missing" | User didn't click link | Verify email was sent (check spam/promotions) |
| "Session not persisting" | Cookies not set correctly | Check browser dev tools > Application > Cookies |
| "Rate limit errors" | Requesting multiple links too fast | Wait 60 seconds between requests |
| "Can't get user on server" | Using client hook on server component | Use server action or fetch session in middleware |
| "User undefined in Next.js server component" | Session not available on initial render | Use middleware to check auth before rendering |

---

## 15. Future Enhancements

### 15.1 Alternative Authentication Methods
- Add Google OAuth
- Add GitHub OAuth
- Add password-based authentication as optional alternative

### 15.2 Enhanced Security
- Multi-factor authentication (MFA)
- Passwordless with biometrics
- Session activity monitoring

### 15.3 User Management
- User profile/settings page
- Change email address
- Account deletion
- Login history

### 15.4 Analytics
- Track authentication events
- Monitor magic link delivery rates
- Track user signup/retention

---

## 16. Resources & References

- [Supabase Magic Link Guide](https://supabase.com/docs/guides/auth/auth-magic-link)
- [Supabase Auth API Reference](https://supabase.com/docs/reference/javascript/auth-signinwithotp)
- [Supabase SSR Setup](https://supabase.com/docs/guides/auth/server-side-rendering)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Supabase JavaScript Client](https://github.com/supabase/supabase-js)

---

## 17. Implementation Code Examples

### Complete Auth Service
See Section 4.4 for the full implementation of `apiAuthService.ts`

### Complete Login Page
See Section 4.1 for the full implementation of login page with email input

### Complete Middleware
See Section 4.3 for the full middleware implementation with route protection

### Complete useAuth Hook
See Section 6 for the full hook implementation

---

## 18. Key Differences from Mock Approach

This plan **does not include**:
- Mock authentication services
- Simulated delays
- Test data
- Environment variable toggles for mock/real mode

This plan **includes**:
- Direct integration with Supabase APIs
- Real email delivery via Supabase
- Production-ready error handling
- Proper session management with cookies
- Server-side session access via middleware
- Real user authentication from day one

---

## Conclusion

This implementation plan provides a production-ready approach to magic link authentication using Supabase. The architecture integrates cleanly with your existing service pattern while maintaining security best practices.

**Key Advantages:**
- **Passwordless UX**: Users receive links instead of managing passwords
- **Secure by Default**: PKCE flow + HttpOnly cookies protect tokens
- **Server-Side Ready**: SSR middleware checks authentication on server
- **Scalable**: Delegates auth to Supabase, proven production service
- **Maintainable**: Service interface allows future updates without affecting components

**Timeline**: 6-7 days from start to production deployment

**Dependencies**: Only 2 Supabase packages needed - minimal additional complexity
