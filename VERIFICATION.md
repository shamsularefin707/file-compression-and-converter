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
- `/tools/pdf-to-markdown` — PDF to Markdown AI Converter
- `/tools/pdf-to-txt` — PDF to Plain Text Extractor
- `/tools/pdf-to-docx` — PDF to Word (DOCX) Converter
- `/tools/docx-to-markdown` — Word to Markdown Converter
- `/tools/html-to-markdown` — HTML to Markdown Converter
- `/tools/markdown-to-html` — Markdown to HTML Renderer
- `/tools/compress-pdf` — PDF Stream & Font Compressor
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

---

## 2. Step-by-Step Manual Reviewer Verification Guide

### Test A: Machine Verification Endpoints
1. Open `https://file-compression-and-converter.vercel.app/api/health` in a browser or curl.
   - **Expected Result**: Returns JSON `{ "status": "ok", "version": "1.0.0", "environment": "production", ... }`.
2. Open `https://file-compression-and-converter.vercel.app/api/capabilities`.
   - **Expected Result**: Returns JSON detailing all 18 registered tools, input/output formats, and limits.

### Test B: PDF to Markdown (AI LLM Prompt Optimization)
1. Navigate to `/tools/pdf-to-markdown`.
2. Upload a sample multi-page PDF document containing headings, lists, and tables.
3. Click **Process File**.
4. **Expected Result**:
   - Status updates cleanly to "Processing...".
   - Success state displays original size, Markdown size, character count, estimated AI tokens, and token savings %.
   - Clicking **Download Processed File** saves `.md` document containing clean Markdown headings (`#`, `##`), bullet lists, and tables.

### Test C: Direct Route Refresh & Crawling
1. Open `/tools`, `/privacy`, or `/about` directly in browser location bar or refresh page (`Ctrl+R`).
2. **Expected Result**: Page loads instantly without returning a Vercel 404 error.
3. Inspect HTML page source (`Ctrl+U`).
4. **Expected Result**: Pre-rendered title, H1, meta description, and `<noscript>` summary text are visible in raw HTML.

### Test D: Privacy & Security Limits
1. Attempt to upload a non-supported file extension (e.g. `.exe`).
2. **Expected Result**: Rejection error "Unsupported file format" is displayed cleanly without exposing stack traces.

---

## 3. Machine-Auditable Verification Command
To run automated verification locally:
```bash
npm run test     # Executes automated unit & integration tests
npm run audit    # Executes 14-point production audit script
```
