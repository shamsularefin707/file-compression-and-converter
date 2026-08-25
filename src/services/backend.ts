/**
 * FileForge Backend Services API Wrapper
 * This module is kept modular to facilitate future server-side connections (e.g. Node.js or Python).
 */

export interface BackendConversionResponse {
  blob: Blob;
  outputName: string;
  outputType: string;
}

/**
 * Calls the backend converter for complex PDF conversions (e.g. PDF to Text/HTML/DOCX/MD).
 */
export async function convertPdfViaBackend(
  file: File,
  targetFormat: string
): Promise<BackendConversionResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('targetFormat', targetFormat);

  try {
    const response = await fetch('/api/convert', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server conversion failed with status ${response.status}`);
    }

    const blob = await response.blob();
    const baseName = file.name.substring(0, file.name.lastIndexOf('.'));
    
    let mimeType = 'text/plain';
    if (targetFormat === 'html') {
      mimeType = 'text/html';
    } else if (targetFormat === 'md') {
      mimeType = 'text/markdown';
    } else if (targetFormat === 'docx') {
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }

    return {
      blob,
      outputName: `${baseName}.${targetFormat}`,
      outputType: mimeType,
    };
  } catch (error: any) {
    console.error('Backend conversion failed:', error);
    throw new Error(error.message || 'Failed to convert PDF file. Please ensure the backend server is running.');
  }
}

