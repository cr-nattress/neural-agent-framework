# EPIC-02: Backend API & Storage

---

## Metadata
- **Epic ID:** EPIC-02
- **Phase:** 1.2-1.5
- **Priority:** P0 - Critical
- **Status:** Blocked (depends on EPIC-01)
- **Effort Estimate:** 7-10 days
- **Dependencies:** EPIC-01 (for integration testing)

---

## Goal
Implement serverless backend with Netlify Functions for OpenAI processing and Supabase blob storage, enabling real persona creation and persistence.

---

## Objective
Build production-ready backend infrastructure that processes unstructured user input through OpenAI, returns structured persona data, and stores approved personas in Supabase blob storage.

---

## Success Criteria
- [ ] Netlify Functions configured and deployed
- [ ] OpenAI API integrated with optimized prompts
- [ ] Persona processing returns structured JSON (95%+ success rate)
- [ ] Supabase blob storage configured and secured
- [ ] Save endpoint stores personas with unique IDs
- [ ] Get endpoint retrieves personas by ID
- [ ] Real API services implemented matching mock interface
- [ ] Frontend successfully switches to real APIs
- [ ] Error handling and retry logic implemented
- [ ] API response times < 10s for processing, < 3s for save/get

---

## Business Value
- **Core Functionality:** Enables actual persona creation (not just mocks)
- **Data Persistence:** Users can save and retrieve personas
- **AI Processing:** Transforms unstructured data into structured insights
- **Scalability:** Serverless architecture handles variable load
- **Cost Efficiency:** Pay-per-use model, no idle server costs

---

## User Stories

### STORY-02-01: Netlify Functions Setup
**Priority:** P0
**Effort:** 1 day

Set up Netlify Functions infrastructure and configure environment variables.

[View Story Details →](../stories/STORY-02-01-netlify-setup.md)

**Key Tasks:**
- Create netlify/functions directory
- Configure netlify.toml
- Set up environment variables (OpenAI, Supabase)
- Create basic function handler template
- Test local development workflow

---

### STORY-02-02: OpenAI Integration
**Priority:** P0
**Effort:** 2-3 days

Implement OpenAI processing function with prompt engineering for persona extraction.

[View Story Details →](../stories/STORY-02-02-openai-integration.md)

**Key Tasks:**
- Design system prompt for persona extraction
- Define JSON output schema
- Implement /process-persona function
- Add error handling and retry logic
- Optimize for cost vs quality
- Test with various input types

---

### STORY-02-03: Real API Services
**Priority:** P0
**Effort:** 1 day

Create real API service implementations that match mock interface.

[View Story Details →](../stories/STORY-02-03-real-api-services.md)

**Key Tasks:**
- Create services/api/apiPersonaService.ts
- Implement processPersona API call
- Implement savePersona API call
- Implement getPersona API call
- Add error handling and type validation
- Update service factory to use real services

---

### STORY-02-04: Supabase Storage
**Priority:** P0
**Effort:** 2-3 days

Configure Supabase blob storage and implement save/retrieve functions.

[View Story Details →](../stories/STORY-02-04-supabase-storage.md)

**Key Tasks:**
- Set up Supabase project and bucket
- Configure bucket policies (private access)
- Implement /save-persona function
- Implement /get-persona function
- Add unique ID generation
- Add metadata storage
- Test storage and retrieval

---

### STORY-02-05: API Integration Testing
**Priority:** P0
**Effort:** 1-2 days

Test end-to-end flow with real APIs and switch from mock to production.

[View Story Details →](../stories/STORY-02-05-api-testing.md)

**Key Tasks:**
- Switch NEXT_PUBLIC_USE_MOCK_DATA to false
- Test persona processing flow
- Test persona save flow
- Test persona retrieval flow
- Load testing and performance validation
- Error scenario testing
- Production deployment

---

## Technical Scope

### Technologies
- **Serverless:** Netlify Functions (Node.js)
- **AI Processing:** OpenAI API (GPT-4 or GPT-3.5-turbo)
- **Storage:** Supabase Blob Storage
- **Validation:** Zod or Joi (TBD)
- **SDK:** OpenAI SDK, Supabase SDK

### Functions Created
```
netlify/functions/
├── process-persona.ts    # OpenAI processing
├── save-persona.ts       # Save to Supabase
├── get-persona.ts        # Retrieve from Supabase
└── lib/
    ├── openai.ts         # OpenAI client config
    ├── supabase.ts       # Supabase client config
    └── validation.ts     # Input validation
```

### Environment Variables
```bash
# OpenAI
OPENAI_API_KEY=sk-...

# Supabase
SUPABASE_URL=https://....supabase.co
SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_ROLE_KEY=eyJh...

# Configuration
OPENAI_MODEL=gpt-4-turbo
MAX_TOKENS=2000
```

---

## Acceptance Criteria

### Functional Requirements
- [ ] Process persona function receives text blocks + links
- [ ] OpenAI returns structured JSON matching schema
- [ ] Save persona function stores JSON in Supabase
- [ ] Unique persona ID generated (UUID or nanoid)
- [ ] Get persona function retrieves by ID
- [ ] Metadata includes creation timestamp
- [ ] All functions return standardized response format
- [ ] Error responses include user-friendly messages

