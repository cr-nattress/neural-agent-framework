---
name: repo-organizer
description: Optimize repository structure for LLM-friendly organization. Analyzes repo layout, detects protected application folders, proposes reorganization that improves AI agent navigation and code comprehension. Never breaks runnable applications. Use when user asks to "organize repository", "optimize repo structure", "LLM-friendly organization", "refactor repo", or "improve code discoverability".
---

# Repository Organizer (RepoRefactor)

Analyze local Git repositories and propose non-breaking reorganizations that optimize structure for LLM/AI agent comprehension and navigation.

## Core Principles

### 1. Safety First (Do-Not-Break)

- **Never modify, rename, or relocate files that are part of runnable applications**
- Only reorganize non-executable, ancillary content (docs, images, notes)
- All risky actions proposed first; only apply after explicit approval
- Protect build systems, configurations, and runtime code

### 2. Generic & Reusable

- Use neutral, domain-agnostic names (no vendor/tool lock-in)
- Names should be descriptive and consistent

### 3. LLM-Optimized

- Names are short, consistent, and predictable
- Clear folder structure for easy navigation
- Reduce nesting when possible
- Group by function/purpose

### 4. Transparent & Idempotent

- Produce complete PLAN before any changes
- Use atomic Git moves (single clear refactor commit)
- Generate mapping table (old → new paths)
- Create rollback script for safety

## Core Workflow

### Phase 1: Repository Scanning

**Walk the repository:**
1. Examine all directories and files
2. Detect file types and purposes
3. Identify build/run/framework indicators
4. Note configuration and environment files

**Categorize all items:**
- Protected application folders (must not move)
- Configuration files (handle with care)
- Documentation (safe to reorganize)
- Media and assets (safe to reorganize)
- Scripts and utilities (generally safe)
- Archive or deprecated content (good reorganization candidates)

### Phase 2: Protected Root Detection

**Treat a folder as PROTECTED if it contains:**

**Build/Run indicators:**
- `package.json`, `pnpm-lock.yaml`, `yarn.lock`
- `requirements.txt`, `pyproject.toml`, `poetry.lock`
- `Gemfile`, `Cargo.toml`, `go.mod`, `pom.xml`
- `Makefile`, `CMakeLists.txt`, `.csproj`, `.sln`
- `Dockerfile`, `docker-compose.yml`

**Framework conventions:**
- `src/`, `app/`, `.next/`, `.nuxt/`, `dist/`, `build/`, `public/`
- `migrations/`, `tests/`, `test/`

**Runtime/config:**
- `.env*`, `*.config.*`, `settings.*`, `web.config`

**Deploy/infrastructure:**
- `infra/`, `terraform/`, `helm/`, `.github/workflows/`

**Language-specific project roots:**
- JS/TS, Python, Java, Go, Rust, C#, etc.

**Rule:** Inside protected folders, only extract clearly non-essential docs/media/notes. Never rename or move code/config/build assets.

### Phase 3: Structure Analysis

**Analyze current structure:**
1. List all top-level directories
2. Identify what's properly organized
3. Identify what's scattered or misplaced
4. Note duplication or redundancy
5. Check for obvious organization issues

**Identify problems:**
- Documentation scattered across multiple locations
- Old files/folders not archived
- Unclear naming conventions
- Inconsistent organization patterns
- Media mixed with code

**Identify opportunities:**
- Centralizing documentation
- Grouping by purpose
- Reducing nesting depth
- Clear separation of concerns
- Removing unused or outdated content

### Phase 4: Plan Generation

**Generate comprehensive plan JSON:**

```json
{
  "overview": "Summary of repo shape and reorganization goals",
  "protected_roots": ["list of protected application folders"],
  "unused_or_misplaced": ["items to move or archive"],
  "proposed_structure": {
    "keep": ["existing folders to maintain"],
    "create": ["new folders to establish"],
    "remove": ["unused folders to delete"]
  },
  "rename_rules": [
    {"from": "old_name", "to": "new_name"},
    {"from": "docs_old", "to": "docs"}
  ],
  "move_map": [
    {"from": "apps/web/README-old.md", "to": "docs/apps/web.md"},
    {"from": "old_notes/", "to": "archive/old_notes/"}
  ],
  "extractions_from_protected": [
    {"from": "apps/web/public/notes/", "to": "docs/app-notes/"},
    {"from": "api/tmp-design/", "to": "design/api/"}
  ],
  "kept_in_place_with_reason": [
    {"path": "apps/web/src", "reason": "protected application code"},
    {"path": ".github/workflows", "reason": "CI paths hardcoded in config"}
  ],
  "side_effect_checks": [
    "No import/path breakage in code",
    "No CI or build path references broken",
    "No Docker/compose context breakage",
    "No infrastructure path assumptions broken"
  ],
  "post_change_artifacts": [
    "docs/REPO_MAP.md (final tree + rationale)",
    "DECISIONS.md (ADR-style documentation)",
    "scripts/rollback_repo_refactor.sh (rollback script)"
  ],
  "git_commands": [
    "git mv old_path new_path",
    "git add -A",
    "git commit -m \"refactor(repo): organize for LLM-friendly structure\""
  ]
}
```

### Phase 5: Dry Run Checks (Before Apply)

**Before applying any changes:**

1. Grep for path references in:
   - CI configs (`.github/workflows/`, `.gitlab-ci.yml`)
   - Docker files (`Dockerfile`, `docker-compose.yml`)
   - Build scripts (`Makefile`, `build.sh`, etc.)
   - Configuration files (`.env*`, `*.config.*`)
   - Source code imports

2. If references found:
   - Move to `kept_in_place_with_reason`
   - Remove from `move_map`
   - Note why it must stay

