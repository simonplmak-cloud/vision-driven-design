# VDD Demo Video Script

> Impact Chain: V-001 → S-002 → T-003 → A-007

*5-minute screen recording walkthrough. Record with OBS, Loom, or RepoClip.*

## Scene 1: The Problem (30 seconds)

**Visual**: Terminal with failed AI generation attempts — code that "looks right" but doesn't connect to any real goal.

**Narration**: "You've been there. You tell the AI to build something. It generates code. Looks plausible. But does it actually solve the problem you started with? Nobody knows — because there's no trace from your original intent to this code."

## Scene 2: VDD in One Command (45 seconds)

**Visual**: Terminal — user types `/vdd:vision "I want to build a personal task tracker that helps people stay organized without complexity..."`

**Narration**: "Vision Driven Design changes this. You describe the impact you want to create. The AI handles everything else. Research. Codebase audit. Specs. Plans. Implementation. Validation. All with bidirectional verification at every step."

## Scene 3: The Chain Runs (2 minutes)

**Visual**: Each phase output scrolls by:
- `vdd/vision.md` being generated (show impact model)
- `vdd/strategy.md` being generated (show research synthesis)
- `vdd/tactics.md` being generated (show action items)
- `vdd/specs/.../spec.md` being generated (show ACs)
- `vdd/specs/.../plan.md` being generated (show architecture)

**Narration**: "Phase 1: Vision. The AI expands your statement into a structured impact model — who benefits, what changes, how you'll measure success. Phase 2: Strategy. The AI spawns 5 parallel research subagents — market analysis, competitive landscape, technology assessment, impact feasibility, domain deep-dive — and synthesizes strategic pillars. Phase 3: Tactics. The AI audits your codebase, maps existing assets to strategy, identifies gaps, and produces prioritized action items. Phase 4: Specs. For each action item, the AI generates precise acceptance criteria with MoSCoW priorities and error cases."

## Scene 4: Bidirectional Gates (1 minute)

**Visual**: Gate validation output — "Gate G4 (SP→PL): PASS. Forward: 7/7. Backward: 6/6. S&T: 4/4."

**Narration**: "At every junction, VDD runs bidirectional verification. Forward: does every parent goal have children that collectively cover it? Backward: does every child artifact trace back to an authorized parent? 108 checks across 7 gates. Nothing is missed. Nothing is invented."

## Scene 5: The Payoff (45 seconds)

**Visual**: `/vdd:validate` output — full traceability matrix, drift report, S&T assumption validation.

**Narration**: "Phase 8: Validate. Every line of code traces back to your original vision statement. Zero drift. All 28 S&T assumptions validated. Impact metrics instrumented. You didn't just build code — you built impact. And you can prove it."

**Visual**: GitHub repo with all `vdd/` artifacts and working code.

**Narration**: "Vision Driven Design. From vision to verified impact. Install the OpenCode skill at github.com/simonplmak-cloud/vision-driven-design."

## Recording Notes

- Screen resolution: 1920x1080
- Font size: Large enough for YouTube/embed playback
- No background music in scenes with terminal output
- Show real-time typing, not pre-recorded playback
- Pause 3 seconds on each important output before advancing
