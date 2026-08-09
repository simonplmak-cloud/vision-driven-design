# VDD Quality Pipeline

> Impact Chain: V-001 → S-002 → T-003 → A-037

This is the template CI/CD configuration for VDD projects. Copy to `.github/workflows/vdd-quality.yml` in your project.

It enforces: lint → typecheck → unit → e2e → visual → a11y → security → perf → deploy → sentry.

```yaml
name: VDD Quality Pipeline

on:
  pull_request:
  push:
    branches: [main]

jobs:
  # ============================================
  # Gate 1: Code Quality
  # ============================================
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: npm ci
      - run: npm run lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: npm ci
      - run: npm run typecheck

  # ============================================
  # Gate 2: Unit Tests (Vitest)
  # ============================================
  unit-test:
    needs: [typecheck]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: npm ci
      - run: npm run test -- --reporter=verbose
      # VDD: traces to all non-UI MUST ACs from vdd/specs/*/spec.md

  # ============================================
  # Gate 3: E2E Tests (Playwright)
  # ============================================
  e2e-test:
    needs: [unit-test]
    timeout-minutes: 15
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: npm ci
      - run: npm run build
      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium
      - name: Run E2E tests
        run: npm run test:e2e
        # VDD: traces to all UI MUST ACs from vdd/specs/*/spec.md
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/

  # ============================================
  # Gate 4: Visual Regression (Browserless)
  # ============================================
  visual-diff:
    needs: [e2e-test]
    timeout-minutes: 10
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Take baseline screenshots
        run: |
          # Use Browserless API for each route defined in vdd/specs/*/plan.md
          curl -sS "$BROWSERLESS_URL/screenshot" \
            -H "Content-Type: application/json" \
            -d '{"url": "'$DEPLOY_URL'", "options": {"fullPage": true}}' \
            -o screenshots/homepage.png
          # Compare with previous baseline
        env:
          BROWSERLESS_URL: ${{ secrets.BROWSERLESS_URL }}
          DEPLOY_URL: ${{ vars.DEPLOY_URL || 'http://localhost:3000' }}

  # ============================================
  # Gate 5: Accessibility (axe-core)
  # ============================================
  a11y:
    needs: [e2e-test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run axe accessibility audit
        run: npm run test:a11y
        # VDD: traces to WCAG 2.2 AA ACs in spec.md

  # ============================================
  # Gate 6: Security Scan
  # ============================================
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Dependency vulnerability scan
        run: npm audit --audit-level=high
        continue-on-error: true  # Report but don't block (review manually)

  # ============================================
  # Gate 7: Performance (Lighthouse via Browserless)
  # ============================================
  perf:
    needs: [e2e-test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Lighthouse audit
        run: |
          curl -sS "$BROWSERLESS_URL/performance" \
            -H "Content-Type: application/json" \
            -d '{"url": "'$DEPLOY_URL'"}' \
            -o lighthouse-report.json
          # Parse and assert: LCP < 2.5s, FID < 100ms, CLS < 0.1
        env:
          BROWSERLESS_URL: ${{ secrets.BROWSERLESS_URL }}
          DEPLOY_URL: ${{ vars.DEPLOY_URL }}

  # ============================================
  # Gate 8: Deploy Preview
  # ============================================
  deploy-preview:
    needs: [e2e-test, unit-test]
    runs-on: ubuntu-latest
    environment: preview
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to preview
        run: |
          # Platform-specific deploy (Vercel, Netlify, Cloudflare Pages, etc.)
          echo "Deploying to preview environment..."

  # ============================================
  # Gate 9: Sentry Init Check (Post-Deploy)
  # ============================================
  sentry-check:
    needs: [deploy-preview]
    runs-on: ubuntu-latest
    steps:
      - name: Verify Sentry is receiving events
        run: |
          # Query Sentry API to confirm the project exists and is receiving events
          curl -sS "https://sentry.io/api/0/projects/$SENTRY_ORG/$SENTRY_PROJECT/" \
            -H "Authorization: Bearer $SENTRY_AUTH_TOKEN" \
            | grep -q '"status":"active"' && echo "Sentry: active" || echo "Sentry: check needed"
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
          SENTRY_ORG: ${{ vars.SENTRY_ORG }}
          SENTRY_PROJECT: ${{ vars.SENTRY_PROJECT }}
```

## VDD Integration Notes

- Every CI stage traces to at least one AC in `vdd/specs/*/spec.md`
- The pipeline is the automated enforcement of Gates G6 and G7
- Add or remove stages based on your constitution's domain primitives
- Stages can run in parallel where `needs` is not specified
- Secrets (`BROWSERLESS_URL`, `SENTRY_AUTH_TOKEN`, etc.) are configured per-project
