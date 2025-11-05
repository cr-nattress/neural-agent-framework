---
name: persona
description: Generate detailed developer personas for AI personalization. Analyzes professional profiles to create structured personas that help AI assistants provide highly personalized, context-aware coding assistance. Use when user asks to "generate developer persona", "create persona from profile", "analyze professional profile for AI personalization", "build developer context for Claude Code", "extract persona from resume/bio/LinkedIn", or "create AI assistant personalization profile".
---

# Developer Persona Generator

Analyze professional profiles to create detailed developer personas that enable AI coding assistants to provide personalized, context-aware assistance.

## Input Sources

Accept various formats:
- Resumes (PDF, Word, text)
- LinkedIn profiles (exported or copy-pasted)
- Professional bios
- GitHub profiles
- Informal self-descriptions
- Portfolio websites

## Analysis Framework

Extract and infer across these dimensions:

### 1. Technical Profile
- **Programming languages**: Proficiency levels (beginner, intermediate, expert)
- **Frameworks and tools**: Regularly used technologies
- **Development environment**: IDE, OS, setup preferences
- **Areas of expertise**: Specializations and deep knowledge domains

### 2. Work Style
- **Communication style**: Concise vs detailed, formal vs casual
- **Problem-solving approach**: Top-down vs bottom-up, exploratory vs structured
- **Code organization**: Preferences for architecture and structure
- **Documentation habits**: Verbosity, format preferences, what they document

### 3. Project Context
- **Project types**: Typical work (web apps, mobile, data pipelines, infrastructure)
- **Common tasks**: Day-to-day workflows and activities
- **Recurring challenges**: Pain points or obstacles
- **Team dynamics**: Solo vs collaborative, role in team

### 4. Learning & Growth
- **Learning methods**: Preferred ways to acquire knowledge (docs, videos, examples)
- **Current focus**: What they're learning or exploring now
- **Knowledge gaps**: Areas where they need support
- **Professional goals**: Career aspirations and growth areas

### 5. Preferences & Constraints
- **Code style**: Conventions they follow or prefer
- **Testing philosophy**: Approach to testing (TDD, pragmatic, minimal)
- **Trade-offs**: Performance vs readability, speed vs correctness
- **Time constraints**: Deadline pressure, project timelines

## Output Format

Generate structured persona using this template:

```markdown
# Developer Persona: [Name]

## Core Identity
[2-3 sentences capturing essence of their technical identity and role]

## Technical Stack
**Primary Languages:** [List with proficiency - e.g., Python (expert), JavaScript (intermediate)]
**Frameworks & Tools:** [Key technologies - e.g., React, Django, Docker, PostgreSQL]
**Environment:** [IDE preferences - e.g., VS Code on macOS, heavy terminal user]

## Communication Preferences
- **Tone:** [Preferred interaction style - e.g., Professional but casual, direct]
- **Detail Level:** [Explanation depth - e.g., Concise with links to docs, detailed walkthroughs]
- **Code Comments:** [Philosophy - e.g., Minimal inline, comprehensive docstrings]

## Work Patterns
- **Problem-Solving:** [Approach - e.g., Start with tests, prototype quickly then refine]
- **Code Organization:** [Structure preferences - e.g., Functional composition, clear module boundaries]
- **Testing Strategy:** [Approach - e.g., TDD for business logic, integration tests for APIs]
- **Workflow:** [Common tasks - e.g., Daily: code review, feature work; Weekly: architecture discussions]

## Context & Priorities
- **Current Focus:** [Active work - e.g., Migrating monolith to microservices]
- **Key Challenges:** [Recurring issues - e.g., Managing technical debt, scaling database queries]
- **Quality Priorities:** [Optimization targets - e.g., Maintainability > performance, security-first mindset]

## Support Guidelines
When assisting this developer:
1. [Specific guidance - e.g., Provide working code first, explain after]
2. [Emphasis - e.g., Emphasize testing strategies, always include error handling]
3. [Avoidance - e.g., Skip basic syntax explanations, avoid over-commenting]
4. [Workflow patterns - e.g., Suggest git workflows, mention relevant CI/CD integration]

## Quick Reference
- **Assume familiarity with:** [Known topics - e.g., REST APIs, SQL, Docker, Git workflows]
- **Provide extra guidance on:** [Learning areas - e.g., GraphQL, Kubernetes, advanced TypeScript]
- **Default code style:** [Key preferences - e.g., Functional style, explicit over implicit, type hints]
- **Project types:** [Common domains - e.g., Financial APIs, data processing pipelines]
```

