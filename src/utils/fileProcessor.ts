import type { CompressionSettings } from '../types';

// Helper to load image URL into HTMLImageElement
const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
};

/**
 * Compresses and/or resizes an image file using Canvas.
 */
export async function compressImageFile(
  file: File,
  settings: CompressionSettings,
  targetFormat?: string
): Promise<{ blob: Blob; width: number; height: number; originalWidth: number; originalHeight: number }> {
  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
    const originalWidth = img.width;
    const originalHeight = img.height;

    let targetWidth = originalWidth;
    let targetHeight = originalHeight;

    if (settings.resizeOption === '75') {
      targetWidth = Math.round(originalWidth * 0.75);
      targetHeight = Math.round(originalHeight * 0.75);
    } else if (settings.resizeOption === '50') {
      targetWidth = Math.round(originalWidth * 0.50);
      targetHeight = Math.round(originalHeight * 0.50);
    } else if (settings.resizeOption === 'custom') {
      if (settings.customWidth && settings.customHeight) {
        targetWidth = settings.customWidth;
        targetHeight = settings.customHeight;
      } else if (settings.customWidth) {
        targetWidth = settings.customWidth;
        targetHeight = Math.round((settings.customWidth / originalWidth) * originalHeight);
      } else if (settings.customHeight) {
        targetHeight = settings.customHeight;
        targetWidth = Math.round((settings.customHeight / originalHeight) * originalWidth);
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    // Determine output mime type
    let mimeType = file.type;
    const ext = targetFormat || file.name.split('.').pop()?.toLowerCase() || '';

    if (ext === 'jpg' || ext === 'jpeg') {
      mimeType = 'image/jpeg';
    } else if (ext === 'png') {
      mimeType = 'image/png';
    } else if (ext === 'webp') {
      mimeType = 'image/webp';
    } else if (ext === 'avif') {
      mimeType = 'image/avif';
    }

    const quality = settings.quality / 100;

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (b) resolve(b);
          else reject(new Error('Canvas blob generation failed'));
        },
        mimeType,
        mimeType === 'image/png' ? undefined : quality
      );
    });

    return {
      blob,
      width: targetWidth,
      height: targetHeight,
      originalWidth,
      originalHeight,
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * Optimizes PDF file metadata/streams using pdf-lib.
 */
export async function compressPdfFile(
  file: File,
  _level: 'low' | 'medium' | 'high'
): Promise<Blob> {
  const { PDFDocument } = await import('pdf-lib');
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  // Save with compressed objects and stream option
  const compressedBytes = await pdfDoc.save({
    useObjectStreams: true,
  });

  return new Blob([compressedBytes as any], { type: 'application/pdf' });
}

/**
 * Creates a ZIP file containing multiple files.
 */
export async function createZipArchive(files: { name: string; blob: Blob }[]): Promise<Blob> {
  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();
  files.forEach((f) => {
    zip.file(f.name, f.blob);
  });
  return await zip.generateAsync({ type: 'blob' });
}

/**
 * Extracts files from a ZIP archive.
 */
export async function extractZipArchive(file: File): Promise<{ name: string; blob: Blob }[]> {
  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();
  const contents = await zip.loadAsync(file);
  const extractedFiles: { name: string; blob: Blob }[] = [];

  for (const filename of Object.keys(contents.files)) {
    const zipEntry = contents.files[filename];
    if (!zipEntry.dir) {
      const blob = await zipEntry.async('blob');
      extractedFiles.push({ name: filename, blob });
    }
  }
  return extractedFiles;
}

/**
 * CSV parsing helper.
 */
export function csvToJson(csvText: string): string {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
  if (lines.length === 0) return '[]';

  const headers = parseCsvLine(lines[0]);
  const result: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const currentLine = parseCsvLine(lines[i]);
    if (currentLine.length === 0) continue;

    const obj: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j] || '';
    }
    result.push(obj);
  }
  return JSON.stringify(result, null, 2);
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result.map((val) => val.replace(/^"|"$/g, '').replace(/""/g, '"'));
}

/**
 * JSON parsing helper.
 */
export function jsonToCsv(jsonText: string): string {
  const data = JSON.parse(jsonText);
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('JSON must be an array of objects');
  }

  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];

  for (const row of data) {
    const values = headers.map((header) => {
      const val = row[header];
      const escaped = ('' + (val ?? '')).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
}

/**
 * Converts XLSX spreadsheet file to CSV.
 */
export async function xlsxToCsv(file: File): Promise<string> {
  const XLSX = await import('xlsx');
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  return XLSX.utils.sheet_to_csv(worksheet);
}

/**
 * Converts CSV file to XLSX format.
 */
export async function csvToXlsx(file: File): Promise<Blob> {
  const XLSX = await import('xlsx');
  const text = await file.text();
  const workbook = XLSX.read(text, { type: 'string' });
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  return new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

/**
 * Converts HTML string to a styled PDF Blob.
 */
export async function htmlToPdfBlob(htmlString: string): Promise<Blob> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  doc.setFont('helvetica', 'normal');

  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(htmlString, 'text/html');
  const body = htmlDoc.body;

  let y = 15;
  const pageHeight = 280;

  const renderNode = (node: Node) => {
    if (y > pageHeight) {
      doc.addPage();
      y = 15;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const split = doc.splitTextToSize(text, 180);
        split.forEach((line: string) => {
          if (y > pageHeight) {
            doc.addPage();
            y = 15;
          }
          doc.text(line, 15, y);
          y += 5.5;
        });
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const tagName = el.tagName.toLowerCase();

      if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3') {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(tagName === 'h1' ? 16 : tagName === 'h2' ? 14 : 12);
        const text = el.textContent?.trim() || '';
        const split = doc.splitTextToSize(text, 180);
        y += 3;
        split.forEach((line: string) => {
          if (y > pageHeight) {
            doc.addPage();
            y = 15;
          }
          doc.text(line, 15, y);
          y += 7;
        });
        y += 2;
      } else if (tagName === 'p') {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const text = el.textContent?.trim() || '';
        const split = doc.splitTextToSize(text, 180);
        split.forEach((line: string) => {
          if (y > pageHeight) {
            doc.addPage();
            y = 15;
          }
          doc.text(line, 15, y);
          y += 5.5;
        });
        y += 2.5;
      } else if (tagName === 'br') {
        y += 5.5;
      } else {
        for (let i = 0; i < el.childNodes.length; i++) {
          renderNode(el.childNodes[i]);
        }
      }
    }
  };

  for (let i = 0; i < body.childNodes.length; i++) {
    renderNode(body.childNodes[i]);
  }

  return doc.output('blob');
}

/**
 * Converts DOCX file to HTML.
 */
export async function docxToHtml(file: File): Promise<string> {
  const { default: mammoth } = await import('mammoth');
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.convertToHtml({ arrayBuffer });
  return result.value;
}

/**
 * Converts Markdown file to HTML.
 */
export async function markdownToHtml(file: File): Promise<string> {
  const { marked } = await import('marked');
  const text = await file.text();
  const html = await marked.parse(text);
  return html;
}

/**
 * Converts plain TXT to PDF.
 */
export async function txtToPdf(file: File): Promise<Blob> {
  const { jsPDF } = await import('jspdf');
  const text = await file.text();
  const doc = new jsPDF();
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  const splitText = doc.splitTextToSize(text, 180);
  let y = 15;
  const pageHeight = 280;

  for (let i = 0; i < splitText.length; i++) {
    if (y > pageHeight) {
      doc.addPage();
      y = 15;
    }
    doc.text(splitText[i], 15, y);
    y += 5.5;
  }

  return doc.output('blob');
}
