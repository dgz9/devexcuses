'use client';

import { useState, useCallback } from 'react';
import { getRandomExcuse, categories, type Category, type Excuse } from '@/lib/excuses';

export default function Home() {
  const [excuse, setExcuse] = useState<Excuse | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateExcuse = useCallback(() => {
    setIsGenerating(true);
    // Small delay for visual feedback
    setTimeout(() => {
      setExcuse(getRandomExcuse(selectedCategory));
      setIsGenerating(false);
      setCopied(false);
    }, 150);
  }, [selectedCategory]);

  const copyToClipboard = useCallback(async () => {
    if (!excuse) return;
    try {
      await navigator.clipboard.writeText(excuse.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [excuse]);

  const shareToTwitter = useCallback(() => {
    if (!excuse) return;
    const text = encodeURIComponent(`"${excuse.text}" ${excuse.emoji}\n\n— devexcuses.vercel.app`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  }, [excuse]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          <span className="gradient-text">DevExcuses</span>
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl max-w-md mx-auto">
          Why is the build broken? We've got you covered.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory(undefined)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !selectedCategory
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          🎲 All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Excuse Display */}
      <div className="w-full max-w-2xl mb-8">
        {excuse ? (
          <div className="excuse-card bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-8 text-center">
            <span className="text-5xl mb-4 block">{excuse.emoji}</span>
            <p className="text-2xl sm:text-3xl font-medium text-white mb-4">
              "{excuse.text}"
            </p>
            <span className="inline-block px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
              {categories.find(c => c.id === excuse.category)?.emoji}{' '}
              {categories.find(c => c.id === excuse.category)?.label}
            </span>
          </div>
        ) : (
          <div className="bg-gray-800/30 border border-gray-700/50 border-dashed rounded-2xl p-12 text-center">
            <span className="text-5xl mb-4 block">🎰</span>
            <p className="text-gray-500 text-xl">
              Click the button to generate your excuse
            </p>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={generateExcuse}
        disabled={isGenerating}
        className="glow-button bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl text-xl mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? '🎲 Generating...' : excuse ? '🎲 Another One!' : '🎲 Generate Excuse'}
      </button>

      {/* Action Buttons */}
      {excuse && (
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={copyToClipboard}
            className={`flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all ${
              copied ? 'copied bg-green-600 hover:bg-green-600' : ''
            }`}
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
          <button
            onClick={shareToTwitter}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
          >
            𝕏 Share
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>Made with 🦞 by <a href="https://luke-lobster-site.vercel.app" className="text-purple-400 hover:text-purple-300">Luke</a></p>
        <p className="mt-2">
          70+ excuses and counting • <a href="https://github.com/dgz9/devexcuses" className="text-purple-400 hover:text-purple-300">Contribute on GitHub</a>
        </p>
      </footer>
    </main>
  );
}
