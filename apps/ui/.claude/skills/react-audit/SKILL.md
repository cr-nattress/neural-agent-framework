---
name: react-audit
description: Conduct comprehensive Next.js + TypeScript codebase audits against best practices. Generates detailed REACT_RECOMMENDATIONS.md with findings across 8 analysis categories (architecture, TypeScript, state management, data fetching, performance, API routes, structure, security) with severity levels and actionable fixes. Use when user asks to "audit React codebase", "Next.js best practices", "TypeScript recommendations", "code quality audit", or "improve code quality".
---

# React/Next.js Codebase Audit

Conduct comprehensive audits of Next.js + TypeScript codebases against industry best practices and generate detailed recommendations for improvement.

## Core Purpose

Analyze codebases to:
- **Identify issues** - Find violations of best practices with severity levels
- **Prioritize fixes** - Highlight critical issues requiring immediate attention
- **Guide improvements** - Provide specific, actionable recommendations
- **Document patterns** - Create reusable best practice checklist

## Core Workflow

### Phase 1: Guideline Review

**Read best practices documentation:**
1. Establish baseline for what "best practices" means
2. Understand project-specific guidelines
3. Note platform-specific considerations (Next.js vs React, TypeScript version)
4. Identify what matters most for this codebase

### Phase 2: Systematic Codebase Analysis

**Analyze Component Architecture:**
- All React components in `app/`, `components/`, subdirectories
- Server vs Client component usage ('use client' directives)
- Component patterns (functional, props typing, composition)
- File naming conventions (PascalCase for components)
- Component size and responsibility

**Analyze TypeScript Quality:**
- Type definitions in `types/` or inline
- Use of `any` type (should be avoided)
- Return type annotations on functions
- Interface vs Type usage consistency
- Generic type usage
- Type safety of props and state

**Analyze State Management:**
- Local state with useState/useReducer
- Context API usage (typing, error handling)
- Custom hooks implementation and naming
- Unnecessary re-renders
- State co-location

**Analyze Data Fetching:**
- Server Component fetching patterns
- Client-side data fetching (SWR, React Query, fetch)
- API route implementations
- Error handling in async operations
- Loading states and suspense usage

**Analyze Performance:**
- Image optimization (Next.js Image component)
- Dynamic imports and code splitting
- Memoization (useMemo, useCallback, React.memo)
- Bundle size considerations
- Network waterfall patterns

**Analyze API Routes:**
- HTTP method handlers (GET, POST, PUT, DELETE)
- Input validation and sanitization
- Error handling and proper status codes
- Type safety in route handlers
- Rate limiting and security headers

