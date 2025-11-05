# STORY-02-02: OpenAI Integration

---

## Metadata
- **Story ID:** STORY-02-02
- **Epic:** [EPIC-02: Backend API & Storage](../epics/EPIC-02-backend-api.md)
- **Priority:** P0 - Critical
- **Status:** Blocked (depends on STORY-02-01)
- **Effort Estimate:** 2-3 days
- **Dependencies:** STORY-02-01 (Netlify Functions setup)

---

## User Story
**As a** system
**I want** to process unstructured persona data through OpenAI
**So that** users receive structured, clean persona information

---

## Acceptance Criteria
- [ ] process-persona Netlify Function created
- [ ] OpenAI API client configured
- [ ] System prompt engineered for persona extraction
- [ ] JSON output schema defined and validated
- [ ] Function receives textBlocks and links from frontend
- [ ] Function returns structured Persona JSON
- [ ] Error handling for OpenAI failures
- [ ] Retry logic for transient errors
- [ ] Response time < 10 seconds (typical input)
- [ ] Success rate > 95% with valid inputs
- [ ] Cost optimization (model selection, token limits)

---

## Tasks

### Design OpenAI system prompt
### Define JSON output schema
### Create process-persona function
### Implement OpenAI API call
### Add input validation
### Add error handling and retries
### Test with various input types
### Optimize for cost vs quality
### Handle rate limits
### Add logging for debugging

---

## System Prompt (Draft)
```
You are a persona extraction assistant. Analyze the provided text blocks and links to create a structured digital persona.

Extract and structure the following information:
- Name (if available)
- Age and occupation (if mentioned)
- Background summary (2-3 sentences)
- Personality traits (3-5 adjectives)
- Interests and hobbies
- Skills and expertise
- Core values
- Communication style

Return ONLY valid JSON matching this exact schema:
{
  "name": "string or null",
  "age": number or null,
  "occupation": "string or null",
  "background": "string",
  "traits": ["string"],
  "interests": ["string"],
  "skills": ["string"],
  "values": ["string"],
  "communication_style": "string or null",
  "personality_type": "string or null",
  "goals": ["string"],
  "challenges": ["string"]
}

Be thorough but concise. Infer information where appropriate but don't fabricate details not supported by the source material.
```

---

**Created:** 2025-11-04
