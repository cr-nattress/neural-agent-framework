---
name: psych-profile
description: Create psychological profiles for better collaboration. Analyzes personality, cognition, and behavioral patterns to generate executive summaries, communication styles, strengths, growth areas, and personal type definitions. Use when user asks to "create psychological profile", "personal type definition", "strength assessment", "communication style analysis", or "understand my personality type".
---

# Psychological Profile Generator

Analyze personality, cognition, and behavioral patterns to create comprehensive psychological profiles that enable better collaboration and self-awareness.

## Core Purpose

Generate psychological profiles that:
- **Understand psychology** - Analyze personality and behavioral patterns
- **Enable collaboration** - Help teams understand how to work together
- **Build self-awareness** - Reveal consistent patterns and tendencies
- **Support growth** - Identify strengths to leverage and areas to develop

## Core Workflow

### Phase 1: Information Gathering

**Collect available data:**
1. ChatGPT conversation history or similar AI interactions
2. Project descriptions and code contributions
3. Written explanations and documentation style
4. Decision histories and past choices
5. Communication patterns and tone
6. Notes or self-assessments (optional)

**Document sources:**
- Chat transcripts and conversation style
- Project code and architecture decisions
- Written explanations and teaching style
- Problem-solving examples
- Interpersonal interactions
- Feedback from collaborators (if available)

### Phase 2: Pattern Analysis

**Analyze across dimensions:**

1. **Cognitive Patterns**
   - How they organize and process information
   - Preference for abstract vs concrete thinking
   - Pattern recognition and synthesis abilities
   - Learning speed and comprehension style

2. **Problem-Solving Style**
   - Analytical vs intuitive approaches
   - Systematic vs experimental methods
   - Data-driven vs value-driven decisions
   - Speed vs deliberation in decision-making

3. **Communication Patterns**
   - Tone and formality level
   - Detail orientation vs big-picture focus
   - Written vs verbal preference
   - Teaching and explanation style
   - How they express emotion and values

4. **Behavioral Tendencies**
   - Risk tolerance
   - Initiative vs collaborative preference
   - Structure vs flexibility
   - Persistence vs adaptability
   - Leadership or supportive orientation

5. **Motivational Drivers**
   - What energizes them
   - What frustrates them
   - Core values
   - Professional aspirations
   - What they care about most

6. **Emotional & Interpersonal Style**
   - Stress responses
   - Conflict handling
   - Collaboration style
   - Empathy and emotional awareness
   - Boundary setting

### Phase 3: Profile Generation

**Generate 6-Line Executive Summary:**

Concise description of who they are:
- Professional and psychological identity
- Mental structure and worldview
- General way of thinking
- How they approach challenges
- Core characteristics that define them

Example:
```
Senior systems thinker who synthesizes complexity into elegant frameworks.
Balances analytical rigor with intuitive pattern recognition. Approaches
problems recursively—observe, abstract, model, test, reflect. Values
intellectual honesty and long-term correctness over speed. Calm under
pressure, deliberate in decisions. Driven by creating lasting value and
mentoring others to think more deeply.
```

**Generate Problem-Solving Profile:**

Six defining traits (each one sentence):
- Each trait should be specific and observable
- Include brief evidence or behavioral example
- Grounded in actual patterns
- Memorable and distinctive

Example:
```
- Recursive problem-decomposition (breaks complex problems into elegant abstractions)
- Meta-awareness (questions assumptions before acting)
- Iterative refinement (returns to problems multiple times for improvement)
- Strategic patience (willing to wait for complete understanding)
- Architectural thinking (designs for scale and longevity)
- Skepticism with humility (challenges ideas while remaining open)
```

**Generate Personality & Communication:**

Four bullets describing expression and interaction:
- How they express themselves
- How they interact with others
- How they approach new ideas
- Communication preferences and style

Example:
```
- Prefers written communication over casual chat (allows time for precise expression)
- Asks deep questions before providing answers (understands before solving)
- Direct and honest feedback (values truth over comfort)
- Quiet confidence that doesn't dominate group dynamics (leads through influence)
```

**Generate Strengths & Growth Areas:**

Top 3 strengths with examples:
- Concrete example of strength in action
- Why this matters
- How to leverage it

Top 3 growth areas with micro-actions:
- What's challenging
- Why it matters
- One specific action to develop

Example:
```
## Top 3 Strengths

1. **Systems Thinking & Abstraction**
   - Can see patterns others miss and extract elegant principles
   - Example: Proposed architecture that reduced complexity by 40%
   - Leverage: Assign to strategic design decisions and refactoring

2. **Teaching & Mentoring**
   - Explains complex topics clearly to learners at all levels
   - Example: Team says "Finally understand why we use this pattern"
   - Leverage: Have them document architectural decisions

3. **Intellectual Integrity**
   - Won't compromise on correctness even under deadline pressure
   - Example: Pushed back on technical debt shortcuts
   - Leverage: Trust them with quality gatekeeping roles

## Growth Areas

1. **Shipping Speed**
   - Tendency to over-design can delay iteration
   - Micro-action: Set "good enough" deadline for design phase

2. **Comfort with Ambiguity**
   - Prefers complete understanding before action
   - Micro-action: Practice making decisions with 80% information

3. **Explicit Delegation**
   - Assumes others understand what they're thinking
   - Micro-action: Before starting work, explicitly explain approach and why
```

