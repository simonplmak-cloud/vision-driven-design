// Shared types for the `-clone` pipeline (A-002 … A-007).

export interface NormalizedUrl {
  scheme: 'https' | 'http';
  host: string;
}

export interface NormalizeError {
  code: 'EMPTY_DOMAIN' | 'INVALID_HOST';
  message: string;
}

export interface EvidenceRecord {
  operation: string; // e.g. "GET /api/products"
  method: string;
  url: string;
  samples: unknown[]; // parsed JSON bodies
  sampleCount: number;
}

export interface EvidenceBundle {
  records: EvidenceRecord[];
}

export interface InferredField {
  name: string;
  type: string; // 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null' | 'unknown'
  required: boolean;
  confidence: 'high' | 'low';
}

export interface InferredEntity {
  name: string;
  fields: InferredField[];
}

export interface InferredRelationship {
  source: string;
  target: string;
  via: string;
  kind: 'belongsTo';
}

export interface InferredModel {
  entities: InferredEntity[];
  relationships: InferredRelationship[];
}

export interface CaptureBundle {
  domain: string;
  html: string;
  cssTokens: Record<string, string>;
  fonts: string[];
  breakpoints: number[];
}

export interface Migration {
  entity: string;
  up: string;
  down: string;
}

export interface RouteSpec {
  entity: string;
  method: string;
  path: string;
  summary: string;
}

export interface GeneratedBackend {
  migrations: Migration[];
  routes: RouteSpec[];
}

export interface ToolManifest {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface GeneratedSiteFile {
  path: string;
  content: string;
}

export interface GeneratedSite {
  index: string;
  files: GeneratedSiteFile[];
}

export interface CrawledPage {
  url: string;
  path: string;
  title: string;
  description: string;
  lang: string;
  headings: string[];
  paragraphs: string[];
  images: string[];
  links: string[];
}

export interface SiteDataset {
  root: string;
  crawledAt: string;
  maxPages: number;
  truncated: boolean;
  pages: CrawledPage[];
}

export type PageFetcher = (url: string) => Promise<string | null>;

export interface CrawlOptions {
  maxPages?: number;
  timeoutMs?: number;
  fetcher?: PageFetcher;
}
