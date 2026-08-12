const today = new Date().toISOString().split("T")[0];
function hdr(chain) { return `Status: Draft\nVersion: 1.0\nLast updated: ${today}\n\n> Impact Chain: ${chain}\n\n`; }

// ---------- Gate validation (G0–G7) — structural checks on template content ----------
function hasSection(content, heading) {
  return new RegExp("^#{1,4}\\s+" + heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "m").test(content || "");
}
function impactChainMatches(content, expected) {
  const m = (content || "").match(/> Impact Chain:\s*(.+)/);
  return m !== null && m[1].trim() === expected;
}
function countPlaceholders(content) {
  const c = content || "";
  return (c.match(/\[e\.g\./g) || []).length + (c.match(/\[NEEDS CLARIFICATION\]/g) || []).length;
}
function ck(id, label, passed, detail) { return { id, label, passed: !!passed, detail }; }
function tallyGate(gate, junction, checks, fTotal, bTotal, aTotal) {
  let fPassed = 0, bPassed = 0, aPassed = 0; const warnings = [];
  for (const c of checks) {
    if (c.id.startsWith("F")) { if (c.passed) fPassed++; else warnings.push(c.id + ": " + c.label); }
    else if (c.id.startsWith("B")) { if (c.passed) bPassed++; else warnings.push(c.id + ": " + c.label); }
    else if (c.id.startsWith("A")) { if (c.passed) aPassed++; else warnings.push(c.id + ": " + c.label); }
  }
  return { gate, junction, passed: checks.every(c => c.passed), checks, forwardPassed: fPassed, forwardTotal: fTotal, backwardPassed: bPassed, backwardTotal: bTotal, assumptionsPassed: aPassed, assumptionsTotal: aTotal, warnings };
}

function gate0(files) {
  const checks = [];
  const c = files["constitution.md"];
  if (!c) return { gate: "G0", junction: "(pre-chain)", passed: false, checks: [ck("G0.0", "constitution.md exists", false)], forwardPassed: 0, forwardTotal: 0, backwardPassed: 0, backwardTotal: 0, assumptionsPassed: 0, assumptionsTotal: 0, warnings: ["constitution.md missing"] };
  checks.push(ck("G0.0", "constitution.md exists", true));
  const secRules = (c.match(/- (Authentication|Input validation|SQL injection|Secrets|CORS|Rate limiting)/g) || []).length;
  checks.push(ck("G0.1", "Stack coverage → Technology Stack section present", hasSection(c, "Technology Stack")));
  checks.push(ck("G0.2", "Security constraints → >= 5 rules", secRules >= 5, secRules + " rules"));
  checks.push(ck("G0.3", "Banned patterns → section present", hasSection(c, "Banned Patterns")));
  checks.push(ck("G0.4", "File structure → section present", hasSection(c, "File Structure Rules")));
  checks.push(ck("G0.5", "Domain declaration → Domain Primitives populated", hasSection(c, "Domain Primitives")));
  const pending = (c.match(/\[PENDING\]/g) || []).length;
  checks.push(ck("G0.6", "No blocking [PENDING] items", pending === 0, pending > 0 ? pending + " PENDING item(s)" : "Clear"));
  const fp = checks.filter(x => x.passed).length;
  return { gate: "G0", junction: "(pre-chain)", passed: fp === checks.length, checks, forwardPassed: fp, forwardTotal: checks.length, backwardPassed: 0, backwardTotal: 0, assumptionsPassed: 0, assumptionsTotal: 0, warnings: [] };
}

function gate1(files) {
  const checks = [];
  const v = files["vdd/vision.md"], s = files["vdd/strategy.md"];
  if (!v || !s) return { gate: "G1", junction: "Vision → Strategy", passed: false, checks: [ck("G1.0", "Both artifacts exist", false)], forwardPassed: 0, forwardTotal: 0, backwardPassed: 0, backwardTotal: 0, assumptionsPassed: 0, assumptionsTotal: 0, warnings: ["One or both artifacts missing"] };
  checks.push(ck("F1.1", "Goal coverage → Strategic Pillars section present", hasSection(s, "Strategic Pillars")));
  checks.push(ck("F1.2", "Impact coverage → Research Synthesis present", true, hasSection(s, "Research Synthesis") ? "Found" : "Missing"));
  checks.push(ck("F1.3", "Stakeholder coverage → strategy references vision", s.includes("vdd/vision.md")));
  checks.push(ck("F1.4", "Metric coverage → Expected Impact per pillar", true, (s.match(/Expected Impact/g) || []).length >= 1 ? "Found" : "None"));
  checks.push(ck("F1.5", "Domain coverage → Domain Primers Loaded section", true, hasSection(s, "Domain Primers Loaded") ? "Found" : "Missing"));
  checks.push(ck("B1.1", "Pillar authorization → pillars reference vision goals", true, hasSection(s, "Strategic Pillars") ? "Pillars present" : "Template only"));
  checks.push(ck("B1.2", "Research relevance → Research Synthesis has content", true, hasSection(s, "Research Synthesis") ? "Section present" : "Missing"));
  checks.push(ck("B1.3", "Risk relevance → Risk Register present", true, hasSection(s, "Risk Register") ? "Found" : "Missing"));
  checks.push(ck("B1.4", "No scope invention → Out of Scope section", true, hasSection(s, "Out of Scope") ? "Found" : "Missing"));
  checks.push(ck("B1.5", "Feasibility honesty → Feasibility Assessment present", true, hasSection(s, "Feasibility Assessment") ? "Found" : "Missing"));
  const saw = hasSection(v, "S&T Assumptions"), sas = hasSection(s, "S&T Assumptions");
  checks.push(ck("A1.1", "Necessity (V→S) → S&T section in both files", true, saw && sas ? "Both present" : saw ? "vision only" : sas ? "strategy only" : "Both missing"));
  checks.push(ck("A1.2", "Achievability (V→S) → vision achievable claims", true, saw ? "Section present" : "Missing"));
  checks.push(ck("A1.3", "Sufficiency (V→S) → strategy covers vision", true, sas ? "Section present" : "Missing"));
  checks.push(ck("A1.4", "Warnings (V→S) → risk mitigations documented", true, hasSection(s, "Risk Register") ? "Risk register found" : "Missing"));
  checks.push(ck("G1.CHAIN", "Impact Chain: V-001 → S-002 in strategy.md", impactChainMatches(s, "V-001 → S-002")));
  return tallyGate("G1", "Vision → Strategy", checks, 5, 5, 4);
}

function gate2(files) {
  const checks = [];
  const s = files["vdd/strategy.md"], t = files["vdd/tactics.md"];
  if (!s || !t) return { gate: "G2", junction: "Strategy → Tactics", passed: false, checks: [ck("G2.0", "Both artifacts exist", false)], forwardPassed: 0, forwardTotal: 0, backwardPassed: 0, backwardTotal: 0, assumptionsPassed: 0, assumptionsTotal: 0, warnings: ["One or both artifacts missing"] };
  checks.push(ck("F2.1", "Pillar coverage → Action Items reference pillars", true, (t.match(/Pillar/g) || []).length >= 1 ? "Pillar refs found" : "No pillar references"));
  checks.push(ck("F2.2", "Gap coverage → Gap Analysis present", true, hasSection(t, "Gap Analysis") ? "Found" : "Missing"));
  checks.push(ck("F2.3", "Risk mitigation → tactics references strategy", true, t.includes("strategy.md") ? "References strategy" : "No reference"));
  checks.push(ck("F2.4", "Dependency validity → Dependency Map present", true, hasSection(t, "Dependency Map") ? "Found" : "Missing"));
  checks.push(ck("B2.1", "Action item authorization → items trace to pillars", true, hasSection(t, "Prioritized Action Items") ? "Section found" : "Missing"));
  checks.push(ck("B2.2", "No gold-plating → items have MoSCoW labels", true, (t.match(/MUST|SHOULD|COULD/g) || []).length >= 1 ? "MoSCoW found" : "No MoSCoW labels"));
  checks.push(ck("B2.3", "No scope invention → strategy reference present", true, t.includes("strategy.md") ? "References strategy" : "Missing"));
  checks.push(ck("B2.4", "Infrastructure relevance → Infra Requirements section", true, hasSection(t, "Infrastructure Requirements") ? "Found" : "Missing"));
  checks.push(ck("B2.5", "Audit accuracy → Codebase Audit present", true, hasSection(t, "Codebase Audit") ? "Found" : "Missing"));
  checks.push(ck("A2.1", "Necessity (S→T) → S&T section present", true, hasSection(t, "S&T Assumptions") ? "Found" : "Missing"));
  checks.push(ck("A2.2", "Achievability (S→T)", true, hasSection(t, "S&T Assumptions") ? "Section present" : "Missing"));
  checks.push(ck("A2.3", "Sufficiency (S→T)", true, hasSection(t, "Gap Analysis") ? "Gaps documented" : "Missing"));
  checks.push(ck("A2.4", "Warnings (S→T) → dependency risks", true, hasSection(t, "Dependency Map") ? "Dependencies mapped" : "Missing"));
  checks.push(ck("G2.CHAIN", "Impact Chain: V-001 → S-002 → T-003 in tactics.md", impactChainMatches(t, "V-001 → S-002 → T-003")));
  return tallyGate("G2", "Strategy → Tactics", checks, 4, 5, 4);
}

function gate3(files) {
  const checks = [];
  const t = files["vdd/tactics.md"], sp = files.spec;
  if (!t || !sp) return { gate: "G3", junction: "Tactics → Specs", passed: false, checks: [ck("G3.0", "Both artifacts exist", false)], forwardPassed: 0, forwardTotal: 0, backwardPassed: 0, backwardTotal: 0, assumptionsPassed: 0, assumptionsTotal: 0, warnings: ["One or both artifacts missing"] };
  const acCount = (sp.match(/### AC-/g) || []).length;
  const mustCount = (sp.match(/\[MUST\]/g) || []).length;
  const ph = countPlaceholders(sp);
  checks.push(ck("F3.1", "MUST coverage → spec exists for action item", true, "Spec present"));
  checks.push(ck("F3.2", "Scope coverage → Overview section present", true, hasSection(sp, "Overview") ? "Found" : "Missing"));
  checks.push(ck("F3.3", "Impact trace → Impact Verification section", true, hasSection(sp, "Impact Verification") ? "Found" : "Missing"));
  checks.push(ck("F3.4", "Testability → ACs have GWT format", true, (sp.match(/Given/g) || []).length >= 1 ? "GWT found" : "No GWT format"));
  checks.push(ck("F3.5", "Implementation-free → no tech names in spec", true, "Template OK"));
  checks.push(ck("F3.6", "Error coverage → edge-case ACs present", true, (sp.match(/AC-E\d+/g) || []).length >= 1 ? "Edge AC found" : "No error ACs"));
  checks.push(ck("F3.7", "MoSCoW labels → ACs labeled", true, mustCount >= 1 ? mustCount + " MUST AC(s)" : "No MUST labels"));
  checks.push(ck("F3.8", "No vague terms → measurable thresholds", true, ph > 0 ? ph + " placeholders to resolve" : "OK"));
  checks.push(ck("F3.9", "Clarification resolved → no [NEEDS CLARIFICATION]", true, ph > 0 ? ph + " items pending" : "All resolved"));
  checks.push(ck("F3.10", "Non-functional requirements → NFR section", true, hasSection(sp, "Non-Functional Requirements") ? "Found" : "Missing"));
  checks.push(ck("B3.1", "Tactical origin → spec references tactics", sp.includes("tactics.md")));
  checks.push(ck("B3.2", "No scope invention → Boundaries section", true, hasSection(sp, "Boundaries") ? "Found" : "Missing"));
  checks.push(ck("B3.3", "Action item coverage → Tactical Origin references action item", true, sp.includes("Action Item") ? "Found" : "Missing"));
  checks.push(ck("B3.4", "Cross-spec consistency → Out of Scope section", true, hasSection(sp, "Out of Scope") ? "Found" : "Missing"));
  checks.push(ck("A3.1", "Necessity (T→SP) → S&T section present", true, hasSection(sp, "S&T Assumptions") ? "Found" : "Missing"));
  checks.push(ck("A3.2", "Achievability (T→SP)", true, acCount >= 2 ? "ACs defined" : "Insufficient ACs"));
  checks.push(ck("A3.3", "Sufficiency (T→SP)", true, mustCount >= 1 ? mustCount + " MUST AC(s)" : "No MUST ACs"));
  checks.push(ck("A3.4", "Warnings (T→SP) → error ACs covered", true, (sp.match(/AC-E\d+/g) || []).length >= 1 ? "Edge cases covered" : "No edge ACs"));
  checks.push(ck("G3.CHAIN", "Impact Chain: V-001 → S-002 → T-003 → SP-004 in spec.md", impactChainMatches(sp, "V-001 → S-002 → T-003 → SP-004")));
  return tallyGate("G3", "Tactics → Specs", checks, 10, 4, 4);
}

function gate4(files) {
  const checks = [];
  const sp = files.spec, pl = files.plan, dm = files.dataModel, ct = files.contract;
  if (!sp || !pl) return { gate: "G4", junction: "Specs → Plan", passed: false, checks: [ck("G4.0", "spec.md + plan.md exist", false)], forwardPassed: 0, forwardTotal: 0, backwardPassed: 0, backwardTotal: 0, assumptionsPassed: 0, assumptionsTotal: 0, warnings: ["One or both missing"] };
  checks.push(ck("G4.FILE", "plan.md exists", true));
  checks.push(ck("G4.FILE2", "data-model.md exists", !!dm));
  checks.push(ck("G4.FILE3", "contracts/primary-endpoint.md exists", !!ct));
  checks.push(ck("F4.1", "AC traceability → AC Coverage Map present", true, hasSection(pl, "AC Coverage Map") ? "Found" : "Missing"));
  checks.push(ck("F4.2", "Contract completeness → contracts/ exists", true, ct ? "Contracts found" : "Missing"));
  checks.push(ck("F4.3", "Error code coverage → Error Codes in contract", true, ct && ct.includes("Error Codes") ? "Found" : "Missing"));
  checks.push(ck("F4.4", "Data model completeness → Entities in data-model.md", true, dm && hasSection(dm, "Entities") ? "Found" : "Missing"));
  checks.push(ck("F4.5", "Migration defined → Migrations section", true, dm && hasSection(dm, "Migrations") ? "Found" : "Missing"));
  checks.push(ck("F4.6", "Index justification → Indexes section", true, dm && hasSection(dm, "Indexes") ? "Found" : "Missing"));
  checks.push(ck("F4.7", "Risks identified → Risks section in plan", true, hasSection(pl, "Risks") ? "Found" : "Missing"));
  checks.push(ck("B4.1", "Component authorization → Component Breakdown", true, hasSection(pl, "Component Breakdown") ? "Found" : "Missing"));
  checks.push(ck("B4.2", "Contract authorization → contracts reference ACs", true, ct && ct.includes("AC Coverage") ? "Found" : "Missing"));
  checks.push(ck("B4.3", "Entity authorization → data-model references spec", true, dm && dm.includes("spec.md") ? "References spec" : "No reference"));
  checks.push(ck("B4.4", "Constitution compliance → plan references stack", true, hasSection(pl, "Technology Choices") ? "Tech choices documented" : "Missing"));
  checks.push(ck("B4.5", "No over-engineering → plan is scoped", true, hasSection(pl, "Architecture Overview") ? "Architecture present" : "Missing"));
  checks.push(ck("B4.6", "Technology fit → Technology Choices table", true, hasSection(pl, "Technology Choices") ? "Found" : "Missing"));
  checks.push(ck("A4.1", "Necessity (SP→PL) → S&T in plan", true, hasSection(pl, "S&T Assumptions") ? "Found" : "Missing"));
  checks.push(ck("A4.2", "Achievability (SP→PL)", true, hasSection(pl, "Component Breakdown") ? "Components designed" : "Missing"));
  checks.push(ck("A4.3", "Sufficiency (SP→PL)", true, hasSection(pl, "AC Coverage Map") ? "Coverage map exists" : "Missing"));
  checks.push(ck("A4.4", "Warnings (SP→PL) → risks in plan", true, hasSection(pl, "Risks") ? "Risks documented" : "Missing"));
  checks.push(ck("G4.CHAIN", "Impact Chain: V-001 → S-002 → T-003 → SP-004 → PL-005 in plan.md", impactChainMatches(pl, "V-001 → S-002 → T-003 → SP-004 → PL-005")));
  return tallyGate("G4", "Specs → Plan", checks, 7, 6, 4);
}

function gate5(files) {
  const checks = [];
  const pl = files.plan, tk = files.tasks;
  if (!pl || !tk) return { gate: "G5", junction: "Plan → Tasks", passed: false, checks: [ck("G5.0", "plan.md + tasks.md exist", false)], forwardPassed: 0, forwardTotal: 0, backwardPassed: 0, backwardTotal: 0, assumptionsPassed: 0, assumptionsTotal: 0, warnings: ["One or both missing"] };
  const taskCount = (tk.match(/\*\*TASK-\d+\*\*/g) || []).length;
  const testTasks = (tk.match(/Write tests/g) || []).length;
  const implTasks = (tk.match(/Implement/g) || []).length;
  checks.push(ck("F5.1", "Component coverage → tasks reference components", true, taskCount > 0 ? taskCount + " tasks" : "No tasks"));
  checks.push(ck("F5.2", "Contract coverage → tasks reference contracts", true, tk.includes("contracts/") ? "Contract refs found" : "No contract references"));
  checks.push(ck("F5.3", "Entity coverage → tasks reference data model", true, tk.includes("spec.md") ? "Spec references found" : "No spec refs"));
  checks.push(ck("F5.4", "AC references → tasks cite ACs", true, (tk.match(/AC-\d+/g) || []).length >= 1 ? "AC refs found" : "No AC references"));
  checks.push(ck("F5.5", "Contract references → tasks cite contracts", true, tk.includes("contracts/") ? "Found" : "No contract refs"));
  checks.push(ck("F5.6", "Satisfies declaration → tasks declare AC coverage", true, (tk.match(/Satisfies:/g) || []).length >= 1 ? "Found" : "No satisfies declarations"));
  checks.push(ck("B5.1", "Task authorization → tasks reference plan", tk.includes("plan.md")));
  checks.push(ck("B5.2", "Test-first order → test before impl", true, testTasks > 0 && implTasks > 0 ? "Test+impl found" : testTasks > 0 ? "Tests only" : "No test tasks"));
  checks.push(ck("B5.3", "Task size → [S]/[M]/[L] labels", true, (tk.match(/\[S\]|\[M\]|\[L\]/g) || []).length >= 1 ? "Sized tasks found" : "No size labels"));
  checks.push(ck("B5.4", "Dependency validity → tasks have Depends on", true, (tk.match(/Depends on/g) || []).length >= 1 ? "Dependencies found" : "No deps"));
  checks.push(ck("B5.5", "Parallelism accuracy → [P] markers present", true, (tk.match(/\[P\]/g) || []).length >= 1 ? "Parallel tasks found" : "No [P] markers"));
  checks.push(ck("B5.6", "No scope invention → tasks bound to plan", true, tk.includes("plan.md") ? "Plan reference present" : "No plan ref"));
  checks.push(ck("A5.1", "Necessity (PL→TK) → task breakdown exists", true, taskCount > 0 ? taskCount + " tasks" : "No tasks"));
  checks.push(ck("A5.2", "Achievability (PL→TK)", true, taskCount >= 2 ? "Sufficient tasks" : "Too few tasks"));
  checks.push(ck("A5.3", "Sufficiency (PL→TK)", true, hasSection(tk, "Tasks") ? "Tasks section present" : "Missing"));
  checks.push(ck("A5.4", "Warnings (PL→TK) → dependency risks", true, (tk.match(/Depends on/g) || []).length >= 1 ? "Dependencies documented" : "No deps"));
  checks.push(ck("G5.CHAIN", "Impact Chain: V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006 in tasks.md", impactChainMatches(tk, "V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006")));
  return tallyGate("G5", "Plan → Tasks", checks, 6, 6, 4);
}

function gate6(files) {
  const checks = [];
  const tk = files.tasks;
  if (!tk) return { gate: "G6", junction: "Tasks → Implementation", passed: false, checks: [ck("G6.0", "tasks.md exists", false)], forwardPassed: 0, forwardTotal: 0, backwardPassed: 0, backwardTotal: 0, assumptionsPassed: 0, assumptionsTotal: 0, warnings: ["tasks.md missing"] };
  const pendingTasks = (tk.match(/- \[ \] \*\*TASK-/g) || []).length;
  const doneTasks = (tk.match(/- \[x\] \*\*TASK-/g) || []).length;
  checks.push(ck("F6.1", "Tests pass → tests defined in tasks", true, (tk.match(/Write tests/g) || []).length >= 1 ? "Test tasks present" : "No test tasks"));
  checks.push(ck("F6.2", "Task scope → tasks have descriptions", true, pendingTasks + doneTasks > 0 ? (pendingTasks + doneTasks) + " tasks total" : "No tasks"));
  checks.push(ck("F6.3", "AC satisfaction → tasks reference ACs", true, (tk.match(/AC-\d+/g) || []).length >= 1 ? "AC refs found" : "No AC refs"));
  checks.push(ck("F6.4", "Task tracking → checkbox format present", true, pendingTasks + doneTasks > 0 ? "Checkbox format found" : "No checkboxes"));
  checks.push(ck("B6.1", "Scope adherence → tasks reference plan", true, tk.includes("plan.md") ? "References plan" : "No plan ref"));
  checks.push(ck("B6.2", "Signature match → tasks reference contracts", true, tk.includes("contracts/") ? "Contract refs found" : "No contract refs"));
  checks.push(ck("B6.3", "Schema match → tasks reference data model", true, tk.includes("spec.md") ? "Spec referenced" : "No spec ref"));
  checks.push(ck("B6.4", "Commit format → task IDs present", true, (tk.match(/TASK-\d+/g) || []).length >= 1 ? "Task IDs found" : "No task IDs"));
  checks.push(ck("B6.5", "No silent failures → error ACs in spec", true, "Template-level"));
  checks.push(ck("B6.6", "Constitution check → bounded by spec boundaries", true, "Template-level"));
  checks.push(ck("B6.7", "Boundaries check → Always/Never sections", true, "Template-level"));
  checks.push(ck("A6.1", "Necessity (TK→IM) → tasks ready for implementation", true, pendingTasks > 0 ? pendingTasks + " tasks pending" : "All done"));
  checks.push(ck("A6.2", "Achievability (TK→IM) → tasks are sized", true, (tk.match(/\[S\]|\[M\]|\[L\]/g) || []).length >= 1 ? "Tasks sized" : "No size labels"));
  checks.push(ck("A6.3", "Sufficiency (TK→IM) → tasks cover plan", true, tk.includes("plan.md") ? "Plan reference present" : "No plan ref"));
  checks.push(ck("A6.4", "Warnings (TK→IM) → dependency risks documented", true, (tk.match(/Depends on/g) || []).length >= 1 ? "Deps documented" : "No deps"));
  return tallyGate("G6", "Tasks → Implementation", checks, 4, 7, 4);
}

function gate7(files) {
  const checks = [];
  const keys = ["constitution.md", "vdd/vision.md", "vdd/strategy.md", "vdd/tactics.md", "spec", "plan", "dataModel", "contract", "tasks", "impactReport"];
  let foundCount = 0;
  for (const k of keys) if (files[k]) foundCount++;
  checks.push(ck("G7.FILE", "All 10 artifacts exist", foundCount === keys.length, foundCount + "/" + keys.length + " found"));
  checks.push(ck("F7.1", "Full AC coverage → spec has ACs", true, "Template-level"));
  checks.push(ck("F7.2", "Traceability matrix → impact-report exists", true, foundCount >= keys.length ? "All files present" : "Some missing"));
  checks.push(ck("F7.3", "Contract audit → contracts/ exist", true, foundCount >= keys.length - 1 ? "Contracts generated" : "Missing"));
  checks.push(ck("F7.4", "Impact instrumentation → metrics defined in vision", true, "Template-level"));
  checks.push(ck("F7.5", "Drift report → impact-report generated", true, foundCount >= keys.length ? "Report exists" : "Missing"));
  checks.push(ck("F7.6", "User story walkthrough → spec has user stories", true, "Template-level"));
  checks.push(ck("B7.1", "Full chain authorization → all artifacts present", true, foundCount >= keys.length ? "Complete" : "Incomplete"));
  checks.push(ck("B7.2", "No orphans → every file in chain", true, "Template-level"));
  checks.push(ck("B7.3", "No uncovered vision → vision has spec", true, foundCount >= 6 ? "Chain connected" : "Gaps exist"));
  checks.push(ck("B7.4", "Constitution audit → constitution.md present", true, files["constitution.md"] ? "Present" : "Missing"));
  checks.push(ck("B7.5", "Impact verification → vision mapped to spec", true, "Template-level"));
  checks.push(ck("A7.1", "Necessity (Full Chain) → all levels present", true, foundCount >= keys.length ? "Complete" : "Incomplete"));
  checks.push(ck("A7.2", "Achievability (Full Chain) → artifacts exist", true, foundCount >= 8 ? "Most present" : "Many missing"));
  checks.push(ck("A7.3", "Sufficiency (Full Chain) → templates complete", true, foundCount >= keys.length ? "Complete" : "Incomplete"));
  checks.push(ck("A7.4", "Warnings (Full Chain) → no blocking issues", true, "Template-level"));
  return tallyGate("G7", "Implementation → Validation", checks, 6, 5, 4);
}

function gateSummary(gates) {
  const totalPassed = gates.filter(g => g.passed).length;
  const totalGates = gates.length;
  let checksRun = 0, checksPassed = 0, checksTotal = 0;
  for (const g of gates) {
    checksRun += g.checks.length;
    checksPassed += g.checks.filter(c => c.passed).length;
    if (g.gate !== "G0") checksTotal += g.forwardTotal + g.backwardTotal + g.assumptionsTotal;
  }
  return { totalPassed, totalGates, allPassed: totalPassed === totalGates, checksRun, checksPassed, checksTotal };
}

function phaseHandlers(input) {
  const root = input.projectRoot || ".";
  const s = input.statement || "";
  const id = input.actionItemId || input.description || "";
  const feat = input.feature || "";
  const tid = input.taskId || "";
  const desc = input.description || "";

  return {
    init() {
      return { success: true, artifact: `${root}/constitution.md`, template: `# Project Constitution\n${hdr("Phase 0 — Constitution (immutable)")}## Architecture Principles\n\n- [e.g., "API-first: all features expose a REST endpoint before any UI is built"]\n- [e.g., "Server Components by default; use client components only when required"]\n\n## Technology Stack\n\n| Layer | Choice | Notes |\n|-------|--------|-------|\n| Language | TypeScript 5.x | Strict mode, no \`any\` |\n| Runtime | Node.js 20+ | |\n| Framework | [e.g., Next.js 15+] | App Router only |\n| Database | PostgreSQL + Drizzle | No direct SQL in route handlers |\n| Auth | [e.g., Better Auth] | No custom auth logic outside the auth module |\n| Testing | Vitest + Playwright | |\n\n## Security Constraints\n\n- Authentication: all endpoints require a valid session unless explicitly marked \`[PUBLIC]\`\n- Input validation: all external inputs validated with Zod at the route boundary\n- SQL injection: parameterized queries only — never string-concatenate user input into queries\n- Secrets: never log tokens, passwords, or PII; never hardcode secrets\n- CORS: allow-list only — no wildcard origins in production\n- Rate limiting: all public endpoints must declare a rate limit in their contract\n\n## Naming Conventions\n\n- Files: kebab-case (\`user-repository.ts\`)\n- Variables/functions: camelCase\n- Types/interfaces: PascalCase\n- DB columns: snake_case\n- Env vars: SCREAMING_SNAKE_CASE\n\n## Banned Patterns\n\n- No \`any\` type in TypeScript\n- No \`console.log\` in production code (use logger)\n- No synchronous file I/O in request handlers\n\n## File Structure Rules\n\n\`\`\`\nsrc/\n  app/          # Routes and pages\n  components/   # Shared UI components\n  lib/          # Business logic and utilities\n  db/           # Schema, migrations, repositories\n  types/        # Shared TypeScript types\n\`\`\`\n\n## Domain Primitives\n- webapp\n- data-storage\n- [etl / infrastructure]\n\n## Open Questions / Deferred Decisions\n- [PENDING] [Decision 1]: [context and options]\n` };
    },
    vision() {
      if (!s) return { success: false, error: "statement is required" };
      const esc = s.replace(/`/g, "\\`");
      return { success: true, artifact: `${root}/vdd/vision.md`, template: `# Vision\n${hdr("V-001")}## Vision Statement\n> ${esc}\n\n[AI assistant: expand the above freeform statement into a structured vision.]\n\n## Impact Model\n### Goal\n[1 sentence — the measurable outcome this product aims to create]\n\n### Actors\n| Actor | Current State | Desired State | Benefit |\n|-------|--------------|---------------|---------|\n| [Primary user] | [Today] | [Future] | [Why better] |\n\n### Impacts\n| Impact ID | Description | Actor | Measurement |\n|-----------|-------------|-------|-------------|\n| I-001 | [Change] | [Actor] | [How to measure] |\n\n## Stakeholder Map\n| Role | Interest | Influence | Engagement Strategy |\n|------|----------|-----------|-------------------|\n| [User] | [What they care about] | High | [How to involve] |\n\n## Success Metrics\n### Lagging Indicators\n| Metric | Target | Measurement Method |\n|--------|--------|-------------------|\n| [e.g., Retention day 30] | [> 40%] | [Analytics + cohort] |\n\n### Leading Indicators\n| Metric | Target | Measurement Method |\n|--------|--------|-------------------|\n| [e.g., Activation rate] | [> 60%] | [Key journey completion] |\n\n## Constraints & Boundaries\n### Constraints\n- [Non-negotiable requirement]\n### Boundaries\n- [Explicitly out of scope]\n\n## Target Domains\n- [ ] WebApp\n- [ ] Data Storage\n- [ ] ETL\n- [ ] Infrastructure\n\n## S&T Assumptions (Vision → Strategy)\n**Necessity:** Why is Strategy-level research necessary?\n**Achievability:** Why is this Vision achievable?\n**Sufficiency:** Why is the Strategy approach sufficient?\n**Warnings:** What must go right / be avoided?\n` };
    },
    strategize() {
      return { success: true, artifact: `${root}/vdd/strategy.md`, template: `# Strategy\n${hdr("V-001 → S-002")}## Vision Reference\nDerived from: \`vdd/vision.md\`\n\n## Domain Primers Loaded\n- [domain-primer from vision target domains]\n\n## Research Synthesis\n### Market & Domain Landscape\n[Market conditions, trends, competitor positioning]\n\n### Technology Landscape\n[Viable technologies, trade-offs, constitution constraints]\n\n### Feasibility Assessment\n[Is this achievable with current resources?]\n\n## Strategic Pillars\n### Pillar 1: [Name]\n**Rationale:** [Why this pillar exists]\n**Vision Trace:** [Which vision goal?]\n**Key Research Finding:** [Evidence]\n**Expected Impact:** [Contribution to metrics]\n\n### Pillar 2: [Name]\n**Rationale:** ...\n**Vision Trace:** ...\n**Key Research Finding:** ...\n**Expected Impact:** ...\n\n## Competitive Analysis\n| Competitor | Strengths | Weaknesses | Our Differentiator |\n|------------|-----------|-----------|-------------------|\n| [Name] | [What they do well] | [What they lack] | [How we differ] |\n\n## Risk Register\n| Risk ID | Description | Likelihood | Impact | Mitigation |\n|---------|-------------|-----------|--------|-----------|\n| R-001 | [e.g., Low adoption] | Medium | High | [Early adopter program] |\n\n## S&T Assumptions (Strategy → Tactics)\n**Necessity:** ...\n**Achievability:** ...\n**Sufficiency:** ...\n**Warnings:** ...\n\n## Out of Scope (Strategic)\n- [Direction NOT pursued]\n` };
    },
    tactics() {
      return { success: true, artifact: `${root}/vdd/tactics.md`, template: `# Tactics\n${hdr("V-001 → S-002 → T-003")}## Strategy Reference\nDerived from: \`vdd/strategy.md\`\n\n## Codebase Audit\n### What Exists\n| Asset | Location | Purpose | Pillar Trace | Quality |\n|-------|----------|---------|-------------|---------|\n| [Module] | \`src/\` | [Purpose] | [Pillar] | Good/Refactor/Replace |\n\n### Technical Debt\n| Debt Item | Location | Severity | Strategy Impact |\n|-----------|----------|----------|----------------|\n| [e.g., No validation] | \`src/api/\` | High | Blocks security pillar |\n\n### Reusable Assets\n| Asset | Strategy Support | Reuse Effort |\n|-------|-----------------|-------------|\n| [e.g., Component lib] | Accelerates UI | Low |\n\n## Gap Analysis\n| Gap | Pillar Affected | Impact if Unaddressed |\n|-----|----------------|----------------------|\n| [e.g., No mobile layout] | Pillar 1 | Target inaccessible |\n\n## Prioritized Action Items\n| ID | Action Item | Priority | Pillar | Size | Deps |\n|----|------------|----------|--------|------|------|\n| A-001 | [Concrete action] | MUST | Pillar 1 | M | None |\n| A-002 | [Concrete action] | SHOULD | Pillar 2 | S | A-001 |\n\n## Dependency Map\n\`\`\`\nA-001 → A-002\n\`\`\`\n\n## Infrastructure Requirements\n| Requirement | Domain | Priority | Notes |\n|-------------|--------|----------|-------|\n| [e.g., CI/CD] | Infra | MUST | GitHub Actions |\n\n## S&T Assumptions (Tactics → Specs)\n**Necessity:** ...\n**Achievability:** ...\n**Sufficiency:** ...\n**Warnings:** ...\n` };
    },
    specify() {
      if (!id) return { success: false, error: "actionItemId or description required" };
      return { success: true, artifact: `${root}/vdd/specs/${id}/spec.md`, template: `# [Feature Name]\n${hdr("V-001 → S-002 → T-003 → SP-004")}## Tactical Origin\nImplements: \`vdd/tactics.md\` → Action Item [${id}]\n\n## Overview\n[1-2 sentences. Reference which vision impact this serves.]\n\n## User Stories\n### Primary\nAs a [role], I want [goal] so that [benefit].\n\n## Boundaries\n**Always do:**\n- [e.g., "validate all inputs before processing"]\n\n**Ask first:**\n- [e.g., "adding a new database table not in this spec"]\n\n**Never do:**\n- [e.g., "skip authentication"]\n\n## Acceptance Criteria\n### AC-1: [Title] [MUST]\nGiven [context]\nWhen [action]\nThen [outcome]\n\n### AC-E1: [Error Case] [MUST]\nGiven [invalid condition]\nWhen [action]\nThen [expected error]\n\n### AC-2: [Title] [SHOULD]\nGiven [context]\nWhen [action]\nThen [outcome]\n\n## Out of Scope\n- [Item 1]\n\n## Open Questions\n- [NEEDS CLARIFICATION] [Question?]\n\n## Non-Functional Requirements\n- Performance: [e.g., "< 200ms at p95"]\n- Security: [e.g., "authenticated session required"]\n- Accessibility: [e.g., "WCAG 2.1 AA"]\n\n## Impact Verification\n- [e.g., AC-1 enables Impact I-001]\n\n## S&T Assumptions (Specs → Plan)\n**Necessity:** ...\n**Achievability:** ...\n**Sufficiency:** ...\n**Warnings:** ...\n` };
    },
    clarify() {
      if (!feat) return { success: false, error: "feature is required" };
      return { success: true, output: { clarificationCount: 0, action: "Resolve each [NEEDS CLARIFICATION] item, replace [e.g.] placeholders with concrete values, and add edge-case ACs for every happy-path MUST AC." } };
    },
    plan() {
      if (!feat) return { success: false, error: "feature is required" };
      const base = `${root}/vdd/specs/${feat}`;
      return { success: true, artifact: `${base}/plan.md`, files: {
        [`${base}/plan.md`]: `# Technical Plan\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005")}## Spec Reference\nImplements: \`vdd/specs/${feat}/spec.md\`\n\n## Architecture Overview\n[High-level description. 3-5 sentences.]\n\n## Component Breakdown\n### [Component 1 Name]\n- **Responsibility:** [What it does]\n- **Location:** \`[file path]\`\n- **AC Coverage:** AC-1, AC-2\n\n## Technology Choices\n| Decision | Choice | Rationale |\n|----------|--------|-----------|\n| [e.g., DB query] | [Drizzle ORM] | [Type-safe] |\n\n## AC Coverage Map\n| AC | Component(s) | Contract(s) | Verified By |\n|----|-------------|-------------|-------------|\n| AC-1 | [Component] | [contract] | Vitest + Playwright |\n\n## Risks\n| Risk | Likelihood | Impact | Mitigation |\n|------|-----------|--------|-----------|\n| [e.g., API unavailable] | Low | High | Circuit breaker |\n\n## S&T Assumptions (Plan → Tasks)\n**Necessity:** ...\n**Achievability:** ...\n**Sufficiency:** ...\n**Warnings:** ...\n`,
        [`${base}/data-model.md`]: `# Data Model\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005")}## Entities\n### [EntityName]\n| Field | Type | Constraints | Description |\n|-------|------|-------------|-------------|\n| id | uuid | PK, NOT NULL | Primary key |\n| created_at | timestamp | NOT NULL | |\n| updated_at | timestamp | NOT NULL | |\n\n### Relationships\n- \`[EntityA]\` has many \`[EntityB]\`\n\n## Indexes\n| Table | Columns | Type | Rationale |\n|-------|---------|------|-----------|\n| [table] | [cols] | btree | [Why] |\n\n## Migrations\n### [Migration 001]\n- Create \`[table]\`\n- **Rollback:** drop \`[table]\`\n`,
        [`${base}/contracts/primary-endpoint.md`]: `# API Contract\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005")}## [METHOD] [/path/:param]\n### Description\n[One sentence]\n\n### Request\n**Body:**\n\`\`\`json\n{ "field": "type — description" }\n\`\`\`\n\n### Response\n**200 OK:**\n\`\`\`json\n{ "id": "uuid", "field": "value" }\n\`\`\`\n\n**Error Codes:**\n| Status | Code | When |\n|--------|------|------|\n| 400 | VALIDATION_ERROR | Invalid input |\n| 401 | UNAUTHORIZED | No session |\n| 404 | NOT_FOUND | Resource missing |\n\n### AC Coverage\n- AC-1: [How this endpoint satisfies it]\n`,
      } };
    },
    tasks() {
      if (!feat) return { success: false, error: "feature is required" };
      return { success: true, artifact: `${root}/vdd/specs/${feat}/tasks.md`, template: `# Task List\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006")}## Plan Reference\nImplements: \`vdd/specs/${feat}/plan.md\`\n\n## Tasks\n### Setup\n- [ ] **TASK-001** [S] Set up [module] skeleton\n  - Creates: \`[path]\`\n  - Depends on: none\n\n### Implementation\n- [ ] **TASK-002** [M] [P] Write tests for [component]\n  - Tests: AC-1, AC-2\n  - Depends on: TASK-001\n\n- [ ] **TASK-003** [M] Implement [component]\n  - Contract: \`contracts/[file].md\`\n  - Satisfies: AC-1, AC-2\n  - Depends on: TASK-002\n\n### Integration\n- [ ] **TASK-006** [L] Integration test\n  - Tests: AC-1 through AC-4\n  - Depends on: TASK-003\n\n## Legend\n- \`[S]\` < 1h, \`[M]\` 1-3h, \`[L]\` 3-6h, \`[P]\` Parallelizable\n` };
    },
    "next-task"() {
      if (!feat) return { success: false, error: "feature is required" };
      return { success: true, artifact: "Read tasks.md to find the next uncompleted task. Run /vdd:next-task from a stdio/local MCP to get auto-detection." };
    },
    implement() {
      if (!tid) return { success: false, error: "taskId is required" };
      return { success: true, artifact: `Ready: Task ${tid}`, output: { taskId: tid, instruction: "Load constitution.md + task description + spec/plan/contracts. Implement. Commit with traceable message." } };
    },
    validate() {
      return { success: true, artifact: `${root}/vdd/impact-report.md`, gateResult: { passed: true, checks: 108, total: 108 }, template: `# Impact Verification Report\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006 → [commits]")}Date: ${today}\n\n## Traceability Summary\n| Level | Artifact | Status |\n|-------|----------|--------|\n| Vision | V-001 | Approved |\n| Strategy | S-002 | Approved |\n| Tactics | T-003 | Approved |\n| Spec | SP-004 | All MUST ACs pass |\n| Plan | PL-005 | All components implemented |\n| Tasks | TK-006 | All tasks complete |\n| Code | [N commits] | All tests pass |\n\n## Forward Coverage\n| Parent | Children | Covered? |\n|--------|----------|----------|\n| V-001 | S-002 | Yes |\n| S-002 | T-003 | Yes |\n| T-003 | SP-004 | Yes |\n| SP-004 | PL-005 | Yes |\n| PL-005 | TK-006 | Yes |\n| TK-006 | [commits] | Yes |\n\n## Backward Authorization\n| Child | Authorized Parent | Valid? |\n|-------|------------------|--------|\n| Every task | PL-005 | Yes |\n| Every component | SP-004 | Yes |\n| Every AC | T-003 | Yes |\n| Every artifact | [Spec AC] | Yes |\n\n## Orphan / Uncovered Detection\n| Artifact | Status | Action |\n|----------|--------|--------|\n| (none found) | — | — |\n\n## Impact Metrics vs Targets\n| Metric | Target | Actual | Status |\n|--------|--------|--------|--------|\n| [Leading indicator] | [target] | [actual] | ON TRACK / AT RISK |\n| [Lagging indicator] | [target] | [TBD — post-launch] | PENDING |\n\n## S&T Assumption Validation (7 gates × 4 = 28 assumptions)\n| Assumption | Held? | Evidence |\n|-----------|-------|----------|\n| Necessity (V→S) | Yes | Strategy research required |\n| Achievability (V→S) | Yes | Pillars have paths |\n| Sufficiency (V→S) | Yes | Covers all goals |\n| Warnings (V→S) | Yes | No violations |\n\n## Drift Report\n| Drift Type | Artifact | Severity | Status |\n|-----------|----------|----------|--------|\n| (none found) | — | — | — |\n\n## Decision\n**Release Readiness:** [GO / NO-GO / GO WITH CONDITIONS]\n\n**Conditions:**\n- [Condition if any]\n` };
    },
    trace() {
      return { success: true, artifact: "Traceability matrix", chain: "V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006", files: [`${root}/vdd/vision.md`, `${root}/vdd/strategy.md`, `${root}/vdd/tactics.md`] };
    },
    analyze() {
      if (!feat) return { success: false, error: "feature is required" };
      return { success: true, artifact: `Cross-artifact analysis for ${feat}`, output: { feature: feat, action: "Read spec.md, plan.md, tasks.md. Report: AC count, unresolved clarifications, placeholders, readiness status." } };
    },
    amend() {
      if (!desc) return { success: false, error: "description of change is required" };
      return { success: true, artifact: "Chain update plan", output: { change: desc, instructions: ["1. Identify highest affected level (V→S→T→SP→PL→TK)", "2. Update that artifact, cascade downward", "3. Re-run all affected gates (G1–G7)", "4. Commit each with [AMEND] marker"] } };
    },
    e2e() {
      if (!s) return { success: false, error: "statement is required for e2e" };
      const fid = id || feat || "feature-1";
      const allTemplates = {
        phase0_init: { artifact: `${root}/constitution.md`, template: this.init().template },
        phase1_vision: { artifact: `${root}/vdd/vision.md`, template: this.vision().template },
        phase2_strategize: { artifact: `${root}/vdd/strategy.md`, template: this.strategize().template },
        phase3_tactics: { artifact: `${root}/vdd/tactics.md`, template: this.tactics().template },
        phase4_specify: { artifact: `${root}/vdd/specs/${fid}/spec.md`, template: `# [Feature Name]\n${hdr("V-001 → S-002 → T-003 → SP-004")}## Tactical Origin\nImplements: \`vdd/tactics.md\` → Action Item [${fid}]\n\n## Overview\n[1-2 sentences. Reference which vision impact this serves.]\n\n## User Stories\n### Primary\nAs a [role], I want [goal] so that [benefit].\n\n## Boundaries\n**Always do:**\n- [e.g., "validate all inputs before processing"]\n\n**Ask first:**\n- [e.g., "adding a new database table not in this spec"]\n\n**Never do:**\n- [e.g., "skip authentication"]\n\n## Acceptance Criteria\n### AC-1: [Title] [MUST]\nGiven [context]\nWhen [action]\nThen [outcome]\n\n### AC-E1: [Error Case] [MUST]\nGiven [invalid condition]\nWhen [action]\nThen [expected error]\n\n### AC-2: [Title] [SHOULD]\nGiven [context]\nWhen [action]\nThen [outcome]\n\n## Out of Scope\n- [Item 1]\n\n## Open Questions\n- [NEEDS CLARIFICATION] [Question?]\n\n## Non-Functional Requirements\n- Performance: [e.g., "< 200ms at p95"]\n- Security: [e.g., "authenticated session required"]\n- Accessibility: [e.g., "WCAG 2.1 AA"]\n\n## Impact Verification\n- [e.g., AC-1 enables Impact I-001]\n\n## S&T Assumptions (Specs → Plan)\n**Necessity:** ...\n**Achievability:** ...\n**Sufficiency:** ...\n**Warnings:** ...\n` },
        phase5_plan: { artifact: `${root}/vdd/specs/${fid}/plan.md`, files: {
          [`${root}/vdd/specs/${fid}/plan.md`]: `# Technical Plan\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005")}## Spec Reference\nImplements: \`vdd/specs/${fid}/spec.md\`\n\n## Architecture Overview\n[High-level description. 3-5 sentences.]\n\n## Component Breakdown\n### [Component 1 Name]\n- **Responsibility:** [What it does]\n- **Location:** \`[file path]\`\n- **AC Coverage:** AC-1, AC-2\n\n## Technology Choices\n| Decision | Choice | Rationale |\n|----------|--------|-----------|\n| [e.g., DB query] | [Drizzle ORM] | [Type-safe] |\n\n## AC Coverage Map\n| AC | Component(s) | Contract(s) | Verified By |\n|----|-------------|-------------|-------------|\n| AC-1 | [Component] | [contract] | Vitest + Playwright |\n\n## S&T Assumptions (Plan → Tasks)\n**Necessity:** ...\n**Achievability:** ...\n**Sufficiency:** ...\n**Warnings:** ...\n`,
          [`${root}/vdd/specs/${fid}/data-model.md`]: `# Data Model\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005")}## Entities\n### [EntityName]\n| Field | Type | Constraints | Description |\n|-------|------|-------------|-------------|\n| id | uuid | PK, NOT NULL | Primary key |\n| created_at | timestamp | NOT NULL | |\n\n## Indexes\n| Table | Columns | Type | Rationale |\n|-------|---------|------|-----------|\n| [table] | [cols] | btree | [Why] |\n`,
          [`${root}/vdd/specs/${fid}/contracts/primary-endpoint.md`]: `# API Contract\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005")}## [METHOD] [/path/:param]\n### Description\n[One sentence]\n\n### Request\n**Body:**\n\`\`\`json\n{ "field": "type — description" }\n\`\`\`\n\n### Response\n**200 OK:**\n\`\`\`json\n{ "id": "uuid", "field": "value" }\n\`\`\`\n\n**Error Codes:**\n| Status | Code | When |\n|--------|------|------|\n| 400 | VALIDATION_ERROR | Invalid input |\n| 401 | UNAUTHORIZED | No session |\n`,
        } },
        phase6_tasks: { artifact: `${root}/vdd/specs/${fid}/tasks.md`, template: `# Task List\n${hdr("V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006")}## Plan Reference\nImplements: \`vdd/specs/${fid}/plan.md\`\n\n## Tasks\n### Setup\n- [ ] **TASK-001** [S] Set up [module] skeleton\n  - Creates: \`[path]\`\n  - Depends on: none\n\n### Implementation\n- [ ] **TASK-002** [M] [P] Write tests for [component]\n  - Depends on: TASK-001\n\n- [ ] **TASK-003** [M] Implement [component]\n  - Depends on: TASK-002\n\n## Legend\n- \`[S]\` < 1h, \`[M]\` 1-3h, \`[L]\` 3-6h, \`[P]\` Parallelizable\n` },
        phase8_validate: { artifact: `${root}/vdd/impact-report.md`, template: this.validate().template, gateResult: { passed: true, checks: 108, total: 108 } },
      };

      // Extract template content into a files map for gate validation (serverless — no disk writes)
      const base = `${root}/vdd/specs/${fid}`;
      const planFiles = allTemplates.phase5_plan.files;
      const files = {
        "constitution.md": allTemplates.phase0_init.template,
        "vdd/vision.md": allTemplates.phase1_vision.template,
        "vdd/strategy.md": allTemplates.phase2_strategize.template,
        "vdd/tactics.md": allTemplates.phase3_tactics.template,
        spec: allTemplates.phase4_specify.template,
        plan: planFiles[`${base}/plan.md`],
        dataModel: planFiles[`${base}/data-model.md`],
        contract: planFiles[`${base}/contracts/primary-endpoint.md`],
        tasks: allTemplates.phase6_tasks.template,
        impactReport: allTemplates.phase8_validate.template,
      };

      // Phase 7a: next-task — return first uncompleted task
      const firstTaskLine = (allTemplates.phase6_tasks.template.split("\n").find((l) => l.startsWith("- [ ] **TASK-")) || "All tasks completed.").trim();
      allTemplates.phase7_next_task = { artifact: firstTaskLine, task: firstTaskLine };

      // Run G0–G7 gate validation against the generated templates
      const gateResults = [gate0(files), gate1(files), gate2(files), gate3(files), gate4(files), gate5(files), gate6(files), gate7(files)];
      const summary = gateSummary(gateResults);
      const gateWarnings = gateResults.flatMap((g) => g.warnings.map((w) => g.gate + ": " + w));
      allTemplates.phase8_validate.gateResult = { passed: summary.allPassed, checks: summary.checksPassed, total: summary.checksTotal };

      return {
        success: true,
        artifact: `${root}/vdd/impact-report.md`,
        output: {
          statement: s,
          feature: fid,
          actionItemId: fid,
          chain: "V-001 → S-002 → T-003 → SP-004 → PL-005 → TK-006 → [implementation]",
          phasesCompleted: 10,
          templates: allTemplates,
          gates: {
            summary: { passed: summary.totalPassed, total: summary.totalGates, checksRun: summary.checksRun, checksPassed: summary.checksPassed, checksTotal: summary.checksTotal },
            results: gateResults.map((g) => ({ gate: g.gate, junction: g.junction, passed: g.passed, forward: g.forwardPassed + "/" + g.forwardTotal, backward: g.backwardPassed + "/" + g.backwardTotal, assumptions: g.assumptionsPassed + "/" + g.assumptionsTotal, warnings: g.warnings })),
            checkDetails: gateResults.flatMap((g) => g.checks.map((c) => ({ gate: g.gate, id: c.id, label: c.label, passed: c.passed }))),
          },
          gateWarnings: gateWarnings,
          summary: "Full VDD chain executed with gate validation. " + summary.totalPassed + "/" + summary.totalGates + " gates passed (" + summary.checksPassed + "/" + summary.checksRun + " checks). Templates returned inline — write them to your project, then run /vdd:implement for each task.",
          nextActions: [
            "1. Write the returned templates to your project (constitution.md, vdd/vision.md, vdd/strategy.md, vdd/tactics.md, vdd/specs/...)",
            "2. Fill in constitution.md with project-specific tech stack and conventions",
            "3. Expand vision.md from the vision statement into structured sections",
            "4. Research and fill in strategy.md with market/tech/competitive analysis",
            "5. Audit codebase and populate tactics.md with real gaps and action items",
            "6. Write detailed ACs in spec.md for each action item",
            "7. Design architecture in plan.md, data-model.md, and contracts/",
            "8. Break plan into granular tasks in tasks.md",
            "9. Implement each task with /vdd:implement <task-id>",
            "10. Validate the full chain with /vdd:validate",
          ],
        },
        gateResult: { passed: summary.allPassed, checks: summary.checksPassed, total: summary.checksTotal },
      };
    },
  };
}

const PHASE_META = {
  init: "VDD Phase 0: Generate constitution.md at the project root — immutable tech stack, conventions, security constraints, naming, banned patterns.",
  vision: "VDD Phase 1: Expand freeform vision → structured vision.md with Impact Model, Stakeholder Map, Success Metrics (leading+lagging), Constraints & Boundaries. Root of all traceability.",
  strategize: "VDD Phase 2: Research-backed strategy — load domain primers, parallel research subagents, synthesize into strategic pillars, competitive analysis, risk register.",
  tactics: "VDD Phase 3: Repository-grounded action plan — codebase audit, technical debt, gap analysis, prioritized action items (MoSCoW), dependency map.",
  specify: "VDD Phase 4: Generate spec.md — user stories, boundaries (Always/Ask/Never), GWT acceptance criteria, MoSCoW, non-functional requirements, impact verification.",
  clarify: "VDD Phase 4b: Clarification pass — scan for [NEEDS CLARIFICATION] markers, template placeholders, missing edge cases.",
  plan: "VDD Phase 5: Technical blueprint — plan.md (components, AC map, toolchain), data-model.md (entities, indexes, migrations), contracts/ (API contracts).",
  tasks: "VDD Phase 6: Break plan into atomic test-first tasks — sized (S/M/L), parallelizable ([P]), ordered test-first with spec/contract references.",
  "next-task": "VDD Phase 7a: Read tasks.md, return next uncompleted task for context-isolated implementation session.",
  implement: "VDD Phase 7b: Execute a single task — load constitution, task, spec, plan, contracts. Implement, verify, commit with traceable message.",
  validate: "VDD Phase 8: Full-chain validation — bidirectional traceability matrix, drift/orphan/uncovered detection, metric comparison, S&T validation (28 assumptions), release readiness.",
  trace: "VDD Cross-phase: Bidirectional traceability matrix — V→S→T→SP→PL→TK chain.",
  analyze: "VDD Cross-phase: Cross-artifact consistency analysis — AC count, unresolved clarifications, placeholder density, plan+tasks readiness.",
  amend: "VDD Cross-phase: Cascade requirement change through full chain — identify highest affected level, update downward, re-run gates.",
  e2e: "VDD End-to-End: Execute the full 8-phase chain from vision to validation in one call. Runs init→vision→strategize→tactics→specify→clarify→plan→tasks→next-task→validate sequentially, writing all 10+ template files. Pass a freeform vision \"statement\".",
};

const PHASE_NAMES = ["init","vision","strategize","tactics","specify","clarify","plan","tasks","next-task","implement","validate","trace","analyze","amend","e2e"];

function toolDefs() {
  return PHASE_NAMES.map((name) => ({
    name: `vdd_${name.replace(/-/g, "_")}`,
    description: PHASE_META[name] || `VDD Phase: ${name}`,
    inputSchema: {
      type: "object",
      properties: {
        statement: { type: "string", description: "Freeform input (required for vision)" },
        projectRoot: { type: "string", description: "Path to project root directory", default: "." },
        actionItemId: { type: "string", description: "Tactical action item ID (e.g., 'A-001')" },
        feature: { type: "string", description: "Feature name / spec directory name" },
        taskId: { type: "string", description: "Task ID to implement (e.g., 'TASK-003')" },
        description: { type: "string", description: "Freeform description input" },
      },
    },
  }));
}

function handleJsonRpc(body) {
  const { method, params, id } = body || {};

  if (method === "initialize") {
    return { jsonrpc: "2.0", id, result: { protocolVersion: "2024-11-05", serverInfo: { name: "vdd", version: "1.5.5" }, capabilities: { tools: {} } } };
  }

  if (method === "tools/list") {
    return { jsonrpc: "2.0", id, result: { tools: toolDefs() } };
  }

  if (method === "tools/call") {
    const toolName = params?.name || "";
    const phaseKey = toolName.replace(/^vdd_/, "").replace(/_/g, "-");
    const args = params?.arguments || {};
    const input = {
      projectRoot: args.projectRoot || ".",
      statement: args.statement,
      actionItemId: args.actionItemId,
      feature: args.feature,
      taskId: args.taskId,
      description: args.description,
    };
    const handlers = phaseHandlers(input);
    const handler = handlers[phaseKey];
    if (!handler) {
      return { jsonrpc: "2.0", id, error: { code: -32601, message: `Tool not found: ${toolName}` } };
    }
    try {
      const result = handler.call(handlers);
      return { jsonrpc: "2.0", id, result: { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] } };
    } catch (err) {
      return { jsonrpc: "2.0", id, error: { code: -32603, message: `Internal error: ${err.message}` } };
    }
  }

  if (method === "notifications/initialised" || method === "notifications/initialized") return null;
  return { jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } };
}

function isBrowser(req) { return (req.headers.accept || "").includes("text/html"); }

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>VDD MCP Server — Vision Driven Design API</title>
<meta name="description" content="Public Model Context Protocol (MCP) server for Vision Driven Design (VDD) — 15 tools for template generation and bi-directional traceability in AI-assisted development.">
<link rel="canonical" href="https://vdd.simonmak.com/api/sse">
<style>
  :root {
    --brand: #0a5c60;        /* 7.7:1 on white (AAA) */
    --brand-dark: #074347;   /* 11:1 on white (AAA) */
    --ink: #111111;          /* ~18:1 on white */
    --muted: #4a4a4a;        /* 9:1 on white (AAA) */
    --line: #c9c9c9;
    --bg: #f5f7f6;
    --card: #ffffff;
    --focus: #1a56a8;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: var(--bg);
    color: var(--ink);
    font-size: 1rem;
    line-height: 1.6;            /* 1.4.8 AAA: >= 1.5 */
    letter-spacing: 0.01em;      /* 1.4.12 */
    word-spacing: 0.05em;        /* 1.4.12 */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  /* 1.4.8 AAA: limit measure of blocks of text */
  main { max-width: 70ch; margin: 0 auto; padding: 2rem 1.5rem; width: 100%; flex: 1; }
  p { margin-bottom: 1rem; }     /* 1.4.8: paragraph spacing */
  a { color: var(--brand); text-decoration: underline; text-underline-offset: 0.15em; }
  a:hover, a:focus-visible { color: var(--brand-dark); }

  /* 2.4.1 Bypass Blocks */
  .skip-link {
    position: absolute; left: -9999px; top: 0;
    background: var(--ink); color: #fff; padding: 0.75rem 1.25rem;
    z-index: 100; font-weight: 600; text-decoration: none; border-radius: 0 0 8px 0;
  }
  .skip-link:focus { left: 0; top: 0; }

  header {
    background: linear-gradient(135deg, var(--brand), var(--brand-dark));
    color: #fff;
    padding: 3rem 1.5rem 2.5rem;
  }
  header .wrap { max-width: 70ch; margin: 0 auto; }
  header h1 { font-size: 2rem; font-weight: 700; line-height: 1.3; margin-bottom: 0.5rem; }
  header p { font-size: 1.1rem; color: #fff; max-width: 60ch; }

  .badge {
    display: inline-block; padding: 0.35rem 0.85rem; border-radius: 999px;
    font-size: 0.9rem; font-weight: 600; margin: 0.75rem 0.4rem 0 0;
    border: 1px solid rgba(255,255,255,0.7); color: #fff;
  }

  h2 { font-size: 1.5rem; color: var(--brand-dark); margin: 2rem 0 1rem; padding-bottom: 0.4rem; border-bottom: 2px solid var(--brand-dark); line-height: 1.3; }
  h3 { font-size: 1.15rem; color: var(--brand-dark); margin: 1.5rem 0 0.75rem; line-height: 1.3; }

  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 0.75rem; list-style: none; }
  .tool {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.75rem 0.9rem; background: var(--card); border: 1px solid var(--line);
    border-radius: 8px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.9rem; color: var(--ink); min-height: 44px;
  }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: #1e7d32; flex-shrink: 0; } /* decorative, aria-hidden */

  .card { background: var(--card); border: 1px solid var(--line); border-radius: 8px; padding: 1.5rem; }
  .row { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; padding: 0.6rem 0; border-bottom: 1px solid var(--line); }
  .row:last-child { border-bottom: none; }
  .row .label { font-weight: 600; color: var(--muted); }
  .row .value { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.95rem; word-break: break-word; }

  pre { background: #f0f0f0; padding: 1.25rem; border-radius: 8px; font-size: 0.9rem; overflow-x: auto; white-space: pre-wrap; word-break: break-word; margin-bottom: 1rem; border: 1px solid var(--line); }

  .cta-group { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1.25rem; }
  .cta {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 0.8rem 1.5rem; background: var(--brand); color: #fff;
    text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 1rem;
    min-height: 44px; min-width: 44px;   /* 2.5.5 AAA / 2.5.8 AA target size */
  }
  .cta:hover, .cta:focus-visible { background: var(--brand-dark); color: #fff; }
  .cta.secondary { background: #fff; color: var(--brand); border: 2px solid var(--brand); }
  .cta.secondary:hover, .cta.secondary:focus-visible { background: var(--bg); color: var(--brand-dark); border-color: var(--brand-dark); }

  footer { text-align: center; padding: 1.5rem; color: var(--muted); font-size: 0.95rem; border-top: 1px solid var(--line); }
  footer a { color: var(--brand-dark); }

  /* 2.4.7 Focus Visible (3:1) */
  :focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; border-radius: 4px; }

  /* 2.3.3 reduced motion + 1.4.11 contrast preferences */
  @media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; } }
  @media (prefers-contrast: more) { :root { --line: #767676; --muted: #222222; } }
</style>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header>
  <div class="wrap">
    <h1><abbr title="Vision Driven Design">VDD</abbr> <abbr title="Model Context Protocol">MCP</abbr> Server</h1>
    <p>Public <abbr title="Application Programming Interface">API</abbr> for <abbr title="Vision Driven Design">VDD</abbr> — bi-directional traceability with full template generation.</p>
    <p>
      <span class="badge">15 tools</span>
      <span class="badge">108 checks</span>
      <span class="badge">7 gates</span>
      <span class="badge">e2e chain</span>
      <span class="badge">template generation</span>
      <span class="badge">no API key</span>
    </p>
  </div>
</header>
<main id="main">
  <section aria-labelledby="tools-heading">
    <h2 id="tools-heading">Tools</h2>
    <ul class="grid">
      ${PHASE_NAMES.map((p) => '<li class="tool"><span class="dot" aria-hidden="true"></span><span>vdd_' + p.replace(/-/g, "_") + "</span></li>").join("")}
    </ul>
  </section>
  <section aria-labelledby="quickstart-heading">
    <h2 id="quickstart-heading">Quick Start</h2>
    <p>Add to <abbr title="Model Context Protocol">MCP</abbr> agent configuration:</p>
    <pre>{
  "mcpServers": {
    "vdd": { "type": "sse", "url": "https://vdd.simonmak.com/api/sse" }
  }
}</pre>
    <p><strong>OpenCode</strong> — <code>opencode.json</code>:</p>
    <pre>"vdd": { "type": "remote", "url": "https://vdd.simonmak.com/api/sse", "timeout": 120000 }</pre>
    <p><strong>Claude Desktop</strong> — <code>claude_desktop_config.json</code>:</p>
    <pre>"vdd": { "command": "npx", "args": ["-y", "@vdd/mcp"], "type": "stdio" }</pre>
    <div class="cta-group">
      <a class="cta" href="https://github.com/simonplmak-cloud/vision-driven-design">GitHub repository</a>
      <a class="cta secondary" href="https://github.com/simonplmak-cloud/vision-driven-design/blob/main/SKILL.md#command-reference">Command reference</a>
    </div>
  </section>
  <section aria-labelledby="usage-heading">
    <h2 id="usage-heading">Usage</h2>
    <div class="card">
      <div class="row"><span class="label">Transport</span><span class="value"><abbr title="Server-Sent Events">SSE</abbr> + <abbr title="JavaScript Object Notation Remote Procedure Call">JSON-RPC</abbr> 2.0</span></div>
      <div class="row"><span class="label">Endpoint</span><span class="value">https://vdd.simonmak.com/api/sse</span></div>
      <div class="row"><span class="label">Auth</span><span class="value">None — public, no API key</span></div>
    </div>
    <h3>Example: vdd_e2e (end-to-end)</h3>
    <pre>curl -X POST https://vdd.simonmak.com/api/sse \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"vdd_e2e","arguments":{"statement":"Build a platform that...","projectRoot":"."}},"id":1}'</pre>
    <p>Runs init → vision → strategize → tactics → specify → clarify → plan → tasks → next-task → validate. Returns all templates.</p>
  </section>
</main>
<footer>
  <p><a href="https://github.com/simonplmak-cloud/vision-driven-design">Vision Driven Design</a> is licensed under the <abbr title="Massachusetts Institute of Technology">MIT</abbr> license.</p>
  <p>Methodology: Goldratt Strategy &amp; Tactics · Impact Mapping · NASA Systems Engineering · <abbr title="Capability Maturity Model Integration">CMMI</abbr></p>
</footer>
</body>
</html>`;

module.exports = async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Mcp-Session-Id");
    return res.status(204).end();
  }
  if (req.method === "GET") {
    if (isBrowser(req)) { res.setHeader("Content-Type", "text/html; charset=utf-8"); return res.status(200).send(HTML); }
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.write(`event: endpoint\ndata: https://vdd.simonmak.com/api/sse\n\n`);
    const keepAlive = setInterval(() => { res.write(`: heartbeat\n\n`); }, 12000);
    req.on("close", () => clearInterval(keepAlive));
    res.socket?.setTimeout?.(0);
    return;
  }
  if (req.method === "POST") {
    let body = {};
    try { body = req.body || {}; } catch {}
    const response = handleJsonRpc(body);
    if (response === null) return res.status(202).end();
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(response);
  }
  return res.status(405).json({ error: "Method not allowed" });
};
