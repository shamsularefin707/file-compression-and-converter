import React, { useState, useRef } from 'react';
import { 
  Upload, 
  File, 
  FileText, 
  FileImage, 
  FileSpreadsheet, 
  FileArchive, 
  Settings2, 
  Play, 
  Trash2, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Info, 
  Eye, 
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import type { FileItem, CompressionSettings, FileAction, ResizeOption, PDFCompressionLevel } from '../types';
import { 
  compressImageFile, 
  compressPdfFile, 
  createZipArchive, 
  extractZipArchive,
  csvToJson,
  jsonToCsv,
  xlsxToCsv,
  csvToXlsx,
  docxToHtml,
  markdownToHtml,
  txtToPdf,
  htmlToPdfBlob
} from '../utils/fileProcessor';
import { monetization } from '../services/monetization';
import { analytics } from '../services/analytics';
import { AdModal } from './AdModal';
import { convertPdfViaBackend } from '../services/backend';

interface WorkspaceProps {
  onScrollTo: (id: string) => void;
}

export const Workspace: React.FC<WorkspaceProps> = ({ onScrollTo }) => {
  const [activeTab, setActiveTab] = useState<FileAction>('compress');
  const [queue, setQueue] = useState<FileItem[]>([]);
  const [settings, setSettings] = useState<CompressionSettings>({
    quality: 80,
    resizeOption: 'original',
    pdfLevel: 'medium',
  });
  const [showSettings, setShowSettings] = useState<boolean>(true);
  const [processing, setProcessing] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  
  // Ad simulation state
  const [adModalOpen, setAdModalOpen] = useState<boolean>(false);
  const [adIsMandatory, setAdIsMandatory] = useState<boolean>(false);
  const [onAdCompletedCallback, setOnAdCompletedCallback] = useState<(() => void) | null>(null);
  
  // Image comparison state
  const [previewItem, setPreviewItem] = useState<FileItem | null>(null);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      addFilesToQueue(Array.from(e.dataTransfer.files));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      addFilesToQueue(Array.from(e.target.files));
    }
  };

  const getFileExtension = (name: string): string => {
    return name.split('.').pop()?.toLowerCase() || '';
  };

  const getSupportedFormats = (name: string): string[] => {
    const ext = getFileExtension(name);
    switch (ext) {
      case 'png':
        return ['jpg', 'webp', 'avif'];
      case 'jpg':
      case 'jpeg':
        return ['png', 'webp', 'avif'];
      case 'webp':
        return ['jpg', 'png', 'avif'];
      case 'avif':
        return ['jpg', 'png', 'webp'];
      case 'docx':
        return ['html', 'pdf'];
      case 'md':
      case 'markdown':
        return ['html', 'pdf'];
      case 'txt':
        return ['html', 'pdf'];
      case 'html':
        return ['pdf'];
      case 'pdf':
        return ['docx', 'txt', 'html', 'md'];
      case 'csv':
        return ['json', 'xlsx'];
      case 'json':
        return ['csv'];
      case 'xlsx':
        return ['csv'];
      case 'zip':
        return ['unzip'];
      default:
        return [];
    }
  };

  const addFilesToQueue = (files: File[]) => {
    const limits = monetization.getLimits();
    const newItems: FileItem[] = [];
    let errors: string[] = [];

    // Check batch limit
    const currentQueueCount = queue.length;
    if (currentQueueCount + files.length > limits.maxBatchSize) {
      errors.push(`Batch limit exceeded. Max limit is ${limits.maxBatchSize} files.`);
      files = files.slice(0, limits.maxBatchSize - currentQueueCount);
    }

    files.forEach(file => {
      // Check file size
      const sizeCheck = monetization.checkFileSize(file.size);
      if (!sizeCheck.allowed) {
        errors.push(`${file.name}: ${sizeCheck.error}`);
        return;
      }

      const ext = getFileExtension(file.name);
      // Determine default action & format
      const isImage = ['png', 'jpg', 'jpeg', 'webp', 'avif'].includes(ext);
      
      const formats = getSupportedFormats(file.name);
      const defaultTargetFormat = formats[0] || '';

      const newItem: FileItem = {
        id: Math.random().toString(36).substring(2, 9),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'waiting',
        progress: 0,
        action: activeTab,
        targetFormat: activeTab === 'convert' ? defaultTargetFormat : undefined,
        requiresAd: sizeCheck.requiresAd,
      };

      // Extract image dimensions for comparison
      if (isImage) {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          newItem.originalDimensions = { width: img.width, height: img.height };
          URL.revokeObjectURL(url);
        };
        img.src = url;
      }

      newItems.push(newItem);
      analytics.track({
        type: 'file_uploaded',
        payload: { name: file.name, size: file.size, mimeType: file.type }
      });
    });

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    if (newItems.length > 0) {
      setQueue(prev => [...prev, ...newItems]);
    }
  };

  const removeFile = (id: string) => {
    setQueue(prev => {
      const item = prev.find(i => i.id === id);
      if (item?.outputUrl) {
        URL.revokeObjectURL(item.outputUrl);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const clearQueue = () => {
    queue.forEach(item => {
      if (item.outputUrl) URL.revokeObjectURL(item.outputUrl);
    });
    setQueue([]);
  };

  const updateItemTargetFormat = (id: string, format: string) => {
    setQueue(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, targetFormat: format };
      }
      return item;
    }));
  };

  const getFileIcon = (fileName: string) => {
    const ext = getFileExtension(fileName);
    const size = "w-6 h-6";
    if (['png', 'jpg', 'jpeg', 'webp', 'avif'].includes(ext)) {
      return <FileImage className={`${size} text-brand-500`} />;
    }
    if (ext === 'pdf') {
      return <FileText className={`${size} text-rose-500`} />;
    }
    if (['zip', 'rar', 'tar', 'gz'].includes(ext)) {
      return <FileArchive className={`${size} text-amber-500`} />;
    }
    if (['xlsx', 'xls', 'csv'].includes(ext)) {
      return <FileSpreadsheet className={`${size} text-emerald-500`} />;
    }
    return <File className={`${size} text-slate-400`} />;
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Generate real mock files for the user to try instantly
  const loadDemo = async () => {
    clearQueue();
    const demoFiles: File[] = [];

    // 1. Text File
    const textBlob = new Blob([
      "Welcome to FileForge!\n\nThis is a sample text file processed entirely in the browser.\nYou can convert this file into a formatted PDF or HTML.\nPrivacy is built into the design by using client-side execution."
    ], { type: 'text/plain' });
    demoFiles.push(new (window as any).File([textBlob], "demo_intro.txt", { type: 'text/plain' }));

    // 2. CSV File
    const csvBlob = new Blob([
      "id,name,role,department\n1,Alex Rivera,Tech Lead,Engineering\n2,Sophia Chen,UI Designer,Product\n3,Marcus Vance,Manager,Marketing\n4,Elena Rostova,Analyst,Data Science"
    ], { type: 'text/csv' });
    demoFiles.push(new (window as any).File([csvBlob], "demo_employees.csv", { type: 'text/csv' }));

    // 3. Markdown File
    const mdBlob = new Blob([
      "# FileForge Document\n\nThis is a *real* markdown document converted client-side.\n\n## Advantages:\n1. **Private**: No data uploads\n2. **Fast**: Instant local conversion\n3. **Modern**: Uses HTML5 canvas & libraries\n\nCreated with Love."
    ], { type: 'text/markdown' });
    demoFiles.push(new (window as any).File([mdBlob], "demo_guide.md", { type: 'text/markdown' }));

    // 4. PNG Image generated via Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw rich background gradient
      const grad = ctx.createLinearGradient(0, 0, 600, 400);
      grad.addColorStop(0, '#0ea5e9'); // sky-500
      grad.addColorStop(1, '#a855f7'); // purple-500
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 600, 400);
      
      // Draw details
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 600; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 400);
        ctx.stroke();
      }

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('FileForge toolkit', 300, 180);
      
      ctx.font = '20px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillText('Local Image Compression & Conversion', 300, 230);
      
      const imgBlob = await new Promise<Blob>((res) => {
        canvas.toBlob((b) => res(b!), 'image/png');
      });
      demoFiles.push(new (window as any).File([imgBlob], "demo_image.png", { type: 'image/png' }));
    }

    addFilesToQueue(demoFiles);
    // Scroll down to queue
    setTimeout(() => {
      onScrollTo('queue-workspace');
    }, 150);
  };

  // Process a single file card
  const processFileItem = async (item: FileItem): Promise<FileItem> => {
    const ext = getFileExtension(item.name);
    if (item.action === 'compress') {
      analytics.track({
        type: 'compression_started',
        payload: { id: item.id, name: item.name, size: item.size, action: 'compress' }
      });
    } else {
      analytics.track({
        type: 'conversion_started',
        payload: { id: item.id, name: item.name, from: ext, to: item.targetFormat || '' }
      });
    }

    try {
      // 1. Image actions
      if (['png', 'jpg', 'jpeg', 'webp', 'avif'].includes(ext)) {
        const isConvert = item.action === 'convert';
        const targetFormat = isConvert ? item.targetFormat : ext;
        
        const result = await compressImageFile(item.file, settings, targetFormat);
        const savings = item.size - result.blob.size;
        const savingsPercent = Math.max(0, parseFloat(((savings / item.size) * 100).toFixed(1)));
        
        // Generate output filename
        const baseName = item.name.substring(0, item.name.lastIndexOf('.'));
        const outName = `${baseName}_compressed.${targetFormat || ext}`;
        
        return {
          ...item,
          status: 'completed',
          progress: 100,
          outputUrl: URL.createObjectURL(result.blob),
          outputSize: result.blob.size,
          outputName: outName,
          outputType: result.blob.type,
          compressedDimensions: { width: result.width, height: result.height },
          savingsPercent,
        };
      }

      // 2. PDF actions
      if (ext === 'pdf') {
        if (item.action === 'compress') {
          const resultBlob = await compressPdfFile(item.file, settings.pdfLevel);
          const savings = item.size - resultBlob.size;
          const savingsPercent = Math.max(0, parseFloat(((savings / item.size) * 100).toFixed(1)));
          const baseName = item.name.substring(0, item.name.lastIndexOf('.'));
          
          return {
            ...item,
            status: 'completed',
            progress: 100,
            outputUrl: URL.createObjectURL(resultBlob),
            outputSize: resultBlob.size,
            outputName: `${baseName}_optimized.pdf`,
            outputType: 'application/pdf',
            savingsPercent: savingsPercent > 0.5 ? savingsPercent : 0, // Show 0 if no savings
            error: savingsPercent <= 0.5 ? 'This PDF is already optimized. Output is identical to input.' : undefined,
          };
        } else if (item.action === 'convert') {
          if (!item.targetFormat) throw new Error('Target conversion format not selected.');
          const result = await convertPdfViaBackend(item.file, item.targetFormat);
          return {
            ...item,
            status: 'completed',
            progress: 100,
            outputUrl: URL.createObjectURL(result.blob),
            outputSize: result.blob.size,
            outputName: result.outputName,
            outputType: result.outputType,
          };
        }
      }

      // 3. Document Conversions
      if (item.action === 'convert') {
        const target = item.targetFormat;
        const baseName = item.name.substring(0, item.name.lastIndexOf('.'));
        
        if (ext === 'docx') {
          if (target === 'html') {
            const html = await docxToHtml(item.file);
            const blob = new Blob([html], { type: 'text/html' });
            return {
              ...item,
              status: 'completed',
              progress: 100,
              outputUrl: URL.createObjectURL(blob),
              outputSize: blob.size,
              outputName: `${baseName}.html`,
              outputType: 'text/html',
            };
          } else if (target === 'pdf') {
            const html = await docxToHtml(item.file);
            const pdfBlob = await htmlToPdfBlob(html);
            return {
              ...item,
              status: 'completed',
              progress: 100,
              outputUrl: URL.createObjectURL(pdfBlob),
              outputSize: pdfBlob.size,
              outputName: `${baseName}.pdf`,
              outputType: 'application/pdf',
            };
          }
        }

        if (ext === 'md' || ext === 'markdown') {
          if (target === 'html') {
            const html = await markdownToHtml(item.file);
            const blob = new Blob([html], { type: 'text/html' });
            return {
              ...item,
              status: 'completed',
              progress: 100,
              outputUrl: URL.createObjectURL(blob),
              outputSize: blob.size,
              outputName: `${baseName}.html`,
              outputType: 'text/html',
            };
          } else if (target === 'pdf') {
            const html = await markdownToHtml(item.file);
            const pdfBlob = await htmlToPdfBlob(html);
            return {
              ...item,
              status: 'completed',
              progress: 100,
              outputUrl: URL.createObjectURL(pdfBlob),
              outputSize: pdfBlob.size,
              outputName: `${baseName}.pdf`,
              outputType: 'application/pdf',
            };
          }
        }

        if (ext === 'txt') {
          if (target === 'html') {
            const text = await item.file.text();
            const html = `<pre style="font-family: sans-serif; white-space: pre-wrap; padding: 20px;">${text}</pre>`;
            const blob = new Blob([html], { type: 'text/html' });
            return {
              ...item,
              status: 'completed',
              progress: 100,
              outputUrl: URL.createObjectURL(blob),
              outputSize: blob.size,
              outputName: `${baseName}.html`,
              outputType: 'text/html',
            };
          } else if (target === 'pdf') {
            const pdfBlob = await txtToPdf(item.file);
            return {
              ...item,
              status: 'completed',
              progress: 100,
              outputUrl: URL.createObjectURL(pdfBlob),
              outputSize: pdfBlob.size,
              outputName: `${baseName}.pdf`,
              outputType: 'application/pdf',
            };
          }
        }

        if (ext === 'html') {
          if (target === 'pdf') {
            const text = await item.file.text();
            const pdfBlob = await htmlToPdfBlob(text);
            return {
              ...item,
              status: 'completed',
              progress: 100,
              outputUrl: URL.createObjectURL(pdfBlob),
              outputSize: pdfBlob.size,
              outputName: `${baseName}.pdf`,
              outputType: 'application/pdf',
            };
          }
        }

        // 4. Data Conversions
        if (ext === 'csv') {
          if (target === 'json') {
            const text = await item.file.text();
            const json = csvToJson(text);
            const blob = new Blob([json], { type: 'application/json' });
            return {
              ...item,
              status: 'completed',
              progress: 100,
              outputUrl: URL.createObjectURL(blob),
              outputSize: blob.size,
              outputName: `${baseName}.json`,
              outputType: 'application/json',
            };
          } else if (target === 'xlsx') {
            const xlsxBlob = await csvToXlsx(item.file);
            return {
              ...item,
              status: 'completed',
              progress: 100,
              outputUrl: URL.createObjectURL(xlsxBlob),
              outputSize: xlsxBlob.size,
              outputName: `${baseName}.xlsx`,
              outputType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            };
          }
        }

        if (ext === 'json') {
          if (target === 'csv') {
            const text = await item.file.text();
            const csv = jsonToCsv(text);
            const blob = new Blob([csv], { type: 'text/csv' });
            return {
              ...item,
              status: 'completed',
              progress: 100,
              outputUrl: URL.createObjectURL(blob),
              outputSize: blob.size,
              outputName: `${baseName}.csv`,
              outputType: 'text/csv',
            };
          }
        }

        if (ext === 'xlsx') {
          if (target === 'csv') {
            const csvText = await xlsxToCsv(item.file);
            const blob = new Blob([csvText], { type: 'text/csv' });
            return {
              ...item,
              status: 'completed',
              progress: 100,
              outputUrl: URL.createObjectURL(blob),
              outputSize: blob.size,
              outputName: `${baseName}.csv`,
              outputType: 'text/csv',
            };
          }
        }

        // 5. ZIP Archive extraction
        if (ext === 'zip' && target === 'unzip') {
          const files = await extractZipArchive(item.file);
          if (files.length === 0) throw new Error('ZIP archive is empty or invalid.');
          
          // Generate a custom download of the first file or repack?
          // Since unzipping returns multiple files, we can zip it back or give user the primary file,
          // but to be extremely helpful, we can allow downloading the first extracted file
          // OR create a directory package representation. Let's return the first file's blob.
          const mainFile = files[0];
          return {
            ...item,
            status: 'completed',
            progress: 100,
            outputUrl: URL.createObjectURL(mainFile.blob),
            outputSize: mainFile.blob.size,
            outputName: mainFile.name,
            outputType: mainFile.blob.type,
            error: files.length > 1 ? `Extracted ${files.length} files. Downloading first file: "${mainFile.name}".` : undefined,
          };
        }
      }

      // Default fallback if action matches nothing
      throw new Error(`The requested operation "${item.action}" to "${item.targetFormat || 'same'}" is not supported locally.`);
    } catch (e: any) {
      console.error(e);
      return {
        ...item,
        status: 'failed',
        progress: 0,
        error: e.message || 'An error occurred during local processing.',
      };
    }
  };

  // Run the batch pipeline after ads are completed
  const runPipeline = async (itemsToProcess: FileItem[]) => {
    setProcessing(true);

    // Process sequentially so page doesn't lag
    for (let i = 0; i < itemsToProcess.length; i++) {
      const item = itemsToProcess[i];
      
      // Update status to processing
      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'processing', progress: 30 } : q));
      
      // Artificial delay for progress feel
      await new Promise(r => setTimeout(r, 400));
      
      const processedItem = await processFileItem(item);
      
      setQueue(prev => prev.map(q => q.id === item.id ? processedItem : q));
      
      if (processedItem.status === 'completed') {
        analytics.track({
          type: 'compression_completed',
          payload: {
            id: item.id,
            originalSize: item.size,
            outputSize: processedItem.outputSize || 0,
            savedBytes: item.size - (processedItem.outputSize || item.size)
          }
        });
      }
    }

    setProcessing(false);
  };

  // Intercept processing with Ads monetization check
  const processQueue = async () => {
    if (queue.length === 0) return;

    const itemsToProcess = queue.filter(item => item.status === 'waiting' || item.status === 'failed');
    if (itemsToProcess.length === 0) return;

    // Check if any file requires a mandatory ad (e.g. size > 20MB)
    const hasLargeFiles = itemsToProcess.some(item => item.requiresAd);
    
    // Check if any file is attempting a conversion
    const hasConversions = itemsToProcess.some(item => item.action === 'convert');

    if (hasLargeFiles) {
      // Trigger mandatory ad (8 seconds)
      setAdIsMandatory(true);
      setOnAdCompletedCallback(() => () => runPipeline(itemsToProcess));
      setAdModalOpen(true);
    } else if (hasConversions) {
      // Trigger conversion ad (3 seconds)
      setAdIsMandatory(false);
      setOnAdCompletedCallback(() => () => runPipeline(itemsToProcess));
      setAdModalOpen(true);
    } else {
      // No ad required, process immediately
      runPipeline(itemsToProcess);
    }
  };

  // Download all files as a ZIP archive
  const downloadAllAsZip = async () => {
    const completedItems = queue.filter(item => item.status === 'completed' && item.outputUrl && item.outputName);
    if (completedItems.length === 0) return;

    try {
      const filesToZip: { name: string; blob: Blob }[] = [];
      
      for (const item of completedItems) {
        const response = await fetch(item.outputUrl!);
        const blob = await response.blob();
        filesToZip.push({
          name: item.outputName!,
          blob,
        });
      }

      const zipBlob = await createZipArchive(filesToZip);
      const downloadUrl = URL.createObjectURL(zipBlob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `fileforge_bundle_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(downloadUrl);
      analytics.track({
        type: 'batch_download_clicked',
        payload: {
          fileCount: completedItems.length,
          totalSize: zipBlob.size,
        }
      });
    } catch (err) {
      console.error(err);
      alert('Failed to bundle files into a ZIP archive.');
    }
  };

  // Toggle tab
  const handleTabChange = (tab: FileAction) => {
    setActiveTab(tab);
    // If files are already in queue, update their action
    setQueue(prev => prev.map(item => ({
      ...item,
      action: tab,
      targetFormat: tab === 'convert' ? (getSupportedFormats(item.name)[0] || '') : undefined,
    })));
  };

  // Image Slider Drag logic
  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleSliderMove(e.clientX);
  };

  return (
    <div id="workspace" className="max-w-6xl mx-auto px-4 sm:px-8 py-8 transition-colors duration-300">
      
      {/* Workspace Navigation Cards */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          id="workspace-compress"
          onClick={() => handleTabChange('compress')}
          className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-display font-bold text-sm border transition-all duration-300 ${
            activeTab === 'compress'
              ? 'bg-brand-600 text-white border-transparent shadow-lg shadow-brand-500/20'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-950 dark:hover:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Compress Tool</span>
        </button>
        <button
          id="workspace-convert"
          onClick={() => handleTabChange('convert')}
          className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-display font-bold text-sm border transition-all duration-300 ${
            activeTab === 'convert'
              ? 'bg-gradient-to-r from-brand-600 to-accent-600 text-white border-transparent shadow-lg shadow-brand-500/20'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-950 dark:hover:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Convert Tool</span>
        </button>
      </div>

      {/* Main Drag-Drop Box */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={`relative group rounded-3xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-300 ${
          dragActive
            ? 'border-brand-500 bg-brand-500/5 dark:bg-brand-500/2'
            : 'border-slate-200/80 hover:border-brand-400 dark:border-slate-800/80 dark:hover:border-slate-700 bg-white/40 dark:bg-slate-950/20'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="bg-brand-500/10 dark:bg-brand-500/5 p-4 rounded-2xl text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-200">
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <p className="font-display font-bold text-lg text-slate-800 dark:text-slate-200">
              Drag and drop files here
            </p>
            <p className="font-sans text-xs text-slate-400 dark:text-slate-500 mt-1">
              Supports Images, PDFs, DOCX, XLSX, CSV, JSON, Markdown, and ZIP (Max 50MB)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold shadow-sm transition-colors">
              Browse Files
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                loadDemo();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-100 hover:bg-brand-200 dark:bg-brand-950 dark:hover:bg-brand-900 text-brand-700 dark:text-brand-400 text-xs font-semibold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Demo Files</span>
            </button>
          </div>
        </div>
      </div>

      {/* Workspace Settings Panel */}
      <div className="mt-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 shadow-sm overflow-hidden transition-all duration-300">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-slate-800 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-900/10 border-b border-slate-100 dark:border-slate-800/40"
        >
          <div className="flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-brand-500" />
            <span>Processing Settings</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${showSettings ? 'rotate-180' : ''}`} />
        </button>

        {showSettings && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
            
            {/* Image Settings */}
            <div className="space-y-6">
              <h4 className="font-display font-semibold text-sm text-brand-600 dark:text-brand-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800/50 pb-2">
                <FileImage className="w-4 h-4" />
                <span>Image Settings</span>
              </h4>
              
              {/* Quality Slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  <span>Compression Quality</span>
                  <span className="text-brand-600 dark:text-brand-400">{settings.quality}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={settings.quality}
                  onChange={(e) => setSettings(prev => ({ ...prev, quality: parseInt(e.target.value) }))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>

              {/* Resize Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  Scale Dimensions
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['original', '75', '50', 'custom'] as ResizeOption[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSettings(prev => ({ ...prev, resizeOption: opt }))}
                      className={`py-2 text-xs font-semibold rounded-xl border capitalize transition-all ${
                        settings.resizeOption === opt
                          ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 border-brand-500'
                          : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {opt === 'original' ? '100%' : opt === 'custom' ? 'Custom' : `${opt}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Dimensions fields */}
              {settings.resizeOption === 'custom' && (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                  <div>
                    <label className="block text-xxs font-bold text-slate-500 dark:text-slate-400 mb-1">
                      Max Width (px)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 1920"
                      value={settings.customWidth || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, customWidth: parseInt(e.target.value) || undefined }))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-800 dark:text-slate-100 focus:outline-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xxs font-bold text-slate-500 dark:text-slate-400 mb-1">
                      Max Height (px)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 1080"
                      value={settings.customHeight || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, customHeight: parseInt(e.target.value) || undefined }))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-800 dark:text-slate-100 focus:outline-brand-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* PDF Settings */}
            <div className="space-y-6">
              <h4 className="font-display font-semibold text-sm text-rose-600 dark:text-rose-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800/50 pb-2">
                <FileText className="w-4 h-4" />
                <span>PDF Compression Settings</span>
              </h4>
              
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  Optimization Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as PDFCompressionLevel[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => setSettings(prev => ({ ...prev, pdfLevel: level }))}
                      className={`py-2.5 text-xs font-semibold rounded-xl border capitalize transition-all ${
                        settings.pdfLevel === level
                          ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-500'
                          : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/40 text-xxs text-slate-500 dark:text-slate-400">
                  <Info className="w-4 h-4 text-brand-500 shrink-0" />
                  <p className="leading-normal">
                    Local PDF compression uses structural stream compaction and objects garbage collection. Image re-sampling is limited browser-side for memory stability.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Queue Area */}
      {queue.length > 0 && (
        <div id="queue-workspace" className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <span>File Queue</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400">
                {queue.length}
              </span>
            </h3>
            
            <div className="flex items-center gap-2">
              <button
                onClick={clearQueue}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 dark:border-slate-800 dark:hover:bg-slate-900 dark:text-slate-400 text-xs font-semibold transition-all"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                <span>Clear All</span>
              </button>
            </div>
          </div>

          {/* Queue List */}
          <div className="space-y-3 font-sans">
            {queue.map((item) => {
              const ext = getFileExtension(item.name);
              const formats = getSupportedFormats(item.name);
              const canPreview = ['png', 'jpg', 'jpeg', 'webp', 'avif'].includes(ext) && item.status === 'completed';

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
                >
                  {/* File Metadata */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 shrink-0">
                      {getFileIcon(item.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate" title={item.name}>
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>{formatSize(item.size)}</span>
                        <span>•</span>
                        <span className="uppercase">{ext}</span>
                        {item.requiresAd && (
                          <>
                            <span>•</span>
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider">
                              8s Ad Required
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Operation config dropdown / indicator */}
                  <div className="flex items-center gap-3 grow md:justify-center">
                    {item.action === 'compress' ? (
                      <div className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200/40 dark:border-slate-800/40">
                        Action: Compress
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Convert to:</span>
                        {formats.length > 0 ? (
                          <div className="relative">
                            <select
                              value={item.targetFormat || ''}
                              onChange={(e) => updateItemTargetFormat(item.id, e.target.value)}
                              disabled={item.status === 'processing' || item.status === 'completed'}
                              className="appearance-none bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                              {formats.map((f) => (
                                <option key={f} value={f}>
                                  {f.toUpperCase()}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        ) : (
                          <span className="text-xs font-semibold text-slate-400 italic">No Target Formats</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Progress & Output metadata */}
                  <div className="flex items-center gap-4 shrink-0 md:justify-end">
                    
                    {/* Status & Progress info */}
                    <div className="text-right min-w-[100px]">
                      {item.status === 'waiting' && (
                        <span className="text-xs font-semibold text-slate-400">Waiting</span>
                      )}
                      
                      {item.status === 'processing' && (
                        <div className="flex flex-col items-end gap-1.5">
                          <span className="text-xs font-semibold text-brand-500 flex items-center gap-1">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Processing</span>
                          </span>
                          <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-500 rounded-full animate-[progress_1s_ease-in-out_infinite]" style={{ width: '60%' }} />
                          </div>
                        </div>
                      )}

                      {item.status === 'completed' && (
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Finished</span>
                          </span>
                          {item.outputSize && (
                            <p className="text-xxs text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
                              Output: {formatSize(item.outputSize)}
                            </p>
                          )}
                        </div>
                      )}

                      {item.status === 'failed' && (
                        <span className="text-xs font-semibold text-rose-500 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Failed</span>
                        </span>
                      )}
                    </div>

                    {/* Savings percentage Badge */}
                    {item.status === 'completed' && item.savingsPercent !== undefined && item.savingsPercent > 0 && (
                      <span className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 text-xxs font-bold">
                        -{item.savingsPercent}%
                      </span>
                    )}

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      {/* Before / After Preview Button */}
                      {canPreview && (
                        <button
                          onClick={() => setPreviewItem(item)}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors"
                          title="Preview Before/After Image Compression"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}

                      {/* Download Button */}
                      {item.status === 'completed' && item.outputUrl && (
                        <a
                          href={item.outputUrl}
                          download={item.outputName || 'processed_file'}
                          className="p-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-600 dark:bg-brand-950/40 dark:hover:bg-brand-900/60 dark:text-brand-400 transition-colors"
                          title="Download Processed File"
                          onClick={() => analytics.track({ type: 'download_clicked', payload: { id: item.id, name: item.outputName || '', size: item.outputSize || 0 } })}
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFile(item.id)}
                        disabled={item.status === 'processing'}
                        className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-rose-500 dark:hover:bg-slate-900 transition-colors disabled:opacity-50"
                        title="Remove File"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Queue Error logs / general notices */}
          {queue.some(i => i.error) && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400 space-y-1">
              <p className="font-bold flex items-center gap-1">
                <Info className="w-4 h-4" />
                <span>Notice logs:</span>
              </p>
              <ul className="list-disc pl-5 space-y-0.5">
                {queue.filter(i => i.error).map(i => (
                  <li key={i.id}>
                    <strong>{i.name}:</strong> {i.error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Batch Actions panel */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left font-sans">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Ready to Process
              </p>
              <p className="text-xxs text-slate-400 dark:text-slate-500 mt-0.5">
                Files are compressed and converted locally using your device resources.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
              {queue.some(item => item.status === 'completed') && (
                <button
                  onClick={downloadAllAsZip}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 shadow-sm transition-all cursor-pointer"
                >
                  <FileArchive className="w-4 h-4" />
                  <span>Download All (ZIP)</span>
                </button>
              )}
              
              <button
                onClick={processQueue}
                disabled={processing || !queue.some(item => item.status === 'waiting' || item.status === 'failed')}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 shadow-md shadow-brand-500/10 hover:shadow-brand-500/20 disabled:opacity-50 disabled:shadow-none transition-all cursor-pointer"
              >
                {processing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Queue...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Run Processing</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Comparison Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in font-sans">
          <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-800/80 flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white truncate max-w-md" title={previewItem.name}>
                  {previewItem.name}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Original: {formatSize(previewItem.size)} ({previewItem.originalDimensions?.width}x{previewItem.originalDimensions?.height}px) 
                  | Compressed: {formatSize(previewItem.outputSize || 0)} ({previewItem.compressedDimensions?.width}x{previewItem.compressedDimensions?.height}px)
                </p>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Slider Comparison Container */}
            <div className="grow overflow-y-auto p-6 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950/50">
              
              {/* Slider Canvas representation */}
              <div 
                ref={sliderContainerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative select-none overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 max-w-full max-h-[50vh] flex items-center justify-center bg-slate-100 dark:bg-slate-900"
                style={{
                  aspectRatio: `${previewItem.originalDimensions?.width || 3}/${previewItem.originalDimensions?.height || 2}`,
                  width: '600px',
                }}
              >
                {/* Original Image (Left Side background) */}
                <img
                  src={URL.createObjectURL(previewItem.file)}
                  alt="Original"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* Compressed Image (Right Side, clipped) */}
                <div 
                  className="absolute inset-y-0 right-0 left-0 overflow-hidden pointer-events-none"
                  style={{
                    clipPath: `polygon(${sliderPos}% 0%, 100% 0%, 100% 100%, ${sliderPos}% 100%)`
                  }}
                >
                  <img
                    src={previewItem.outputUrl}
                    alt="Compressed"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      width: sliderContainerRef.current?.getBoundingClientRect().width || '600px',
                      maxWidth: 'none',
                    }}
                  />
                </div>

                {/* Split line handle */}
                <div 
                  className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center slider-handle shadow-lg"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-brand-500 shadow-md flex items-center justify-center text-slate-800 dark:text-slate-200">
                    <SlidersHorizontal className="w-4 h-4 text-brand-500 rotate-90" />
                  </div>
                </div>

                {/* Labels */}
                <span className="absolute bottom-4 left-4 bg-slate-900/80 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg backdrop-blur-sm pointer-events-none">
                  Original
                </span>
                <span className="absolute bottom-4 right-4 bg-brand-600/90 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg backdrop-blur-sm pointer-events-none">
                  Compressed
                </span>
              </div>

              {/* Slider instruction */}
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Move your cursor or finger over the image to slide between original and compressed.</span>
              </p>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex gap-4">
                <div>
                  <span className="block text-xxs text-slate-400 dark:text-slate-500 font-bold uppercase">Original Size</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{formatSize(previewItem.size)}</span>
                </div>
                <div>
                  <span className="block text-xxs text-slate-400 dark:text-slate-500 font-bold uppercase">Compressed Size</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{formatSize(previewItem.outputSize || 0)}</span>
                </div>
                <div>
                  <span className="block text-xxs text-slate-400 dark:text-slate-500 font-bold uppercase">Savings</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">-{previewItem.savingsPercent}%</span>
                </div>
              </div>

              <a
                href={previewItem.outputUrl}
                download={previewItem.outputName}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 transition-colors shadow-md shadow-brand-500/10 hover:shadow-brand-500/20"
                onClick={() => setPreviewItem(null)}
              >
                <Download className="w-4 h-4" />
                <span>Download compressed</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* Ad Modal */}
      <AdModal
        isOpen={adModalOpen}
        isMandatory={adIsMandatory}
        onClose={() => setAdModalOpen(false)}
        onAdCompleted={() => {
          if (onAdCompletedCallback) {
            onAdCompletedCallback();
          }
        }}
      />

    </div>
  );
};
