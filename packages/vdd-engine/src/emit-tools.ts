// A-007 — AI-tool emission (pure, deterministic).
// Emits a snake_case tool manifest set covering capture, inference, and verification.

import type { InferredModel, ToolManifest } from './clone-types.js';

export function emitTools(model: InferredModel): ToolManifest[] {
  const entityNames = model.entities.map((e) => e.name);
  return [
    {
      name: 'clone_capture_site',
      description: 'Capture UI/UX, CSS design tokens, typography, and breakpoints from a target domain.',
      inputSchema: {
        type: 'object',
        properties: { domain: { type: 'string' } },
        required: ['domain'],
      },
    },
    {
      name: 'clone_record_evidence',
      description: 'Record network evidence (requests + JSON responses) to infer a schema.',
      inputSchema: {
        type: 'object',
        properties: { domain: { type: 'string' } },
        required: ['domain'],
      },
    },
    {
      name: 'clone_infer_schema',
      description: 'Infer a confidence-ranked entity model from captured evidence.',
      inputSchema: {
        type: 'object',
        properties: { evidence: { type: 'object' } },
        required: ['evidence'],
      },
    },
    {
      name: 'clone_generate_backend',
      description: 'Generate migrations and CRUD routes from the inferred model.',
      inputSchema: {
        type: 'object',
        properties: { model: { type: 'object' } },
        required: ['model'],
      },
    },
    {
      name: 'clone_verify',
      description: 'Verify the clone pipeline outputs are consistent and traceable.',
      inputSchema: {
        type: 'object',
        properties: { entities: { type: 'array', items: { type: 'string', enum: entityNames } } },
        required: ['entities'],
      },
    },
  ];
}
