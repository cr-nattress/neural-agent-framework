# Deployment Guide

This guide covers local development, testing, and production deployment for Neural Agent.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Deployment to Netlify](#deployment-to-netlify)

## Prerequisites

- **Node.js**: v20 or higher
- **npm**: v9 or higher
- **OpenAI API Key**: Required for real API mode ([Get one here](https://platform.openai.com/api-keys))
- **Supabase Account**: Required for real API mode ([Sign up here](https://supabase.com))
- **Netlify Account**: Required for deployment ([Sign up here](https://www.netlify.com))

## Local Development

### Initial Setup

1. **Install dependencies** (root and UI):
   ```bash
   npm run install:all
   ```

2. **Configure environment variables**:
   - Copy `.env.example` to `.env`
   - Fill in your API keys (optional for mock mode)

### Development Modes

#### Mock Mode (Default - No API Keys Required)

Run the Next.js app with mock data:
```bash
cd apps/ui
npm run dev
```

Access at: http://localhost:3000

#### Real API Mode (Requires API Keys)

1. **Set environment variables in `.env`**:
   ```bash
   NEXT_PUBLIC_USE_MOCK_DATA=false
   OPENAI_API_KEY=sk-your-key-here
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. **Run Netlify Dev** (starts Next.js + Functions):
   ```bash
   npm run dev
   ```

   This starts:
   - Next.js dev server on port 3000
   - Netlify Functions on port 8888
   - Proxy server at http://localhost:8888 (use this URL)

## Environment Variables

### Frontend Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_USE_MOCK_DATA` | Yes | `true` for mock mode, `false` for real APIs |

### Backend Variables (Netlify Functions)

| Variable | Required for Real Mode | Description |
|----------|----------------------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key for persona processing |
| `SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_ANON_KEY` | Yes | Supabase anonymous/public key |

### Environment Files

- **`.env`**: Local development (not committed to git)
- **`.env.example`**: Template with example values (committed to git)
- **`apps/ui/.env.local`**: Next.js-specific local variables

## Testing

### Manual Testing Checklist

#### Mock Mode Testing
- [ ] Form renders correctly with text blocks and link inputs
- [ ] Can add/remove text blocks and links
- [ ] Form validation works (requires at least one input)
- [ ] "Create Persona" shows loading state for ~2 seconds
- [ ] Persona review page displays structured data
- [ ] "Export JSON" downloads persona file
- [ ] "Save Persona" shows success toast
- [ ] "Back to Edit" returns to form
- [ ] "Mock Mode" badge visible in header

#### Real API Mode Testing
- [ ] Netlify Dev starts without errors
- [ ] Functions appear in logs: `process-persona`, `save-persona`
- [ ] Submit form with text blocks
- [ ] OpenAI processes data (check network tab)
- [ ] Structured persona displays correctly
- [ ] Save to Supabase succeeds (check Supabase dashboard)
- [ ] No "Mock Mode" badge in header

### Function Testing

Test Netlify functions directly:

```bash
# Process Persona
curl -X POST http://localhost:8888/.netlify/functions/process-persona \
  -H "Content-Type: application/json" \
  -d '{
    "textBlocks": ["Sarah Chen is a 32-year-old UX designer living in San Francisco."],
    "links": []
  }'

# Save Persona (requires valid persona object)
curl -X POST http://localhost:8888/.netlify/functions/save-persona \
  -H "Content-Type: application/json" \
  -d '{
    "persona": {
      "name": "Test User",
      "background": "Test background",
      "traits": [],
      "interests": [],
      "skills": [],
      "values": [],
      "metadata": { "source_text_blocks": 1, "source_links": 0 },
      "raw_data": { "textBlocks": ["test"], "links": [] }
    }
  }'
```

### Automated Testing (Future)

Placeholder for unit and integration tests:
```bash
# Run tests (to be implemented)
cd apps/ui
npm test
```

## Deployment to Netlify

### One-Time Setup

1. **Connect Repository to Netlify**:
   - Log in to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select `neural-agent-framework` repository

2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `apps/ui/.next`
   - Functions directory: `netlify/functions`

3. **Set Environment Variables** (in Netlify UI):
   - Go to Site Settings → Environment Variables
   - Add the following:
     ```
     NEXT_PUBLIC_USE_MOCK_DATA=false
     OPENAI_API_KEY=sk-your-production-key
     SUPABASE_URL=https://your-project.supabase.co
     SUPABASE_ANON_KEY=your-anon-key
     ```

4. **Configure Supabase Storage**:
   - In Supabase dashboard, create a new bucket named `personas`
   - Set bucket to private or public based on requirements
   - Create table `personas_metadata` (optional):
     ```sql
     CREATE TABLE personas_metadata (
       id TEXT PRIMARY KEY,
       name TEXT NOT NULL,
       occupation TEXT,
       created_at TIMESTAMPTZ DEFAULT NOW(),
       source_text_blocks INTEGER,
       source_links INTEGER,
       storage_path TEXT
     );
     ```

### Deploying Updates

#### Production Deployment
```bash
git push origin main
```

Netlify automatically builds and deploys on push to `main`.

#### Manual Deploy
```bash
npm run deploy
```

#### Preview Deploys
Create a pull request - Netlify automatically creates a preview deployment.

### Deployment Verification

After deployment:
1. ✅ Check build logs for errors
2. ✅ Visit deployed URL
3. ✅ Test persona creation with real data
4. ✅ Verify Supabase storage (check bucket for saved personas)
5. ✅ Check function logs in Netlify dashboard

## Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Unix/Mac
lsof -ti:3000 | xargs kill -9
```

### Netlify Dev Not Found
```bash
npx netlify dev
# or install globally
npm install -g netlify-cli
```

### OpenAI API Errors
- Check API key is valid
- Verify account has credits
- Check rate limits

### Supabase Connection Errors
- Verify project URL and anon key
- Check bucket `personas` exists
- Verify network connectivity

### Build Failures
- Clear Next.js cache: `rm -rf apps/ui/.next`
- Clear Netlify cache: `rm -rf .netlify`
- Reinstall dependencies: `npm run install:all`

## Architecture

```
├── apps/ui/                    # Next.js frontend
│   ├── app/                   # App Router pages
│   ├── components/            # React components
│   ├── services/              # Service layer
│   │   ├── mock/             # Mock implementations
│   │   └── api/              # Real API implementations
│   └── types/                # TypeScript types
│
├── netlify/
│   └── functions/            # Serverless functions
│       ├── process-persona.ts # OpenAI integration
│       └── save-persona.ts    # Supabase integration
│
├── .env                      # Local environment variables
├── .env.example              # Template
└── netlify.toml              # Netlify configuration
```

## Next Steps

- [ ] Implement automated tests
- [ ] Add persona retrieval function
- [ ] Add persona listing function
- [ ] Implement Phase 2: Chat Interface
- [ ] Add error monitoring (Sentry)
- [ ] Add analytics (Plausible/Posthog)
