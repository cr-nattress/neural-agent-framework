# EPIC-07: Supabase Storage Integration

---

## Metadata

- **Epic ID:** EPIC-07
- **Phase:** 1.5 (Storage Integration)
- **Priority:** P0 - Critical
- **Status:** Blocked (depends on EPIC-05 & EPIC-06)
- **Effort Estimate:** 3-4 days
- **Dependencies:** EPIC-05 (Netlify foundation), EPIC-06 (OpenAI integration)

---

## Goal

Persist persona data reliably to Supabase Blob Storage with metadata tracking and enable fast retrieval.

---

## Objective

Build storage layer that saves processed personas to Supabase blob storage with unique IDs and metadata, implements retrieval by ID, handles storage errors gracefully, and provides fast query performance (<500ms) with 100% reliability.

---

## Business Value

- **Data Persistence:** Users can save and retrieve personas across sessions
- **Scalability:** Blob storage handles unlimited growth
- **Metadata Tracking:** Timestamps and user associations enable future features
- **Cost Efficiency:** Supabase free tier supports large persona databases
- **Reliability:** Multiple backups and data integrity checks

---

## Current State

- Supabase project exists
- No persona storage implemented
- No blob storage bucket configured
- No save/retrieve functions
- No metadata tracking

---

## Target State

- Supabase blob storage bucket configured
- Save function stores personas with unique IDs
- Retrieve function fetches personas by ID
- Metadata includes creation timestamp and source info
- Error handling for storage failures
- Fast query performance (<500ms)

---

## Technical Approach

### Storage Architecture

**Blob Storage Structure:**
```
personas/
  ├── {persona_id}.json        # Persona data
  └── {persona_id}.meta.json   # Metadata (optional)
```

**File Naming:**
- Persona ID: UUID or nanoid format
- File extension: `.json`
- Max file size: 5MB

### Metadata Schema

```json
{
  "persona_id": "uuid",
  "created_at": "ISO8601",
  "updated_at": "ISO8601",
  "source_blocks": 3,
  "source_links": 2,
  "user_id": "uuid (future)",
  "file_size": 1024,
  "checksum": "sha256"
}
```

### Supabase Configuration

**Bucket Setup:**
- Name: `personas`
- Public: `false` (private access)
- File size limit: 5MB
- Allowed MIME types: `application/json`

**RLS Policies (future):**
- Users can only access their own personas
- Service role can manage all personas

---

## Acceptance Criteria

- [ ] Supabase bucket created and configured
- [ ] Save function stores personas with unique IDs
- [ ] Metadata includes creation timestamp
- [ ] Retrieve function fetches by ID
- [ ] List function returns all personas
- [ ] Listing supports pagination
- [ ] Duplicate save attempts handled
- [ ] Storage errors caught and logged
- [ ] Query performance <500ms
- [ ] Data integrity verified after save/retrieve
- [ ] Proper error messages for not found
- [ ] Concurrent requests handled correctly

---

## User Stories

### STORY-07-01: Design Persona Storage Schema

Design the storage structure and metadata schema.

[View Story Details →](../stories/STORY-07-01-storage-schema.md)

**Key Tasks:**
- Create persona storage schema documentation
- Design metadata schema
- Design query patterns
- Document file naming conventions
- Create migration documentation

---

### STORY-07-02: Create Supabase Client Functions

Implement Supabase client for blob operations.

[View Story Details →](../stories/STORY-07-02-supabase-client.md)

**Key Tasks:**
- Install Supabase SDK
- Create Supabase client configuration
- Implement bucket operations wrapper
- Add error handling for storage operations
- Add TypeScript types

---

### STORY-07-03: Implement Save Persona Function

Create Netlify function for saving personas.

[View Story Details →](../stories/STORY-07-03-save-persona-function.md)

**Key Tasks:**
- Create `/netlify/functions/save-persona.ts`
- Implement ID generation (nanoid)
- Store persona JSON to blob storage
- Store metadata
- Handle storage errors
- Return success response with ID

---

### STORY-07-04: Implement Get Persona Function

Create Netlify function for retrieving personas.

[View Story Details →](../stories/STORY-07-04-get-persona-function.md)

**Key Tasks:**
- Create `/netlify/functions/get-persona.ts`
- Implement ID-based retrieval
- Load persona and metadata
- Handle not found errors
- Return persona with metadata

---

### STORY-07-05: Implement List Personas Function

Create Netlify function for listing personas.

[View Story Details →](../stories/STORY-07-05-list-personas-function.md)

**Key Tasks:**
- Create `/netlify/functions/list-personas.ts`
- Implement pagination support
- Return persona list with metadata
- Handle sorting/filtering
- Optimize for performance

