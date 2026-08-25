# FileForge — Human-Readable Verification Document (`VERIFICATION.md`)

**Deployment URL**: [https://file-compression-and-converter.vercel.app/](https://file-compression-and-converter.vercel.app/)  
**Version**: 1.0.0  
**Repository**: [shamsularefin707/file-compression-and-converter](https://github.com/shamsularefin707/file-compression-and-converter)

---

## 1. Public Route Index

- `/` — Main Homepage & File Workspace
- `/compress` — PDF & Image Compression Studio
- `/convert` — Multi-Format Document Transcoder
- `/tools` — Searchable 18-Tool Directory Index
- `/capabilities` — Human-Readable System Capabilities
- `/status` — Public Operational Status & Subsystem Health
- `/verification` — Public Reviewer Specification & Guide
- `/cookies` — Cookie & Telemetry Policy
- `/tools/pdf-to-markdown` — PDF to Markdown AI Converter
- `/tools/pdf-to-txt` — PDF to Plain Text Extractor
- `/tools/pdf-to-docx` — PDF to Word (DOCX) Converter
- `/tools/docx-to-markdown` — Word to Markdown Converter
- `/tools/html-to-markdown` — HTML to Markdown Converter
- `/tools/markdown-to-html` — Markdown to HTML Renderer
- `/tools/compress-pdf` — PDF Stream & Font Compressor
- `/tools/pdf-compressor` — PDF Compressor Alias
- `/tools/images-to-pdf` — Images to PDF Merger
- `/tools/pdf-to-images` — PDF Page Image Extractor
- `/tools/image-compressor` — JPG/PNG Multi-Pass Compressor
- `/tools/jpg-to-webp` — JPG to WebP Transcoder
- `/tools/png-to-webp` — Transparent PNG to WebP Converter
- `/tools/webp-to-jpg` — WebP to JPEG Converter
- `/tools/png-to-jpg` — PNG to JPEG Converter
- `/tools/jpg-to-png` — JPEG to PNG Converter
- `/tools/csv-to-json` — CSV Data Table to JSON Converter
- `/tools/json-to-csv` — JSON Array to CSV Table Converter
- `/tools/csv-to-xlsx` — CSV Table to Microsoft Excel Workbook
- `/blog` — AI Document Guides
- `/privacy` — Privacy Policy & Data Security
- `/terms` — Terms of Service
- `/about` — Engineering Architecture
- `/contact` — Contact & Bug Report Form
- `/api/health` — Public Health Status Endpoint (JSON)
- `/api/capabilities` — Public Capabilities Specification Endpoint (JSON)
- `/api/audit` — Public Safe Audit Check Endpoint (JSON)
- `/PRODUCT_SPEC.json` — Static Machine Product Specification (JSON)
- `/routes.json` — Static Route Manifest (JSON)

---

## 2. Step-by-Step Manual Reviewer Verification Guide

### Test A: Machine Verification Endpoints
1. Open `https://file-compression-and-converter.vercel.app/api/health`.
   - **Expected Result**: Returns JSON `{ "status": "ok", "version": "1.0.0", "environment": "production", ... }`.
2. Open `https://file-compression-and-converter.vercel.app/api/capabilities`.
   - **Expected Result**: Returns JSON detailing all 18 registered tools, input/output formats, and limits.
3. Open `https://file-compression-and-converter.vercel.app/api/audit`.
   - **Expected Result**: Returns JSON `{ "status": "pass", "checks": { ... } }`.
4. Open `https://file-compression-and-converter.vercel.app/PRODUCT_SPEC.json`.
   - **Expected Result**: Returns product JSON containing `"monetization": { "ads_enabled": false }`.

### Test B: Human Inspection Pages
1. Navigate to `/capabilities`, `/status`, and `/verification`.
2. **Expected Result**: HTML renders clean UI detailing tool matrices, operational readiness, and machine endpoints.

### Test C: Automated Verification Commands
```bash
npm test     # Executes automated unit & integration tests
npm run audit    # Executes automated 16-point production audit script
```
