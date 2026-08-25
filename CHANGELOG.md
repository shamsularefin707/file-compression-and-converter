# FileForge Changelog

All notable changes to the FileForge platform are documented in this file.

---

## [2.0.0] - 2026-08-25

### Added
- **Machine Endpoints**: Introduced `/api/health`, `/api/capabilities`, and `/api/audit` JSON endpoints for external AI and automated QA inspection.
- **Human Inspection Pages**: Added `/capabilities`, `/status`, `/verification`, and `/cookies` views.
- **Public Route Manifest**: Added `/routes.json` describing all public indexable routes.
- **Monetization Architecture**: Explicitly added `monetization: { ads_enabled: false }` configuration to `PRODUCT_SPEC.json`.
- **Tool Aliases**: Added routing aliases (e.g. `/tools/pdf-compressor` -> `/tools/compress-pdf`).
- **URL Centralization**: Centralized canonical domain handling via `SITE_CONFIG.url` and `VITE_SITE_URL`.
- **Audit Automation**: Upgraded `scripts/audit.mjs` to execute 16 automated compliance checks (`npm run audit`).

### Hardened
- **Security Protections**: Enhanced filename sanitization, RAM-buffered streaming, and CORS rules documented in `SECURITY.md`.
- **Privacy Compliance**: Detailed zero-disk retention guarantees and client-side WebAssembly execution models.
- **Crawler Discoverability**: Updated static pre-rendering in `index.html` and expanded `robots.txt` AI scrapers.

---

## [1.0.0] - 2026-08-20

- Initial launch of FileForge File Compression & Converter platform.