**Generate Personal Type Definition:**

Concise type name + description:
- Name examples: "The Reflective Architect", "The Analytical Humanist", "The Adaptive Explorer"
- How this type perceives problems
- How they structure solutions
- How they resolve challenges
- Brief rationale for the type

Example:
```
## Type: The Reflective Architect

This type perceives problems as systems to understand deeply before acting.
They structure solutions by first establishing elegant principles, then
building upon them. They resolve challenges through patient analysis and
recursive refinement. This type is driven by intellectual understanding and
creating lasting value. The "Reflective" aspect captures their tendency to
step back and reconsider; the "Architect" captures their ability to design
elegant structures.
```

**Generate Interview Presentation:**

Three short, memorable lines for self-introduction:
- First line: Core identity (what they do)
- Second line: How they work (distinctive approach)
- Third line: What they care about (values/motivation)

Example:
```
"I'm a systems architect who helps teams build things that scale. I think
deeply about problems first, then design elegant solutions. I'm most energized
when I'm learning and helping others think more clearly about their work."
```

### Phase 4: Validation & Refinement

**Verify psychological accuracy:**
- All claims grounded in observed behavior
- No unsupported generalizations
- Contradictions identified and explained
- Uncertainty explicitly marked

**Check completeness:**
- All sections generated
- All sections specific and actionable
- Tone is natural and confident
- No clinical jargon
- Memorable and useful

## Key Features

**Psychologically Grounded:**
- Uses behavioral psychology concepts correctly
- Roots all inferences in observable patterns
- Avoids stereotyping or unsupported assumptions
- Considers context and constraints

**Actionable & Specific:**
- All recommendations specific (not vague)
- All observations tied to concrete examples
- Patterns across different contexts identified
- Growth areas include specific micro-actions

**Self-Aware & Honest:**
- Identifies biases and blind spots
- Acknowledges growth areas without judgment
- Balanced strengths and challenges
- Acknowledges limitations in analysis

**Memorable & Useful:**
- Type names are distinctive and meaningful
- Profiles can be introduced to others
- Insights can guide career decisions
- Growth areas are actionable

## Output Format

Complete psychological profile with:

```markdown
# Psychological Profile: [Person Name]

## Executive Summary
[6-line description of who they are]

## Problem-Solving Profile
[6 defining traits with examples]

## Personality & Communication
[4 bullets on communication and interaction]

## Strengths & Growth Areas

### Top 3 Strengths
1. [Strength with example and how to leverage]
2. [Strength with example and how to leverage]
3. [Strength with example and how to leverage]

### Top 3 Growth Areas
1. [Growth area with micro-action]
2. [Growth area with micro-action]
3. [Growth area with micro-action]

## Personal Type Definition
### Type: [Name - e.g., "The Reflective Architect"]
[Description of how they perceive, structure, and resolve]

## Interview Presentation
[Three memorable lines for self-introduction]

## Collaboration Tips
[How to work best with this person]
- [What to leverage]
- [What to provide support on]
- [Communication preferences]
- [Best team roles]
```

## Analysis Principles

**Extract explicit facts:**
- Stated technologies, roles, and preferences
- Documented experience and skills
- Explicitly mentioned values and goals
- Clear behavioral patterns

**Infer reasonable patterns:**
- Likely workflow based on role and tech stack
- Common patterns for their experience level
- Typical tendencies based on observed behavior
- Likely motivations based on choices

**Mark uncertainty:**
- Use qualifiers: "likely", "probably", "may prefer"
- Note when information is insufficient
- Flag contradictions or ambiguities
- Distinguish between clear and inferred patterns

## Quality Checklist

Before finalizing:

- [ ] Executive summary is vivid and concise (6 lines max)
- [ ] Six traits are specific and grounded in examples
- [ ] Four communication bullets are actionable
- [ ] Top 3 strengths have concrete examples
- [ ] Top 3 growth areas have specific micro-actions
- [ ] Personal type name is memorable and fitting
- [ ] Type description explains how they perceive/structure/resolve
- [ ] Interview presentation is 3 memorable lines
- [ ] All claims are grounded in evidence
- [ ] Tone is natural and confident
- [ ] No clinical jargon
- [ ] Balanced (strengths and challenges both present)
- [ ] Psychological concepts applied correctly
- [ ] Could be shared with team/collaborators

## Quick Reference

**6-Section Structure:**
1. Executive Summary (6 lines)
2. Problem-Solving Profile (6 traits)
3. Personality & Communication (4 bullets)
4. Strengths & Growth Areas (3+3 with examples)
5. Personal Type Definition (name + description)
6. Interview Presentation (3 lines)

**Type Examples:**
- The Reflective Architect
- The Analytical Humanist
- The Adaptive Explorer
- The Detail Master
- The Systems Thinker
- The Creative Pragmatist

**Tone**: Natural, confident, psychologically grounded, actionable

**Must Include:**
- Specific observable patterns
- Concrete examples of behavior
- How to leverage strengths
- Actionable growth recommendations
- Memorable type definition
- Self-introduction lines

---

This skill creates comprehensive psychological profiles that enable better self-understanding and team collaboration through honest, grounded analysis of personality, cognition, and behavioral patterns.
