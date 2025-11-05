---
name: repo-init
description: Bootstrap a complete Claude/Windsurf-ready repository with standardized directory structure (apps/, docs/, .claude/), backlog hierarchy (epics/stories/tasks), and starter templates. Use when user asks to initialize a repo, scaffold a project, set up a backlog structure, or bootstrap a new Claude-ready workspace.
---

# Repository Bootstrapper

Initialize a complete Claude/Windsurf-ready repository with standardized structure, documentation scaffolding, and backlog templates.

## Core Functionality

This skill creates:
- Git repository (if not exists)
- Application directories (apps/ui, apps/api, apps/agent)
- Documentation hierarchy (docs/knowledge, docs/research, docs/backlog)
- Claude system files (.claude/system/ with prompts and memory)
- Structured backlog with starter templates (Epic/Story/Task)
- Project foundation files (OBJECTIVE.md, README.md, .github/ABOUT.md)

## Usage

### Run the Bootstrap Script

Execute the bundled script to initialize the repository:

```bash
# In the target directory
bash scripts/bootstrap-repo.sh
```

The script is **idempotent** - safe to re-run without overwriting existing files.

### What Gets Created

**Directory Structure:**
- `apps/` - Application folders (ui, api, agent)
- `packages/libs/` - Shared libraries
- `docs/backlog/` - Structured work items (epics/, stories/, tasks/, archive/)
- `docs/knowledge/` - Long-term knowledge base
- `docs/research/` - Research notes
- `docs/prompts/` - Reusable AI prompts
- `.claude/system/` - Claude context and system prompts
- `.claude/sessions/` - Conversation sessions
- `.claude/logs/` - Reasoning traces
- `.github/` - GitHub metadata

**Key Files:**
- `OBJECTIVE.md` - Project purpose, outcomes, milestones
- `.claude/system/system_prompt.md` - Coding agent persona
- `.claude/system/analyzer_prompt.md` - Analysis agent persona
- `.claude/system/context_prompt.md` - Context loader
- `docs/backlog/structure.md` - Backlog conventions and hierarchy

**Starter Backlog:**
- EP-000: Foundational Setup (Epic)
- ST-000: Initialize Repo Scaffold (Story)
- TK-000: Bootstrap Script (Task)

See `assets/directory-tree.txt` for complete visual structure.

## Backlog Conventions

The script creates a structured backlog system following these conventions:

**Hierarchy:**
- **Epic** → Long-term objective (weeks)
- **Story** → User-facing feature (days)
- **Task** → Atomic work unit (hours)

**ID Patterns:**
- Epic: `EP-###`
- Story: `ST-###`
- Task: `TK-###`

**File Naming:**
- Format: `{ID}-{kebab-case-title}.md`
- Example: `EP-001-user-authentication.md`

**Metadata:**
- Status: `idea | ready | in-progress | blocked | review | done`
- Priority: `p0 | p1 | p2`

For detailed conventions, see `references/backlog-structure.md`.

## Post-Bootstrap Customization

After running the script:

1. **Edit OBJECTIVE.md** - Define project goals, outcomes, and milestones
2. **Customize System Prompts** - Update `.claude/system/system_prompt.md` for your coding style
3. **Add Epics** - Create initial epics in `docs/backlog/epics/`
4. **Populate Knowledge** - Add domain knowledge to `docs/knowledge/`

## Workflow

The bootstrap process follows these steps:

1. Initialize git repository (if not exists)
2. Create standard directory structure
3. Generate starter files with templates
4. Run `claude code /init` for Claude configuration
5. Commit initial scaffolding

All operations are idempotent - existing files are never overwritten.

## Bundled Resources

- **scripts/bootstrap-repo.sh** - Complete idempotent bootstrap script
- **references/backlog-structure.md** - Detailed backlog conventions and customization guide
- **assets/directory-tree.txt** - Visual directory structure reference
