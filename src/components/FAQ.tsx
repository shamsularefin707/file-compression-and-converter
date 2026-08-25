import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import type { FAQItem } from '../types';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'Are my files uploaded to a server?',
      answer: 'No. FileForge operates entirely in your web browser using HTML5 APIs, JSZip, Mammoth, and SheetJS. Your files are processed locally in your browser memory and are never uploaded to any server. Your privacy is 100% guaranteed.',
    },
    {
      question: 'Is there a file size limit?',
      answer: 'On the Free tier, files are limited to 50MB each. This easily covers typical images, text documents, and spreadsheet datasets. You can toggle "Premium Mode" in the navigation bar to simulate files up to 1GB and see the extended limits in action.',
    },
    {
      question: 'Can I compress or convert multiple files at once?',
      answer: 'Yes! You can drag and drop multiple files of various types into the queue. You can configure individual operations or apply batch settings, process them, and then download all processed files in a single ZIP archive.',
    },
    {
      question: 'Why does PDF compression sometimes show little to no reduction?',
      answer: 'PDF compression in-browser optimizes document streams, removes duplicate structural items, and cleans up redundant metadata. If a PDF has already been compressed or doesn\'t contain heavy uncompressed elements, further client-side reduction might be minimal. We clearly notify you when a PDF cannot be reduced further.',
    },
    {
      question: 'How do document conversions (like DOCX to PDF) work in the browser?',
      answer: 'We use client-side parsers. DOCX is parsed into HTML using Mammoth.js, and that HTML is styled and laid out into a PDF stream via jsPDF. This happens in milliseconds on your device, ensuring document privacy.',
    },
  ];

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex p-3 rounded-2xl bg-brand-500/10 dark:bg-brand-500/5 text-brand-600 dark:text-brand-400 mb-4">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="font-sans text-slate-500 dark:text-slate-400">
          Everything you need to know about FileForge and local file processing.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between p-6 text-left font-display font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-brand-500' : ''
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-96 opacity-100 border-t border-slate-100 dark:border-slate-800/40' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 font-sans text-sm text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-slate-900/10">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
