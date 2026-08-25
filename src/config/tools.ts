import type { ToolDefinition } from '../types/tools';

export const TOOLS: ToolDefinition[] = [
  // --- DOCUMENT & AI WORKFLOW TOOLS ---
  {
    id: 'pdf-to-markdown',
    slug: 'pdf-to-markdown',
    name: 'PDF to Markdown Converter',
    description: 'Transform PDF documents into clean, structured Markdown format optimized for ChatGPT, Claude, and LLM AI prompt workflows.',
    category: 'document',
    action: 'convert',
    inputFormats: ['pdf'],
    outputFormats: ['md', 'txt', 'docx', 'html'],
    defaultOutputFormat: 'md',
    maxFileSizeMB: 25,
    processingMode: 'server',
    icon: 'Sparkles',
    popular: true,
    isAiReady: true,
    seo: {
      title: 'PDF to Markdown Converter | Free & AI-Ready | FileForge',
      description: 'Convert PDF files to Markdown (.md) with preserved headings, lists, tables, and links. Perfect for feeding documents into ChatGPT and AI LLMs.',
      keywords: ['pdf to markdown', 'pdf to md', 'ai document converter', 'convert pdf for chatgpt', 'pdf table extraction markdown'],
      h1: 'Convert PDF to Markdown for AI Workflows',
    },
    features: [
      'Heuristic layout analysis preserves H1-H4 heading hierarchy',
      'Extracts tables into clean GitHub Flavored Markdown (GFM)',
      'Deduplicates repeating headers, footers, and page numbers',
      'Calculates token savings and character metrics for AI contexts',
      'Preserves external hyperlinks and bulleted lists'
    ],
    howItWorks: [
      { step: 1, title: 'Upload PDF', description: 'Drag and drop your PDF document into the conversion dropzone.' },
      { step: 2, title: 'Layout Parsing', description: 'Our NDM parser extracts headings, tables, links, and text coordinates.' },
      { step: 3, title: 'Download Markdown', description: 'Download your clean .md file ready for ChatGPT, Claude, or Notion.' }
    ],
    faqs: [
      {
        question: 'Why convert PDF to Markdown for AI LLMs?',
        answer: 'Markdown eliminates unnecessary formatting overhead, PDF binary structures, and repetitive page headers, reducing LLM token consumption by up to 40% while keeping headings and tables intact.'
      },
      {
        question: 'Does this tool support table extraction?',
        answer: 'Yes, multi-column text alignments are detected and reconstructed as GFM (GitHub Flavored Markdown) pipe tables.'
      },
      {
        question: 'Are my files saved permanently?',
        answer: 'No. Serverless processing uses ephemeral volatile RAM buffers that auto-destroy upon completion. 0% disk storage.'
      }
    ]
  },
  {
    id: 'pdf-to-txt',
    slug: 'pdf-to-txt',
    name: 'PDF to Text Converter',
    description: 'Extract raw, unformatted text from PDF files quickly and securely.',
    category: 'document',
    action: 'convert',
    inputFormats: ['pdf'],
    outputFormats: ['txt'],
    defaultOutputFormat: 'txt',
    maxFileSizeMB: 25,
    processingMode: 'server',
    icon: 'FileText',
    popular: false,
    isAiReady: true,
    seo: {
      title: 'PDF to Text (TXT) Converter Online | Free & Fast',
      description: 'Extract plain text from any PDF document. Fast, secure, and browser-assisted plain text extraction.',
      keywords: ['pdf to text', 'pdf to txt', 'extract text from pdf', 'pdf text stripper'],
      h1: 'Convert PDF to Plain Text',
    },
    features: [
      'Strips unnecessary font binaries and graphic overhead',
      'Maintains natural reading order across multi-page documents',
      'Instant plaintext preview and quick copy-to-clipboard'
    ],
    howItWorks: [
      { step: 1, title: 'Upload File', description: 'Select or drop your PDF file.' },
      { step: 2, title: 'Extract', description: 'Plain text is parsed from document streams.' },
      { step: 3, title: 'Download TXT', description: 'Save as .txt file.' }
    ],
    faqs: [
      {
        question: 'Will scanned PDFs work?',
        answer: 'This tool extracts native vector text layers. Scanned PDFs (pure images without embedded text) require OCR pre-processing.'
      }
    ]
  },
  {
    id: 'pdf-to-docx',
    slug: 'pdf-to-docx',
    name: 'PDF to Word (DOCX) Converter',
    description: 'Convert PDF documents into fully editable Microsoft Word (.docx) files with intact typography and layout elements.',
    category: 'office',
    action: 'convert',
    inputFormats: ['pdf'],
    outputFormats: ['docx'],
    defaultOutputFormat: 'docx',
    maxFileSizeMB: 25,
    processingMode: 'server',
    icon: 'FileSpreadsheet',
    popular: true,
    isAiReady: false,
    seo: {
      title: 'PDF to DOCX Word Converter | High Fidelity | FileForge',
      description: 'Convert PDF to editable Word document (.docx). Reconstructs headings, styled tables, bullet lists, and links.',
      keywords: ['pdf to docx', 'pdf to word', 'convert pdf to word editable', 'high fidelity pdf docx'],
      h1: 'Convert PDF to Editable Word (DOCX)',
    },
    features: [
      'Reconstructs editable Microsoft Word tables with custom shading',
      'Preserves paragraph spacing, line heights, and font weights',
      'Retains active hyperlinked text runs'
    ],
    howItWorks: [
      { step: 1, title: 'Select PDF', description: 'Upload your PDF document.' },
      { step: 2, title: 'Reconstruct', description: 'Our NDM engine maps structural elements into OpenXML primitives.' },
      { step: 3, title: 'Download DOCX', description: 'Download and edit directly in Microsoft Word or Google Docs.' }
    ],
    faqs: [
      {
        question: 'Can I edit the generated DOCX file in Google Docs?',
        answer: 'Yes! The generated .docx format is standard Office OpenXML and opens natively in Microsoft Word, Google Docs, LibreOffice, and Pages.'
      }
    ]
  },
  {
    id: 'docx-to-markdown',
    slug: 'docx-to-markdown',
    name: 'DOCX to Markdown Converter',
    description: 'Convert Microsoft Word (.docx) documents into clean Markdown syntax.',
    category: 'document',
    action: 'convert',
    inputFormats: ['docx'],
    outputFormats: ['md', 'html', 'txt'],
    defaultOutputFormat: 'md',
    maxFileSizeMB: 15,
    processingMode: 'client',
    icon: 'FileCode',
    popular: false,
    isAiReady: true,
    seo: {
      title: 'DOCX to Markdown Converter Online | Free & Fast',
      description: 'Convert Word documents (.docx) to Markdown (.md) instantly in your browser.',
      keywords: ['docx to markdown', 'word to md', 'docx to md online'],
      h1: 'Convert Word (DOCX) to Markdown',
    },
    features: [
      'Client-side instant conversion using mammoth engine',
      'Converts Word headings to # Markdown tags',
      'Maintains bold, italic, and hyperlinked spans'
    ],
    howItWorks: [
      { step: 1, title: 'Upload DOCX', description: 'Select your Microsoft Word document.' },
      { step: 2, title: 'Convert', description: 'Client-side parser translates XML nodes into Markdown syntax.' },
      { step: 3, title: 'Save .md', description: 'Download your Markdown output.' }
    ],
    faqs: [
      {
        question: 'Are my Word files uploaded to a server?',
        answer: 'No! DOCX to Markdown conversion runs 100% locally inside your web browser.'
      }
    ]
  },
  {
    id: 'html-to-markdown',
    slug: 'html-to-markdown',
    name: 'HTML to Markdown Converter',
    description: 'Strip HTML markup and convert web content into clean Markdown files.',
    category: 'document',
    action: 'convert',
    inputFormats: ['html', 'htm'],
    outputFormats: ['md', 'txt'],
    defaultOutputFormat: 'md',
    maxFileSizeMB: 10,
    processingMode: 'client',
    icon: 'Code',
    popular: false,
    isAiReady: true,
    seo: {
      title: 'HTML to Markdown Converter | Browser-Based',
      description: 'Convert HTML code or files to Markdown format. Clean up web pages for documentation and AI ingestion.',
      keywords: ['html to markdown', 'html to md', 'web page to markdown'],
      h1: 'Convert HTML to Clean Markdown',
    },
    features: [
      'Strips script, style, and navigation noise',
      'Converts headings, paragraphs, links, lists, and tables',
      '100% private client-side processing'
    ],
    howItWorks: [
      { step: 1, title: 'Drop HTML File', description: 'Upload your .html file.' },
      { step: 2, title: 'Parse DOM', description: 'HTML tree is converted into Markdown syntax.' },
      { step: 3, title: 'Get MD', description: 'Download clean Markdown file.' }
    ],
    faqs: []
  },
  {
    id: 'markdown-to-html',
    slug: 'markdown-to-html',
    name: 'Markdown to HTML Converter',
    description: 'Render Markdown (.md) documents into clean, semantic HTML code.',
    category: 'document',
    action: 'convert',
    inputFormats: ['md', 'markdown'],
    outputFormats: ['html'],
    defaultOutputFormat: 'html',
    maxFileSizeMB: 10,
    processingMode: 'client',
    icon: 'FileCode',
    popular: false,
    isAiReady: false,
    seo: {
      title: 'Markdown to HTML Converter | Live Online Tool',
      description: 'Render Markdown (.md) into HTML markup with GFM table support.',
      keywords: ['markdown to html', 'md to html', 'render markdown to html'],
      h1: 'Convert Markdown to Clean HTML',
    },
    features: [
      'GitHub Flavored Markdown (GFM) support',
      'Client-side sanitization against XSS',
      'Includes clean responsive CSS styling template'
    ],
    howItWorks: [
      { step: 1, title: 'Upload Markdown', description: 'Select your .md document.' },
      { step: 2, title: 'Render', description: 'Marked engine renders HTML markup.' },
      { step: 3, title: 'Download', description: 'Save as ready-to-publish .html file.' }
    ],
    faqs: []
  },

  // --- PDF TOOLS ---
  {
    id: 'compress-pdf',
    slug: 'compress-pdf',
    name: 'PDF Compressor',
    description: 'Reduce PDF file size without sacrificing readability or image clarity.',
    category: 'pdf',
    action: 'compress',
    inputFormats: ['pdf'],
    outputFormats: ['pdf'],
    defaultOutputFormat: 'pdf',
    maxFileSizeMB: 50,
    processingMode: 'client',
    icon: 'FileCheck',
    popular: true,
    isAiReady: false,
    seo: {
      title: 'Compress PDF Online | Reduce File Size Fast & Free',
      description: 'Compress PDF files directly in your browser. Optimize PDF size for email attachments and web publishing without quality loss.',
      keywords: ['compress pdf', 'pdf shrinker', 'reduce pdf size', 'pdf optimizer online'],
      h1: 'Compress PDF Files Online',
    },
    features: [
      'Browser-based local optimization preserves total privacy',
      'Removes unreferenced object streams and duplicate resources',
      'Calculates exact percentage savings achieved'
    ],
    howItWorks: [
      { step: 1, title: 'Select PDF', description: 'Upload the PDF file you wish to shrink.' },
      { step: 2, title: 'Optimize', description: 'PDF stream dictionary objects are compressed.' },
      { step: 3, title: 'Download', description: 'Download your smaller PDF file.' }
    ],
    faqs: [
      {
        question: 'Does PDF compression reduce text quality?',
        answer: 'No! Text vectors and typography objects are losslessly compressed.'
      }
    ]
  },
  {
    id: 'images-to-pdf',
    slug: 'images-to-pdf',
    name: 'Images to PDF Converter',
    description: 'Combine multiple JPG, PNG, or WebP images into a single document PDF.',
    category: 'pdf',
    action: 'convert',
    inputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    outputFormats: ['pdf'],
    defaultOutputFormat: 'pdf',
    maxFileSizeMB: 30,
    processingMode: 'client',
    icon: 'FilePlus',
    popular: false,
    isAiReady: false,
    seo: {
      title: 'JPG / PNG Images to PDF Converter | Free & Fast',
      description: 'Merge JPG, PNG, and WebP images into a clean single PDF file. 100% private browser processing.',
      keywords: ['images to pdf', 'jpg to pdf', 'png to pdf', 'merge photos into pdf'],
      h1: 'Convert Images into a PDF Document',
    },
    features: [
      'Combine multiple image formats into one PDF',
      'Maintains original resolution and color spaces',
      'Client-side local rendering'
    ],
    howItWorks: [
      { step: 1, title: 'Upload Images', description: 'Select one or more image files.' },
      { step: 2, title: 'Generate PDF', description: 'Pages are assembled with custom dimensions.' },
      { step: 3, title: 'Download PDF', description: 'Download your compiled document.' }
    ],
    faqs: []
  },
  {
    id: 'pdf-to-images',
    slug: 'pdf-to-images',
    name: 'PDF to Images Extractor',
    description: 'Render PDF page streams into high-resolution PNG or JPG image files.',
    category: 'pdf',
    action: 'convert',
    inputFormats: ['pdf'],
    outputFormats: ['png', 'jpg'],
    defaultOutputFormat: 'png',
    maxFileSizeMB: 30,
    processingMode: 'client',
    icon: 'ImageIcon',
    popular: false,
    isAiReady: false,
    seo: {
      title: 'PDF to Images Extractor | PNG & JPG Output',
      description: 'Extract pages from PDF files as crisp images directly inside your browser sandbox.',
      keywords: ['pdf to images', 'pdf page extractor', 'pdf to png'],
      h1: 'Extract PDF Pages as PNG / JPG Images',
    },
    features: [
      'Renders each page to high-DPI canvas stream',
      'Download individual page images or combined ZIP',
      '100% local client processing'
    ],
    howItWorks: [
      { step: 1, title: 'Upload PDF', description: 'Select your PDF document.' },
      { step: 2, title: 'Render Pages', description: 'Pages are rendered onto HTML5 canvas nodes.' },
      { step: 3, title: 'Download Images', description: 'Save rendered page graphics.' }
    ],
    faqs: []
  },

  // --- IMAGE TOOLS ---
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress JPG, PNG, WebP, and AVIF images with custom quality settings.',
    category: 'image',
    action: 'compress',
    inputFormats: ['png', 'jpg', 'jpeg', 'webp', 'avif'],
    outputFormats: ['jpg', 'png', 'webp'],
    defaultOutputFormat: 'jpg',
    maxFileSizeMB: 20,
    processingMode: 'client',
    icon: 'ImageIcon',
    popular: true,
    isAiReady: false,
    seo: {
      title: 'Online Image Compressor | JPG, PNG, WebP Optimization',
      description: 'Compress images online with side-by-side quality inspection. Reduce image file sizes up to 80% for faster page loading.',
      keywords: ['image compressor', 'compress jpg', 'compress png', 'shrink image size'],
      h1: 'Compress Images for Web & Mobile',
    },
    features: [
      'Interactive quality slider (10% to 100%)',
      'Before / After visual comparison modal',
      'Dimension resizing options (Original, 75%, 50%, Custom width)'
    ],
    howItWorks: [
      { step: 1, title: 'Upload Image', description: 'Drop your JPG, PNG, or WebP file.' },
      { step: 2, title: 'Adjust Quality', description: 'Choose compression level and target resolution.' },
      { step: 3, title: 'Download', description: 'Download optimized image with instant size savings.' }
    ],
    faqs: []
  },
  {
    id: 'jpg-to-webp',
    slug: 'jpg-to-webp',
    name: 'JPG to WebP Converter',
    description: 'Convert JPG images to modern WebP format for superior web compression.',
    category: 'image',
    action: 'convert',
    inputFormats: ['jpg', 'jpeg'],
    outputFormats: ['webp', 'png'],
    defaultOutputFormat: 'webp',
    maxFileSizeMB: 15,
    processingMode: 'client',
    icon: 'RefreshCw',
    popular: true,
    isAiReady: false,
    seo: {
      title: 'JPG to WebP Converter Online | 100% Free',
      description: 'Convert JPG images to high-efficiency WebP format in your browser.',
      keywords: ['jpg to webp', 'jpeg to webp', 'convert jpg webp online'],
      h1: 'Convert JPG to Modern WebP Format',
    },
    features: [
      'Reduces file sizes by 30-50% compared to standard JPEG',
      'Supported by all modern browsers and Core Web Vitals guidelines',
      'Zero server upload required'
    ],
    howItWorks: [
      { step: 1, title: 'Upload JPG', description: 'Select your JPG or JPEG image.' },
      { step: 2, title: 'Transcode', description: 'Browser canvas encodes to WebP.' },
      { step: 3, title: 'Download', description: 'Download smaller WebP image.' }
    ],
    faqs: []
  },
  {
    id: 'png-to-webp',
    slug: 'png-to-webp',
    name: 'PNG to WebP Converter',
    description: 'Convert PNG images with transparency to lightweight WebP files.',
    category: 'image',
    action: 'convert',
    inputFormats: ['png'],
    outputFormats: ['webp', 'jpg'],
    defaultOutputFormat: 'webp',
    maxFileSizeMB: 15,
    processingMode: 'client',
    icon: 'RefreshCw',
    popular: false,
    isAiReady: false,
    seo: {
      title: 'PNG to WebP Converter | Preserve Transparency',
      description: 'Convert PNG graphics to WebP while maintaining alpha channel transparency.',
      keywords: ['png to webp', 'transparent png to webp', 'convert png webp'],
      h1: 'Convert PNG to WebP with Alpha Transparency',
    },
    features: [
      'Preserves alpha channel transparency',
      'Significantly reduces image byte size',
      'Instant local browser conversion'
    ],
    howItWorks: [
      { step: 1, title: 'Upload PNG', description: 'Drop your transparent PNG file.' },
      { step: 2, title: 'Convert', description: 'Canvas encodes transparent layers into WebP.' },
      { step: 3, title: 'Download', description: 'Download WebP image.' }
    ],
    faqs: []
  },
  {
    id: 'webp-to-jpg',
    slug: 'webp-to-jpg',
    name: 'WebP to JPG Converter',
    description: 'Convert WebP images back into universally compatible JPEG format.',
    category: 'image',
    action: 'convert',
    inputFormats: ['webp'],
    outputFormats: ['jpg', 'png'],
    defaultOutputFormat: 'jpg',
    maxFileSizeMB: 15,
    processingMode: 'client',
    icon: 'RefreshCw',
    popular: false,
    isAiReady: false,
    seo: {
      title: 'WebP to JPG Converter | Universal Compatibility',
      description: 'Convert WebP images to standard JPG format for legacy apps and print.',
      keywords: ['webp to jpg', 'convert webp to jpeg', 'webp to jpg free'],
      h1: 'Convert WebP Images to JPG Format',
    },
    features: [
      'Universal compatibility with all graphics software',
      'Custom quality setting control',
      'Client-side processing'
    ],
    howItWorks: [
      { step: 1, title: 'Select WebP', description: 'Upload your .webp image.' },
      { step: 2, title: 'Encode', description: 'Convert canvas frame into JPEG buffer.' },
      { step: 3, title: 'Download JPG', description: 'Download ready JPG image.' }
    ],
    faqs: []
  },
  {
    id: 'png-to-jpg',
    slug: 'png-to-jpg',
    name: 'PNG to JPG Converter',
    description: 'Convert PNG image files to JPEG format for universal compatibility.',
    category: 'image',
    action: 'convert',
    inputFormats: ['png'],
    outputFormats: ['jpg'],
    defaultOutputFormat: 'jpg',
    maxFileSizeMB: 15,
    processingMode: 'client',
    icon: 'RefreshCw',
    popular: false,
    isAiReady: false,
    seo: {
      title: 'PNG to JPG Converter Online | Fast & Free',
      description: 'Convert PNG graphics to JPG images instantly in your web browser.',
      keywords: ['png to jpg', 'convert png to jpeg', 'png jpg converter'],
      h1: 'Convert PNG Images to JPG',
    },
    features: [
      'Fast client-side canvas transcoding',
      'Adjustable white background fill for transparent channels',
      'Zero file upload required'
    ],
    howItWorks: [
      { step: 1, title: 'Upload PNG', description: 'Select your PNG file.' },
      { step: 2, title: 'Transcode', description: 'Convert image layers to JPEG buffer.' },
      { step: 3, title: 'Download', description: 'Download JPG image.' }
    ],
    faqs: []
  },
  {
    id: 'jpg-to-png',
    slug: 'jpg-to-png',
    name: 'JPG to PNG Converter',
    description: 'Convert JPG images to losslessly compressed PNG files.',
    category: 'image',
    action: 'convert',
    inputFormats: ['jpg', 'jpeg'],
    outputFormats: ['png'],
    defaultOutputFormat: 'png',
    maxFileSizeMB: 15,
    processingMode: 'client',
    icon: 'RefreshCw',
    popular: false,
    isAiReady: false,
    seo: {
      title: 'JPG to PNG Converter Online | Lossless Output',
      description: 'Convert JPEG photos into PNG format with 100% client-side rendering.',
      keywords: ['jpg to png', 'convert jpeg to png', 'jpg png converter'],
      h1: 'Convert JPG Images to PNG Format',
    },
    features: [
      'Lossless pixel data encoding',
      'Browser-based canvas processing',
      'No quality degradation'
    ],
    howItWorks: [
      { step: 1, title: 'Upload JPG', description: 'Select your JPG file.' },
      { step: 2, title: 'Encode', description: 'Render pixels into PNG stream.' },
      { step: 3, title: 'Download', description: 'Save .png file.' }
    ],
    faqs: []
  },

  // --- DATA & DEVELOPER TOOLS ---
  {
    id: 'csv-to-json',
    slug: 'csv-to-json',
    name: 'CSV to JSON Converter',
    description: 'Convert CSV data spreadsheets into structured JSON arrays for developers.',
    category: 'data',
    action: 'convert',
    inputFormats: ['csv'],
    outputFormats: ['json'],
    defaultOutputFormat: 'json',
    maxFileSizeMB: 20,
    processingMode: 'client',
    icon: 'Database',
    popular: false,
    isAiReady: true,
    seo: {
      title: 'CSV to JSON Converter | Free Developer Tool',
      description: 'Convert CSV files to JSON object arrays instantly in your browser sandbox.',
      keywords: ['csv to json', 'convert csv json', 'csv json parser online'],
      h1: 'Convert CSV Spreadsheets to JSON',
    },
    features: [
      'Automatic column header key detection',
      'Handles numeric and boolean type parsing',
      '100% private local browser execution'
    ],
    howItWorks: [
      { step: 1, title: 'Upload CSV', description: 'Select your .csv table.' },
      { step: 2, title: 'Parse', description: 'Client parser maps rows to JSON objects.' },
      { step: 3, title: 'Download JSON', description: 'Save formatted JSON file.' }
    ],
    faqs: []
  },
  {
    id: 'json-to-csv',
    slug: 'json-to-csv',
    name: 'JSON to CSV Converter',
    description: 'Flatten structured JSON data arrays into tabular CSV spreadsheets.',
    category: 'data',
    action: 'convert',
    inputFormats: ['json'],
    outputFormats: ['csv'],
    defaultOutputFormat: 'csv',
    maxFileSizeMB: 20,
    processingMode: 'client',
    icon: 'FileSpreadsheet',
    popular: false,
    isAiReady: false,
    seo: {
      title: 'JSON to CSV Converter | Online Data Tool',
      description: 'Convert JSON object arrays to CSV format for Excel and Google Sheets.',
      keywords: ['json to csv', 'convert json csv', 'json to spreadsheet'],
      h1: 'Convert JSON Data to Tabular CSV',
    },
    features: [
      'Flattens nested object fields into column headers',
      'Escapes commas and quotes according to RFC 4180',
      '100% client-side privacy'
    ],
    howItWorks: [
      { step: 1, title: 'Upload JSON', description: 'Drop your .json data file.' },
      { step: 2, title: 'Flatten', description: 'Objects are mapped to table columns.' },
      { step: 3, title: 'Download CSV', description: 'Save as .csv spreadsheet.' }
    ],
    faqs: []
  },
  {
    id: 'csv-to-xlsx',
    slug: 'csv-to-xlsx',
    name: 'CSV to Excel (XLSX) Converter',
    description: 'Convert CSV text tables into native Microsoft Excel (.xlsx) workbooks.',
    category: 'data',
    action: 'convert',
    inputFormats: ['csv'],
    outputFormats: ['xlsx'],
    defaultOutputFormat: 'xlsx',
    maxFileSizeMB: 20,
    processingMode: 'client',
    icon: 'FileSpreadsheet',
    popular: false,
    isAiReady: false,
    seo: {
      title: 'CSV to Excel (XLSX) Converter | Free Online Tool',
      description: 'Convert CSV files to Microsoft Excel (.xlsx) workbooks directly in your browser.',
      keywords: ['csv to xlsx', 'csv to excel', 'convert csv to xlsx'],
      h1: 'Convert CSV to Microsoft Excel Workbook',
    },
    features: [
      'Generates native OpenXML sheet structures',
      'Preserves character encodings (UTF-8)',
      '100% browser-based conversion'
    ],
    howItWorks: [
      { step: 1, title: 'Select CSV', description: 'Upload your .csv spreadsheet.' },
      { step: 2, title: 'Build Sheet', description: 'XLSX sheet tables are assembled.' },
      { step: 3, title: 'Download XLSX', description: 'Open natively in Microsoft Excel.' }
    ],
    faqs: []
  }
];

export const TOOL_CATEGORIES = [
  { id: 'document', name: 'Document & AI Tools', description: 'Convert PDFs, Word docs, and HTML into AI-ready Markdown format.' },
  { id: 'pdf', name: 'PDF Tools', description: 'Compress, optimize, merge, and extract PDF files.' },
  { id: 'image', name: 'Image Tools', description: 'Compress, resize, and convert JPG, PNG, WebP, and AVIF images.' },
  { id: 'data', name: 'Data & Developer Tools', description: 'Convert CSV, JSON, and Excel data files.' },
  { id: 'office', name: 'Office Tools', description: 'Convert Microsoft Office formats into PDF and Word docs.' },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolDefinition[] {
  return TOOLS.filter((t) => t.category === category);
}

export function getPopularTools(): ToolDefinition[] {
  return TOOLS.filter((t) => t.popular);
}
