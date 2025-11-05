# Business App Plan: Landing Page + Authentication

This document defines a practical plan to add a marketing landing page and passwordless authentication to the Neural Agent UI, inspired by the Smiile (smiile.co) experience and aligned with this repo’s Next.js + shadcn/ui stack.

---

## 1) Executive Summary

- Deliver a new public landing page that mirrors Smiile’s clarity (Hero, 3-step explainer, social proof, use cases, strong CTAs) and funnels users into sign-up/login.
- Implement Supabase magic-link authentication with SSR session handling to gate the app’s builder and chat flows.
- Preserve the existing UI/UX for the builder and chat while adding a smooth post-login redirect experience.

Outcomes: higher conversion into the product, secure sessions, and a professional first impression for the product.

---

## 2) Current State (Repo Assessment)

- Framework: Next.js 16 (App Router), TypeScript, shadcn/ui, Tailwind CSS.
- UI: Persona builder at `apps/ui/app/page.tsx`, chat at `apps/ui/app/chat/page.tsx`.
- Services: Interface-driven `serviceFactory` pattern (see `apps/ui/services/`).
- Auth: Not implemented yet (see `MAGIC_LINK_AUTH_PLAN.md` for a detailed supabase-first plan).
- Deps: `@supabase/*` packages not yet added to `apps/ui/package.json`.

---

## 3) Smiile UI/UX: Key Takeaways to Emulate

- Hero with clear headline/subheadline and a primary CTA (e.g., “Get started free”).
- “How it works” in three concise steps with light iconography.
- Social proof (simple testimonials or logo bar).
- Use cases to contextualize value.
- Minimal copy, generous whitespace, friendly visuals; obvious path to try it.

---

## 4) Information Architecture & Routing

- `/` — New public marketing landing (replaces current root page).
- `/auth/login` — Public email capture page (magic-link send).
- `/auth/callback` — Public route/page to finalize session and redirect.
- `/builder` — Auth-required (move current `app/page.tsx` content here).
- `/chat` — Auth-required (existing).
- Optional `/demo` — Public, read-only teaser flow if desired.

Redirect model: unauthenticated visits to `/builder` or `/chat` redirect to `/auth/login`. Successful login redirects to `/builder`.

---

## 5) Landing Page Sections

- Navbar: Brand/logo, anchors (How it works, Testimonials, Use cases), primary CTA.
- Hero: Outcome-focused headline/subheadline; CTAs (Get started → `/auth/login`, optional Watch demo).
- How it Works: 3 steps mapped to product: Add sources → Generate persona → Chat/validate.
- Social Proof: 2–3 quotes or a simple trusted-by logo bar.
- Use Cases: Research, product discovery, buyer personas, UX research.
- CTA Strip: Restate value and invite sign-up.
- Footer: Links, legal, socials.

Visual system: shadcn/ui + Tailwind, `lucide-react` icons, friendly palette, subtle hover effects.

---

## 6) Authentication (Supabase Magic Link)

- Packages: `@supabase/ssr` and `@supabase/supabase-js`.
- Env vars in `apps/ui/.env.local` and deployment:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Clients:
  - `lib/supabase/client.ts` — browser client via `createBrowserClient`.
  - `lib/supabase/server.ts` — SSR client via `createServerClient` + Next.js cookies.
- Service layer:
  - `services/auth.service.ts` — interface for auth operations.
  - `services/api/apiAuthService.ts` — real implementation (sendMagicLink, getUser/Session, signOut, onAuthStateChange).
  - Export `authService` via `services/serviceFactory.ts`.
- Pages:
  - `/auth/login` — email capture and send magic link (Toaster feedback).
  - `/auth/callback` — finalize session/cookies and redirect to `/builder`.
- Guards:
  - Protect `/builder` and `/chat` with server-side checks or middleware; redirect when unauthenticated.
- Optional Profiles:
  - `profiles` table with RLS; create on first sign-in to store user metadata.