**Analyze Project Structure:**
- Directory organization (feature-based vs type-based)
- File colocation
- Path alias usage (@/* imports)
- Separation of concerns
- Consistency with established patterns

**Analyze Security:**
- Environment variable usage and exposure
- Input validation and sanitization
- CSRF protection
- XSS prevention
- SQL injection prevention
- Proper error messages (no sensitive data)
- Authentication and authorization

### Phase 3: Finding Documentation

**For each category, document:**

**✅ Strengths** - What the codebase does well

**⚠️ Issues Found:**
- Issue Title - [Severity: Critical/High/Medium/Low]
- Location: `path/to/file.tsx:123`
- Description: What's wrong and why it matters
- Current Code: Example of problematic code
- Recommended Fix: Example of corrected code
- Impact: Performance/Type Safety/Maintainability/Security

### Phase 4: Audit Report Generation

**Create REACT_RECOMMENDATIONS.md with:**

```markdown
# React/Next.js Codebase Audit - Recommendations

**Audit Date:** [Current Date]
**Next.js Version:** [Detected]
**TypeScript Version:** [Detected]

## Executive Summary

[Overview of overall code quality]

**Overall Score:** X/10

**Key Metrics:**
- Total Components Analyzed: N
- Critical Issues: N
- High Priority Issues: N
- Medium Priority Issues: N
- Low Priority Issues: N

---

## 1. Component Architecture

### ✅ Strengths
[List what's done well]

### ⚠️ Issues Found

#### [Issue Title] - [Severity]
**Location:** `path/to/file.tsx:123`
**Description:** [What's wrong and why]
**Current Code:**
\`\`\`typescript
[Problematic code]
\`\`\`
**Recommended Fix:**
\`\`\`typescript
[Fixed code]
\`\`\`
**Impact:** [Performance/Type/Maintainability/etc.]

---

## 2. TypeScript Quality

[Same structure as above]

---

## 3. State Management

[Same structure as above]

---

## 4. Data Fetching & API Routes

[Same structure as above]

---

## 5. Performance Optimization

[Same structure as above]

---

## 6. Project Structure & Organization

[Same structure as above]

---

## 7. Security Considerations

[Same structure as above]

---

## 8. Testing Coverage

[Assessment of test coverage and quality]

---

## Priority Action Items

### 🚨 Critical (Fix Immediately)
1. [Issue with link to section]
2. [Issue with link to section]

### ⚠️ High Priority (Fix This Week)
1. [Issue with link to section]

### 📋 Medium Priority (Fix This Sprint)
1. [Issue with link to section]

### 💡 Low Priority (Future Improvement)
1. [Issue with link to section]

---

## Quick Wins

[Easy improvements with immediate value]

1. **[Quick Win Title]** - [Estimated time: Xm]
   - Description and benefit
   - Implementation hint

---

## Long-term Improvements

[Strategic recommendations for major refactoring]

---

## Best Practice Checklist

Use this for future development:

- [ ] All components have proper TypeScript interfaces for props
- [ ] Server/Client components are correctly designated
- [ ] No use of `any` without justification
- [ ] Async operations have proper error handling
- [ ] Images use Next.js Image component
- [ ] API routes validate input data
- [ ] Environment variables are properly typed
- [ ] Custom hooks follow naming conventions (use*)
- [ ] Components are under 250 lines when possible
- [ ] Reusable logic is extracted into hooks/utilities
- [ ] Tests exist for critical paths
- [ ] Accessibility in interactive elements

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Best Practices](https://react.dev)

---

**Next Review:** Schedule follow-up audit in 2-4 weeks after implementing critical fixes.
```

## Severity Levels

**Critical** (Fix immediately):
- Security vulnerabilities
- Breaking functionality
- Preventing deployment
- Major performance issues
- Type safety breaking down

**High** (Fix this week):
- Best practice violations
- Likely bugs
- Performance problems
- Type inconsistencies
- Code maintainability issues

**Medium** (Fix this sprint):
- Code smell
- Non-idiomatic patterns
- Minor performance optimization
- Consistency issues
- Documentation gaps

**Low** (Future improvement):
- Nice-to-have improvements
- Refactoring opportunities
- Code style preferences
- Minor optimizations

## Analysis Categories

### 1. Component Architecture
- Functional vs class components
- Proper use of server/client directives
- Component composition and props
- File naming and organization
- Component responsibilities
- Unnecessary re-renders

### 2. TypeScript Quality
- Any type usage (forbidden/minimized)
- Return type annotations
- Interface vs Type consistency
- Generic types usage
- Union and discriminated unions
- Type narrowing

### 3. State Management
- useState patterns
- useReducer for complex state
- Context API usage and typing
- Custom hooks
- State co-location
- Redux/other state management if used

### 4. Data Fetching & API Routes
- Server Component data fetching
- Client-side fetch patterns (SWR, React Query)
- Error handling
- Loading states
- Request deduplication
- API route validation and typing

### 5. Performance Optimization
- Next.js Image component usage
- Dynamic imports
- useMemo/useCallback usage
- React.memo usage
- Bundle size
- Network waterfall patterns

### 6. Project Structure
- Feature-based vs type-based organization
- File colocation
- Path aliases (@/* imports)
- Separation of concerns
- Convention consistency

### 7. Security Considerations
- Environment variable exposure
- Input validation and sanitization
- XSS prevention
- CSRF protection
- SQL injection prevention
- Error message handling
- Authentication/authorization

### 8. Testing Coverage
- Unit test coverage
- Integration test coverage
- Critical path testing
- Test organization
- Mock patterns

## Key Features

**Comprehensive Analysis:**
- Analyzes all relevant code categories
- Specific file paths and line numbers
- Concrete code examples (before/after)
- Explains why each issue matters

**Actionable Recommendations:**
- Specific implementation steps
- Code examples showing fixes
- Priority levels guiding effort allocation
- Quick wins for immediate impact

**Best Practices Alignment:**
- Checks against Next.js best practices
- Validates TypeScript patterns
- Ensures React idioms
- Considers performance implications

**Prioritized Output:**
- Critical issues highlighted first
- Medium/low issues organized by category
- Quick wins separated out
- Long-term improvements noted

## Progress Reporting

Provide updates during analysis:

```
📊 React/Next.js Audit

Phase 1: Guideline Review... ✓

Phase 2: Codebase Analysis... ⏳
├─ Component Architecture... ✓
├─ TypeScript Quality... ✓ (18 files analyzed)
├─ State Management... ⏳
├─ Data Fetching... Pending
├─ Performance... Pending
├─ API Routes... Pending
├─ Project Structure... Pending
└─ Security... Pending

Phase 3: Finding Documentation... (4/8 sections)

Phase 4: Report Generation... Pending
```

Final summary:
```
✅ Audit Complete

Analysis Summary:
- 45 components analyzed
- 7 files with critical issues (2)
- 12 files with high-priority issues (5)
- 28 files with medium-priority findings
- 8 files with low-priority suggestions

Generated: REACT_RECOMMENDATIONS.md
Estimated fix time: 8-12 hours
Recommended start: Critical security issues
```

## Quality Checklist

Before finalizing report:

- [ ] All critical issues identified and documented
- [ ] Every issue has file path and line number
- [ ] Code examples show before and after
- [ ] Recommendations are specific and actionable
- [ ] Severity levels properly assigned
- [ ] Priority action items separated and ranked
- [ ] Quick wins identified with time estimates
- [ ] Best practice checklist is complete
- [ ] Report is professionally formatted
- [ ] Executive summary provides clear overview
- [ ] Metrics accurately calculated
- [ ] All links and references valid

## Quick Reference

**8 Analysis Categories:**
1. Component Architecture
2. TypeScript Quality
3. State Management
4. Data Fetching & API Routes
5. Performance Optimization
6. Project Structure & Organization
7. Security Considerations
8. Testing Coverage

**Severity Levels:** Critical > High > Medium > Low

**Output Sections:**
- Executive Summary with score
- 8 detailed analysis sections
- Priority action items (grouped by severity)
- Quick wins (with time estimates)
- Long-term improvements
- Best practice checklist
- Resources and next steps

**Must Include:**
- Specific file paths and line numbers
- Before/after code examples
- Why each issue matters
- Exact recommended fixes
- Severity and priority levels
- Actionable next steps

---

This skill generates comprehensive, prioritized audit reports that guide developers to systematically improve Next.js + TypeScript codebases according to industry best practices.
