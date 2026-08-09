# VDD Telemetry & Instrumentation Plan

> Impact Chain: V-001 → S-002 → T-003 → A-008

Version: 1.0 | Last updated: 2026-08-10

## Principles

- **Opt-in only** — never collect data without explicit consent
- **Minimal** — collect only what's needed to measure VDD's impact
- **Transparent** — all collection endpoints and data structures are documented here
- **Anonymous** — no PII, no IP addresses, no repository names, no code content

## Data Collected (Opt-in)

When users opt in (via `VDD_TELEMETRY=1` env var or prompt consent), collect:

| Event | Data | Purpose |
|-------|------|---------|
| `/vdd:init` | Skill version, OS platform | Count installations |
| `/vdd:vision` | Target domains declared (webapp, data-storage, etc.) | Domain adoption |
| `/vdd:validate` | Gate results (pass/fail counts), chain length | Quality signal |
| Error/abandon | Phase where event occurred (no error details) | Usability gaps |

## Data NOT Collected

- No repository names, file paths, or code content
- No user identity, email, or GitHub username
- No vision.md, strategy.md, or spec content
- No IP addresses
- No timestamps beyond aggregates

## Implementation

A minimal, zero-dependency measurement approach:

```markdown
# In SKILL.md — telemetry opt-in prompt (shown once on first /vdd:init)

VDD can optionally collect anonymous usage metrics to help improve the skill.
This collects only: skill version, target domains, and phase completion rates.

No code, no repo names, no user identity — ever.

To enable: export VDD_TELEMETRY=1
To disable: export VDD_TELEMETRY=0 (default)

See vdd/docs/telemetry.md for full details.
```

## Impact Measurement Template (for VDD adopters)

This is the template VDD users fill out to report project impact:

```markdown
## VDD Project Impact Report

Project domain: [webapp / data-storage / etl / infrastructure]
VDD mode: [full-auto / gated]
Project age: [months since /vdd:init]

### Before VDD
- How was this project managed before? [ad-hoc / SDD / TDD / other]
- What was the main pain point? [drift / unclear requirements / AI generating wrong code / other]

### After VDD
- Time from vision to first deploy: [days]
- Spec drift incidents: [count — caught by gates vs discovered in production]
- Team confidence in AI-generated code: [1-5]
- Would you continue using VDD? [yes / no / maybe]

### Impact achieved (optional)
- Did the project achieve its vision goals? [yes / partially / not yet]
- Which success metric was hit? [from vision.md]
- Which success metric was missed? [from vision.md]
```