See: `MAGIC_LINK_AUTH_PLAN.md` for deeper guidance, types, and example code structures.

---

## 7) Implementation Plan (Phased)

- Phase 1 — Foundations
  - Add Supabase deps and env scaffolding in `apps/ui`.
  - Create SSR/browser Supabase clients in `apps/ui/lib/supabase/`.
  - Implement `auth.service.ts` + `apiAuthService` and wire to `serviceFactory`.

- Phase 2 — IA & Routing
  - Move current home (builder UI) from `app/page.tsx` → `app/builder/page.tsx`.
  - Create new landing page at `app/page.tsx`.

- Phase 3 — Auth Pages
  - Build `/auth/login` with email input and Toaster feedback.
  - Add `/auth/callback` to set session and redirect.

- Phase 4 — Route Protection
  - Enforce auth for `/builder` and `/chat` with SSR-aware checks.
  - Ensure friendly redirect UX back to `/auth/login`.

- Phase 5 — Marketing Components
  - Navbar, Hero, HowItWorks (3 steps), Testimonials, UseCases, CTA strip, Footer.
  - Responsive layout + accessibility (semantic headings, alt text, focus states).

- Phase 6 — Profiles & Data (Optional but Recommended)
  - Add `profiles` table + RLS.
  - Create profile on first sign-in; associate persona ownership by `user_id`.

- Phase 7 — QA & Analytics
  - E2E: landing → login → callback → builder → save persona.
  - Metadata/OG, sitemap, robots; optional lightweight analytics.

- Phase 8 — Deployment
  - Configure env vars/secrets in hosting (Netlify/Vercel).
  - Validate email sender (Supabase default vs custom SMTP) and site URL callback settings.

---

## 8) File/Change Overview (Planned)

- New (marketing): `apps/ui/app/page.tsx` (Landing)
- Move: `apps/ui/app/page.tsx` → `apps/ui/app/builder/page.tsx` (Builder)
- Auth pages: `apps/ui/app/auth/login/page.tsx`, `apps/ui/app/auth/callback/route.ts` (or page)
- Supabase clients: `apps/ui/lib/supabase/client.ts`, `apps/ui/lib/supabase/server.ts`
- Auth service: `apps/ui/services/auth.service.ts`, `apps/ui/services/api/apiAuthService.ts`, update `apps/ui/services/serviceFactory.ts`
- Env: `apps/ui/.env.local` (local only), deployment env settings

Note: Exact filenames/paths follow the existing project structure shown in `apps/ui`.

---

## 9) Deliverables

- Marketing landing at `/` matching the structure above.
- Working magic-link auth with SSR session handling.
- Guarded `/builder` and `/chat` with smooth redirects.
- Optional `profiles` table with RLS and first-sign-in bootstrap.

---

## 10) Acceptance Criteria

- Landing includes Hero, 3-step explainer, social proof, use cases, and strong CTAs.
- Magic-link flow sends email, callback signs in, redirect to `/builder`.
- Unauthenticated access to `/builder` or `/chat` redirects to `/auth/login`.
- Responsive + basic a11y: keyboard focus, headings, alt text, contrast.
- Content copy/assets easily editable.

---

## 11) Open Questions

- Branding: palette/typography and logo assets?
- Public `/demo` desired?
- Email sender: Supabase default vs custom SMTP/domain?
- Post-login destination: `/builder` or a `/dashboard`?
- Real testimonials/logos now vs placeholders?

---

## 12) Recommended Next Actions

- Confirm answers to open questions.
- Approve Phase 1–2: deps/env + routing restructure + landing scaffolding.
- Use `MAGIC_LINK_AUTH_PLAN.md` as the technical reference during implementation.

---

## References

- `MAGIC_LINK_AUTH_PLAN.md` — Detailed Supabase auth plan, types, and examples.
- `apps/ui/package.json` — Add `@supabase/ssr` and `@supabase/supabase-js`.
- `apps/ui/app/chat/page.tsx`, `apps/ui/app/layout.tsx` — Existing UI structure to integrate.
