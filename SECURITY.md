# FileForge — Technical Security Specification (`SECURITY.md`)

This document outlines the security architecture, threat model, input validation routines, and privacy protections implemented within the FileForge web application and its serverless backend endpoints.

---

## 1. Threat Model & Risk Mitigation

| Threat Vector | Potential Impact | Implemented Safeguard | Technical Mechanism |
| :--- | :--- | :--- | :--- |
| **Directory Traversal** | Accessing sensitive host files (e.g. `/etc/passwd`) | Strict Filename Sanitization | Input filenames are stripped of path separators (`/`, `\`, `..`) and sanitized to alphanumeric characters, dashes, and underscores. |
| **Command Injection** | Arbitrary shell execution on host server | Zero External Shell Execution | All file processing uses native JavaScript/TypeScript libraries (`unpdf`, `docx`, `pdf-lib`). No `child_process.exec()` or shell commands are invoked. |
| **Script Injection (XSS)** | Executing malicious scripts in output documents | Markup & Text Sanitization | Extracted text and HTML outputs are sanitized using `DOMPurify` / text escaping routines before rendering. |
| **Server Resource Exhaustion (DoS)** | Exhausting CPU or memory via huge files | Size Validation & Payload Limits | Enforces strict file size limits (25 MB max for serverless conversions, 50 MB max for client conversions) and 30-second execution timeouts. |
| **Data Leakage / Privacy Violation** | Exposure of user documents | Ephemeral RAM Execution | Serverless conversion buffers exist solely in volatile RAM during request execution and are auto-destroyed upon response completion. Zero disk logs or cloud backups exist. |
| **MIME Spoofing** | Executable uploaded as PDF/Image | Extension & Magic Byte Inspection | Validates both file extension and MIME type headers prior to memory buffer processing. |

---

## 2. Input Sanitization & Validation Routines

### Filename Sanitization Strategy
All user-uploaded filenames pass through the following regex normalization function prior to processing or streaming output back to the client:

```typescript
export function sanitizeFilename(filename: string): string {
  // Remove directory paths
  const baseName = filename.replace(/^.*[\\/]/, '');
  // Replace dangerous characters with underscores
  const safeName = baseName.replace(/[^a-zA-Z0-9_.-]/g, '_');
  // Avoid hidden dotfiles
  return safeName.startsWith('.') ? `file_${safeName}` : safeName;
}
```

---

## 3. Serverless Backend Execution Security (`api/convert.ts`)

1. **In-Memory Streaming Buffer**:
   Uploaded payloads are buffered directly into memory using `multer.memoryStorage()`. No temporary files are written to host disk directories (`/tmp`).
2. **Execution Timeouts**:
   Vercel serverless function boundaries enforce a maximum 30-second execution wall-clock limit, terminating un-responding or corrupted document parse loops safely.
3. **Strict Error Isolation**:
   Conversion errors caught during processing return standard HTTP status codes (`400 Bad Request` or `500 Internal Server Error`) with generic, sanitized error messages. **Raw stack traces, internal server paths, and system details are never exposed to clients.**

---

## 4. Client-Side Browser Security Sandbox

1. **Local Browser Isolation**:
   Client-side conversions (Image compression, JPG/PNG to WebP, PDF compress, CSV/JSON) execute inside the browser's JavaScript sandbox. File data remains 100% on the user's device.
2. **Content Security & CORS**:
   Vercel headers enforce restrictive Content Security Policies while serving permissive CORS headers (`Access-Control-Allow-Origin: *`) for safe public API interaction.

---

## 5. Security Incident Reporting

To report security vulnerabilities or request private disclosures, please submit a report via the [Contact Page](https://file-compression-and-converter.vercel.app/contact).
