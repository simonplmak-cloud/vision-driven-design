# VDD Localization Guide

> Impact Chain: V-001 → S-002 → T-003 → A-010

Want to translate VDD into your language? This guide explains how.

## Getting Started

1. Copy `i18n/template.md` to `i18n/[language-code]/`
2. Translate each section
3. Submit a PR

## Translation Priorities

| Priority | File | Why |
|----------|------|-----|
| 1 | `README.md` | First thing users see |
| 2 | `SKILL.md` overview section | Skill description in OpenCode |
| 3 | `vdd/docs/tutorial.md` | 30-minute getting started |
| 4 | `vdd/docs/vision-canvas.md` | Non-technical entry point |
| 5 | `references/quick-reference.md` | Cheat sheet |

## Language Codes

Use ISO 639-1 codes: `zh` (Chinese), `es` (Spanish), `hi` (Hindi), `ar` (Arabic), `fr` (French), `pt` (Portuguese), `ru` (Russian), `ja` (Japanese), `ko` (Korean), `de` (German), etc.

## Style Guidelines

- Preserve code blocks and commands as-is
- Translate prose, not technical terms (`/vdd:init` stays `/vdd:init`)
- Keep markdown formatting intact
- Add `(translated from English)` note in the header

## Community Translations

Active translations and their maintainers:

| Language | Status | Maintainer |
|----------|--------|------------|
| `zh` (Chinese) | Needed | — |
| `es` (Spanish) | Needed | — |
| `hi` (Hindi) | Needed | — |
| `ar` (Arabic) | Needed | — |

*Want to start a translation? Open a GitHub Discussion: "Translating VDD to [language]"*
