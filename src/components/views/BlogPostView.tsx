import React from 'react';
import type { BlogArticle } from '../../types/tools';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { ToolCard } from '../tools/ToolCard';
import { getToolBySlug } from '../../config/tools';
import { SITE_CONFIG } from '../../config/site';
import { Clock, Calendar } from 'lucide-react';

interface BlogPostViewProps {
  article: BlogArticle;
  onNavigate: (path: string) => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({ article, onNavigate }) => {
  const relatedTools = article.relatedToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <SEOHead
        title={`${article.title} | ${SITE_CONFIG.name}`}
        description={article.description}
        ogType="article"
      />

      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog', onClick: () => onNavigate('/blog') },
          { label: article.title },
        ]}
      />

      <article className="my-6">
        <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{article.publishedAt}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{article.readTime}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none my-8 leading-relaxed text-sm sm:text-base">
          {article.content.split('\n\n').map((paragraph, pIdx) => {
            if (paragraph.startsWith('# ')) {
              return <h1 key={pIdx} className="text-2xl font-bold text-slate-900 dark:text-white mt-6 mb-3">{paragraph.replace('# ', '')}</h1>;
            }
            if (paragraph.startsWith('## ')) {
              return <h2 key={pIdx} className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-6 mb-2">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={pIdx} className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
            }
            return <p key={pIdx} className="text-slate-600 dark:text-slate-300 mb-4">{paragraph}</p>;
          })}
        </div>
      </article>

      {/* Related Tools Box */}
      {relatedTools.length > 0 && (
        <section className="my-12 p-6 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Try the Tools Mentioned in this Guide
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
