#!/bin/bash
set -euo pipefail

REPO_NAME="$(basename "$PWD")"

echo "==> Initializing Git repo for $REPO_NAME..."
if [ ! -d .git ]; then
  git init -b main >/dev/null
  echo "Git repo initialized on 'main'."
else
  echo "Git repo already exists."
fi

echo "==> Creating standard directories..."
mkdir -p apps/ui apps/api apps/agent
mkdir -p packages/libs
mkdir -p docs/knowledge docs/research docs/backlog/{epics,stories,tasks,archive} docs/prompts
mkdir -p .github .claude/system .claude/sessions .claude/logs

echo "==> Creating standard files..."
[ ! -f README.md ] && : > README.md && echo "Created empty README.md"

# === GitHub & Project Docs ===
[ ! -f .github/ABOUT.md ] && cat > .github/ABOUT.md <<'EOF'
# About This Repository

This repository is a generic starter scaffold for Claude Code and Windsurf.
It supports multiple applications (UI, API, Agent) and includes documentation and LLM context folders.
EOF

[ ! -f OBJECTIVE.md ] && cat > OBJECTIVE.md <<'EOF'
# Objective

## Purpose
State the overall goal of this project in one or two clear sentences.

## Outcomes
- Define success in measurable ways.
- Keep the list small and achievable.

## Constraints & Assumptions
- Document any technical or external constraints here.

## Milestones
- M1: First demo
- M2: First release
- M3: Feedback iteration
EOF

# === Claude System Files ===
[ ! -f .claude/system/bootstrap.md ] && cat > .claude/system/bootstrap.md <<'EOF'
# Claude System Bootstrap

This folder is used by Claude Code and Windsurf to maintain the project's AI reasoning context.

**Structure**
- /system/ — persistent prompts, memory, and reasoning templates
- /sessions/ — conversation or agent sessions
- /logs/ — debugging and reasoning traces

> Never store credentials or secrets here.
EOF

[ ! -f .claude/system/memory.md ] && : > .claude/system/memory.md

[ ! -f .claude/system/system_prompt.md ] && cat > .claude/system/system_prompt.md <<'EOF'
# System Prompt — Coding & Architecture Agent

You are an expert software engineer and systems architect working in Claude Code + Windsurf.

Goals:
- Design and implement code across ui/, api/, and agent/ apps.
- Produce clear, idiomatic, maintainable code.
- Document reasoning briefly when helpful.

Constraints:
- Never overwrite application code without confirmation.
- Prefer generic, reusable names.
- Follow /OBJECTIVE.md and /docs/ conventions.

Style:
- Concise comments, modular abstractions, propose options when uncertain.
EOF

[ ! -f .claude/system/analyzer_prompt.md ] && cat > .claude/system/analyzer_prompt.md <<'EOF'
# System Prompt — Repository Analyzer

Task:
1. Scan repo structure/content.
2. Identify missing docs, redundant/unused files, org improvements, automation/LLM opportunities.
3. Output a health summary and recommendations grouped by: structure, naming, docs, automation.

Do not modify code; analyze and propose.
EOF

[ ! -f .claude/system/context_prompt.md ] && cat > .claude/system/context_prompt.md <<'EOF'
# Context Prompt — Long-Term Context Loader

Include persistent context for all sessions:
- Vision, principles, key decisions, constraints
- Onboarding steps, references
EOF

# === Backlog Framework ===
[ ! -f docs/backlog/structure.md ] && cat > docs/backlog/structure.md <<'EOF'
# Backlog Structure & Conventions

This repo uses a lightweight, agent-friendly backlog for planning and execution.

## Hierarchy
- Epic → long-term objective (weeks)
- Story → user-facing feature (days)
- Task → atomic work unit (hours)
- Prompt → reusable instruction for AI agents
- Research Note → supporting insight or context

## Folders
- /docs/backlog/epics/
- /docs/backlog/stories/
- /docs/backlog/tasks/
- /docs/prompts/
- /docs/research/

## IDs & Conventions
- IDs: EP-###, ST-###, TK-###
- Names: kebab-case
- Example: EP-000-foundational-setup.md

## Status & Priority
- Status: idea | ready | in-progress | blocked | review | done
- Priority: p0 | p1 | p2
EOF

# === Starter Backlog Files ===
[ ! -f docs/backlog/epics/EP-000-foundational-setup.md ] && cat > docs/backlog/epics/EP-000-foundational-setup.md <<'EOF'
---
id: EP-000
title: Foundational Repo Setup
status: done
priority: p0
owner: system
links: []
---

## Outcome
A clean, AI-optimized Windsurf repository scaffold with Claude support.

## Why
Ensure consistent structure, clarity, and machine-readable organization across new projects.

## Stories
- ST-000-initialize-repo-scaffold
EOF

[ ! -f docs/backlog/stories/ST-000-initialize-repo-scaffold.md ] && cat > docs/backlog/stories/ST-000-initialize-repo-scaffold.md <<'EOF'
---
id: ST-000
epic: EP-000
title: Initialize Repo Scaffold
status: done
priority: p1
owner: system
links: []
---

## User Value
As a developer, I can run a single bootstrap command to set up a Claude/Windsurf-ready repo instantly.

## Acceptance Criteria
- Git initialized
- apps/, docs/, .claude/ created
- OBJECTIVE.md, README.md present
- Initial commit made

## Tasks
- TK-000-bootstrap-script
EOF

[ ! -f docs/backlog/tasks/TK-000-bootstrap-script.md ] && cat > docs/backlog/tasks/TK-000-bootstrap-script.md <<'EOF'
---
id: TK-000
story: ST-000
title: Bootstrap Repo Script
status: done
priority: p1
owner: system
prompt_refs:
  - /docs/prompts/init.md
---

## Definition of Done
- The bootstrap script can initialize any empty folder into a structured, Claude-ready repo.

## Steps
1. Initialize git repo
2. Create standard folders
3. Add .claude/system prompts
4. Run `claude code /init`
5. Commit initial setup

## Notes
Serves as the foundation for all future repo scaffolds.
EOF

# === Example Prompt ===
[ ! -f docs/prompts/init.md ] && cat > docs/prompts/init.md <<'EOF'
# Prompt — Repo Initialization Agent

System: You are an initialization assistant that sets up new Claude/Windsurf repositories.

User Goal:
Turn an empty folder into a ready-to-code environment with `.claude/`, `docs/`, `apps/`, and `backlog` structure.

Constraints:
- Never overwrite files with content.
- Must be idempotent.
- Must commit once on completion.

Output:
Summary of created files, folders, and top-level tree.
EOF

echo "==> Running Windsurf Claude init..."
claude code /init || true

echo "==> Committing initial scaffolding..."
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "chore(init): bootstrap windsurf repo with .claude, backlog, and starter templates"
  echo "Committed new files."
else
  echo "No changes to commit."
fi

echo "==> Done. Top-level structure:"
find . -maxdepth 2 -type d -print | sed 's|^\./||'
