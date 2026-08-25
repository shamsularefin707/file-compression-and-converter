import type { Request, Response } from 'express';

export default function handler(_req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(200).json({
    name: 'FileForge Conversion Engine',
    version: '1.0.0',
    supported_tools: [
      'pdf-to-markdown',
      'pdf-to-txt',
      'pdf-to-docx',
      'docx-to-markdown',
      'html-to-markdown',
      'markdown-to-html',
      'compress-pdf',
      'images-to-pdf',
      'pdf-to-images',
      'image-compressor',
      'jpg-to-webp',
      'png-to-webp',
      'webp-to-jpg',
      'png-to-jpg',
      'jpg-to-png',
      'csv-to-json',
      'json-to-csv',
      'csv-to-xlsx',
    ],
    supported_formats: {
      input: ['pdf', 'docx', 'html', 'md', 'jpg', 'jpeg', 'png', 'webp', 'csv', 'json'],
      output: ['md', 'txt', 'docx', 'html', 'pdf', 'jpg', 'png', 'webp', 'csv', 'json', 'xlsx', 'zip'],
    },
    limits: {
      max_client_file_size_mb: 50,
      max_serverless_file_size_mb: 25,
      max_batch_file_count: 10,
    },
    processing_modes: {
      client_side: '100% local browser WebAssembly/Canvas processing',
      serverless_ephemeral: 'RAM-buffered Node.js execution with zero permanent disk retention',
    },
    telemetry_endpoints: {
      stats: '/api/stats (Real-time unique visitors and page views counter)',
      health: '/api/health',
      capabilities: '/api/capabilities',
      audit: '/api/audit',
    },
  });
}
