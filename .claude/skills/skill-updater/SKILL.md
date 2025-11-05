---
name: skill-updater
description: Convert README files into properly formatted Claude skills with YAML frontmatter, procedure documentation, and bundled resources. Generates SKILL.md files with clear descriptions and instructions. Use when user asks to "convert README to skill", "create Claude skill", "format skill properly", "turn documentation into skill", or "register skill file".
---

# Skill Updater

Convert README files and documentation into properly formatted Claude skills.

## Core Workflow

### Phase 1: Analyze Source Documentation

Read the provided README or documentation file and extract:

1. **Skill name** - Use filename (without extension) as skill name
2. **Core functionality** - What does this skill do?
3. **When to use it** - What triggers or contexts activate this skill?
4. **Procedural workflows** - What step-by-step processes does it describe?
5. **Tools/libraries used** - What technologies or APIs are involved?
6. **Code examples** - What examples are provided?
7. **Additional resources** - Are there schemas, templates, or reference materials?

### Phase 2: Determine Skill Structure

Decide what content belongs where:

- **SKILL.md** - Essential procedural instructions only (keep under 500 lines)
- **scripts/** - Reusable, deterministic code (Python, Bash, Node.js scripts)
- **references/** - Detailed docs, schemas, API specs (>500 words or reference material)
- **assets/** - Templates, boilerplate, images, files used in output

### Phase 3: Create SKILL.md

Generate SKILL.md with proper structure:

```markdown
---
name: skill-name-from-filename
description: 2-3 sentence description covering WHAT it does and WHEN to use it. Include specific triggers like "Use when user asks to..." or "Use for queries about...". Include context like "Use when working with..."
---

# Skill Name

1-2 sentence overview of what the skill does.

## Core Sections

Use imperative form throughout:
- "Do X"
- "Use Y"
- "Handle Z by..."

Include minimal, essential code examples.
Keep under 500 lines total.

## Additional Sections

Reference bundled resources if applicable:
- For detailed documentation: See `references/filename.md`
- Use `scripts/script.py` for [specific task]
```

### Phase 4: Structure Output

Organize generated files:

1. Brief analysis summary
2. Complete SKILL.md file
3. Bundled resources (scripts/, references/, assets/) if applicable
4. Final directory structure

## SKILL.md Requirements

**YAML Frontmatter must have:**
- `name` - lowercase letters, numbers, hyphens only (max 64 characters)
- `description` - 2-3 sentence description (max 1024 characters)

**Description must:**
- Explain what the skill does (WHAT)
- List specific triggers/contexts for when to use it (WHEN)
- Be comprehensive (primary triggering mechanism for Claude)
- NOT be repeated in body (body loads after triggering)

**Body must:**
- Use imperative form (commands, not descriptions)
- Be concise (challenge each paragraph's token cost)
- Include only non-obvious information
- Reference bundled resources clearly
- Stay under 500 lines if possible
- Have clear procedural sections

**Do NOT include:**
- README.md, CHANGELOG.md, auxiliary documentation
- Information Claude already knows
- Verbose explanations (prefer concise examples)
- "When to Use This Skill" sections in body

## Bundled Resources

Create additional files only if they meet criteria:

**scripts/** - Include if:
- Same code is rewritten repeatedly
- Deterministic reliability is needed
- Code is complex or fragile
- Must be executable by Claude Code

**references/** - Include if:
- Detailed documentation (>500 words)
- API specifications or schemas
- Domain knowledge or policies
- Examples that would bloat SKILL.md

**assets/** - Include if:
- Templates or boilerplate code
- Images, icons, or fonts
- Files used in output (not documentation)

## Quality Guidelines

**Be specific:**
- ❌ "Experienced developer"
- ✅ "8 years Python/Django, 3 years React"

**Be actionable:**
- ❌ "Likes clean code"
- ✅ "Prefers detailed docstrings, avoids over-commenting inline"

**Make descriptions discoverable:**
- Include specific use cases and triggers
- Use exact phrases user might type
- Cover multiple contexts where skill applies
- Be comprehensive in description field

## Output Format

Provide complete skill as:

1. **Analysis Summary** - Brief breakdown of findings
2. **SKILL.md File** - Complete, ready to use
3. **Bundled Resources** - scripts/, references/, assets/ (if applicable)
4. **Directory Structure** - Final skill folder layout

## Examples

### Good Description
"Generate comprehensive implementation plans from project objectives. Analyzes OBJECTIVE.md and research files to create detailed roadmaps with phases, milestones, tasks, risks, and timelines. Use when user asks to 'generate implementation plan', 'create project roadmap from objectives', 'turn OBJECTIVE.md into detailed plan', 'break down project into phases and tasks'."

### Bad Description
"Planning tool for projects" (too vague, missing triggers)

---

This skill transforms README files and documentation into discoverable, executable Claude Code skills with proper structure and bundled resources.
