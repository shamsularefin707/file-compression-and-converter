# FileForge — Technical Architecture & V2 Audit Report (`PROJECT_AUDIT.md`)

**Audit Version**: 2.0.0  
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

## 2. Supported Tools & Format Matrix (18 Registered Tools)

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

## 3. Public Machine Endpoints & Route Hierarchy

- `/api/health` — Public status, version (`1.0.0`), and timestamp JSON.
- `/api/capabilities` — Public machine catalog JSON detailing tools, format matrix, size limits, and processing modes.
- `/api/audit` — Public safe check status JSON.
- `/PRODUCT_SPEC.json` — Static product specification JSON.
- `/routes.json` — Static public route manifest JSON.
- `/capabilities` — Human-readable tools, format matrix, size limits, and requirements page.
- `/status` — Live operational status and subsystem health indicator page.
- `/verification` — Reviewer test guide and capabilities index page.
- `/cookies` — Cookie, telemetry, and local storage policy page.
- `/privacy`, `/terms`, `/about`, `/contact` — Legal & company pages.
