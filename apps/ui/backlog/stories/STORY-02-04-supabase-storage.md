# STORY-02-04: Supabase Storage

---

## Metadata
- **Story ID:** STORY-02-04
- **Epic:** [EPIC-02: Backend API & Storage](../epics/EPIC-02-backend-api.md)
- **Priority:** P0 - Critical
- **Status:** Blocked (depends on STORY-02-01)
- **Effort Estimate:** 2-3 days

---

## User Story
**As a** user
**I want** my approved personas saved permanently
**So that** I can retrieve and use them later

---

## Acceptance Criteria
- [ ] Supabase project created and configured
- [ ] Storage bucket created (private access)
- [ ] save-persona function stores JSON in Supabase
- [ ] Unique persona ID generated (UUID/nanoid)
- [ ] Metadata stored (created_at, source counts)
- [ ] get-persona function retrieves by ID
- [ ] Error handling (not found, storage errors)
- [ ] Bucket policies configured for security
- [ ] File size limits enforced (5MB max)

---

## Tasks

### Set up Supabase project
### Create personas bucket
### Configure bucket policies
### Implement save-persona function
### Implement get-persona function
### Add ID generation utility
### Test storage and retrieval
### Add metadata tracking

---

## Supabase Configuration

**Bucket:** `personas`
**Access:** Private
**Path:** `personas/{persona_id}.json`

---

**Created:** 2025-11-04
