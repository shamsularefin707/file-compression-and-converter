import React from 'react';
import { useTheme } from './hooks/useTheme';
import { useRouter } from './hooks/useRouter';
import { AdProvider } from './components/ads/AdProvider';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Views
import { HomeView } from './components/views/HomeView';
import { ToolsDirectoryView } from './components/views/ToolsDirectoryView';
import { ToolView } from './components/views/ToolView';
import { BlogView } from './components/views/BlogView';
import { BlogPostView } from './components/views/BlogPostView';
import { LegalView } from './components/views/LegalView';

// Config & Data
import { getToolBySlug } from './config/tools';
import { getArticleBySlug } from './config/blog';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { route, navigate } = useRouter();

  const renderView = () => {
    switch (route.path) {
      case '/':
        return <HomeView onNavigate={navigate} />;

      case '/tools':
        return <ToolsDirectoryView onNavigate={navigate} />;

      case '/tools/:slug': {
        const tool = route.slug ? getToolBySlug(route.slug) : undefined;
        if (tool) {
          return <ToolView tool={tool} onNavigate={navigate} />;
        }
        return <ToolsDirectoryView onNavigate={navigate} />;
      }

      case '/blog':
        return <BlogView onNavigate={navigate} />;

      case '/blog/:slug': {
        const article = route.slug ? getArticleBySlug(route.slug) : undefined;
        if (article) {
          return <BlogPostView article={article} onNavigate={navigate} />;
        }
        return <BlogView onNavigate={navigate} />;
      }

      case '/privacy':
        return <LegalView type="privacy" onNavigate={navigate} />;

      case '/terms':
        return <LegalView type="terms" onNavigate={navigate} />;

      case '/about':
        return <LegalView type="about" onNavigate={navigate} />;

      case '/contact':
        return <LegalView type="contact" onNavigate={navigate} />;

      default:
        return <HomeView onNavigate={navigate} />;
    }
  };

  return (
    <AdProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans antialiased flex flex-col justify-between">
        <div>
          <Navbar 
            theme={theme} 
            toggleTheme={toggleTheme} 
            onNavigate={navigate}
          />
          <main aria-label="Main content">
            {renderView()}
          </main>
        </div>

        <Footer onNavigate={navigate} />
      </div>
    </AdProvider>
  );
};

export default App;
