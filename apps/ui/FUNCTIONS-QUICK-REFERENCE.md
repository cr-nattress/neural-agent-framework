# Netlify Functions - Quick Reference Guide

**Last Updated:** 2025-11-05
**Status:** ✅ Production Ready
**Location:** `apps/ui/netlify/functions/`

---

## 🚀 Quick Start

### 1. Install Dependencies (Already Done ✅)
```bash
npm install zod dotenv openai @supabase/supabase-js nanoid
```

### 2. Configure Environment

Create `.env.local`:
```bash
OPENAI_API_KEY=sk-your-key-here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NODE_ENV=development
LOG_LEVEL=debug
OPENAI_MODEL=gpt-4-turbo
MAX_TOKENS=2000
TEMPERATURE=0.7
```

### 3. Run Locally
```bash
netlify dev
```

Functions available at:
- `http://localhost:8888/.netlify/functions/process-persona`
- `http://localhost:8888/.netlify/functions/save-persona`
- `http://localhost:8888/.netlify/functions/get-persona`
- `http://localhost:8888/.netlify/functions/list-personas`

---

## 📡 API Reference

### Process Persona

**Endpoint:** `POST /.netlify/functions/process-persona`

**Request:**
```json
{
  "textBlocks": [
    "John is a software engineer with 10 years of experience...",
    "His background includes work at tech startups..."
  ],
  "links": [
    "https://linkedin.com/in/johndoe",
    "https://github.com/johndoe"
  ]
}
```

**Success Response (200):**
```json
{
  "success": true,
  "persona": {
    "name": "John Doe",
    "age": 35,
    "occupation": "Senior Software Engineer",
    "background": "...",
    "traits": ["analytical", "creative", "detail-oriented"],
    "interests": ["coding", "open source", "mentoring"],
    "skills": ["TypeScript", "React", "Node.js"],
    "values": ["innovation", "collaboration"],
    "metadata": {
      "source_text_blocks": 2,
      "source_links": 2
    },
    "raw_data": { "textBlocks": [...], "links": [...] }
  },
  "metadata": {
    "tokens_used": 1850,
    "processing_time_ms": 3200
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Text block cannot be empty",
    "timestamp": "2025-11-05T10:30:00.000Z"
  }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8888/.netlify/functions/process-persona \
  -H "Content-Type: application/json" \
  -d '{
    "textBlocks": ["John is a software engineer..."],
    "links": []
  }'
```

---

### Save Persona

**Endpoint:** `POST /.netlify/functions/save-persona`

**Request:**
```json
{
  "persona": {
    "name": "John Doe",
    "age": 35,
    "occupation": "Software Engineer",
    "background": "...",
    "traits": [...],
    "interests": [...],
    "skills": [...],
    "values": [...],
    "metadata": {
      "source_text_blocks": 2,
      "source_links": 2
    },
    "raw_data": {...}
  }
}
```

**Success Response (201):**
```json
{
  "success": true,
  "persona_id": "abc123def456",
  "storage_path": "personas/abc123def456.json",
  "metadata": {
    "created_at": "2025-11-05T10:30:15.000Z",
    "file_size": 3456
  }
}
```

**Note:** Usually you'll get the persona from `process-persona` and save it directly.

---

### Get Persona

**Endpoint:** `GET /.netlify/functions/get-persona?id=abc123def456`

**Success Response (200):**
```json
{
  "success": true,
  "persona": {
    "id": "abc123def456",
    "name": "John Doe",
    ...
  },
  "metadata": {
    "created_at": "2025-11-05T10:30:15.000Z",
    "updated_at": "2025-11-05T10:30:15.000Z",
    "source_blocks": 2,
    "source_links": 2
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Persona with ID \"invalid-id\" not found",
    "timestamp": "2025-11-05T10:31:00.000Z"
  }
}
```

**cURL Example:**
```bash
curl "http://localhost:8888/.netlify/functions/get-persona?id=abc123def456"
```

---