### Phase 6: Apply Changes (After Approval)

**Execute only after "APPLY PLAN" instruction:**

1. Create new folders as specified
2. Execute `git mv` commands per move_map
3. Execute rename_rules with git mv
4. Verify all operations succeeded
5. Generate post-change artifacts

### Phase 7: Artifact Generation

**Generate three documents:**

1. **docs/REPO_MAP.md**
   - Final directory tree (top 3-4 levels)
   - Rationale for top-level layout
   - Description of each major directory
   - Examples of what goes where

2. **DECISIONS.md** (or docs/DECISIONS.md)
   - ADR-style bullets of key decisions
   - Why each reorganization was made
   - Trade-offs considered
   - Conventions established

3. **scripts/rollback_repo_refactor.sh**
   - Inverse git mv commands
   - Executable rollback script
   - Restores original structure if needed

### Phase 8: Commit & Report

**Single atomic commit:**
```bash
git commit -m "refactor(repo): organize for LLM-friendly structure (non-breaking)"
```

**Final report:**
- Print new directory tree (top 3 levels)
- Summary of what changed
- Files moved, renamed, archived
- Status: ✅ Complete

## Preferred Top-Level Layout

```
apps/              # Multiple applications (keep internal structure intact)
packages/          # (or libs/) Shared libraries/modules
docs/              # Project documentation
design/            # Diagrams, wireframes, UX copy
research/          # Notes, experiments, spikes, benchmarks
scripts/           # Automation, CLIs, one-offs
ops/               # Infrastructure, IaC, CI/CD templates
data/              # Sample datasets, fixtures (never secrets)
examples/          # Usage samples, demo snippets
tests/             # Integration/e2e harnesses (not app-local)
archive/           # Deprecated or legacy for reference
.meta/             # Project metadata, decisions, conventions
```

**Adapt to existing monorepo structure; don't force if already organized differently.**

## Naming Conventions

- **Folders**: `kebab-case` (e.g., `project-guides`, `design-system`)
- **Files**: Language-appropriate (prefer `snake_case.ext` for docs)
- **Docs**: Prefer `README.md`, `CONTRIBUTING.md`, `DECISIONS.md`, `CONVENTIONS.md`
- **Avoid vague names**: Replace `misc`, `stuff`, `notes2` with purposeful names
- **Semantic prefixes for scripts**: `build_*.sh`, `gen_*.py`, `sync_*.ts`

## Key Features

**Safety First:**
- Never breaks runnable applications
- All risky moves proposed before execution
- Path reference checks before changes
- Rollback script for recovery

**Comprehensive Analysis:**
- Scans entire repository systematically
- Identifies all protected folders
- Detects path reference risks
- Categorizes all content

**Clear Planning:**
- Complete JSON plan before changes
- Transparent reasoning for each move
- Artifact generation for future reference
- Dry-run checks for safety

**Easy Rollback:**
- Generated rollback script
- Single commit easy to revert
- Complete mapping of all changes
- Documentation of all decisions

## Progress Reporting

Provide updates during analysis:

```
🔍 Repository Organizer (RepoRefactor)

Phase 1: Repository Scanning... ✓
├─ 127 directories scanned
├─ 1,200+ files analyzed
└─ Protected roots identified: 3

Phase 2: Protected Root Detection... ✓
├─ apps/ui (Next.js app)
├─ apps/api (Express backend)
└─ packages/libs (Shared library)

Phase 3: Structure Analysis... ✓
├─ Issues found: 8
├─ Reorganization opportunities: 12
└─ Safe extractions identified: 5

Phase 4: Plan Generation... ✓
└─ Plan ready for review

PLAN GENERATED - Awaiting "APPLY PLAN" instruction
```

## Quality Checklist

Before finalizing plan:

- [ ] All protected roots correctly identified
- [ ] No protected code/config files marked for moving
- [ ] All moves have clear rationale
- [ ] Proposed structure is cleaner than current
- [ ] Naming conventions are consistent
- [ ] No circular dependencies or conflicts
- [ ] Path reference risks identified
- [ ] Plan is safe to execute
- [ ] Rollback strategy documented
- [ ] Artifacts to be generated listed

## Quick Reference

**Protection Rules:**
- Protect: `src/`, `app/`, `package.json`, `.env*`, `.github/workflows/`
- Safe: `docs/`, `notes/`, `images/`, old files, archived content

**Preferred Top-Level:**
apps/, packages/, docs/, design/, research/, scripts/, ops/, data/, examples/, tests/, archive/, .meta/

**Naming:**
- Folders: kebab-case
- Files: snake_case for docs, language conventions for code
- Avoid: misc, stuff, old, temp, old2, notes2

**Always Generate:**
- docs/REPO_MAP.md (final structure)
- DECISIONS.md (why each move)
- scripts/rollback_repo_refactor.sh (recovery)

**Never Skip:**
- Safe-first principle (never break builds)
- Plan generation before changes
- Dry-run path reference checks
- Explicit approval before execution

## Examples of Safe Extractions

**Safe to move (non-essential content in protected folders):**
- `public/notes/`, `public/images/reference/`
- `docs/` subfolders within apps
- `design/`, `wireframes/` directories
- `README-old.md`, meeting notes
- Screenshots, `.drawio`, `.fig` files
- Local experiment notebooks (not imported)

**Do NOT touch:**
- Anything imported by source code
- `src/`, `app/`, `dist/`, `build/`, `migrations/`
- Language project files and lockfiles
- CI/infrastructure paths referenced in config

---

This skill analyzes and reorganizes repositories for optimal LLM-agent navigation while maintaining 100% application safety and full rollback capability.
