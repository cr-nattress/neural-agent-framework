# Claude Skills Quick Start Guide

**6 Skills Ready to Use** | **No Setup Required** | **Start Now!**

---

## 🚀 Quick Commands

```bash
/plan              # Generate implementation plan
/backlog           # Create Agile backlog
/readme            # Generate README.md
/persona           # Create developer persona
/analyze-solver    # Analyze problem-solving style
/psych-profile     # Generate psychological profile
```

---

## 📋 Common Workflows

### 1️⃣ Start New Project (Most Common)

```bash
# Step 1: Create OBJECTIVE.md
cat > OBJECTIVE.md << 'EOF'
# Objective: My Project

## Goal
Build a [description]

## Success Criteria
- [criterion 1]
- [criterion 2]

## Tech Stack
- [technology 1]
- [technology 2]
EOF

# Step 2: Generate plan
/plan

# Step 3: Generate backlog
/backlog

# Step 4: Generate README
/readme

# Done! Check:
# - IMPLEMENTATION-PLAN.md (your roadmap)
# - backlog/ (executable tasks)
# - README.md (documentation)
```

**Time**: 5-10 minutes
**Output**: Complete project structure

---

### 2️⃣ Document Existing Project

```bash
# Generate README for existing project
/readme

# Review and customize
vim README.md

# Commit
git add README.md
git commit -m "docs: add comprehensive README"
```

**Time**: 2-3 minutes
**Output**: Professional README.md

---

### 3️⃣ Personalize AI Assistant

```bash
# Create your persona
/persona "Senior full-stack engineer, 10 years experience,
prefer TypeScript, focus on clean architecture..."

# Analyze your problem-solving approach
/analyze-solver

# Generate psychological profile
/psych-profile

# Result: AI adapts to your style
```

**Time**: 5 minutes
**Output**: Personalized AI assistance

---

## 💡 Example Usage

### Planning a Web App

```bash
# 1. Define objective
cat > OBJECTIVE.md << 'EOF'
# Objective: Recipe Sharing Platform

## Goal
Build a web app where users share and rate recipes

## Success Criteria
- User authentication working
- Recipe CRUD operations
- Rating and commenting
- Search functionality
- Launch in 12 weeks

## Tech Stack
- React (frontend)
- Node.js (backend)
- PostgreSQL (database)

## Constraints
- Solo developer
- Budget: $0 (free hosting)
EOF

# 2. Generate plan
/plan
# → Creates IMPLEMENTATION-PLAN.md (50+ pages)
# → 7 phases, 28 milestones, 142 tasks

# 3. Generate backlog
/backlog
# → Creates /backlog folder
# → Epic files, Story files, Task prompts

# 4. Start coding!
cd backlog
cat README.md
cat epic-01-foundation/story-01-project-setup/task-01-initialize-repo.md
```

---

### Documenting CLI Tool

```bash
# Navigate to your CLI project
cd my-cli-tool

# Generate README
/readme
# → Analyzes package.json
# → Identifies CLI structure
# → Creates README with:
#    - Installation instructions
#    - Command reference
#    - Examples
#    - Configuration

# Review and adjust
vim README.md
```

---

### Creating Team Member Persona

```bash
# Generate persona for new team member
/persona "Junior frontend developer, 2 years experience,
React proficiency, learning TypeScript, prefers detailed
explanations, works best with examples, visual learner,
Pacific timezone"

# Save to team documentation
mv persona-output.md team/personas/alex-frontend.md

# AI now knows how to help Alex better
```

---

## 📖 Skill Details

### `/plan` - Planning Agent

**Input**: OBJECTIVE.md (+ optional research files)
**Output**: IMPLEMENTATION-PLAN.md
**Time**: 5-10 minutes
**Size**: 50-150 pages

**Creates**:
- Phases (5-8)
- Milestones (2-5 per phase)
- Tasks (5-15 per milestone)
- Risk analysis
- Timeline & resources
- Dependencies

---

### `/backlog` - Backlog Generator

**Input**: IMPLEMENTATION-PLAN.md
**Output**: /backlog folder
**Time**: 10-15 minutes
**Size**: 100+ files

**Creates**:
- Epic folders
- Story subfolders
- Task prompt files
- Index files
- README.md

---

### `/readme` - README Generator

**Input**: Codebase analysis
**Output**: README.md
**Time**: 2-5 minutes
**Size**: 500-5000 words

**Creates**:
- Project description
- Installation guide
- Usage examples
- Features list
- Architecture overview
- Contributing guide

---

### `/persona` - Persona Generator

**Input**: Professional description
**Output**: Structured persona document
**Time**: 2-3 minutes
**Size**: 2-3 pages

**Creates**:
- Technical profile
- Communication preferences
- Work patterns
- Support guidelines

---

### `/analyze-solver` - Problem-Solving Analyzer

**Input**: Conversation history
**Output**: Problem-solving analysis
**Time**: 3-5 minutes
**Size**: 2-4 pages

**Creates**:
- Executive summary
- Cognitive traits
- Problem-solving framework
- Strengths & biases
- Type definition

---

### `/psych-profile` - Psychological Profile

**Input**: Conversation analysis
**Output**: Psychological profile
**Time**: 2-3 minutes
**Size**: 1-2 pages

**Creates**:
- Personality summary
- Communication style
- Strengths & growth areas
- Personal type

---

## 🔧 Troubleshooting

### Skill Not Found

```bash
# Check skills directory
ls .claude/skills/

# Should see:
# - plan.md
# - backlog.md
# - README.md
# - persona.md
# - analyze-solver.md
# - psych-profile.md
```

### Missing Input File

```bash
# For /plan
# Need: OBJECTIVE.md
cat > OBJECTIVE.md << 'EOF'
# Objective: [Your Project]
...
EOF

# For /backlog
# Need: IMPLEMENTATION-PLAN.md
# Run /plan first
```

### Customizing Output

All skills generate files that you can:
- Review and edit
- Customize to your needs
- Commit to version control
- Share with team

---

## 📚 More Information

**Full Documentation**:
- `.claude/skills/SKILLS-CREATED.md` - Complete skill reference
- `prompts/RECOMMENDED-CLAUDE-SKILLS.md` - All 20 recommended skills
- `prompts/SKILLS-QUICK-REFERENCE.md` - Quick lookup table
- `prompts/COMPLETE-WORKFLOW-GUIDE.md` - End-to-end workflows

**Source Prompts**:
- `prompts/GENERIC-PLANNING-PROMPT.md`
- `prompts/BACKLOG-GENERATOR-PROMPT.md`
- `prompts/README-GENERATOR.md`
- `prompts/PERSONA-GENERATOR.md`
- `prompts/PROBLEM-SOLVER-ANALYSIS.md`
- `prompts/PSYCH-PROFILE-GENERATOR.md`

---

## ✅ Next Steps

1. **Try the basic workflow**:
   ```bash
   # Create OBJECTIVE.md
   # Run /plan
   # Run /backlog
   ```

2. **Document an existing project**:
   ```bash
   /readme
   ```

3. **Personalize your AI**:
   ```bash
   /persona "your professional background"
   ```

4. **Explore other skills** in the documentation

---

**Ready to start?** Pick a workflow above and try it now! 🚀

---

**Last Updated**: October 29, 2025
**Skills Version**: 1.0
**Status**: ✅ All Skills Tested and Working