### List Personas

**Endpoint:** `GET /.netlify/functions/list-personas?limit=20&offset=0`

**Query Parameters:**
- `limit`: Number of results (1-100, default 20)
- `offset`: Offset for pagination (default 0)

**Success Response (200):**
```json
{
  "success": true,
  "personas": [
    {
      "id": "abc123def456",
      "name": "John Doe",
      "created_at": "2025-11-05T10:30:15.000Z"
    },
    {
      "id": "xyz789uvw012",
      "name": "Jane Smith",
      "created_at": "2025-11-05T10:35:22.000Z"
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 20
  }
}
```

**cURL Example:**
```bash
curl "http://localhost:8888/.netlify/functions/list-personas?limit=10&offset=0"
```

---

## 🧩 Module Reference

### `lib/base-handler.ts`
Wraps all functions with common logic:
- Request validation
- Error handling
- CORS headers
- Logging
- Response formatting

**Usage:**
```typescript
import { createHandler } from './lib/base-handler';

async function handler(event, context, handlerContext) {
  // Your logic here
}

export const functionHandler = createHandler('function-name', handler);
```

---

### `lib/env.ts`
Environment variable validation:
```typescript
import { getEnvironmentConfig } from './lib/env';

const config = getEnvironmentConfig();
// config.openaiApiKey
// config.supabaseUrl
// etc.
```

---

### `lib/errors.ts`
Error handling with custom classes:
```typescript
import { ValidationError, OpenAIError, StorageError } from './lib/errors';

throw new ValidationError('Field is required');
throw new OpenAIError('API call failed');
throw new StorageError('Could not save file');
```

---

### `lib/logger.ts`
Structured logging:
```typescript
import { logger } from './lib/logger';

logger.info('Processing started', { userId: '123', count: 5 });
logger.debug('Cache hit', { cacheKey: 'abc123' });
logger.warn('Retry attempt', { attempt: 2 });
logger.error('Request failed', error, { requestId: 'xyz' });
```

---

### `lib/types.ts`
TypeScript interfaces for all API types:
```typescript
import type { Persona, PersonaInputPayload, ChatRequest } from './lib/types';
```

---

### `lib/validation.ts`
Zod schemas and validation:
```typescript
import { PersonaInputSchema, validateSchema } from './lib/validation';

const input = validateSchema(PersonaInputSchema, data);
```

---

### `lib/openai.ts`
OpenAI integration:
```typescript
import { processPersonaWithOpenAI, getCacheStats, clearCache } from './lib/openai';

const { persona, tokensUsed, processingTimeMs } = await processPersonaWithOpenAI(
  textBlocks,
  links
);
```

---

### `lib/supabase.ts`
Supabase storage operations:
```typescript
import { savePersona, getPersona, listPersonas } from './lib/supabase';

const { personaId, metadata } = await savePersona(persona);
const retrievedPersona = await getPersona(personaId);
const { personas, total } = await listPersonas(20, 0);
```

---

## 🔍 Common Tasks

### Process and Save a Persona

```typescript
// 1. Process
const processResponse = await fetch('/.netlify/functions/process-persona', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    textBlocks: ['User input...'],
    links: ['https://...']
  })
});
const { persona } = await processResponse.json();

// 2. Save
const saveResponse = await fetch('/.netlify/functions/save-persona', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ persona })
});
const { persona_id } = await saveResponse.json();

// 3. Use
console.log(`Persona saved with ID: ${persona_id}`);
```

### Retrieve a Saved Persona

```typescript
const response = await fetch(`/.netlify/functions/get-persona?id=${personaId}`);
const { persona, metadata } = await response.json();
```

### List All Personas

```typescript
const response = await fetch('/.netlify/functions/list-personas?limit=50');
const { personas, pagination } = await response.json();
```

---

## ⚠️ Error Codes

