# VDD Agent SDK Concept

> Impact Chain: V-001 → S-002 → T-003 → A-023

A lightweight protocol that any AI coding agent platform can implement to natively support Vision Driven Design.

## What the SDK Provides

| Component | Description | Format |
|-----------|-------------|--------|
| `vdd-commands.json` | Command definitions (`/vdd:init`, `/vdd:vision`, etc.) that agents register | JSON schema |
| `vdd-templates/` | All artifact templates (vision.md, strategy.md, etc.) for agents to generate | Markdown |
| `vdd-gates.yaml` | Gate check definitions — forward + backward verification rules | YAML |
| `vdd-prompts/` | Prompt patterns for each phase — agents can embed directly | Markdown |
| `vdd-skill.json` | Skill metadata compatible with OpenCode, Claude Code, Cursor skill formats | JSON |

## Agent Integration Points

### Level 1: Skill/Auto-Detect (Current — Already Implemented)
- Agent detects `constitution.md` or `vdd/` directory
- Auto-loads VDD context
- Supports `/vdd:*` commands via skill system

### Level 2: Native Commands (Target)
- Agent registers `/vdd:*` as first-class commands
- `/vdd:init` auto-runs when creating a new project
- `/vdd:trace` shows live traceability matrix in IDE

### Level 3: Deep Integration (Future)
- Agent's built-in plan/research modes use VDD chain
- Bidirectional gates run automatically on PR creation
- Impact metrics dashboard in agent UI

## Implementation Plan

1. Publish `vdd-sdk/` directory with the standard files above
2. Request inclusion in OpenCode's default skill registry
3. Add Claude Code skill compatibility (already partially done via skill format)
4. Create Cursor rule templates (already done in `scripts/vdd-agent-setup.sh`)
5. Create Copilot instruction templates (already done)

## Cross-Agent Compatibility

VDD artifacts are plain Markdown — any agent can read them. The SDK standardizes:
- Where VDD files live (`vdd/` directory)
- What SKILL.md looks like (OpenCode format)
- What gate checks validate (YAML definitions)
