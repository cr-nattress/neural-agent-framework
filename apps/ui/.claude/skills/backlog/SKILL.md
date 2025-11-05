---
name: backlog
description: Convert implementation plans into executable Agile backlogs. Reads IMPLEMENTATION-PLAN.md and generates organized /backlog folder with Epics, Stories, and detailed Task prompts ready for AI agents or developers. Use when user asks to "convert plan to backlog", "generate backlog structure", "create Epic/Story/Task hierarchy", "turn plan into executable tasks", or "generate AI-agent-compatible task prompts".
---

# Backlog Generator

Convert IMPLEMENTATION-PLAN.md into structured Agile backlog with executable task prompts for AI coding agents and human developers.

## Core Workflow

### Phase 1: Discovery & Analysis

**Locate IMPLEMENTATION-PLAN.md**:
1. Search current directory for IMPLEMENTATION-PLAN.md (or variants: implementation-plan.md, PROJECT-PLAN.md, PLAN.md)
2. Check planning/, docs/, or .planning/ subdirectories
3. If not found, stop and request user create an implementation plan first

**Parse Structure**:
Extract from plan:
- **Phases** (typically 5-8): Major development stages
- **Milestones** (2-5 per phase): Deliverable points
- **Tasks** (5-15 per milestone): Granular work items
- **Technology stack**: Identify languages, frameworks, tools
- **Dependencies**: Task relationships and sequencing

**Output discovery summary**:
```
Found: IMPLEMENTATION-PLAN.md
Structure:
- 7 Phases
- 28 Milestones
- 142 Tasks

Technology Stack:
- [Detected stack]

Ready to generate backlog...
```

### Phase 2: Backlog Structure Design

**Mapping Rules**:
```
Implementation Plan → Agile Backlog

Phase → Epic (1:1)
Milestone → User Story (1:1)
Task → Task Prompt (1:1)
```

**Epic Conversion**:
- Map each phase to an Epic
- Extract goal, duration, success criteria from phase description
- Identify dependencies between epics
- List all stories in the epic

**Story Conversion**:
- Map each milestone to a User Story
- Format as "As a [role], I want [goal], So that [benefit]"
- Extract acceptance criteria from milestone
- List all tasks in the story
- Map dependencies (which stories must complete first)

**Task Conversion**:
- Map each task to an executable Task Prompt
- Include: Objective, Context, Acceptance Criteria, Implementation Guide, Testing Requirements
- Add AI agent instructions (search patterns, parallelization notes)
- Reference complete templates for structure

### Phase 3: File Structure Generation

**Create folder hierarchy**:
```
/backlog/
├── README.md (overview, how to use)
├── BACKLOG-INDEX.md (complete task listing)
├── epic-01-[name]/
│   ├── EPIC.md
│   ├── story-01-[name]/
│   │   ├── STORY.md
│   │   ├── task-01-[name].md
│   │   ├── task-02-[name].md
│   │   └── task-03-[name].md
│   └── story-02-[name]/
│       └── ...
├── epic-02-[name]/
│   └── ...
└── ...
```

**Naming conventions**:
- Folders: `epic-[NN]-[kebab-case]`, `story-[NN]-[kebab-case]`
- Files: `EPIC.md`, `STORY.md`, `task-[NN]-[name].md`

**Generate files in order**:
1. Create all epic folders
2. Generate EPIC.md files
3. Create all story folders
4. Generate STORY.md files
5. Generate task-*.md files
6. Generate README.md and BACKLOG-INDEX.md

### Phase 4: Content Generation

**For each Epic**:
- ID: EPIC-[NN]
- Source: Link to phase in IMPLEMENTATION-PLAN.md
- Description, Business Value, Acceptance Criteria
- Duration estimate, Dependencies
- List of stories in epic
- Technical notes

**For each Story**:
- ID: STORY-[Epic#]-[Story#]
- User story format: "As a... I want... So that..."
- Acceptance criteria, Technical requirements
- Dependencies (prerequisite stories)
- Estimated effort, Testing strategy
- Definition of Done checklist

**For each Task**:
- ID: TASK-[Epic#]-[Story#]-[Task#]
- Sections: Objective, Context, Acceptance Criteria, Implementation Guide
- Files to create/modify, Step-by-step approach
- Code patterns to use, Technical constraints
- Resources (related files, documentation)
- Testing requirements (unit, integration, manual)
- Learning notes (key concepts, common pitfalls)
- AI agent instructions (search first, parallelization notes)

## Key Features

**AI Agent Compatibility**:
- Each task prompt is immediately executable by Claude Code, Cursor, Devin
- Includes search instructions (find existing patterns first)
- Specifies files to read, modify, or create
- Provides code patterns and examples
- Lists parallelization opportunities

**Traceability**:
- Every task links to its story
- Every story links to its epic
- Every epic links to implementation plan phase
- Maintains full chain from business objective to implementation

**Quality Gates**:
- Include Definition of Done checklists
- Testing requirements for each task
- Acceptance criteria are specific and testable
- Code quality expectations explicit

## Progress Reporting

Provide regular updates during generation:
```
Creating Epics... (3/7)
Creating Stories... (8/28)
Creating Tasks... (45/142)
```

Final summary:
```
Backlog Generation Complete

Generated Structure:
- 7 Epics
- 28 Stories
- 142 Task prompts
- Total files: 179

Ready for execution. Start with:
backlog/epic-01-foundation/story-01-project-setup/task-01-init-repo.md
```

## Templates & Conventions

**Complete templates**: Epic, Story, Task templates with all sections and examples.

**Quality guidelines**: Quality checklist before finalizing, anti-patterns to avoid, naming conventions, best practices for task sizing and dependencies.

**File naming conventions**:
- Folders: `epic-[NN]-[kebab-case]`, `story-[NN]-[kebab-case]`
- Files: `EPIC.md`, `STORY.md`, `task-[NN]-[name].md`

**ID Schemes**:
- Epic IDs: EPIC-[NN] (zero-padded two digits)
- Story IDs: STORY-[Epic#]-[Story#]
- Task IDs: TASK-[Epic#]-[Story#]-[Task#]

**Task sizing**: No task >2 days (break down further)

**Dependencies**: Map critical path (longest sequence of dependent tasks)

**Parallelization**: Identify tasks that can run simultaneously

## Quick Reference

**Estimation overhead**: Always include 70% overhead (testing 25%, review 15%, buffer 30%)

**File count formula**:
- Epics: N phases
- Stories: Sum of milestones across all phases
- Tasks: Sum of tasks across all milestones
- Total files: Epics + Stories + Tasks + 2 (README + INDEX)

**Progress tracking**:
- Status icons: 🔵 Not Started, 🟡 In Progress, 🟢 Complete, 🔴 Blocked
- Priority levels: P0 (critical), P1 (high), P2 (medium), P3 (low)
- Effort estimates: XS (<2h), S (2-4h), M (4-8h), L (1-2d), XL (>2d, needs breakdown)

---

This skill converts comprehensive implementation plans into structured, AI-executable Agile backlogs ready for immediate execution by teams and AI coding agents.
