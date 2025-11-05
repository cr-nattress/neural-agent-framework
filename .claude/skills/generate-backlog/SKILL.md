---
name: generate-backlog
description: Convert implementation plans into executable Agile backlogs. Reads IMPLEMENTATION-PLAN.md and generates organized /backlog folder with Epics, Stories, and detailed Task prompts ready for AI agents or developers. Use when user asks to "convert plan to backlog", "generate backlog structure", "create Epic/Story/Task hierarchy", "turn plan into executable tasks", or "generate AI-agent-compatible task prompts".
---

# Backlog Generator

Convert comprehensive implementation plans or requirements into structured Agile backlogs with executable task prompts for AI coding agents and human developers.

## Core Workflow

### Phase 1: Document Analysis & Discovery

**Locate implementation or requirements document:**
1. Search for IMPLEMENTATION-PLAN.md, PLAN.md, or requirements documents
2. If not found, request user provide or point to plan document
3. Read and fully understand the document

**Extract key information:**
- Main objective and scope
- Major phases or work areas
- Technical dependencies and constraints
- Success criteria and business value
- Technology stack and tools

**Output discovery status:**
```
Found: IMPLEMENTATION-PLAN.md
Structure:
- 6 Phases identified
- 24 Milestones to decompose
- 120+ Tasks to organize

Ready to decompose into epics and stories...
```

### Phase 2: Epic Decomposition

**Convert plan phases to epics:**

Mapping rules:
```
Implementation Phase → Epic (1:1 mapping)
Each Epic should:
- Deliver standalone business value
- Be independently prioritizable
- Include 3-9 user stories
- Have clear acceptance criteria
```

**Generate for each epic:**
- **Epic ID**: EPIC-XX (zero-padded)
- **Title**: Clear, action-oriented name
- **Business Value**: Why this epic matters
- **Current State vs Target State**: Clear before/after
- **Technical Approach**: High-level how
- **User Stories**: List all stories (3-9 per epic)
- **Acceptance Criteria**: Measurable outcomes
- **Risks & Mitigations**: Potential blockers
- **Success Metrics**: How to measure completion
- **Story Points Total**: Sum of all story points

### Phase 3: User Story Creation

**Convert milestones/capabilities to user stories:**

Mapping rules:
```
Milestone or Feature → User Story (1:1)
Each Story should:
- Follow "As a [who], I want [what], so that [why]" format
- Be completable in 2-4 hours
- Have 3-6 tasks
- Include specific acceptance criteria
```

**Generate for each story:**
- **Story ID**: US-XX
- **Epic Reference**: Link back to parent epic
- **User Story Statement**: "As a... I want... so that..."
- **Acceptance Criteria**: 4-8 specific, testable criteria
- **Story Points**: Fibonacci (1, 2, 3, 5, 8)
- **Priority**: High/Medium/Low
- **Technical Notes**: Implementation hints, patterns
- **Definition of Done**: Checklist for completion
- **Tasks**: List of 3-6 atomic tasks

**Story Point Guidelines:**
- **1 point**: 15-30 minutes, trivial change
- **2 points**: 30-60 minutes, straightforward
- **3 points**: 1-2 hours, moderate complexity
- **5 points**: 2-4 hours, significant complexity
- **8 points**: 4-8 hours, high complexity (break down further if possible)

### Phase 4: Task Prompt Creation

**Convert story tasks to AI-executable prompts:**

Mapping rules:
```
Task → Detailed Task Prompt (1:1)
Each Task should:
- Be atomic and executable in 5-30 minutes
- Include step-by-step instructions
- Have clear verification steps
- Be copy-paste ready for AI agents
```

**Generate for each task:**
- **Task ID**: TASK-XX-XX-XX
- **Story Reference**: Link to parent story
- **Task Description**: What to accomplish
- **Agent Prompt**: Complete, executable instructions
  - Specific files to create/modify
  - Code examples and patterns
  - Step-by-step approach
  - What success looks like
- **Verification Steps**: How to confirm completion
- **Expected Output**: Measurable result
- **Estimated Time**: Realistic duration
- **Dependencies**: Required prior tasks

### Phase 5: Directory Structure & File Generation

**Create folder hierarchy:**
```
backlog/
├── README.md                                  (Overview & how to use)
├── BACKLOG-INDEX.md                           (Complete task listing)
├── epic-01-[name]/
│   ├── EPIC.md                                (Epic details)
│   ├── story-01-[name]/
│   │   ├── STORY.md                           (Story details)
│   │   ├── task-01-[name].md
│   │   ├── task-02-[name].md
│   │   └── task-03-[name].md
│   └── story-02-[name]/
│       └── [tasks...]
├── epic-02-[name]/
│   └── [stories & tasks...]
```

**Naming conventions:**
- Folders: `epic-[NN]-[kebab-case]`, `story-[NN]-[kebab-case]`
- Files: `EPIC.md`, `STORY.md`, `task-[NN]-[kebab-case-name].md`
- IDs: EPIC-01, STORY-01-01, TASK-01-01-01

### Phase 6: Final Output & Documentation

**Generate:**
1. **Epic folder structure** with all EPIC.md files
2. **Story folders** with all STORY.md files
3. **Task files** with detailed agent prompts
4. **README.md** with backlog overview and quick start
5. **BACKLOG-INDEX.md** with complete task listing and execution order

**Report completion:**
```
Backlog Generation Complete

Generated:
- 5 Epics
- 18 Stories
- 89 Task prompts
- Total: 113 executable items

Recommended execution order:
1. Start with Epic-01 (Foundation)
2. Parallel: Epic-02 & Epic-03
3. Epic-04 (Integration) depends on above
```

