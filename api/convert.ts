import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { getDocumentProxy, extractText } from 'unpdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const app = express();

app.use(cors());
app.use(express.json());

// Set up multer with memory storage for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024, // 25 MB limit
  },
});

// Route handling the conversion of files
app.post(['/api/convert', '/'], upload.single('file'), async (req: any, res: any) => {
  try {
    const file = req.file;
    const targetFormat = req.body.targetFormat;

    if (!file) {
      return res.status(400).json({ error: 'No file was uploaded.' });
    }

    if (!targetFormat) {
      return res.status(400).json({ error: 'Target format is required.' });
    }

    // Check if the uploaded file is a PDF
    const fileExt = file.originalname.split('.').pop()?.toLowerCase();
    if (fileExt !== 'pdf' && file.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Only PDF files are supported for backend conversion.' });
    }

    // Extract text from the PDF file using unpdf
    const pdf = await getDocumentProxy(new Uint8Array(file.buffer));
    const extraction = await extractText(pdf);
    const text = Array.isArray(extraction.text) ? extraction.text.join('\n\n') : (extraction.text || '');

    const baseName = file.originalname.substring(0, file.originalname.lastIndexOf('.')) || 'document';

    if (targetFormat === 'txt') {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${baseName}.txt"`);
      return res.send(text);
    }

    if (targetFormat === 'html') {
      // Create a visually pleasing styled HTML output
      const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Converted Document: ${baseName}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      padding: 40px 20px;
      background: #f8fafc;
      color: #1e293b;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }
    .card {
      background: white;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05);
      border: 1px solid #e2e8f0;
    }
    h1 {
      color: #0ea5e9;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 24px;
      border-bottom: 2px solid #f1f5f9;
      padding-bottom: 12px;
    }
    p {
      margin-bottom: 16px;
      white-space: pre-wrap;
    }
    .meta {
      font-size: 12px;
      color: #64748b;
      margin-bottom: 20px;
      display: flex;
      gap: 15px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
      background-color: #e0f2fe;
      color: #0369a1;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="meta">
      <span class="badge">Converted PDF</span>
      <span><strong>Source:</strong> ${file.originalname}</span>
    </div>
    <h1>${baseName}</h1>
    <div>
      ${text.split('\n').map((line: string) => line.trim() ? `<p>${escapeHtml(line)}</p>` : '<br/>').join('')}
    </div>
  </div>
</body>
</html>`;

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${baseName}.html"`);
      return res.send(htmlContent);
    }

    if (targetFormat === 'md') {
      // Format text into a readable markdown
      const mdContent = `# ${baseName}\n\n**Source File:** ${file.originalname}\n**Converted On:** ${new Date().toLocaleString()}\n\n---\n\n${text}`;
      
      res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${baseName}.md"`);
      return res.send(mdContent);
    }

    if (targetFormat === 'docx') {
      // Split text into paragraphs and create DOCX runs
      const lines = text.split('\n');
      const docParagraphs: Paragraph[] = [];

      // Add a header/title to the DOCX
      docParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: baseName,
              bold: true,
              size: 32, // 16pt
              font: 'Calibri',
            }),
          ],
          spacing: { after: 240 },
        })
      );

      // Add lines as paragraphs
      let currentParagraphText = '';
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed === '') {
          if (currentParagraphText) {
            docParagraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: currentParagraphText,
                    size: 22, // 11pt
                    font: 'Calibri',
                  }),
                ],
                spacing: { after: 120 },
              })
            );
            currentParagraphText = '';
          }
        } else {
          currentParagraphText += (currentParagraphText ? ' ' : '') + trimmed;
        }
      }

      if (currentParagraphText) {
        docParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: currentParagraphText,
                size: 22, // 11pt
                font: 'Calibri',
              }),
            ],
            spacing: { after: 120 },
          })
        );
      }

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: docParagraphs,
          },
        ],
      });

      const buffer = await Packer.toBuffer(doc);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', `attachment; filename="${baseName}.docx"`);
      return res.send(buffer);
    }

    return res.status(400).json({ error: `Unsupported target format: "${targetFormat}"` });
  } catch (error: any) {
    console.error('Error in conversion backend:', error);
    return res.status(500).json({ error: error.message || 'Internal server error during conversion.' });
  }
});

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Standalone server config for local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Backend conversion server running on port ${PORT}`);
  });
}

export default app;
