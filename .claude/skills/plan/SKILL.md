---
name: plan
description: Generate comprehensive implementation plans from project objectives. Analyzes OBJECTIVE.md and research files to create detailed roadmaps with phases, milestones, tasks, risks, and timelines. Platform-agnostic - works for web, mobile, desktop, embedded, ML, infrastructure, or any software project. Use when user asks to "generate implementation plan", "create project roadmap from objectives", "turn OBJECTIVE.md into detailed plan", "break down project into phases and tasks", "create implementation strategy", or "generate project plan with timeline and risks".
---

# Project Planning Agent

Generate comprehensive, actionable implementation plans for ANY software project from objectives and research.

## Core Workflow

### Phase 1: Context Discovery

**Locate OBJECTIVE.md** (required):
1. Search current directory for OBJECTIVE.md (or variants: objective.md, OBJECTIVE.txt)
2. Check parent directory, planning/, docs/, .planning/ subdirectories
3. If not found, stop and request user create objectives file

**Auto-discover research files** (parallel):
Search patterns:
- `*.md` in current directory and subdirectories
- Common locations: docs/, research/, planning/, architecture/, specs/
- Config files: package.json, requirements.txt, Cargo.toml, go.mod, pom.xml, etc.

**Categorize discovered files**:
- **Objective & Requirements**: OBJECTIVE.md (primary), requirements.md, user-stories.md
- **Technical**: ARCHITECTURE.md, TECH-STACK.md, database-schema.md, api-spec.md
- **Design & UX**: design-system.md, wireframes.md, user-flows.md
- **Constraints**: CONSTRAINTS.md, limitations.md, risks.md
- **Research**: best-practices.md, competitive-analysis.md, technology-comparison.md

**Read and synthesize**:
1. Read OBJECTIVE.md first (blocking - must understand primary goal)
2. Read all other files in parallel
3. Extract: Goal, Success Criteria, Constraints (time/budget/technical/business), Tech Stack, Platform, Timeline

**Quality check before proceeding**:
- ✓ Clear understanding of objective?
- ✓ Technology stack identified?
- ✓ Success criteria measurable?
- ✓ Major constraints documented?
- If any ✗, ask user for clarification

### Phase 2: Plan Structure Creation

**Define major phases** (typically 5-8):

Use platform-appropriate patterns:
- **Web App**: Foundation, Backend, Frontend, Features, Integration, Security, Deployment
- **Mobile App**: Setup, Services, UI Components, Features, Platform-Specific, Testing, App Store
- **ML Pipeline**: Data Exploration, Data Pipeline, Feature Engineering, Model Dev, Deployment, Monitoring
- **Infrastructure**: Requirements, IaC, CI/CD, Monitoring, Security, DR, Documentation
- **Embedded System**: Hardware Setup, Firmware, Application, Communication, Power Management, Testing, Production

**Each phase includes**:
- Goal (one-sentence objective)
- Duration estimate
- Prerequisites (what must complete first)
- Deliverables (tangible outputs)
- Success criteria (measurable checkpoints)
- Key risks (phase-specific)

**Break phases into milestones** (2-5 per phase):
- Specific goal milestone achieves
- Duration (days/weeks)
- Team assignment (role, not name)
- Dependencies (prerequisite milestones)
- Deliverables (concrete outputs)
- Acceptance criteria (testable)
- Technical notes (implementation hints, patterns, gotchas)

**Break milestones into tasks** (5-15 per milestone):
- Task sizing: Small (2-4h), Medium (4-8h), Large (1-2 days)
- If >2 days, break down further
- Each task includes:
  - Type (Setup/Implementation/Testing/Documentation/Review)
  - Estimated time with overhead
  - Complexity (Low/Medium/High)
  - Assigned role
  - Prerequisites (dependent tasks)
  - Description (1-2 sentences)
  - Acceptance criteria (specific, testable)
  - Implementation notes (technical details, patterns, gotchas)
  - Testing requirements

**Map dependencies**:
- Create dependency graph (visual text representation)
- Identify critical path (longest sequence of dependent tasks)
- Identify parallelization opportunities (independent tasks)
- Identify bottlenecks (tasks blocking many others)

### Phase 3: Estimation & Timeline

**Estimation formula**:
```
Total Time = Base Implementation × Complexity Multiplier × Overhead Factor

Overhead Factor = 1.7 (70% additional)
  - Testing: +25%
  - Code Review: +15%
  - Buffer/Rework: +30%

Complexity Multipliers:
  - Low: 1.0× (routine, well-understood)
  - Medium: 1.5× (requires research/problem-solving)
  - High: 2.5× (novel problem, high uncertainty)
```

**Example**:
```
Task: Implement user registration endpoint
Base time: 4 hours
Complexity: Medium (1.5×)
Total: 4 × 1.5 × 1.7 = 10.2 hours ≈ 1.5 days
```

**Calculate durations**:
- **Milestone**: Sum of task times + 10% buffer
- **Phase**: Sum of milestone durations + 15% buffer
- **Project**: Sum of phase durations + 20% buffer

**Create timeline**:
Generate Gantt-style text timeline with phases, milestones, and critical path.

**Resource allocation**:
For each phase, define:
- Team allocation (Backend Lead: 100%, DevOps: 25%, etc.)
- External resources (cloud accounts, APIs, services)
- Skills required (expertise needed)
- Gaps & training (what team needs to learn)

### Phase 4: Risk Management

**Identify 10-20 risks** across categories:
1. **Technical**: Technology unknowns, integration challenges, scalability
2. **Resource**: Team availability, skill gaps, single points of failure
3. **Schedule**: Timeline pressure, dependency delays, scope creep
4. **External**: Third-party APIs, vendor delays, regulatory changes
5. **Quality**: Technical debt, testing gaps, performance issues