### Technical Requirements
- [ ] Functions deploy successfully to Netlify
- [ ] Environment variables secured (not exposed to frontend)
- [ ] TypeScript types match frontend interfaces
- [ ] Input validation prevents malformed requests
- [ ] Rate limiting considered (if needed)
- [ ] Logging implemented for debugging
- [ ] API keys rotated and secured

### Performance Requirements
- [ ] Process persona: < 10 seconds (typical input)
- [ ] Save persona: < 3 seconds
- [ ] Get persona: < 2 seconds
- [ ] OpenAI success rate: > 95%
- [ ] Supabase storage success rate: > 99%
- [ ] Handle concurrent requests (10+ simultaneous)

### Security Requirements
- [ ] API keys never exposed to frontend
- [ ] Input sanitized before OpenAI processing
- [ ] Supabase bucket access restricted
- [ ] CORS configured properly
- [ ] No PII logged in error messages
- [ ] File size limits enforced

---

## Testing Checklist

### Unit Tests
- [ ] Process persona function
- [ ] Save persona function
- [ ] Get persona function
- [ ] ID generation utility
- [ ] Input validation

### Integration Tests
- [ ] OpenAI API connection
- [ ] Supabase storage write
- [ ] Supabase storage read
- [ ] End-to-end persona creation flow

### Load Tests
- [ ] 10 concurrent requests
- [ ] Large text input (10,000+ words)
- [ ] Multiple links (20+ URLs)

### Error Tests
- [ ] OpenAI API failure
- [ ] Supabase connection failure
- [ ] Invalid input handling
- [ ] Timeout handling
- [ ] Rate limit handling

---

## OpenAI Prompt Design

### System Prompt (Draft)
```
You are a persona extraction assistant. Analyze the provided text blocks and links to create a structured digital persona.

Extract and structure the following information:
- Name (if available)
- Age and occupation
- Background summary
- Personality traits
- Interests and hobbies
- Skills and expertise
- Core values
- Communication style

Return ONLY valid JSON matching this schema:
{
  "name": "string",
  "age": number | null,
  "occupation": "string" | null,
  "background": "string",
  "traits": ["string"],
  "interests": ["string"],
  "skills": ["string"],
  "values": ["string"],
  "communication_style": "string" | null,
  ...
}

Be thorough but concise. Infer information where appropriate but don't fabricate details not supported by the source material.
```

### User Prompt Template
```
Text Blocks:
{textBlocks.join('\n\n---\n\n')}

Links:
{links.join('\n')}

Please extract and structure a persona from this data.
```

---

## Supabase Configuration

### Bucket Setup
- **Name:** `personas`
- **Public:** `false` (private bucket)
- **File Size Limit:** 5MB
- **Allowed MIME Types:** `application/json`

### Storage Path Pattern
```
personas/
  └── {persona_id}.json
```

### Metadata Schema
```json
{
  "persona_id": "string",
  "created_at": "ISO8601",
  "file_size": "number",
  "source_blocks": "number",
  "source_links": "number"
}
```

---

## Migration Path

### Phase 1: Mock Services (EPIC-01)
- Frontend uses mock data
- Backend development in parallel

### Phase 2: Backend Development (EPIC-02)
- Implement Netlify Functions
- Configure external services
- Test backend independently

### Phase 3: Integration (EPIC-02.5)
- Create real API services
- Switch environment variable
- Test end-to-end with real APIs

### Phase 4: Production (EPIC-02.6)
- Deploy to production
- Monitor performance
- Iterate on prompts/config

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| OpenAI API costs higher than expected | High | Monitor usage, optimize prompts, consider cheaper models |
| OpenAI response quality inconsistent | High | Refine prompts, add validation, retry with corrections |
| Supabase storage limits | Medium | Monitor usage, implement cleanup policies |
| API timeout on large inputs | Medium | Implement chunking, add progress indicators |
| Security vulnerabilities | High | Security audit, penetration testing, input sanitization |

---

## Dependencies

### Blockers
- EPIC-01 completed (for integration testing)
- OpenAI API access (account setup)
- Supabase project created (account setup)
- Netlify account configured

### Blocks
- EPIC-03 (Chat interface needs persona retrieval)

---

## Cost Estimates

### OpenAI API
- **Model:** GPT-4-turbo
- **Avg tokens per request:** 1,500 input + 500 output
- **Cost per persona:** ~$0.03
- **100 personas/month:** ~$3

### Supabase Storage
- **Free tier:** 1GB
- **Avg persona size:** 10KB
- **100,000 personas:** 1GB (within free tier)

### Netlify Functions
- **Free tier:** 125K requests/month
- **Expected usage:** 1,000 requests/month (well within limit)

**Total Monthly Cost (100 users):** < $5

---

## Notes

### Optimization Opportunities
- Cache processed personas (avoid re-processing)
- Batch processing for multiple personas
- Use GPT-3.5-turbo for simpler extractions
- Compress JSON before storage

### Future Enhancements
- Webhook notifications on save completion
- Background processing for large inputs
- Persona versioning
- Bulk export functionality

---

**Created:** 2025-11-04
**Last Updated:** 2025-11-04
**Owner:** Backend Team