---

### STORY-07-06: Add Metadata Tracking & Query

Implement metadata storage and fast queries.

[View Story Details →](../stories/STORY-07-06-metadata-tracking.md)

**Key Tasks:**
- Create metadata schema
- Store metadata with personas
- Implement metadata queries
- Add filtering by date/source
- Optimize query performance

---

## Technical Scope

### Technologies

- **Storage:** Supabase Blob Storage
- **Client:** Supabase SDK (@supabase/supabase-js)
- **ID Generation:** nanoid
- **Validation:** Zod

### File Structure

```
netlify/functions/
├── save-persona.ts      # Save persona and metadata
├── get-persona.ts       # Retrieve persona by ID
├── list-personas.ts     # List personas with pagination
└── lib/
    ├── supabase.ts      # Supabase client config
    └── storage.ts       # Storage operations
```

### Supabase Configuration

```bash
# Environment variables
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJhb...
SUPABASE_SERVICE_ROLE_KEY=eyJhb...
```

### Response Types

```typescript
interface SavePersonaResponse {
  success: boolean;
  persona_id?: string;
  storage_path?: string;
  error?: string;
  metadata?: {
    created_at: string;
    file_size: number;
  };
}

interface GetPersonaResponse {
  success: boolean;
  persona?: Persona;
  metadata?: {
    created_at: string;
    updated_at: string;
    source_blocks: number;
    source_links: number;
  };
  error?: string;
}
```

---

## Success Criteria

### Functional Requirements

- [ ] Personas save to Supabase successfully
- [ ] Unique ID generated for each persona
- [ ] Metadata stored with persona
- [ ] Retrieval by ID returns correct persona
- [ ] List function returns all personas
- [ ] Pagination works for large lists
- [ ] Error handling for all storage operations

### Technical Requirements

- [ ] Supabase client configured correctly
- [ ] TypeScript types correct
- [ ] No credentials exposed to frontend
- [ ] Proper error messages for failures
- [ ] Concurrent requests handled

### Performance Requirements

- [ ] Save: <3 seconds
- [ ] Get: <2 seconds
- [ ] List: <1 second (with pagination)
- [ ] Query success rate: 100%

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Data loss/corruption | High | Implement validation, test recovery |
| Unauthorized access | High | RLS policies, verify ownership (future) |
| Storage quota exceeded | Medium | Monitor usage, implement cleanup |
| API rate limiting | Medium | Implement caching, batching |
| Large file handling | Low | Set file size limits, validation |

---

## Success Metrics

- [ ] 100% save success rate
- [ ] 100% retrieval success rate
- [ ] Data integrity verified
- [ ] Query times <500ms
- [ ] Zero data loss incidents
- [ ] Proper error handling for all cases

---

## Testing Checklist

### Unit Tests
- [ ] ID generation (uniqueness)
- [ ] Metadata schema validation
- [ ] Error handling for storage failures

### Integration Tests
- [ ] Save persona to Supabase
- [ ] Retrieve persona by ID
- [ ] List personas with pagination
- [ ] Metadata stored and retrieved correctly
- [ ] Error cases handled properly

### Load Tests
- [ ] Concurrent save operations
- [ ] Large persona files (near 5MB limit)
- [ ] Pagination with many personas

### Edge Cases
- [ ] Save with missing metadata
- [ ] Retrieve non-existent ID
- [ ] List with no personas
- [ ] Very large text content

---

## Supabase Bucket Setup

### Via Supabase Dashboard

1. Create new bucket: "personas"
2. Set to Private
3. Configure bucket policies
4. Set file size limit: 5MB
5. Create example structure

### Via SQL (if needed)

```sql
CREATE BUCKET personas
  WITH (public = false);

-- Set file size limit
UPDATE buckets
SET file_size_limit = 5242880
WHERE name = 'personas';
```

---

## Storage Path Examples

```
personas/
├── 550e8400-e29b-41d4-a716-446655440000.json
├── 6ba7b810-9dad-11d1-80b4-00c04fd430c8.json
└── nanoid-example-123abc.json
```

---

## Migration Path

### Phase 1 (Current)
- Basic save/retrieve functionality
- No user association (all public)
- Manual persona management

### Phase 2 (Future)
- Add user authentication
- Implement RLS policies
- Add delete functionality
- Add edit functionality

---

## Next Steps

1. Design storage schema
2. Create Supabase client
3. Implement save persona function
4. Implement get persona function
5. Add metadata tracking
6. Implement list function
7. Test end-to-end storage

---

**Estimated Story Points:** 13

**Created:** 2025-11-05
**Last Updated:** 2025-11-05
**Owner:** Backend Team
