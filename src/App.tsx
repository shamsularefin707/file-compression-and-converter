import React from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Workspace } from './components/Workspace';
import { Features } from './components/Features';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChooseFiles = () => {
    handleScrollTo('workspace');
    setTimeout(() => {
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      fileInput?.click();
    }, 150);
  };

  const handleTryDemo = () => {
    handleScrollTo('workspace');
    setTimeout(() => {
      const demoBtn = document.querySelector('button[type="button"]') as HTMLButtonElement;
      demoBtn?.click();
    }, 150);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans antialiased">
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onScrollTo={handleScrollTo}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Hero 
          onChooseFiles={handleChooseFiles}
          onTryDemo={handleTryDemo}
        />
        
        <Workspace 
          onScrollTo={handleScrollTo}
        />
        
        <Features />
        
        <FAQ />
      </main>

      <Footer onScrollTo={handleScrollTo} />
    </div>
  );
};

export default App;