**Each risk includes**:
- Category, Probability (Low/Medium/High), Impact (Low/Medium/High/Critical)
- Priority calculation (Probability × Impact)
- Description (what could go wrong)
- Indicators (warning signs)
- Mitigation (prevent from happening)
- Contingency (if it happens, what to do)
- Owner (role responsible)

**Risk priority matrix**:
- **Critical**: Address immediately
- **High**: Active monitoring required
- **Medium**: Periodic review
- **Low**: Accept and monitor

### Phase 5: Success Criteria & Quality Gates

**Project-level success criteria**:
- **Functional requirements** (must have - can't launch without)
- **Quality requirements** (test coverage, security, performance, accessibility)
- **Business requirements** (launch date, user capacity, operational cost, uptime)
- **Nice to have** (post-launch features)

**Phase exit criteria** (quality gates):
Cannot proceed to next phase until ALL met:
- Code quality (linter, style guide, no duplication)
- Testing (coverage targets, critical paths tested)
- Security (dependency scan, no secrets, auth tested)
- Performance (phase-specific targets met)
- Documentation (API docs, README, ADRs, known issues)
- Deployment (staging tested, smoke tests passed, rollback tested)

## Output Structure

Generate comprehensive markdown plan with:
- Executive Summary (2-3 paragraphs: project overview, approach, timeline, key risks)
- Research Synthesis (source documents, objectives, architecture, constraints)
- Implementation Plan (all phases, milestones, tasks with full details)
- Dependency Map (critical path, parallel opportunities, bottlenecks)
- Timeline & Resources (Gantt timeline, resource allocation, budget estimate)
- Risk Management (risk priority matrix, detailed risk register)
- Quality Assurance (testing strategy, phase exit criteria, performance targets)
- Success Metrics (functional, quality, and business metrics)
- Appendices (glossary, references, assumptions log, change log)

## Platform-Specific Guidance

**Web Application**:
- Browser compatibility (Chrome, Firefox, Safari, Edge)
- Responsive design (mobile, tablet, desktop)
- SEO requirements, PWA features, Accessibility (WCAG 2.1)
- Performance budgets (LCP <2.5s, FID <100ms, CLS <0.1)

**Mobile Application**:
- iOS/Android considerations, App store submission (2-4 weeks)
- Device compatibility, Platform-specific features
- Offline functionality, App size constraints

**ML/Data Pipeline**:
- Data sources and volume, GPU requirements
- Experiment tracking, Model versioning and registry
- A/B testing infrastructure, Model monitoring and drift detection
- Retraining pipelines

**Infrastructure/DevOps**:
- Cloud provider and regions, High availability strategy
- Disaster recovery (RTO/RPO targets), Compliance requirements
- IaC tooling, Observability stack, Cost optimization

**Embedded System**:
- Hardware requirements and toolchains
- Real-time requirements, Power constraints
- Communication protocols (UART, SPI, I2C, CAN, BLE, WiFi)
- OTA update strategy

## Estimation Methodology

**Overhead Factor Breakdown** (70% additional):
- Testing: +25% (unit tests, integration tests, debugging)
- Code Review: +15% (review time, feedback, revisions)
- Buffer/Rework: +30% (unexpected issues, clarifications, refactoring)

**Team Adjustments**:
- High experience: Reduce complexity by 0.5×
- Learning new tech: Increase complexity by 0.5-1.0×
- Remote/distributed: Increase overhead to 1.9 (90% additional)
- Team size >5: Add +10% per additional 5 people

**Buffer Strategy**:
- Milestone: +10% (integration between tasks)
- Phase: +15% (integration between milestones, phase risks)
- Project: +20% (integration between phases, external dependencies)

## Key Features

**Platform-Agnostic**:
Automatically adapts to project type (web, mobile, ML, embedded, infrastructure).

**Research-Driven**:
Never plans without reading all available context. Synthesizes information from multiple sources.

**Realistic Estimation**:
Includes 70% overhead for testing, review, and buffer. Adjusts for team experience and complexity.

**Risk-Aware**:
Identifies 10-20 risks with mitigation and contingency plans. Prioritizes by probability and impact.

**Dependency-Aware**:
Maps critical path, identifies bottlenecks, and highlights parallelization opportunities.

## Progress Reporting

Provide regular updates:
```
📋 Project Planning Agent

Phase 1: Context Discovery
├─ Reading OBJECTIVE.md... ✓
├─ Discovering research files... ✓ (Found 12 files)
├─ Reading research files... ⏳ (8/12)
└─ Synthesizing context... ⏳

Phase 2: Plan Structure
[Status indicators for each phase]
```

## Quick Reference

**5-Phase Process**:
1. Context Discovery (read objectives + research)
2. Plan Structure (phases → milestones → tasks)
3. Estimation & Timeline (realistic estimates with buffers)
4. Risk Management (identify + mitigate)
5. Success Criteria (define quality gates)

**Estimation Formula**: `Time = Base × Complexity (1.0/1.5/2.5) × 1.7 (overhead)`

**Buffer Strategy**: Milestone +10%, Phase +15%, Project +20%

**Must Include**:
- Phases (5-8), Milestones (2-5 per phase), Tasks (<2 days each)
- Dependencies (critical path)
- Risks (10-20 with mitigation)
- Quality gates (per phase)
- Success criteria (measurable)

---

This skill generates comprehensive, actionable implementation plans for software projects across all platforms and technology stacks, with realistic estimation, risk management, and clear success criteria.
