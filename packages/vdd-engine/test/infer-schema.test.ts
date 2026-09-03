import { describe, it, expect } from 'vitest';
import { inferSchema } from '../src/infer-schema.js';
import type { EvidenceBundle } from '../src/clone-types.js';

const evidence: EvidenceBundle = {
  records: [
    {
      operation: 'GET /api/products',
      method: 'GET',
      url: 'GET /api/products',
      samples: [
        [
          { id: '1', title: 'Chair', price: 99.5, categoryId: 'c1' },
          { id: '2', title: 'Table', price: 150 },
        ],
      ],
      sampleCount: 2,
    },
    {
      operation: 'GET /api/categories',
      method: 'GET',
      url: 'GET /api/categories',
      samples: [[{ id: 'c1', name: 'Furniture' }]],
      sampleCount: 1,
    },
  ],
};

describe('inferSchema', () => {
  it('infers entities from operation signatures (singularized)', () => {
    const model = inferSchema(evidence);
    expect(model.entities.map((e) => e.name)).toEqual(['Product', 'Category']);
  });

  it('infers field types, required-ness, and confidence', () => {
    const model = inferSchema(evidence);
    const product = model.entities.find((e) => e.name === 'Product');
    expect(product).toBeDefined();
    const id = product!.fields.find((f) => f.name === 'id');
    expect(id?.type).toBe('string');
    expect(id?.required).toBe(true);
    expect(id?.confidence).toBe('high');
    const price = product!.fields.find((f) => f.name === 'price');
    expect(price?.type).toBe('number');
    const categoryId = product!.fields.find((f) => f.name === 'categoryId');
    expect(categoryId?.required).toBe(false);
    expect(categoryId?.confidence).toBe('low');
  });

  it('infers belongsTo relationships from *Id fields', () => {
    const model = inferSchema(evidence);
    expect(model.relationships).toContainEqual({ source: 'Product', target: 'Category', via: 'categoryId', kind: 'belongsTo' });
  });

  it('returns an empty model for no evidence', () => {
    expect(inferSchema({ records: [] })).toEqual({ entities: [], relationships: [] });
  });
});
