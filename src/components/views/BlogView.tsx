import React from 'react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { BLOG_ARTICLES } from '../../config/blog';
import { SITE_CONFIG } from '../../config/site';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

interface BlogViewProps {
  onNavigate: (path: string) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <SEOHead
        title={`File Tools Blog & AI Guides | ${SITE_CONFIG.name}`}
        description="Learn how to optimize PDF documents for AI workflows, reduce prompt token costs, and compress web images cleanly."
        keywords={['ai document guides', 'pdf to markdown guide', 'webp compression tips']}
      />

      <Breadcrumbs items={[{ label: 'Blog & Guides' }]} />

      <header className="my-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Knowledge & Guides</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
          File Optimization Guides
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
          Technical articles on preparing documents for LLMs, image optimization, and file conversion security.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        {BLOG_ARTICLES.map((article) => (
          <article
            key={article.slug}
            onClick={() => onNavigate(`/blog/${article.slug}`)}
            className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/40 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 font-bold text-slate-600 dark:text-slate-400">
                  {article.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime}</span>
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
                {article.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                {article.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between text-xs font-bold text-brand-600 dark:text-brand-400">
              <span>Read Full Article</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
