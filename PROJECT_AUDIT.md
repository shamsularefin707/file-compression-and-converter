# FileForge — Comprehensive Technical & Architectural Audit (`PROJECT_AUDIT.md`)

**Date of Audit**: August 25, 2026  
**Application Name**: FileForge — File Compression & Converter  
**Live Production URL**: [https://file-compression-and-converter.vercel.app/](https://file-compression-and-converter.vercel.app/)  
**GitHub Repository**: [shamsularefin707/file-compression-and-converter](https://github.com/shamsularefin707/file-compression-and-converter)

---

## 1. Executive Summary & Architecture Overview

FileForge is a production web application built using **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**. It provides a hybrid processing architecture:

1. **Client-Side Browser Execution**:
   - Image Transcoding & Compression (`Canvas`, `HTMLCanvasElement.toBlob`, `WebAssembly`).
   - Client PDF Compression (`pdf-lib`).
   - Document-to-Markdown Transcoding (`mammoth`, `marked`).
   - Client Data Conversions (`xlsx`, custom CSV/JSON parsers).
   - **Privacy Benefit**: Binary bytes remain 100% inside client browser memory.

2. **Serverless Ephemeral Engine**:
   - Vercel Serverless Function (`api/convert.ts`) handling complex PDF layout analysis via `unpdf` (PDF.js engine) and OpenXML document generation via `docx`.
   - **Privacy Guarantee**: Uploaded buffer data exists ephemerally in RAM during HTTP execution and is auto-destroyed upon response completion. No disk logs or database records are maintained.

---

## 2. Supported Tools & Format Matrix

| Tool ID | Public Route Slug | Processing Mode | Inputs | Outputs | Purpose / Optimization |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `pdf-to-markdown` | `/tools/pdf-to-markdown` | Serverless (RAM) | `.pdf` | `.md` | Strips binary noise; calculates token & character metrics for AI LLM prompts. |
| `pdf-to-txt` | `/tools/pdf-to-txt` | Serverless (RAM) | `.pdf` | `.txt` | Raw plain text extraction. |
| `pdf-to-docx` | `/tools/pdf-to-docx` | Serverless (RAM) | `.pdf` | `.docx` | Reconstructs headings (H1–H4), tables, and lists into Word document format. |
| `docx-to-markdown`| `/tools/docx-to-markdown`| Client-side | `.docx` | `.md` | Converts Word documents to clean Markdown. |
| `html-to-markdown`| `/tools/html-to-markdown`| Client-side | `.html` | `.md` | Converts HTML markup to clean Markdown. |
| `markdown-to-html`| `/tools/markdown-to-html`| Client-side | `.md` | `.html` | Converts Markdown to semantic HTML tags. |
| `compress-pdf` | `/tools/compress-pdf` | Client-side | `.pdf` | `.pdf` | Optimizes PDF document streams and drops redundant subset fonts. |
| `images-to-pdf` | `/tools/images-to-pdf` | Client-side | `.jpg, .png, .webp` | `.pdf` | Merges multiple images into a single PDF document. |
| `pdf-to-images` | `/tools/pdf-to-images` | Client-side | `.pdf` | `.png, .jpg` | Renders PDF pages to individual image files. |
| `image-compressor`| `/tools/image-compressor` | Client-side | `.jpg, .png, .webp` | Compressed image | Multi-pass canvas compression with custom quality slider. |
| `jpg-to-webp` | `/tools/jpg-to-webp` | Client-side | `.jpg, .jpeg` | `.webp` | Modern web image transcoding for Google Core Web Vitals. |
| `png-to-webp` | `/tools/png-to-webp` | Client-side | `.png` | `.webp` | Converts transparent PNG graphics to WebP format. |
| `webp-to-jpg` | `/tools/webp-to-jpg` | Client-side | `.webp` | `.jpg` | Converts WebP images back to legacy JPEG format. |
| `png-to-jpg` | `/tools/png-to-jpg` | Client-side | `.png` | `.jpg` | Converts PNG graphics to JPEG. |
| `jpg-to-png` | `/tools/jpg-to-png` | Client-side | `.jpg, .jpeg` | `.png` | Converts JPEGs to PNG format. |
| `csv-to-json` | `/tools/csv-to-json` | Client-side | `.csv` | `.json` | Converts structured CSV tables to JSON arrays. |
| `json-to-csv` | `/tools/json-to-csv` | Client-side | `.json` | `.csv` | Flattens JSON object arrays into CSV rows. |
| `csv-to-xlsx` | `/tools/csv-to-xlsx` | Client-side | `.csv` | `.xlsx` | Converts CSV files to Microsoft Excel workbooks. |

---

## 3. Public Route Hierarchy

- `/` — Homepage featuring popular tool shortcuts, category filter, AI workflow explanation, and main dropzone workspace.
- `/compress` — Pre-filtered workspace view dedicated to file compression.
- `/convert` — Pre-filtered workspace view dedicated to format conversion.
- `/tools` — Searchable index directory of all 18 tools with category filtering.
- `/tools/:slug` — Individual landing pages for each tool (e.g. `/tools/pdf-to-markdown`, `/tools/image-compressor`, `/tools/pdf-compressor`).
- `/blog` & `/blog/:slug` — Educational articles on document token optimization and image web performance.
- `/privacy` — Comprehensive privacy policy covering local execution, ephemeral RAM serverless handling, zero retention, and telemetry specifications.
- `/terms` — Terms of Service and acceptable usage policies.
- `/about` — Technical architecture and engineering explanation of FileForge.
- `/contact` — Support and feedback submission interface.

---

## 4. File Size Limits & Technical Guardrails

- **Free Tier Client Limit**: 50 MB per file.
- **Free Tier Serverless PDF Limit**: 25 MB per request (matches Vercel Serverless Function payload boundaries).
- **Pro Entitlement Limit** (gated via `entitlements.ts`): 200 MB per file.
- **Batch Processing Limit**: Up to 10 files queued simultaneously per session.

---

## 5. Security & Privacy Audit Findings

1. **Input Sanitization**:
   - Filenames are sanitized using regex (`.replace(/[^a-zA-Z0-9_.-]/g, '_')`) to eliminate directory traversal vectors and shell command injections.
2. **RAM Ephemeral Execution**:
   - Node.js serverless functions use in-memory Buffer streams. Files are not saved to `/tmp` or persistent disk storage.
3. **CORS & Crawler Access**:
   - Implemented `Access-Control-Allow-Origin: *` and `X-Robots-Tag: index, follow, max-image-preview:large` in `vercel.json`.
4. **Zero Script Injection Risk**:
   - Non-printable characters and scripts are stripped from document text extraction outputs.

---

## 6. Dependency & Bundle Analysis

- **Core UI**: `react` 19, `react-dom` 19, `lucide-react`, `tailwindcss` 4.
- **File Utilities**: `pdf-lib`, `jspdf`, `mammoth`, `marked`, `xlsx`, `jszip`, `unpdf`, `docx`.
- **Build System**: `vite` 8, `typescript` 6.
- **Audit Conclusion**: Zero unused heavy dependencies found. Build size optimized with dynamic chunking.

---

## 7. Recommended Production Enhancements

1. **Machine-Readable Endpoints**: Expose `/api/health` and `/api/capabilities` for automated QA systems and AI tools.
2. **Product Specification File**: Maintain a synchronized `PRODUCT_SPEC.json` file.
3. **Automated Audit Suite**: Provide `npm run audit` script for CI pipeline verification.
4. **Verification Document**: Create `VERIFICATION.md` detailing reviewer test instructions.
5. **Implementation Report**: Create `IMPLEMENTATION_REPORT.md` documenting final quality standards.