## Priority & Effort Guidelines

**Priority Levels:**
- **🔴 Critical (High)**: Blocks other work, urgent business need, quick wins
- **🟡 Medium**: Important but not blocking, moderate impact
- **🟢 Low**: Nice to have, future iterations, polish

**Effort Estimation:**
- Always include 70% overhead (testing 25%, review 15%, buffer 30%)
- Adjust for team experience and tech familiarity
- Be realistic, not optimistic

## Key Features

**AI Agent Compatibility:**
- Each task prompt is immediately executable by Claude Code, Cursor, Devin
- Includes search instructions to find existing patterns first
- Specifies exact files to read, modify, or create
- Provides code patterns and examples
- Lists parallelization opportunities

**Traceability:**
- Every task links to its story
- Every story links to its epic
- Every epic links to implementation plan phase
- Full chain from business objective to implementation detail

**Quality Gates:**
- Definition of Done checklist for each story
- Testing requirements for each task
- Acceptance criteria are specific and testable
- Code quality expectations explicit

## Progress Reporting

Provide regular updates during generation:

```
📋 Backlog Generator

Phase 1: Discovery... ✓
Phase 2: Epic Decomposition... (3/5 epics)
Phase 3: Story Creation... (8/18 stories)
Phase 4: Task Prompts... (25/89 tasks)
Phase 5: File Generation... ⏳
Phase 6: Documentation... Pending
```

Final summary:
```
✅ Backlog Generation Complete

Generated Structure:
- 5 Epics with complete details
- 18 User Stories with acceptance criteria
- 89 Task prompts with agent instructions
- Total files: 115

Ready for execution. Start with:
backlog/epic-01-foundation/story-01-setup/task-01-init.md
```

## Templates

### Epic Template

```markdown
# EPIC-XX: [Title]

**Business Value:** [Why this epic matters to the business]

**Current State:** [Current situation]

**Target State:** [Desired outcome]

**Technical Approach:** [High-level implementation strategy]

**Acceptance Criteria:**
- [ ] [Specific, measurable criterion]
- [ ] [Specific, measurable criterion]

**User Stories:** [List all stories in this epic]
- US-XX-01: [Story title]
- US-XX-02: [Story title]

**Risks & Mitigations:**
- **Risk**: [What could go wrong]
  **Mitigation**: [How to prevent or handle]

**Success Metrics:**
- [Measurable outcome]
- [Measurable outcome]

**Estimated Story Points:** [Sum of all stories]
```

### Story Template

```markdown
# US-XX-XX: [Story Title]

**Epic:** EPIC-XX

**User Story:** As a [who], I want [what], so that [why]

**Story Points:** [1, 2, 3, 5, or 8]

**Priority:** [High/Medium/Low]

**Acceptance Criteria:**
- [ ] [Specific, testable criterion]
- [ ] [Specific, testable criterion]

**Definition of Done:**
- [ ] Code complete
- [ ] Tests written and passing
- [ ] Code reviewed
- [ ] Documented

**Technical Notes:** [Implementation hints, patterns, gotchas]

**Tasks:** [List all tasks for this story]
- TASK-XX-XX-01: [Task title]
- TASK-XX-XX-02: [Task title]
```

### Task Template

```markdown
# TASK-XX-XX-XX: [Task Title]

**Story:** US-XX-XX

**Estimated Time:** [Hours or minutes]

**Description:** [What to accomplish]

## Agent Prompt

You are implementing [EPIC-XX: Epic Title].

**Goal**: [Clear, specific goal]

**Context**: [Why this task matters, what it's part of]

**Instructions**:
1. [Step 1 with specific details]
2. [Step 2 with file paths]
3. [Step 3 with expected outcome]

**Implementation Details:**
- Files to create/modify: [specific paths]
- Code patterns: [specific examples]
- References: [related files, docs]

**Verification Steps:**
1. Run: [specific command]
2. Check: [specific behavior]
3. Test: [how to verify completion]

**Expected Outcome:** [Specific, measurable result]

**Commit Message:** `type(scope): description`
```

## Quality Checklist

Before completing, verify:

- [ ] All epic files have clear business value
- [ ] Each user story follows "As a...I want...so that..." format
- [ ] Story points assigned to all stories (Fibonacci sequence)
- [ ] Each task has detailed, copy-paste-ready agent prompt
- [ ] Verification steps are specific and measurable
- [ ] Directory structure follows naming conventions
- [ ] All file names use kebab-case
- [ ] Overview document includes quick start guide
- [ ] Dependencies clearly noted where applicable
- [ ] Success metrics are measurable
- [ ] Realistic time estimates provided
- [ ] Critical path identified
- [ ] Parallelization opportunities noted

## Quick Reference

**4-Phase Process:**
1. Document Analysis (read, extract, understand)
2. Epic Decomposition (phases → epics)
3. Story Creation (epics → stories with points)
4. Task Prompts (stories → executable tasks)

**Story Point Sizing:** Use Fibonacci (1, 2, 3, 5, 8)

**Overhead Factor:** Always include 70% overhead

**Must Include:**
- Epics (from plan phases)
- Stories with acceptance criteria
- Tasks with agent-executable prompts
- Definition of Done checklists
- Success metrics and quality gates

---

This skill converts comprehensive implementation plans into structured, AI-executable Agile backlogs ready for immediate execution by teams and AI coding agents.
