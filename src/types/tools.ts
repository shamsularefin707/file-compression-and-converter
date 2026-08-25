export type ToolCategory = 'document' | 'pdf' | 'image' | 'office' | 'data';

export type ProcessingMode = 'client' | 'server';

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface ToolSEO {
  title: string;
  description: string;
  keywords: string[];
  h1: string;
}

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  action: 'convert' | 'compress';
  inputFormats: string[]; // e.g. ['pdf']
  outputFormats: string[]; // e.g. ['md', 'txt', 'docx']
  defaultOutputFormat: string;
  maxFileSizeMB: number;
  processingMode: ProcessingMode;
  icon: string; // Lucide icon name
  popular?: boolean;
  isAiReady?: boolean;
  seo: ToolSEO;
  faqs: ToolFAQ[];
  howItWorks: HowItWorksStep[];
  features: string[];
}

export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  readTime: string;
  category: string;
  content: string; // Markdown or structured text
  relatedToolSlugs: string[];
}
