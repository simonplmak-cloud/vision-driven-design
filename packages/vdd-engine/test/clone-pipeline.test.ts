import { describe, it, expect } from 'vitest';
import { runClone } from '../src/clone-pipeline.js';

describe('runClone (pure, browser disabled)', () => {
  it('normalizes and produces deterministic empty output without a browser', async () => {
    const r = await runClone('https://www.example.com', { browser: false });
    expect(r.normalized).toEqual({ scheme: 'https', host: 'example.com' });
    expect(r.browserSkipped).toBe(true);
    expect(r.model.entities).toEqual([]);
    expect(r.backend.migrations).toEqual([]);
    expect(r.tools).toHaveLength(5);
  });

  it('rejects an invalid domain', async () => {
    await expect(runClone('not a url', { browser: false })).rejects.toThrow('INVALID_HOST');
  });
});
