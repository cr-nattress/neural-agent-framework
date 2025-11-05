# EPIC-08: Validation & Error Handling

---

## Metadata

- **Epic ID:** EPIC-08
- **Phase:** 1.2-1.5 (Cross-cutting)
- **Priority:** P0 - Critical
- **Status:** Blocked (depends on EPIC-05, EPIC-06, EPIC-07)
- **Effort Estimate:** 2-3 days
- **Dependencies:** EPIC-05, EPIC-06, EPIC-07 (all backends)

---

## Goal

Implement comprehensive validation and error handling across all Netlify Functions for reliability and security.

---

## Objective

Build robust validation layer with Zod schemas for all inputs and outputs, create standardized error responses, implement security-focused input sanitization, handle all error scenarios gracefully, and ensure users receive clear, actionable error messages.

---

## Business Value

- **Reliability:** Prevents invalid data from corrupting system
- **Security:** Prevents injection attacks and malformed input
- **User Experience:** Clear error messages improve recovery
- **Debugging:** Structured error logging aids troubleshooting
- **Maintainability:** Consistent error handling across system

---

## Current State

- Basic error handling in some functions
- No centralized validation schemas
- Inconsistent error response format
- Limited input sanitization
- Partial error logging

---

## Target State

- Comprehensive Zod validation schemas
- Centralized error handling middleware
- Standardized error response format
- Input sanitization for all user data
- Detailed error logging
- User-friendly error messages
- Security-focused validation

---

## Technical Approach

### Validation Layers

**Input Validation:**
- Validate at function entry point
- Use Zod schemas for type safety
- Check field constraints (length, format)
- Sanitize strings (trim, escape)
- Validate URLs

**Output Validation:**
- Validate before returning to user
- Ensure response matches schema
- Check for sensitive data leaks
- Verify data integrity

**Business Logic Validation:**
- Persona completeness
- Metadata consistency
- File size limits
- Storage quotas

### Error Handling Strategy

**Error Types:**
- `ValidationError` (400) - Invalid input
- `NotFoundError` (404) - Resource not found
- `AuthenticationError` (401) - Missing/invalid auth
- `OpenAIError` (500) - OpenAI API failure
- `StorageError` (500) - Supabase failure
- `RateLimitError` (429) - Too many requests

**Error Response Format:**
```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;           // e.g., 'VALIDATION_ERROR'
    message: string;        // User-friendly message
    details?: unknown[];    // Optional detailed info
    timestamp: string;      // ISO8601
  };
}
```

### Input Sanitization

- Trim whitespace
- Escape special characters
- Validate URL format
- Check text encoding
- Limit input sizes

---

## Acceptance Criteria

- [ ] Zod validation schemas for all inputs
- [ ] Validation schemas for all outputs
- [ ] Custom error classes implemented
- [ ] Error middleware in base handler
- [ ] Input sanitization for all text
- [ ] URL validation for links
- [ ] File size validation
- [ ] Standardized error response format
- [ ] Error logging with context
- [ ] User-friendly error messages
- [ ] No sensitive data in error responses
- [ ] Rate limiting awareness

---

## User Stories

### STORY-08-01: Create Input Validation Schemas

Create Zod schemas for all function inputs.

[View Story Details →](../stories/STORY-08-01-input-validation.md)

**Key Tasks:**
- Create schema for persona input (text blocks + links)
- Create schema for chat request
- Create schema for save persona request
- Create schema for get persona request
- Add field constraints and error messages
- Test schema validation

---

### STORY-08-02: Create Output Validation Schemas

Create Zod schemas for all function outputs.

[View Story Details →](../stories/STORY-08-02-output-validation.md)

**Key Tasks:**
- Create schema for processed persona response
- Create schema for save persona response
- Create schema for get persona response
- Create schema for chat response
- Add response validation to functions
- Test with various outputs

---

### STORY-08-03: Implement Error Classes & Response Format

Create standardized error handling.

[View Story Details →](../stories/STORY-08-03-error-handling.md)

**Key Tasks:**
- Create base Error class
- Create specific error subclasses
- Implement error response formatter
- Add HTTP status code mapping
- Add error logging
- Test error scenarios

---

### STORY-08-04: Implement Input Sanitization

Sanitize and validate user input.

[View Story Details →](../stories/STORY-08-04-input-sanitization.md)

**Key Tasks:**
- Create sanitization utilities
- Sanitize text blocks (trim, escape)
- Validate URLs
- Validate JSON structure
- Check input size limits
- Prevent injection attacks

---

### STORY-08-05: Add Comprehensive Error Logging

Implement structured error logging.

[View Story Details →](../stories/STORY-08-05-error-logging.md)

**Key Tasks:**
- Create error logger utility
- Add context to error logs
- Implement structured logging format
- Add error metrics/tracking
- Ensure no PII in logs
- Test logging in all scenarios

---

### STORY-08-06: Create Error Documentation

Document error codes and handling.

