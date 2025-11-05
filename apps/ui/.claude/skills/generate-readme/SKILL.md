---
name: generate-readme
description: Generate beautiful, professional README.md files following industry best practices. Analyzes project structure and creates comprehensive documentation with compelling headers, quick start guides, feature highlights, and community resources. Use when user asks to "generate README", "create project documentation", "improve README", "README best practices", or "write outstanding README".
---

# README Generator

Generate beautiful, professional, and unforgettable README.md files following industry best practices from top open-source projects.

## Core Purpose

Create or update README.md files that are:
- **Beautiful** - Professional formatting with visual elements
- **Eye-catching** - Compelling tagline and value proposition
- **Modern** - Follows current best practices and trends
- **Unforgettable** - Makes users want to try it immediately

## Core Workflow

### Phase 1: Repository Analysis

**Scan project structure:**
1. Read package.json, requirements.txt, Cargo.toml, go.mod, or equivalent
2. Identify programming languages and frameworks
3. Check for existing documentation (docs/, README, CONTRIBUTING)
4. Analyze configuration files

**Understand functionality:**
1. Review main entry points and core files
2. Examine example code or tests
3. Identify core features and unique capabilities
4. Determine unique selling points
5. Check for existing diagrams or architecture docs

**Detect project context:**
1. Check for LICENSE file
2. Look for CONTRIBUTING.md
3. Identify if open-source or internal
4. Find existing community channels (Discord, Twitter, etc.)

### Phase 2: README Generation

**1. Compelling Header**

Generate project name, one-line tagline, and badges:

```markdown
# Project Name

One-line tagline that captures essence and value.

![Build Status](https://github.com/user/repo/workflows/CI/badge.svg)
![Version](https://img.shields.io/npm/v/package-name)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Coverage](https://img.shields.io/codecov/c/github/user/repo)
```

Badges should cover:
- CI/Build status
- Version/Release
- License
- Coverage
- Downloads/Stars (if applicable)

**2. Table of Contents** (if 5+ sections)

Generate clickable TOC that matches all section headings.

**3. Project Introduction** (2-3 sentences)

Clear explanation of:
- What the project does
- Why it exists (value proposition)
- Who should use it

**4. Quick Start / Installation**

Provide copy-paste ready instructions:

```markdown
### Prerequisites
- [Language/Runtime] version X+
- [Key tool] (optional)

### Installation
\`\`\`bash
[Installation command]
\`\`\`

### Hello World Example
\`\`\`[language]
[Minimal working example]
\`\`\`

Expected output:
\`\`\`
[Expected output]
\`\`\`
```

**5. Usage & Examples** (3-5 practical examples)

Include:
- Well-commented code
- Realistic use cases (not foo/bar)
- Expected outputs
- Links to full examples directory

```markdown
## Usage Examples

### Basic Example
\`\`\`[language]
[Code example]
\`\`\`

### Advanced Example
\`\`\`[language]
[More complex scenario]
\`\`\`

See the [examples directory](./examples) for more.
```

**6. Features & Highlights** (5-10 items)

Create bulleted list with emoji:

```markdown
## Features

- 🚀 **High Performance** - [Brief description with metrics if available]
- 📦 **Zero Dependencies** - [Brief description]
- 🔒 **Type Safe** - [Brief description]
- 🎯 **Developer Friendly** - [Brief description]
```

**7. Core Concepts / Architecture**

Brief explanation of:
- How the project works (high-level)
- Design philosophy or principles
- Key concepts users should understand
- Architecture diagram placeholder (if complex)

**8. Documentation & Resources**

Link to additional resources:

```markdown
## Documentation

- 📖 [Full Documentation](https://docs.example.com)
- 🎓 [Getting Started Guide](./docs/getting-started.md)
- 📘 [API Reference](./docs/api.md)
- 🎥 [Video Tutorials](https://youtube.com/...)
```

**9. Community & Support**

Provide support channels:

```markdown
## Community & Support

- 💬 [GitHub Discussions](https://github.com/user/repo/discussions)
- 🐛 [GitHub Issues](https://github.com/user/repo/issues)
- 💬 [Discord Server](https://discord.gg/...)
- 🐦 [Twitter](https://twitter.com/...)
```

**10. Contributing**

Warm invitation with guidelines:

```markdown
## Contributing

We love contributions! 🎉

Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
\`\`\`bash
git clone [repo]
cd [repo]
[install commands]
[test commands]
\`\`\`
```

**11. Roadmap** (Optional)

Include future plans:

```markdown
## Roadmap

Planned improvements:
- [ ] Feature X
- [ ] Performance optimization Y
- [ ] Integration with Z

See [project board](https://github.com/user/repo/projects/1) for details.
```

**12. License**

Clear license statement:

```markdown
## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

Copyright © 2025 [Your Name]
```

### Phase 3: Quality Assurance

Before finalizing, verify:

