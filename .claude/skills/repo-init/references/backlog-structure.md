# Backlog Structure & Conventions

This repository uses a lightweight, agent-friendly backlog system for planning and execution.

## Hierarchy

The backlog follows a three-tier hierarchy:

### Epic
- **Scope**: Long-term objective (weeks to months)
- **ID Format**: `EP-###`
- **File Location**: `docs/backlog/epics/`
- **Example**: `EP-001-user-authentication.md`

Epics represent major features or initiatives that deliver significant business value.

### Story
- **Scope**: User-facing feature or capability (days to week)
- **ID Format**: `ST-###`
- **File Location**: `docs/backlog/stories/`
- **Example**: `ST-005-login-form.md`

Stories describe functionality from a user perspective with clear acceptance criteria.

### Task
- **Scope**: Atomic work unit (hours to day)
- **ID Format**: `TK-###`
- **File Location**: `docs/backlog/tasks/`
- **Example**: `TK-012-validate-email-input.md`

Tasks are concrete, implementable units of work that contribute to story completion.

## Supporting Artifacts

### Prompts
- **Location**: `docs/prompts/`
- **Purpose**: Reusable AI agent instructions
- **Naming**: Descriptive kebab-case (e.g., `analyze-performance.md`)

### Research Notes
- **Location**: `docs/research/`
- **Purpose**: Supporting insights, findings, and context
- **Naming**: Date-prefixed or topic-based

## File Naming Conventions

All backlog items follow this pattern:
```
{ID}-{kebab-case-title}.md
```

Examples:
- `EP-001-user-authentication.md`
- `ST-042-password-reset-flow.md`
- `TK-156-implement-jwt-validation.md`

## Metadata Format

All backlog items include YAML frontmatter:

### Epic Metadata
```yaml
---
id: EP-###
title: Epic Title
status: idea | ready | in-progress | blocked | review | done
priority: p0 | p1 | p2
owner: username
links:
  - url: https://example.com
    title: Reference doc
---
```

### Story Metadata
```yaml
---
id: ST-###
epic: EP-###
title: Story Title
status: idea | ready | in-progress | blocked | review | done
priority: p0 | p1 | p2
owner: username
links: []
---
```

### Task Metadata
```yaml
---
id: TK-###
story: ST-###
title: Task Title
status: idea | ready | in-progress | blocked | review | done
priority: p0 | p1 | p2
owner: username
prompt_refs:
  - /docs/prompts/specific-prompt.md
---
```

## Status Workflow

Items progress through these states:

1. **idea** - Initial concept, not yet refined
2. **ready** - Defined and ready to start
3. **in-progress** - Active work underway
4. **blocked** - Work halted by dependency or issue
5. **review** - Work complete, awaiting review
6. **done** - Completed and accepted

## Priority Levels

- **p0** - Critical, blocking, must be done immediately
- **p1** - High priority, should be done soon
- **p2** - Normal priority, can be scheduled flexibly

## Content Structure

### Epic Content
```markdown
## Outcome
What success looks like when this epic is complete.

## Why
Business justification and value proposition.

## Stories
- ST-###-story-name
- ST-###-another-story
```

### Story Content
```markdown
## User Value
As a [role], I can [capability] so that [benefit].

## Acceptance Criteria
- Criterion 1
- Criterion 2
- Criterion 3

## Tasks
- TK-###-task-name
- TK-###-another-task
```

### Task Content
```markdown
## Definition of Done
Clear completion criteria.

## Steps
1. Step 1
2. Step 2
3. Step 3

## Notes
Additional context, constraints, or considerations.
```

## Customization Guide

### Adding New Items

**Create an Epic:**
1. Choose next sequential ID (EP-###)
2. Create file: `docs/backlog/epics/EP-###-title.md`
3. Fill in metadata and content
4. Link to related stories

**Create a Story:**
1. Choose next sequential ID (ST-###)
2. Create file: `docs/backlog/stories/ST-###-title.md`
3. Reference parent epic in metadata
4. Define user value and acceptance criteria
5. List contributing tasks

**Create a Task:**
1. Choose next sequential ID (TK-###)
2. Create file: `docs/backlog/tasks/TK-###-title.md`
3. Reference parent story in metadata
4. Define clear completion criteria
5. Link to relevant prompts if needed

### Archiving Completed Work

Move completed items to preserve history:
```bash
mv docs/backlog/epics/EP-001-old-epic.md docs/backlog/archive/
```

### Custom Statuses

Extend the status workflow by editing `docs/backlog/structure.md` and documenting new states:
```
deployed → released → deprecated
```

### Additional Metadata Fields

Add custom fields to YAML frontmatter as needed:
```yaml
estimate: 5d
dependencies:
  - TK-042
  - TK-043
labels:
  - frontend
  - api
```

## AI Agent Integration

This backlog structure is optimized for AI agent workflows:

1. **Structured Metadata** - YAML frontmatter is machine-readable
2. **Clear IDs** - Enable precise referencing and linking
3. **Hierarchical Organization** - Agents can traverse Epic → Story → Task
4. **Prompt References** - Tasks link to reusable agent instructions
5. **Status Tracking** - Agents can update progress programmatically

## Best Practices

- **Keep IDs Sequential** - Makes tracking easier
- **Write Clear Acceptance Criteria** - Reduces ambiguity
- **Link Related Items** - Maintains traceability
- **Update Status Regularly** - Keep backlog current
- **Archive Completed Work** - Prevents clutter
- **Reference Prompts** - Reuse proven instructions
- **Document Blockers** - Record why work is halted
- **Use kebab-case** - Consistent naming across files
- **Owner Accountability** - Assign owner to each item