| Code | Status | Meaning | Action |
|------|--------|---------|--------|
| VALIDATION_ERROR | 400 | Invalid input | Fix input and retry |
| MISSING_REQUIRED_FIELD | 400 | Missing required field | Add missing field |
| INVALID_URL | 400 | Invalid URL format | Provide valid URL |
| NOT_FOUND | 404 | Resource not found | Check ID and retry |
| OPENAI_ERROR | 500 | OpenAI API failed | Retry later |
| OPENAI_RATE_LIMIT | 429 | Too many requests | Wait before retrying |
| OPENAI_TIMEOUT | 504 | Request timed out | Retry shorter input |
| STORAGE_ERROR | 500 | Storage operation failed | Check Supabase |
| INTERNAL_ERROR | 500 | Server error | Check logs |

---

## 🧪 Testing Checklist

- [ ] Process with valid input → 200 success
- [ ] Process with invalid JSON → 400 error
- [ ] Process with empty text blocks → 400 error
- [ ] Process with invalid URL → 400 error
- [ ] Save valid persona → 201 created
- [ ] Save invalid persona → 400 error
- [ ] Get existing persona → 200 success
- [ ] Get non-existent ID → 404 error
- [ ] List personas → 200 with pagination
- [ ] List with invalid limit → 400 error

---

## 📊 Response Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Get/List succeeded |
| 201 | Created | Persona saved |
| 400 | Bad Request | Invalid input |
| 404 | Not Found | Persona doesn't exist |
| 429 | Rate Limited | Too many OpenAI requests |
| 500 | Server Error | OpenAI/Storage failed |
| 504 | Timeout | Request took too long |

---

## 🔧 Debugging

### Enable Debug Logging
```bash
LOG_LEVEL=debug netlify dev
```

### Check Request ID
All responses include `X-Request-ID` header for tracking.

### Tail Logs
```bash
netlify logs:tail
```

### Monitor Cache
```typescript
import { getCacheStats } from './lib/openai';
console.log(getCacheStats()); // { size: 5, keys: [...] }
```

---

## 📈 Performance Tips

1. **Use Caching:** Same input returns cached result in <100ms
2. **Batch Requests:** Group similar requests to improve cache hit
3. **Optimize Input:** Shorter text blocks process faster
4. **Monitor Tokens:** Track OpenAI token usage for costs
5. **Pagination:** Use smaller limits (20-50) for list operations

---

## 🚨 Troubleshooting

### "Missing environment variable"
Check `.env.local` has all required variables.

### "Invalid JSON in request body"
Ensure request body is valid JSON with proper `Content-Type` header.

### "OpenAI rate limited"
- Wait 60 seconds
- Check OpenAI account rate limits
- Consider caching repeated requests

### "Persona not found"
- Verify ID format (should be 21 characters)
- Check persona exists in Supabase
- Verify bucket is accessible

### "Storage error"
- Verify Supabase credentials in environment
- Check bucket exists and is named "personas"
- Verify service role key has storage permissions

---

## 📚 File Locations

| File | Purpose |
|------|---------|
| `netlify.toml` | Configuration |
| `netlify/functions/process-persona.ts` | Process function |
| `netlify/functions/save-persona.ts` | Save function |
| `netlify/functions/get-persona.ts` | Get function |
| `netlify/functions/list-personas.ts` | List function |
| `netlify/functions/lib/base-handler.ts` | Handler wrapper |
| `netlify/functions/lib/env.ts` | Environment config |
| `netlify/functions/lib/errors.ts` | Error handling |
| `netlify/functions/lib/logger.ts` | Logging |
| `netlify/functions/lib/types.ts` | TypeScript types |
| `netlify/functions/lib/validation.ts` | Zod validation |
| `netlify/functions/lib/openai.ts` | OpenAI client |
| `netlify/functions/lib/supabase.ts` | Supabase client |

---

## ✅ Status

✅ All functions implemented
✅ All error handling in place
✅ All validation complete
✅ Ready for testing
✅ Ready for deployment

---

**Need Help?** See `IMPLEMENTATION-SUMMARY.md` for complete details.
