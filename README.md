# FileForge — Fast, Private File Conversion & AI Document Suite

FileForge is a production-ready web application for high-performance file compression, format conversion, and document preparation tailored for AI LLM workflows (ChatGPT, Claude, Gemini).

---

## 🌟 Key Product Architecture Features

1. **AI-Ready Document Engine (Normalized Document Model)**:
   - Reconstructs PDF heading hierarchy (H1–H4), tables (GitHub Flavored Markdown), bullet lists, and hyperlinked spans.
   - Calculates prompt token savings (~35–40% reduction) and character counts.
2. **Privacy-First Hybrid Pipeline**:
   - **Client-Side Processing**: Local WebAssembly and Canvas transcoders for image compression, JPG/PNG to WebP, and DOCX-to-Markdown. Files stay on the user's device.
   - **Serverless Ephemeral Engine**: RAM-buffered NDM parser for PDF-to-DOCX and PDF-to-Markdown. Files are auto-destroyed immediately after response streaming.
3. **Multi-Route SEO & Tool Registry System**:
   - Indexable tool landing pages (`/tools/:slug`), categories, search directory, and JSON-LD structured data.
   - Includes `sitemap.xml` and `robots.txt` generation.
4. **Monetization & SaaS Foundation**:
   - **Zero Ads Active** (`ADS_ENABLED=false` configuration).
   - Abstracted `AdProvider` and `AdSlot` components ready for future Google AdSense or Ezoic integration without layout damage.
   - Subscription entitlement engine (`entitlements.ts`) for Free/Pro tier file size limits.
   - Decoupled API service architecture for future developer endpoints (`/api/v1/convert`).

---

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons.
- **Backend / Serverless**: Node.js, Express, `unpdf` (PDF.js layout parser), `docx` OpenXML builder.
- **Client Processing Libraries**: `pdf-lib`, `jspdf`, `mammoth`, `marked`, `xlsx`, `jszip`.

---

## 🚀 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shamsularefin707/file-compression-and-converter.git
   cd file-compression-and-converter
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```

4. **Build production bundle**:
   ```bash
   npm run build
   ```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` to configure optional analytics or future ad providers:

```bash
VITE_ADS_ENABLED=false
VITE_AD_PROVIDER=none
VITE_ADSENSE_CLIENT_ID=
VITE_EZOIC_PUBLISHER_ID=
VITE_PRO_GATING_ENABLED=false
VITE_GA_ID=
```

---

## 🛡 Privacy & Security Claims

- **Zero Permanent Retention**: No uploaded file buffers are saved to disk or third-party storage.
- **No File Content Telemetry**: Analytics events track only utility metrics (e.g. `tool_viewed`, `conversion_completed`).
- **Filename Sanitization**: Input filenames are stripped of non-printable characters and directory traversal vectors.

---

## 📄 License

MIT License. Designed and maintained by FileForge Engineering.
