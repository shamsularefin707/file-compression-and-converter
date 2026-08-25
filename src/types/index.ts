export type FileStatus = 'waiting' | 'processing' | 'completed' | 'failed';

export type FileAction = 'compress' | 'convert';

export type PDFCompressionLevel = 'low' | 'medium' | 'high';

export type ResizeOption = 'original' | '75' | '50' | 'custom';

export interface CompressionSettings {
  quality: number; // 10 to 100
  resizeOption: ResizeOption;
  customWidth?: number;
  customHeight?: number;
  pdfLevel: PDFCompressionLevel;
}

export interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  originalDimensions?: { width: number; height: number };
  compressedDimensions?: { width: number; height: number };
  status: FileStatus;
  progress: number;
  error?: string;
  outputUrl?: string;
  outputSize?: number;
  outputName?: string;
  outputType?: string;
  action: FileAction;
  targetFormat?: string; // e.g. 'png', 'jpg', 'webp', 'pdf', 'json', 'csv', etc.
  savingsPercent?: number;
  requiresAd?: boolean;
  statusText?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}
