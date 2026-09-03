export { PHASES } from './engine.js';
export { normalizeDomain } from './normalize-domain.js';
export type { NormalizedUrl, NormalizeError } from './normalize-domain.js';
export { inferSchema } from './infer-schema.js';
export { generateBackend } from './generate-backend.js';
export { emitTools } from './emit-tools.js';
export { capture } from './capture.js';
export { recordEvidence } from './evidence.js';
export { runClone } from './clone-pipeline.js';
export type {
  EvidenceBundle, EvidenceRecord, InferredModel, InferredEntity, InferredField,
  InferredRelationship, CaptureBundle, GeneratedBackend, Migration, RouteSpec, ToolManifest,
} from './clone-types.js';
export { VddContext, VddOutput, VddPhaseInput, VddMode, Constitution } from './types.js';
export type { VddPhaseFn } from './types.js';
export {
  PHASE_NAMES,
  PHASE_META,
  TOOL_REQUIREMENTS,
  TOOL_KEYS,
  RESEARCH_SUBAGENTS,
  DOMAIN_PRIMERS,
  detectEnvironment,
  domainPrimersForTargets,
} from './meta.js';
export type {
  PhaseName,
  PhaseMeta,
  ToolRequirements,
  ResearchSubagent,
  DomainPrimer,
  EnvironmentReport,
} from './meta.js';
