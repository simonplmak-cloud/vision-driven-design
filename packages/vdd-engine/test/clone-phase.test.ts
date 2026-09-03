import { describe, it, expect } from 'vitest';
import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { PHASES } from '../src/index.js';

describe('clone phase', () => {
  it('AC-3/AC-1: normalizes domain and writes vdd/clone.md', async () => {
    const root = await fs.mkdtemp(join(tmpdir(), 'vdd-clone-'));
    try {
      const result = await PHASES['clone'](
        { description: 'https://www.ascent-partners.com', json: false },
        { projectRoot: root, mode: 'auto' },
      );
      expect(result.success).toBe(true);
      expect(result.output?.normalized).toBe('https://ascent-partners.com');
      const content = await fs.readFile(join(root, 'vdd/clone.md'), 'utf-8');
      expect(content).toContain('https://ascent-partners.com');
      expect(content).toContain('[x] A-001 domain normalization');
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });

  it('AC-E1: rejects invalid domain (delegates to normalizeDomain)', async () => {
    const root = await fs.mkdtemp(join(tmpdir(), 'vdd-clone-'));
    try {
      const result = await PHASES['clone'](
        { description: 'not a url', json: false },
        { projectRoot: root, mode: 'auto' },
      );
      expect(result.success).toBe(false);
      expect(result.error).toContain('INVALID_HOST');
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });
});