## Analysis Principles

**Extract explicit facts**:
- Stated technologies, roles, and preferences
- Documented experience and skills
- Explicitly mentioned preferences

**Infer reasonable patterns**:
- Likely workflows based on role and tech stack
- Common challenges for their domain
- Typical preferences for their experience level

**Mark uncertainty**:
- Use qualifiers: "likely", "probably", "may prefer"
- Note when information is insufficient
- Flag contradictions or ambiguities

## Example Usage

**Input**:
```
John is a senior backend engineer with 8 years of experience, primarily working in Python and Go. He values clean, maintainable code and writes comprehensive tests. He works on microservices architecture for a fintech company, dealing with high-throughput data processing. He prefers concise explanations and gets frustrated with over-commenting. Currently learning Rust for performance-critical components. Uses VS Code on macOS, heavy Docker user.
```

**Output Persona**:
```markdown
# Developer Persona: John

## Core Identity
Senior backend engineer (8 years) specializing in Python and Go for fintech microservices. Prioritizes code maintainability, comprehensive testing, and high-performance data processing.

## Technical Stack
**Primary Languages:** Python (expert), Go (expert), Rust (learning)
**Frameworks & Tools:** Docker, microservices architecture, data processing pipelines
**Environment:** VS Code on macOS, heavy terminal and Docker usage

## Communication Preferences
- **Tone:** Direct and professional, no-nonsense
- **Detail Level:** Concise explanations, minimal hand-holding
- **Code Comments:** Sparse inline comments, comprehensive docstrings for APIs

## Work Patterns
- **Problem-Solving:** Test-driven, design for maintainability first
- **Code Organization:** Clear service boundaries, well-defined interfaces
- **Testing Strategy:** Comprehensive unit and integration tests
- **Workflow:** Daily code reviews, continuous deployment, monitoring-focused

## Context & Priorities
- **Current Focus:** Learning Rust for performance optimization
- **Key Challenges:** High-throughput data processing, maintaining microservices reliability
- **Quality Priorities:** Maintainability, test coverage, performance (in that order)

## Support Guidelines
When assisting John:
1. Provide production-ready code examples (not toys)
2. Emphasize testing strategies and performance considerations
3. Skip basic syntax (he knows Python/Go deeply)
4. Focus on architectural decisions and trade-offs
5. Reference specific tools: Docker, monitoring, profiling

## Quick Reference
- **Assume familiarity with:** Python, Go, Docker, microservices, REST APIs, SQL
- **Provide extra guidance on:** Rust idioms, performance optimization, async patterns
- **Default code style:** Clean, minimal comments, explicit error handling, type hints
- **Project types:** Financial APIs, high-throughput data pipelines, distributed systems
```

## Usage Instructions

### 1. Collecting Information

Ask user to provide:
- Resume or CV (any format)
- LinkedIn profile URL or export
- GitHub profile URL
- Brief self-description (if no formal docs)
- Specific preferences (if known)

### 2. Generating Persona

Run analysis across all five dimensions (Technical, Work Style, Project Context, Learning, Preferences). Be specific with details (not "experienced with backend" but "8 years Python/Django"). Ground inferences in provided information.

### 3. Saving Persona

**For Claude Code**:
- Save to `.claude/context.md` in repository (auto-loaded in all conversations)
- Add to Claude Code settings (applies across all projects)

**For other AI assistants**:
- Reference in custom instructions
- Paste at start of conversation
- Save in project-specific context files

## Quality Guidelines

**Be specific**:
- ❌ "Experienced developer"
- ✅ "8 years Python/Django, 3 years React"

**Be actionable**:
- ❌ "Likes clean code"
- ✅ "Prefers detailed docstrings, avoids over-commenting inline"

**Ground inferences**:
- ❌ "Probably uses Docker" (no evidence)
- ✅ "Heavy Docker user" (stated in profile)

**Note limitations**:
- If information is sparse, note which sections are inferred
- Flag contradictions in source material
- Suggest additional information that would improve persona

---

Save generated personas to `.claude/context.md` for automatic Claude Code integration, or use in custom instructions for persistent personalization across all AI assistant interactions.
