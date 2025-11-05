markdownYou are tasked with converting a README file into a properly formatted Claude skill. Follow this process:

## Step 1: Analyze the README

Read the provided README file and extract:
1. **Skill name** - Use the filename (without extension) as the skill name
2. **Core functionality** - What does this skill do?
3. **When to use it** - What triggers or contexts should activate this skill?
4. **Procedural workflows** - What step-by-step processes does it describe?
5. **Tools/libraries used** - What technologies or APIs are involved?
6. **Code examples** - What examples are provided?
7. **Additional resources** - Are there schemas, templates, or reference materials mentioned?

## Step 2: Determine Skill Structure

Based on your analysis, decide:
- What belongs in SKILL.md (essential procedural instructions only)
- What should go in `scripts/` (reusable, deterministic code)
- What should go in `references/` (detailed docs, schemas, API specs)
- What should go in `assets/` (templates, boilerplate, images)

## Step 3: Create the Skill

Generate a complete skill with the following structure:

### File: SKILL.md

Format:
```markdown
---
name: [skill-name-from-filename]
description: [2-3 sentence description covering WHAT it does and WHEN to use it. Include specific triggers like "Use when user asks to...", "Use for queries about...", or "Use when working with..."]
---

# [Skill Name]

[1-2 sentence overview]

## [Core section with procedural instructions]

[Use imperative form: "Do X", "Use Y", "Handle Z by..."]
[Include minimal, essential code examples]
[Keep under 500 lines total]

## [Additional sections as needed]

[Reference bundled resources if applicable]
- For detailed documentation: See `references/[file].md`
- Use `scripts/[script].py` for [specific task]
```

### Bundled Resources (if applicable)

Create additional files only if they meet these criteria:

**scripts/** - Include if:
- Same code is rewritten repeatedly
- Deterministic reliability is needed
- Code is complex or fragile

**references/** - Include if:
- Detailed documentation (>500 words)
- API specifications or schemas
- Domain knowledge or policies
- Examples that would bloat SKILL.md

**assets/** - Include if:
- Templates or boilerplate code
- Images, icons, or fonts
- Files used in output (not documentation)

## Requirements

**SKILL.md must:**
- Have valid YAML frontmatter with `name` and `description`
- Use imperative/infinitive form throughout
- Be concise (challenge each paragraph's token cost)
- Include only non-obvious information Claude doesn't already know
- Reference bundled resources clearly
- Stay under 500 lines if possible

**Description must:**
- Explain what the skill does
- List specific triggers/contexts for when to use it
- Be comprehensive (it's the primary triggering mechanism)
- NOT be repeated in the body (body loads after triggering)

**Do NOT include:**
- README.md, CHANGELOG.md, or auxiliary documentation
- Information Claude already knows
- Verbose explanations (prefer concise examples)
- "When to Use This Skill" sections in the body

## Output Format

Provide the complete skill as follows:

1. First, show your analysis in a brief summary
2. Then provide the complete SKILL.md file
3. Then provide any bundled resources (scripts/, references/, assets/) as separate code blocks with clear file paths
4. Finally, show the directory structure of the completed skill

Now, please provide the README file you'd like me to convert into a Claude skill.
