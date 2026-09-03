// A-004 — Schema inference (pure, deterministic).
// Infers a confidence-ranked entity/relationship model from recorded network evidence.
// The output is explicitly an *inferred* model, not a recovered original schema.

import type { EvidenceBundle, InferredEntity, InferredField, InferredModel, InferredRelationship } from './clone-types.js';

function toType(v: unknown): string {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  const t = typeof v;
  return t === 'object' ? 'object' : t;
}

function singularize(word: string): string {
  if (word.endsWith('ies')) return word.slice(0, -3) + 'y'; // categories → category
  if (word.endsWith('es')) return word.slice(0, -2); // boxes → box
  if (word.endsWith('s')) return word.slice(0, -1); // products → product
  return word;
}

function entityNameFromOperation(operation: string): string {
  const path = operation.replace(/^(GET|POST|PUT|PATCH|DELETE)\s+/, '');
  const segments = path.split('/').filter(Boolean);
  const last = segments[segments.length - 1];
  if (!last) return 'Entity';
  const cleaned = singularize(last.replace(/[{}]/g, ''));
  if (!cleaned) return 'Entity';
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export function inferSchema(evidence: EvidenceBundle): InferredModel {
  const samplesByEntity: Record<string, unknown[][]> = {};
  for (const rec of evidence.records) {
    const name = entityNameFromOperation(rec.operation);
    if (!samplesByEntity[name]) samplesByEntity[name] = [];
    for (const s of rec.samples) {
      if (Array.isArray(s)) samplesByEntity[name].push(s);
      else samplesByEntity[name].push([s]);
    }
  }

  const entityNames = Object.keys(samplesByEntity);
  const entities: InferredEntity[] = [];
  const fieldMap: Record<string, Record<string, InferredField>> = {};

  for (const name of entityNames) {
    const all = samplesByEntity[name];
    const flat = all.flat().filter((o): o is Record<string, unknown> => !!o && typeof o === 'object' && !Array.isArray(o));
    const total = flat.length;
    const acc: Record<string, { types: Set<string>; count: number }> = {};
    for (const obj of flat) {
      for (const [k, v] of Object.entries(obj)) {
        if (!acc[k]) acc[k] = { types: new Set(), count: 0 };
        acc[k].types.add(toType(v));
        acc[k].count++;
      }
    }
    const fields: InferredField[] = Object.entries(acc).map(([k, v]) => ({
      name: k,
      type: v.types.size === 1 ? [...v.types][0] : 'unknown',
      required: v.count === total,
      confidence: v.count >= total * 0.75 ? 'high' : 'low',
    }));
    fieldMap[name] = Object.fromEntries(fields.map((f) => [f.name, f]));
    entities.push({ name, fields });
  }

  const relationships: InferredRelationship[] = [];
  for (const ent of entities) {
    for (const f of ent.fields) {
      const lower = f.name.toLowerCase();
      if (lower.endsWith('id') && lower !== 'id') {
        const target = f.name.slice(0, -2);
        const cap = target.charAt(0).toUpperCase() + target.slice(1);
        if (entityNames.includes(cap)) {
          relationships.push({ source: ent.name, target: cap, via: f.name, kind: 'belongsTo' });
        }
      }
    }
  }

  return { entities, relationships };
}
