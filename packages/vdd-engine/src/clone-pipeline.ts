// Clone pipeline orchestrator — normalizes a domain, then runs the full
// crawl → capture → evidence → schema → backend → site → tools chain.
// Crawl (browserless/fetch) and browser capture (Playwright) are best-effort;
// the pure stages always run.

import { normalizeDomain } from './normalize-domain.js';
import { crawlSite } from './crawl.js';
import { capture } from './capture.js';
import { recordEvidence } from './evidence.js';
import { inferSchema } from './infer-schema.js';
import { generateBackend } from './generate-backend.js';
import { generateSite } from './generate-site.js';
import { emitTools } from './emit-tools.js';
import type { CaptureBundle, EvidenceBundle, GeneratedBackend, GeneratedSite, InferredModel, SiteDataset, ToolManifest } from './clone-types.js';

export interface CloneResult {
  normalized: { scheme: string; host: string };
  dataset?: SiteDataset;
  capture?: CaptureBundle;
  evidence?: EvidenceBundle;
  model: InferredModel;
  backend: GeneratedBackend;
  site?: GeneratedSite;
  tools: ToolManifest[];
  crawlSkipped: boolean;
  browserSkipped: boolean;
}

export interface ClonePipelineOptions {
  timeoutMs?: number;
  maxPages?: number;
  crawl?: boolean;
  browser?: boolean;
}

export async function runClone(domain: string, options: ClonePipelineOptions = {}): Promise<CloneResult> {
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
    crawlSkipped: false,
    browserSkipped: true,
  };

  if (options.crawl !== false) {
    try {
      result.dataset = await crawlSite(target, { maxPages: options.maxPages, timeoutMs: options.timeoutMs });
    } catch {
      result.crawlSkipped = true;
    }
  }

  let evidence: EvidenceBundle = { records: [] };
  if (options.browser !== false) {
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
  if (result.dataset) {
    result.site = generateSite(result.dataset, result.capture);
  }
  result.tools = emitTools(result.model);
  return result;
}