[View Story Details →](../stories/STORY-08-06-error-documentation.md)

**Key Tasks:**
- Document all error codes
- Create error recovery guide
- Document validation rules
- Add examples for each error
- Create troubleshooting guide
- Document sanitization rules

---

## Technical Scope

### Technologies

- **Validation:** Zod
- **Error Handling:** Custom classes
- **Logging:** Structured logging
- **Security:** Input sanitization utilities

### Error Codes

```typescript
enum ErrorCode {
  // Input validation
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_URL = 'INVALID_URL',
  INVALID_JSON = 'INVALID_JSON',
  INPUT_TOO_LARGE = 'INPUT_TOO_LARGE',

  // Resource errors
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',

  // API errors
  OPENAI_ERROR = 'OPENAI_ERROR',
  OPENAI_RATE_LIMIT = 'OPENAI_RATE_LIMIT',
  OPENAI_TIMEOUT = 'OPENAI_TIMEOUT',

  // Storage errors
  STORAGE_ERROR = 'STORAGE_ERROR',
  STORAGE_FULL = 'STORAGE_FULL',

  // Server errors
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}
```

### Validation Constraints

**Text Blocks:**
- Max length: 10,000 characters per block
- Max blocks: 50
- Minimum content: non-empty
- Allowed characters: UTF-8

**Links:**
- Max length: 2,048 characters
- Max links: 50
- Must be valid URLs
- Supported protocols: http, https

**Persona ID:**
- Format: UUID or nanoid
- Length: 36 characters (UUID) or 21 (nanoid)

---

## Success Criteria

### Functional Requirements

- [ ] All inputs validated before processing
- [ ] Invalid data rejected with clear messages
- [ ] All error types handled
- [ ] Error responses standardized
- [ ] Sensitive data never leaked
- [ ] File size limits enforced

### Security Requirements

- [ ] Input sanitization prevents injection
- [ ] URL validation prevents SSRF
- [ ] No PII in error messages
- [ ] No credentials in logs
- [ ] Rate limiting enforced

### Quality Requirements

- [ ] Validation coverage: 100%
- [ ] All error cases documented
- [ ] Clear error messages
- [ ] No unhandled errors
- [ ] Validation overhead minimal

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Over-strict validation blocking valid data | Medium | Test with real data, iterate based on feedback |
| Performance impact from validation | Low | Use efficient validation, cache schemas |
| Missing error cases | Medium | Comprehensive test coverage, monitoring |
| PII leakage in errors | High | Review all error messages, sanitize data |

---

## Success Metrics

- [ ] 100% of invalid inputs rejected cleanly
- [ ] 100% of error cases handled
- [ ] Zero unhandled errors in production
- [ ] User error recovery rate >90%
- [ ] Clear error messages for all cases

---

## Testing Checklist

### Unit Tests
- [ ] All Zod schemas (valid/invalid data)
- [ ] Sanitization utilities
- [ ] Error class instantiation
- [ ] Error response formatting

### Integration Tests
- [ ] Invalid input handling in all functions
- [ ] Error response format validation
- [ ] Sanitization in full request flow
- [ ] Error logging in all scenarios

### Security Tests
- [ ] SQL injection attempts
- [ ] XSS attempts
- [ ] SSRF attempts (URLs)
- [ ] Large input attacks

### Edge Cases
- [ ] Empty strings
- [ ] Null values
- [ ] Very long inputs
- [ ] Special characters
- [ ] Unicode handling
- [ ] Malformed JSON

---

## Validation Rules Reference

### Persona Input Validation

```typescript
const PersonaInputSchema = z.object({
  textBlocks: z.array(
    z.string()
      .min(1, 'Text block cannot be empty')
      .max(10000, 'Text block exceeds max length')
  ).min(1, 'At least one text block required').max(50),

  links: z.array(
    z.string()
      .url('Invalid URL format')
      .max(2048, 'URL exceeds max length')
  ).max(50, 'Too many links'),
});
```

### Persona Output Validation

```typescript
const PersonaSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(255),
  age: z.number().int().min(0).max(150).optional(),
  occupation: z.string().max(255).optional(),
  background: z.string().max(10000),
  traits: z.array(z.string()).max(50),
  interests: z.array(z.string()).max(50),
  // ... other fields
});
```

---

## Error Recovery Strategies

**For Users:**
1. Clear error message with code
2. Suggestion for fixing (if applicable)
3. Link to help documentation
4. Retry button (if transient)

**For Developers:**
1. Detailed logs with context
2. Stack traces (dev only)
3. Request/response snapshots
4. Performance metrics

---

## Next Steps

1. Create input validation schemas
2. Create output validation schemas
3. Implement error classes
4. Add input sanitization
5. Implement error logging
6. Create error documentation
7. Test all validation and error paths

---

**Estimated Story Points:** 8

**Created:** 2025-11-05
**Last Updated:** 2025-11-05
**Owner:** Backend Team
