# EPIC-06: OpenAI Persona Processing Pipeline

---

## Metadata

- **Epic ID:** EPIC-06
- **Phase:** 1.3 (OpenAI Integration)
- **Priority:** P0 - Critical
- **Status:** Blocked (depends on EPIC-05)
- **Effort Estimate:** 4-6 days
- **Dependencies:** EPIC-05 (Netlify foundation)

---

## Goal

Implement AI-powered extraction and structuring of persona data from unstructured user input through OpenAI API.

---

## Objective

Build robust persona processing pipeline that accepts raw text blocks and links, processes them through OpenAI with optimized prompts, validates and parses responses, implements caching and retry logic, and returns structured persona JSON with >95% success rate and <10 second processing time.

---

## Business Value

- **AI Processing:** Transforms unstructured user input into structured persona data
- **Accuracy:** >95% successful extraction rate with validated output
- **Performance:** <10 second processing for typical inputs
- **Cost Efficiency:** Caching reduces API costs by 30%+
- **Reliability:** Retry logic handles API rate limiting and temporary failures

---

## Current State

- Netlify Functions foundation exists
- No OpenAI API integration
- No prompt engineering
- No response parsing
- No caching mechanism
- No retry logic

---

## Target State

- OpenAI API client configured
- Persona extraction prompt engineered and optimized
- Response validation with Zod schemas
- Caching layer reduces redundant API calls
- Exponential backoff retry logic implemented
- Comprehensive error handling
- Processing pipeline handles edge cases

---

## Technical Approach

### OpenAI Integration

**API Setup:**
- Create OpenAI client configuration
- Handle API key management
- Implement request/response types
- Add rate limiting awareness

**Prompt Engineering:**
- Design system prompt for persona extraction
- Define output JSON schema
- Test with diverse input types
- Optimize for cost vs quality

**Response Processing:**
- Parse JSON responses
- Validate against schema
- Handle partial/incomplete responses
- Extract confidence scores

### Caching Strategy

**Cache Layer:**
- In-memory cache for recent requests
- Cache key: hash of input (text + links)
- TTL: 24 hours
- Cache hit rate target: 30%+

### Retry Logic

**Exponential Backoff:**
- Initial delay: 1 second
- Max retries: 3
- Backoff multiplier: 2x
- Max delay: 32 seconds

**Retry Conditions:**
- Rate limit errors (429)
- Temporary failures (503)
- Timeout errors
- Not for validation errors (400)

---

## Acceptance Criteria

- [ ] OpenAI API client created and configured
- [ ] Persona extraction prompt engineered
- [ ] Response validation ensures correct JSON structure
- [ ] Cache implemented and reduces API calls
- [ ] Retry logic handles rate limiting
- [ ] Error messages are user-friendly
- [ ] Processing completes within 10 seconds (typical input)
- [ ] Success rate >95%
- [ ] Cache hit rate >30%
- [ ] Handles edge cases (empty input, malformed links)
- [ ] Token usage tracked and logged
- [ ] Fallback behavior for API failures

---

## User Stories

### STORY-06-01: Create OpenAI API Client

Set up OpenAI API client with proper error handling.

[View Story Details →](../stories/STORY-06-01-openai-client.md)

**Key Tasks:**
- Install OpenAI SDK
- Create OpenAI client configuration
- Implement API key validation
- Add TypeScript types for API requests/responses
- Create error handling wrapper

---

### STORY-06-02: Design Persona Extraction Prompt

Engineer optimal prompt for extracting persona information.

[View Story Details →](../stories/STORY-06-02-prompt-engineering.md)

**Key Tasks:**
- Create system prompt for persona extraction
- Define output JSON schema
- Test with sample data
- Optimize prompt clarity
- Document prompt reasoning
- Create prompt versioning

---

### STORY-06-03: Implement Response Parsing & Validation

Parse OpenAI responses and validate structure.

[View Story Details →](../stories/STORY-06-03-response-parsing.md)

**Key Tasks:**
- Create Zod schemas for persona JSON
- Implement response parser
- Add error handling for malformed responses
- Handle partial responses gracefully
- Add response logging
- Test with various response formats

---

### STORY-06-04: Implement Caching Mechanism

Add request/response caching to reduce API calls.

[View Story Details →](../stories/STORY-06-04-caching.md)

**Key Tasks:**
- Implement in-memory cache
- Create cache key generation (hash)
- Add cache TTL configuration
- Implement cache invalidation
- Add cache metrics/monitoring
- Test cache hit rates

---

### STORY-06-05: Implement Retry Logic with Exponential Backoff

Add resilience with retry logic for transient failures.

[View Story Details →](../stories/STORY-06-05-retry-logic.md)

**Key Tasks:**
- Implement exponential backoff algorithm
- Define retry conditions
- Add retry attempt tracking
- Implement circuit breaker (optional)
- Add retry logging
- Test with simulated failures

