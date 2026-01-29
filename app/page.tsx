'use client';

import { useState, useCallback, useEffect } from 'react';
import { getRandomExcuse, getDailyExcuse, categories, type Category, type Excuse } from '@/lib/excuses';

export default function Home() {
  const [excuse, setExcuse] = useState<Excuse | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [animateEmoji, setAnimateEmoji] = useState(false);
  const [showDaily, setShowDaily] = useState(false);
  const [dailyExcuse] = useState<Excuse>(() => getDailyExcuse());

  const generateExcuse = useCallback(() => {
    setIsGenerating(true);
    setAnimateEmoji(true);
    setTimeout(() => {
      setExcuse(getRandomExcuse(selectedCategory));
      setIsGenerating(false);
      setTimeout(() => setAnimateEmoji(false), 600);
    }, 200);
  }, [selectedCategory]);

  const copyToClipboard = useCallback(async () => {
    if (!excuse) return;
    try {
      await navigator.clipboard.writeText(`"${excuse.text}" ${excuse.emoji}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [excuse]);

  const shareToTwitter = useCallback(() => {
    if (!excuse) return;
    const text = encodeURIComponent(`"${excuse.text}" ${excuse.emoji}\n\nvia devexcuses.vercel.app`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  }, [excuse]);

  // Generate on first load
  useEffect(() => {
    generateExcuse();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        generateExcuse();
      }
      if (e.code === 'KeyC' && !e.repeat && !e.ctrlKey && !e.metaKey && document.activeElement?.tagName !== 'INPUT') {
        copyToClipboard();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generateExcuse, copyToClipboard]);

  return (
    <main className="min-h-screen bg-gradient-animate relative overflow-hidden">
      {/* Glowing orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-gray-400">70+ excuses and counting</span>
            </div>
            <button
              onClick={() => setShowDaily(!showDaily)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                showDaily
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              📅 {showDaily ? 'Hide Daily' : "Today's Excuse"}
            </button>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Dev
            </span>
            <span className="text-white">Excuses</span>
          </h1>
          
          <p className="text-gray-400 text-lg sm:text-xl max-w-md mx-auto">
            The perfect excuse for every <span className="text-violet-400">broken build</span>
          </p>
        </div>

        {/* Daily Excuse Banner */}
        {showDaily && (
          <div className="w-full max-w-2xl mb-8 excuse-enter">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/20 p-6">
              <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-semibold rounded-bl-lg">
                📅 DAILY EXCUSE
              </div>
              <div className="flex items-center gap-4">
                <span className="text-4xl">{dailyExcuse.emoji}</span>
                <div>
                  <p className="text-lg sm:text-xl font-medium text-white">
                    "{dailyExcuse.text}"
                  </p>
                  <p className="text-xs text-amber-400/70 mt-2">
                    Same excuse for everyone today! Check back tomorrow for a new one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-2xl">
          <button
            onClick={() => { setSelectedCategory(undefined); generateExcuse(); }}
            className={`pill px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !selectedCategory
                ? 'pill-active text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
            }`}
          >
            🎲 All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); }}
              className={`pill px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'pill-active text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Excuse Card */}
        <div className="w-full max-w-2xl mb-8">
          {excuse ? (
            <div 
              key={excuse.text} 
              className="glass-card rounded-3xl p-8 sm:p-12 text-center excuse-enter"
            >
              <span className={`text-6xl sm:text-7xl mb-6 block ${animateEmoji ? 'emoji-bounce' : ''}`}>
                {excuse.emoji}
              </span>
              
              <p className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white mb-6 leading-tight">
                "{excuse.text}"
              </p>
              
              <div className="flex items-center justify-center gap-2">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                  excuse.category === 'frontend' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                  excuse.category === 'backend' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                  excuse.category === 'devops' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                  excuse.category === 'management' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                  'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                }`}>
                  {categories.find(c => c.id === excuse.category)?.emoji}
                  {categories.find(c => c.id === excuse.category)?.label}
                </span>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-12 text-center shimmer">
              <span className="text-6xl mb-4 block opacity-30">🎰</span>
              <p className="text-gray-500 text-xl">Loading...</p>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <button
          onClick={generateExcuse}
          disabled={isGenerating}
          className="btn-primary text-white font-semibold py-4 px-10 rounded-2xl text-lg mb-8 disabled:opacity-50 disabled:cursor-not-allowed relative"
        >
          <span className="relative z-10 flex items-center gap-2">
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating...
              </>
            ) : (
              <>🎲 Another Excuse</>
            )}
          </span>
        </button>

        {/* Action Buttons */}
        {excuse && (
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={copyToClipboard}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                copied 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30 copy-success' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>📋 Copy</>
              )}
            </button>
            
            <button
              onClick={shareToTwitter}
              className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium text-gray-300 transition-all"
            >
              𝕏 Share
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-gray-600 text-xs mb-3">
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400 font-mono">Space</kbd>
            {' '}new excuse • {' '}
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400 font-mono">C</kbd>
            {' '}copy
          </p>
          <p className="text-gray-500 text-sm">
            Made with 🦞 by{' '}
            <a 
              href="https://luke-lobster-site.vercel.app" 
              className="text-violet-400 hover:text-violet-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Luke
            </a>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            <a 
              href="https://github.com/dgz9/devexcuses" 
              className="hover:text-gray-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
