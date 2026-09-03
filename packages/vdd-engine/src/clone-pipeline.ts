// Clone pipeline orchestrator — normalizes a domain, then runs the full
// capture → evidence → schema → backend → tools chain. Browser stages are
// best-effort (Playwright via dynamic import); the pure stages always run.

import { normalizeDomain } from './normalize-domain.js';
import { capture } from './capture.js';
import { recordEvidence } from './evidence.js';
import { inferSchema } from './infer-schema.js';
import { generateBackend } from './generate-backend.js';
import { emitTools } from './emit-tools.js';
import type { CaptureBundle, EvidenceBundle, GeneratedBackend, InferredModel, ToolManifest } from './clone-types.js';

export interface CloneResult {
  normalized: { scheme: string; host: string };
  capture?: CaptureBundle;
  evidence?: EvidenceBundle;
  model: InferredModel;
  backend: GeneratedBackend;
  tools: ToolManifest[];
  browserSkipped: boolean;
}

export async function runClone(domain: string, options?: { timeoutMs?: number; browser?: boolean }): Promise<CloneResult> {
  const normalized = normalizeDomain(domain);
  if ('code' in normalized) {
    throw new Error(normalized.code + ': ' + normalized.message);
  }
  const target = normalized.scheme + '://' + normalized.host;

  const result: CloneResult = {
    normalized: { scheme: normalized.scheme, host: normalized.host },
    model: { entities: [], relationships: [] },
    backend: { migrations: [], routes: [] },
    tools: [],
    browserSkipped: true,
  };

  let evidence: EvidenceBundle = { records: [] };
  if (options?.browser !== false) {
    try {
      result.capture = await capture(target, options);
      evidence = await recordEvidence(target, options);
      result.evidence = evidence;
      result.browserSkipped = false;
    } catch {
      result.browserSkipped = true;
    }
  }

  result.model = inferSchema(evidence);
  result.backend = generateBackend(result.model);
  result.tools = emitTools(result.model);
  return result;
}