---

### STORY-06-06: Handle OpenAI Errors Gracefully

Implement comprehensive error handling for OpenAI API.

[View Story Details →](../stories/STORY-06-06-error-handling.md)

**Key Tasks:**
- Create OpenAI-specific error classes
- Handle rate limiting (429)
- Handle temporary failures (503)
- Handle invalid API key
- Handle timeout errors
- Create user-friendly error messages

---

## Technical Scope

### Technologies

- **API Client:** OpenAI SDK
- **Validation:** Zod
- **Caching:** In-memory (built-in JS objects)
- **Retry:** Custom implementation with exponential backoff

### OpenAI Configuration

```typescript
// Model selection
const model = 'gpt-4-turbo'; // or gpt-3.5-turbo for cost

// Token limits
const maxTokens = 2000;
const maxInputTokens = 4000;

// Temperature (0-1, lower = deterministic)
const temperature = 0.7;
```

### Persona Extraction Schema

```typescript
interface ExtractedPersona {
  name: string;
  age?: number;
  occupation?: string;
  background: string;
  traits: string[];
  interests: string[];
  skills: string[];
  values: string[];
  communication_style?: string;
  personality_type?: string;
  goals?: string[];
  challenges?: string[];
  relationships?: string[];
}
```

---

## Success Criteria

### Functional Requirements

- [ ] OpenAI API client connects successfully
- [ ] Persona extraction returns valid JSON
- [ ] Response validation catches malformed output
- [ ] Cache reduces API calls by 30%+
- [ ] Retry logic handles 429 and 503 errors
- [ ] Timeout handling prevents hanging requests
- [ ] Error messages are specific and actionable

### Quality Requirements

- [ ] Processing time < 10 seconds (typical)
- [ ] Success rate >95%
- [ ] Cache hit rate >30%
- [ ] No unhandled API errors
- [ ] Logging tracks all API calls
- [ ] Token usage monitored

### Performance Requirements

- [ ] Average API response: < 5 seconds
- [ ] Cache lookup: < 50ms
- [ ] Response parsing: < 100ms
- [ ] Handle concurrent requests (10+)

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| OpenAI API rate limiting | High | Implement caching, queue long requests, exponential backoff |
| Inconsistent extraction quality | High | Test with diverse inputs, refine prompts iteratively |
| Cost overruns | High | Monitor token usage, implement caching, use cheaper models |
| API timeouts | Medium | Set reasonable timeouts, implement retry, chunking for large inputs |
| Malformed responses | Medium | Validate all responses, fallback handling, error recovery |
| API key exposure | High | Never log keys, use environment variables, rotate regularly |

---

## Success Metrics

- [ ] 95%+ successful persona extractions
- [ ] Average API response time < 5 seconds
- [ ] Cache hit rate > 30%
- [ ] User satisfaction > 80%
- [ ] Zero API key exposures
- [ ] <1% error rate for valid input

---

## Testing Checklist

### Unit Tests
- [ ] OpenAI client initialization
- [ ] Response parsing with valid JSON
- [ ] Zod validation schemas
- [ ] Cache key generation
- [ ] Exponential backoff calculation

### Integration Tests
- [ ] End-to-end persona extraction
- [ ] OpenAI API connection
- [ ] Cache hit/miss scenarios
- [ ] Retry logic with simulated failures
- [ ] Error handling for various error types

### Load Tests
- [ ] Concurrent requests (10+)
- [ ] Large text inputs (10,000+ words)
- [ ] Multiple links (20+ URLs)
- [ ] Cache performance under load

### Edge Cases
- [ ] Empty input handling
- [ ] Malformed JSON responses
- [ ] Timeout handling
- [ ] Rate limit (429) handling
- [ ] API key missing/invalid

---

## Cost Estimates

### OpenAI API Usage

**Per Persona Extraction:**
- Input tokens: ~1,500 (text blocks + links)
- Output tokens: ~500 (structured JSON)
- Cost: ~$0.03 per persona (GPT-4-turbo)

**Monthly (100 personas):**
- API cost: ~$3
- Caching savings: 30% reduction = ~$2.10

---

## Optimization Opportunities

- Use GPT-3.5-turbo for simpler extractions ($0.003 per persona)
- Implement token counting before API calls
- Batch process multiple personas
- Compress large text blocks before sending
- Cache common persona patterns

---

## Next Steps

1. Create OpenAI API client configuration
2. Design and test persona extraction prompt
3. Implement response parsing and validation
4. Add caching layer
5. Implement retry logic
6. Add comprehensive error handling
7. Test end-to-end extraction pipeline

---

**Estimated Story Points:** 21

**Created:** 2025-11-05
**Last Updated:** 2025-11-05
**Owner:** Backend Team
