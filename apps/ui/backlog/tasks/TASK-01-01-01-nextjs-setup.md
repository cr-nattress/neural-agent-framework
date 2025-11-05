# TASK-01-01-01: Initialize Next.js Project

---

## Metadata
- **Task ID:** TASK-01-01-01
- **Story:** [STORY-01-01: Mock Service Infrastructure](../stories/STORY-01-01-mock-services.md)
- **Epic:** [EPIC-01: Frontend with Mock Data](../epics/EPIC-01-frontend-mock.md)
- **Priority:** P0 - Critical
- **Status:** Ready to Start
- **Effort Estimate:** XS (< 1 hour)
- **Dependencies:** None

---

## Description
Initialize a new Next.js 14+ project with TypeScript, Tailwind CSS, and App Router in the `apps/ui` directory.

---

## AI-Executable Prompt

```
Create a new Next.js 14+ project with the following specifications:

Location: C:\Users\RED\OneDrive\Documents\github\neural-agent\apps\ui

Command:
npx create-next-app@latest apps/ui --typescript --tailwind --app --no-src-dir --import-alias "@/*"

Configuration choices:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- App Router: Yes
- Turbopack: No (optional, default is fine)
- Import alias: @/* (pointing to ./)

After initialization:
1. Navigate to apps/ui directory
2. Verify package.json contains:
   - next: ^14.0.0 or higher
   - react: ^18.0.0 or higher
   - typescript: ^5.0.0 or higher
   - tailwindcss: ^3.3.0 or higher

3. Update tsconfig.json to enable strict mode:
   {
     "compilerOptions": {
       "strict": true,
       "strictNullChecks": true,
       "noImplicitAny": true,
       // ... other settings
     }
   }

4. Run npm install to ensure all dependencies are installed
5. Test that the project builds: npm run build
6. Test dev server starts: npm run dev (then stop it)
```

---

## Acceptance Criteria
- [ ] Next.js project created in `apps/ui/` directory
- [ ] TypeScript configured with strict mode enabled
- [ ] Tailwind CSS installed and configured
- [ ] App Router structure created (app/ directory)
- [ ] Project builds successfully (`npm run build`)
- [ ] Dev server starts without errors (`npm run dev`)
- [ ] Import alias `@/*` configured correctly

---

## Implementation Details

### Expected File Structure
```
apps/ui/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/
├── node_modules/
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

### TypeScript Configuration (tsconfig.json)
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Tailwind Configuration (tailwind.config.ts)
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
```

---

## Validation Steps

1. **Check directory structure:**
   ```bash
   ls apps/ui
   # Should show: app/, public/, node_modules/, package.json, etc.
   ```

2. **Verify TypeScript strict mode:**
   ```bash
   cat apps/ui/tsconfig.json | grep "strict"
   # Should show: "strict": true
   ```

3. **Test build:**
   ```bash
   cd apps/ui
   npm run build
   # Should complete without errors
   ```

4. **Test dev server:**
   ```bash
   npm run dev
   # Should start on http://localhost:3000
   # Visit in browser, should see Next.js welcome page
   ```

5. **Test import alias:**
   Create a test file that imports using @/ and verify it resolves correctly

---

## Common Issues & Solutions

### Issue: Create-next-app fails
**Solution:** Ensure Node.js version is 18+ and npm is up to date

### Issue: TypeScript errors on build
**Solution:** Run `npm install` to ensure all dependencies installed

### Issue: Port 3000 already in use
**Solution:** Stop other processes or use different port: `npm run dev -- -p 3001`

---

## Dependencies
- Node.js 18+ installed
- npm or yarn available
- Git initialized in repository

---

## Outputs
- Next.js project initialized in `apps/ui/`
- TypeScript strict mode enabled
- Tailwind CSS configured
- Dev server runnable

---

**Created:** 2025-11-04
**Estimated Time:** 30-60 minutes
**Actual Time:** ___ (to be filled on completion)
