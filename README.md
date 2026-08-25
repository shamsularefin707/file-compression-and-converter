# FileForge — Production-Ready File Compression & Converter Platform

[![Production Audit Status](https://img.shields.io/badge/Audit-16%20PASS-emerald?style=flat-square)](https://file-compression-and-converter.vercel.app/status)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Live Production](https://img.shields.io/badge/Vercel-Live%20Deployment-000000?style=flat-square&logo=vercel)](https://file-compression-and-converter.vercel.app/)

FileForge is a production web application for online file conversion, compression, and AI document preparation. It provides a client-first hybrid processing model designed for high fidelity, privacy, search engine crawlability, and external inspectability.

---

## 1. Public Machine & Human Inspection Index

FileForge exposes machine-readable JSON endpoints and human-readable pages allowing QA reviewers and AI agents to audit platform capabilities directly via HTTP:

| Resource Path | Type | Description |
| :--- | :--- | :--- |
| [`/api/health`](https://file-compression-and-converter.vercel.app/api/health) | API (JSON) | System status, version, and timestamp check. |
| [`/api/capabilities`](https://file-compression-and-converter.vercel.app/api/capabilities) | API (JSON) | Machine-readable tool catalog, input/output formats, and limits. |
| [`/api/audit`](https://file-compression-and-converter.vercel.app/api/audit) | API (JSON) | Safe public audit check status results. |
| [`/PRODUCT_SPEC.json`](https://file-compression-and-converter.vercel.app/PRODUCT_SPEC.json) | Static Manifest | Complete machine-readable product capability specification. |
| [`/routes.json`](https://file-compression-and-converter.vercel.app/routes.json) | Static Manifest | Indexable public route manifest. |
| [`/capabilities`](https://file-compression-and-converter.vercel.app/capabilities) | Web Page | Human-readable system capabilities and format matrix. |
| [`/status`](https://file-compression-and-converter.vercel.app/status) | Web Page | Live operational status and subsystem health indicators. |
| [`/verification`](https://file-compression-and-converter.vercel.app/verification) | Web Page | External reviewer test instructions and compliance checklist. |
| [`/cookies`](https://file-compression-and-converter.vercel.app/cookies) | Web Page | Cookie, telemetry, and local storage policy. |

---

## 2. Technical Architecture

- **Frontend**: React 18 SPA with Vite 8, TypeScript, Tailwind CSS, and Lucide Icons.
- **Backend / Engine**: Express serverless API running on Node.js. Complex PDF parsing utilizes `unpdf` (PDF.js) for spatial token coordinate reconstruction and `docx` for OpenXML document generation.
- **Client Execution Sandbox**: Image transcoders (WebP/JPG/PNG), client PDF compression (`pdf-lib`), and CSV/JSON parsers execute 100% locally inside browser WebAssembly/Canvas memory.
- **Ephemeral RAM Engine**: PDF to Markdown/DOCX/Text conversions execute inside volatile serverless RAM. In-memory buffers are destroyed upon HTTP response completion (0% disk storage).

---

## 3. Registered Tools (18 Production Tools)

- **Document Suite**: PDF to Markdown (AI Ready), PDF to Plain Text, PDF to Word (DOCX), Word (DOCX) to Markdown, HTML to Markdown, Markdown to HTML.
- **PDF Utilities**: PDF Compressor, Images to PDF Merger, PDF Page Image Extractor.
- **Image Transcoders**: Image Compressor & Optimizer, JPG to WebP, PNG to WebP, WebP to JPG, PNG to JPG, JPG to PNG.
- **Data Converters**: CSV to JSON, JSON to CSV, CSV to Excel (XLSX).

---

## 4. Local Installation & Setup

```bash
# 1. Clone repository
git clone https://github.com/shamsularefin707/file-compression-and-converter.git
cd file-compression-and-converter

# 2. Install dependencies
npm install

# 3. Environment configuration
cp .env.example .env

# 4. Start local development server
npm run dev

# 5. Run full automated test suite
npm test

# 6. Run full production readiness audit
npm run audit
```

---

## 5. Security & Privacy Guarantees

- **Filename Sanitization**: User-uploaded filenames pass through regex normalization (`[^a-zA-Z0-9_.-]`) eliminating path traversal and shell execution risks.
- **Zero Shell Command Execution**: All conversions utilize native JavaScript/TypeScript parsers. No `child_process.exec()` or shell commands are invoked.
- **Zero File Logging**: Serverless functions buffer files in volatile memory without writing to host disk storage (`/tmp`).

---

## 6. License

Distributed under the MIT License.
