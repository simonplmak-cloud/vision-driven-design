// A-005 — Backend generation (pure, deterministic).
// Emits migrations (with rollback) and CRUD route specs from the inferred model.

import type { GeneratedBackend, InferredModel, Migration, RouteSpec } from './clone-types.js';

function sqlType(t: string): string {
  switch (t) {
    case 'number': return 'numeric';
    case 'boolean': return 'boolean';
    case 'object':
    case 'array': return 'jsonb';
    default: return 'text';
  }
}

export function generateBackend(model: InferredModel): GeneratedBackend {
  const migrations: Migration[] = model.entities.map((e) => {
    const cols = e.fields
      .map((f) => `  ${f.name} ${sqlType(f.type)}${f.name === 'id' ? ' PRIMARY KEY' : ''}${f.required ? ' NOT NULL' : ''}`)
      .join(',\n');
    const table = e.name.toLowerCase() + 's';
    const up = `CREATE TABLE ${table} (\n${cols}\n);`;
    const down = `DROP TABLE ${table};`;
    return { entity: e.name, up, down };
  });

  const routes: RouteSpec[] = model.entities.flatMap((e) => {
    const base = '/' + e.name.toLowerCase() + 's';
    return [
      { entity: e.name, method: 'GET', path: base, summary: `List ${e.name}` },
      { entity: e.name, method: 'GET', path: `${base}/:id`, summary: `Get ${e.name}` },
      { entity: e.name, method: 'POST', path: base, summary: `Create ${e.name}` },
      { entity: e.name, method: 'PATCH', path: `${base}/:id`, summary: `Update ${e.name}` },
      { entity: e.name, method: 'DELETE', path: `${base}/:id`, summary: `Delete ${e.name}` },
    ];
  });

  return { migrations, routes };
}