- ✅ Badge URLs are valid or marked as TODO
- ✅ All code examples have syntax highlighting
- ✅ Installation commands are correct and copy-paste ready
- ✅ Links are tested or marked as TODO
- ✅ Table of Contents anchors match headings
- ✅ No broken markdown formatting
- ✅ Spelling and grammar checked
- ✅ Tone is consistent throughout
- ✅ Mobile-friendly (no excessively wide content)
- ✅ Appropriate length (not too brief, not overwhelming)

## Formatting Rules

### Visual Elements

1. **Badges** - Use shields.io format:
   ```markdown
   ![Build](https://img.shields.io/github/workflow/status/user/repo/CI)
   ![Version](https://img.shields.io/npm/v/package-name)
   ![License](https://img.shields.io/badge/license-MIT-blue)
   ```

2. **Code Fences** - Always include language hint:
   ```markdown
   \`\`\`javascript
   const example = true;
   \`\`\`
   ```

3. **Tables** - For comparisons and structured data:
   ```markdown
   | Feature | This Project | Alternative |
   |---------|--------------|-------------|
   | Speed   | Fast         | Slow        |
   ```

4. **Emoji** - Use sparingly (max 5-7 total):
   - 🚀 for performance/deployment
   - 📦 for installation/packages
   - 🔒 for security
   - 📚 for documentation
   - 💡 for features/ideas
   - 🐛 for bugs
   - ✅ for completed/verified

5. **Inline Code** - For filenames, commands, variables:
   ```markdown
   Edit the `package.json` file
   Run `npm install`
   Set the `API_KEY` environment variable
   ```

### Content Style

- **Active voice**: "Run the server" not "The server is run"
- **Second person**: "You can install..." not "One can install..."
- **Short paragraphs**: Maximum 3-5 sentences
- **Scannable**: Heavy use of bullets and headings
- **Consistent terminology**: Same names throughout
- **Professional yet friendly**: Approachable authority
- **Fact-based**: Back claims with data or links

## Platform-Specific Guidance

**Web Applications:**
- Include browser compatibility information
- Mention responsive design / mobile-first
- Note accessibility (WCAG) compliance
- Reference performance budgets

**Libraries/Frameworks:**
- Show API examples prominently
- Include TypeScript types if applicable
- Demonstrate configuration options
- Provide migration guides

**CLI Tools:**
- Show command syntax clearly
- Include flag/option explanations
- Reference GIF demonstrations
- Include shell completion instructions

**APIs/Services:**
- Show endpoint examples with curl
- Include authentication setup
- Provide rate limiting info
- Show response examples (JSON/XML)

**Mobile Applications:**
- Include app store links
- Show platform compatibility
- Reference offline functionality
- Include screenshots/GIFs

## Key Features

**Intelligent Analysis:**
- Automatically detects project type (framework, API, library, CLI, application)
- Identifies technology stack from dependencies
- Extracts core functionality and unique features
- Determines target audience

**Comprehensive Structure:**
- All essential sections included
- Proper information hierarchy
- Visual elements for scanning
- Professional formatting

**Professional Tone:**
- Friendly but authoritative
- Clear, scannable formatting
- Active voice with direct instructions
- Consistent terminology

**Best Practice Standards:**
- Follows patterns from top projects (Express.js, FastAPI, Fastify, NestJS)
- Includes proper badges and visual elements
- Well-organized and easy to navigate
- Mobile-friendly rendering

## Progress Reporting

Provide regular updates:

```
📝 README Generator

Phase 1: Repository Analysis... ✓
├─ Project type detected: Web Application
├─ Tech stack identified: Next.js + TypeScript
├─ Dependencies analyzed: 45 packages

Phase 2: README Generation... ⏳
├─ Header & badges... ✓
├─ Quick Start... ⏳
├─ Features... Pending
├─ Documentation... Pending

Phase 3: Quality Assurance... Pending
```

## Quality Checklist

Before finalizing:

- [ ] Project name and tagline are compelling
- [ ] All badges are valid or marked TODO
- [ ] Quick start example actually works
- [ ] Code blocks have language hints
- [ ] Links point to real resources or marked TODO
- [ ] Table of Contents anchors match headings
- [ ] No markdown formatting errors
- [ ] Spelling and grammar correct
- [ ] Consistent tone throughout
- [ ] Mobile-friendly formatting
- [ ] Appropriate length for project scope
- [ ] Installation <5 minutes
- [ ] Features clearly highlight unique value
- [ ] Community sections are warm and inviting

## Quick Reference

**12-Section Structure:**
1. Header & Badges
2. Table of Contents
3. Introduction
4. Quick Start / Installation
5. Usage Examples
6. Features & Highlights
7. Architecture / Core Concepts
8. Documentation & Resources
9. Community & Support
10. Contributing
11. Roadmap (optional)
12. License

**Tone**: Professional yet approachable, authoritative but welcoming

**Must Include:**
- Clear value proposition
- Working quick start example
- Feature highlights
- Documentation links
- Contributing guidelines
- License information

**Special Considerations:**
- For open-source: emphasize community and contribution
- For libraries: show API examples and type definitions
- For CLI tools: show command syntax and GIFs
- For APIs: show endpoint examples and auth setup

---

This skill generates comprehensive, professional README.md files that immediately communicate value and guide users to success in less than 5 minutes.
