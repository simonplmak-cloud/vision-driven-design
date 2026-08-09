# Contributing

Thanks for your interest in improving Vision Driven Design.

## How to Contribute

1. **Open an issue** to discuss the change before writing code. This is a documentation/skill repo — most changes are to Markdown files.

2. **For edits:**
   - Identify the **authoritative source** for the concept you're changing (see [AGENTS.md](AGENTS.md#file-roles--authoritative-sources))
   - Make changes to the canonical file first, then propagate to derived files
   - Keep gate check counts consistent across all files (currently 113)
   - Keep command tables consistent across SKILL.md, README.md, and quick-reference.md

3. **For new content:**
   - New anti-patterns: append to the end of `references/anti-patterns.md`, do not renumber
   - New domain primers: add to `domain-primers/` and update `SKILL.md`'s Domain Primers table
   - New commands: add to SKILL.md, README.md, and `references/quick-reference.md`

4. **Submit a PR** with a clear description of what changed and why.

## Repository Conventions

- Phase numbering (0–8) is stable — never renumber
- Impact Chain headers use `V-`, `S-`, `T-`, `A-`, `SP-`, `PL-`, `TK-` prefixes
- Bi-directional gates each have: forward checks, backward checks, 4 S&T assumptions
- VDD must remain a superset of SDD — every SDD command and feature must have a VDD equivalent
