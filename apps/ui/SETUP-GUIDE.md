# ⚙️ Setup Guide - Netlify Functions

**Status:** Backend implementation complete, needs environment configuration

---

## 🚨 What's Missing

The Netlify Functions need the **Supabase Service Role Key** to access blob storage and save/retrieve personas.

Currently you have:
- ✅ OpenAI API key configured
- ✅ Supabase URL configured
- ✅ Supabase anon key configured
- ❌ **Supabase Service Role Key** - MISSING

---

## 📝 How to Get Supabase Service Role Key

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (`neural-agent` or similar)
3. Click **Settings** (bottom left) → **API**
4. Under **Project API keys**, find **Service Role Key**
5. Copy the key (it starts with `eyJ...`)

---

## ⚙️ Configure Environment Variables

Add to `.env.local` in `apps/ui/`:

```bash
# Supabase Configuration (already have these)
NEXT_PUBLIC_SUPABASE_URL=https://looyzfveowzzcalukqbl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ADD THIS - Service Role Key from Supabase settings
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...paste-your-key-here

# OpenAI API (already have this)
OPENAI_API_KEY=sk-proj-...

# Netlify Dev configuration (optional but helpful)
NODE_ENV=development
LOG_LEVEL=debug
```

---

## 🚀 Steps to Get Working

### 1. Get Service Role Key (5 min)
- [ ] Go to Supabase dashboard
- [ ] Copy Service Role Key from Settings → API
- [ ] Add to `.env.local`

### 2. Create Personas Bucket (2 min)
- [ ] In Supabase, go to **Storage**
- [ ] Create new bucket named **personas**
- [ ] Set to **Private**
- [ ] File size limit: 5MB

### 3. Start Netlify Dev (1 min)
```bash
cd apps/ui
netlify dev
```

### 4. Test Process Persona
```bash
curl -X POST http://localhost:3001/.netlify/functions/process-persona \
  -H "Content-Type: application/json" \
  -d '{
    "textBlocks": ["John is a software engineer with 10 years experience at Google"],
    "links": []
  }'
```

Expected response: **200 with structured persona**

### 5. Once Working
- The frontend will automatically use real APIs
- Stop using mock data
- Everything will work end-to-end

---

## 🔍 Debugging

### Check if Functions are Available
```bash
# This should return the error response (not 404)
curl http://localhost:3001/.netlify/functions/process-persona
```

If you get **404**, you need to:
1. Make sure `netlify dev` is running (not just `npm run dev`)
2. Check that functions exist in `netlify/functions/` directory
3. Verify `.netlify/functions/` is in the correct location

### View Logs
```bash
# In another terminal
netlify logs:tail
```

### Check Environment Variables Loaded
Look for this in logs when starting `netlify dev`:
```
Environment validation passed
```

If you see errors about missing variables, add them to `.env.local`

---

## 📋 Checklist

Before trying to use the backend:

- [ ] Copied Supabase Service Role Key
- [ ] Added it to `.env.local` as `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Created `personas` bucket in Supabase
- [ ] Set bucket to Private
- [ ] Running `netlify dev` (not just `npm run dev`)
- [ ] Can see "Environment validation passed" in logs
- [ ] Frontend shows loading indicator when clicking submit

---

## ⚡ Quick Start (Copy-Paste)

### 1. Update `.env.local`
Add this line (replace with your actual key from Supabase):
```bash
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Create Bucket in Supabase
Go to Storage tab and create bucket:
- Name: `personas`
- Privacy: Private
- Size limit: 5MB

### 3. Start Netlify Dev
```bash
# Kill any existing npm run dev
# Then start netlify dev instead
netlify dev
```

### 4. Test It
Open browser to `http://localhost:3001` and fill in the form.

---

## 🎯 What Happens When It Works

1. You fill in text blocks in the frontend
2. Click "Submit"
3. Frontend calls `process-persona` function
4. Function sends text to OpenAI
5. OpenAI returns structured persona
6. Frontend displays the persona
7. Click "Save"
8. Frontend calls `save-persona` function
9. Function saves to Supabase blob storage
10. You get a success message with persona ID

---

## 📱 What's Actually Running

When you run `netlify dev`:

```
Port 3001: Next.js frontend (already running)
Port 3001: Netlify functions proxy (at /.netlify/functions/)
         ↓
Port ???: Actual Netlify Functions (running locally)
```

The `netlify dev` command:
- Keeps Next.js running on 3001
- Starts local Netlify Functions runtime
- Proxies `/.netlify/functions/*` to the local functions

---

## ✅ You're Ready When

- [ ] `netlify dev` is running
- [ ] Browser shows "Loading..." for a few seconds when you submit
- [ ] OpenAI processes the request (check console for tokens used)
- [ ] You see the structured persona appear

---

## 🆘 If It Still Doesn't Work

### 404 Not Found
- [ ] Confirm `netlify dev` is running (not `npm run dev`)
- [ ] Check that `netlify/functions/` exists with `.ts` files
- [ ] Check for errors in terminal where `netlify dev` is running

### Missing Environment Variable Error
- [ ] Check `.env.local` has all 4 required variables
- [ ] Confirm no extra spaces or typos
- [ ] Restart `netlify dev` after editing `.env.local`

### OpenAI API Error
- [ ] Verify API key in `.env.local`
- [ ] Check OpenAI account has API credits
- [ ] Check rate limits (if many requests)

### Supabase Connection Error
- [ ] Verify Service Role Key is correct
- [ ] Check Supabase project is accessible
- [ ] Verify `personas` bucket exists and is Private

---

## 💬 Still Need Help?

See documentation:
- `BACKEND-READY.md` - Overview
- `FUNCTIONS-QUICK-REFERENCE.md` - API details
- `IMPLEMENTATION-SUMMARY.md` - Full technical details

---

**Created:** 2025-11-05
**Status:** Complete setup instructions ready
