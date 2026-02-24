'use client';

import { useState, useCallback, useEffect } from 'react';
import { getRandomExcuse, getDailyExcuse, getSpiceLabel, categories, getExcuseById, generateShareUrl, combineExcuses, getRandomComboExcuses, searchExcuses, formatForSlack, formatForStandup, getRandomMeetingExcuse, generateBingoCard, checkBingo, type Category, type Excuse } from '@/lib/excuses';

// Theme helpers
function getTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  return (localStorage.getItem('devexcuses-theme') as 'dark' | 'light') || 'dark';
}

function setTheme(theme: 'dark' | 'light') {
  localStorage.setItem('devexcuses-theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}

// Sound helpers
function getSoundEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('devexcuses-sound') !== 'false'; // Default on
}

function setSoundEnabled(enabled: boolean) {
  localStorage.setItem('devexcuses-sound', enabled ? 'true' : 'false');
}

// Fun sound effect generator using Web Audio API
function playExcuseSound(spice: number) {
  if (typeof window === 'undefined') return;
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create multiple oscillators for richer sound
    const createTone = (freq: number, type: OscillatorType, delay: number, duration: number) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = 0;
      
      const startTime = audioContext.currentTime + delay;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.08, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    
    if (spice >= 4) {
      // Spicy! - dramatic descending notes 🔥🔥🔥🔥
      createTone(880, 'sine', 0, 0.15);
      createTone(659, 'sine', 0.08, 0.15);
      createTone(523, 'sine', 0.16, 0.2);
      createTone(392, 'triangle', 0.24, 0.25);
    } else if (spice >= 3) {
      // Medium spicy - upbeat bounce
      createTone(523, 'sine', 0, 0.12);
      createTone(659, 'sine', 0.1, 0.15);
      createTone(784, 'triangle', 0.2, 0.2);
    } else if (spice >= 2) {
      // Mild - gentle chime
      createTone(659, 'sine', 0, 0.15);
      createTone(784, 'sine', 0.08, 0.2);
    } else {
      // Safe - soft pop
      createTone(523, 'sine', 0, 0.12);
      createTone(659, 'triangle', 0.06, 0.15);
    }
  } catch (e) {
    // Audio not available
  }
}

function playComboSound() {
  if (typeof window === 'undefined') return;
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const createTone = (freq: number, type: OscillatorType, delay: number, duration: number) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = 0;
      
      const startTime = audioContext.currentTime + delay;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.06, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    
    // Slot machine style! 🎰
    createTone(440, 'square', 0, 0.08);
    createTone(554, 'square', 0.08, 0.08);
    createTone(659, 'square', 0.16, 0.08);
    createTone(880, 'sine', 0.24, 0.3);
    createTone(1108, 'triangle', 0.3, 0.25);
  } catch (e) {
    // Audio not available
  }
}

// Rating helpers
function getRatings(): Record<string, { up: number; down: number }> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem('devexcuses-ratings') || '{}');
  } catch { return {}; }
}

function saveRating(excuseText: string, isUp: boolean) {
  const ratings = getRatings();
  const key = excuseText;
  if (!ratings[key]) ratings[key] = { up: 0, down: 0 };
  if (isUp) ratings[key].up++;
  else ratings[key].down++;
  localStorage.setItem('devexcuses-ratings', JSON.stringify(ratings));
  return ratings[key];
}

function getUserVotes(): Record<string, 'up' | 'down'> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem('devexcuses-user-votes') || '{}');
  } catch { return {}; }
}

function saveUserVote(excuseText: string, vote: 'up' | 'down') {
  const votes = getUserVotes();
  votes[excuseText] = vote;
  localStorage.setItem('devexcuses-user-votes', JSON.stringify(votes));
}

// Favorites helpers
function getFavorites(): Excuse[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('devexcuses-favorites') || '[]');
  } catch { return []; }
}

function saveFavorites(favorites: Excuse[]) {
  localStorage.setItem('devexcuses-favorites', JSON.stringify(favorites));
}

export default function Home() {
  const [excuse, setExcuse] = useState<Excuse | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [animateEmoji, setAnimateEmoji] = useState(false);
  const [showDaily, setShowDaily] = useState(false);
  const [dailyExcuse] = useState<Excuse>(() => getDailyExcuse());
  const [favorites, setFavorites] = useState<Excuse[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [justFavorited, setJustFavorited] = useState(false);
  const [isSharedExcuse, setIsSharedExcuse] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [slackCopied, setSlackCopied] = useState(false);
  const [comboMode, setComboMode] = useState(false);
  const [comboExcuses, setComboExcuses] = useState<[Excuse, Excuse] | null>(null);
  const [comboText, setComboText] = useState<string>('');
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Excuse[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [history, setHistory] = useState<Excuse[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [soundEnabled, setSoundState] = useState(false);
  const [standupCopied, setStandupCopied] = useState(false);
  const [bossMode, setBossMode] = useState(false);
  const [meetingEscape, setMeetingEscape] = useState(false);
  const [meetingExcuse, setMeetingExcuse] = useState('');
  const [meetingCopied, setMeetingCopied] = useState(false);
  const [showBingo, setShowBingo] = useState(false);
  const [bingoCard, setBingoCard] = useState<(Excuse | null)[][]>([]);
  const [bingoMarked, setBingoMarked] = useState<boolean[][]>(Array.from({length: 5}, (_, r) => Array.from({length: 5}, (_, c) => r === 2 && c === 2)));
  const [bingoWon, setBingoWon] = useState(false);
  const [bingoWinCells, setBingoWinCells] = useState<[number, number][]>([]);
  const [ratings, setRatings] = useState<Record<string, { up: number; down: number }>>({});
  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down'>>({});
  const [rateAnimation, setRateAnimation] = useState<'up' | 'down' | null>(null);

  const generateExcuse = useCallback(() => {
    setIsGenerating(true);
    setAnimateEmoji(true);
    setTimeout(() => {
      const newExcuse = getRandomExcuse(selectedCategory);
      setExcuse(prev => {
        if (prev) setHistory(h => [prev, ...h].slice(0, 25));
        return newExcuse;
      });
      if (soundEnabled) playExcuseSound(newExcuse.spice);
      setIsGenerating(false);
      setTimeout(() => setAnimateEmoji(false), 600);
    }, 200);
  }, [selectedCategory, soundEnabled]);

  // Navigate history
  const goToPrevious = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setExcuse(history[newIndex]);
      setAnimateEmoji(true);
      setTimeout(() => setAnimateEmoji(false), 300);
    }
  }, [historyIndex, history]);

  const goToNext = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setExcuse(history[newIndex]);
      setAnimateEmoji(true);
      setTimeout(() => setAnimateEmoji(false), 300);
    }
  }, [historyIndex, history]);

  const generateCombo = useCallback(() => {
    setIsGenerating(true);
    setAnimateEmoji(true);
    setTimeout(() => {
      const [e1, e2] = getRandomComboExcuses();
      setComboExcuses([e1, e2]);
      setComboText(combineExcuses(e1, e2));
      if (soundEnabled) playComboSound();
      setIsGenerating(false);
      setTimeout(() => setAnimateEmoji(false), 600);
    }, 200);
  }, [soundEnabled]);

  const copyToClipboard = useCallback(async () => {
    if (comboMode && comboText) {
      try {
        await navigator.clipboard.writeText(`"${comboText}" 🎰🎰`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
      return;
    }
    if (!excuse) return;
    try {
      await navigator.clipboard.writeText(`"${excuse.text}" ${excuse.emoji}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [excuse, comboMode, comboText]);

  const shareToTwitter = useCallback(() => {
    if (!excuse) return;
    const text = encodeURIComponent(`"${excuse.text}" ${excuse.emoji}\n\nvia devexcuses.vercel.app`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  }, [excuse]);

  const copyShareLink = useCallback(async () => {
    if (!excuse) return;
    try {
      const url = generateShareUrl(excuse);
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  }, [excuse]);

  const copyForStandup = useCallback(async () => {
    if (!excuse) return;
    try {
      await navigator.clipboard.writeText(formatForStandup(excuse));
      setStandupCopied(true);
      setTimeout(() => setStandupCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [excuse]);

  const copyForSlack = useCallback(async () => {
    if (!excuse) return;
    try {
      await navigator.clipboard.writeText(formatForSlack(excuse));
      setSlackCopied(true);
      setTimeout(() => setSlackCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [excuse]);

  // Load favorites and ratings from localStorage
  useEffect(() => {
    setFavorites(getFavorites());
    setRatings(getRatings());
    setUserVotes(getUserVotes());
  }, []);

  // Initialize theme and sound on mount
  useEffect(() => {
    const savedTheme = getTheme();
    setThemeState(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    setSoundState(getSoundEnabled());
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setThemeState(newTheme);
    setTheme(newTheme);
  }, [theme]);

  const toggleSound = useCallback(() => {
    const newState = !soundEnabled;
    setSoundState(newState);
    setSoundEnabled(newState);
    // Play a test sound when enabling
    if (newState) playExcuseSound(2);
  }, [soundEnabled]);

  // Toggle favorite
  const toggleFavorite = useCallback(() => {
    if (!excuse) return;
    setFavorites(prev => {
      const exists = prev.some(f => f.text === excuse.text);
      let updated: Excuse[];
      if (exists) {
        updated = prev.filter(f => f.text !== excuse.text);
      } else {
        updated = [...prev, excuse];
        setJustFavorited(true);
        setTimeout(() => setJustFavorited(false), 1000);
      }
      saveFavorites(updated);
      return updated;
    });
  }, [excuse]);

  const isFavorite = excuse ? favorites.some(f => f.text === excuse.text) : false;

  // Random from favorites
  const pickRandomFavorite = useCallback(() => {
    if (favorites.length === 0) return;
    setIsGenerating(true);
    setAnimateEmoji(true);
    setTimeout(() => {
      const randomFav = favorites[Math.floor(Math.random() * favorites.length)];
      setExcuse(randomFav);
      setIsGenerating(false);
      setTimeout(() => setAnimateEmoji(false), 600);
    }, 200);
  }, [favorites]);

  // Export favorites as text
  const exportFavorites = useCallback(async () => {
    if (favorites.length === 0) return;
    const text = favorites.map(f => `${f.emoji} "${f.text}"`).join('\n\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to export:', err);
    }
  }, [favorites]);

  // Search handler
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      setSearchResults(searchExcuses(query, selectedCategory));
    } else {
      setSearchResults([]);
    }
  }, [selectedCategory]);

  const selectSearchResult = useCallback((result: Excuse) => {
    setExcuse(result);
    setSearchQuery('');
    setSearchResults([]);
    setShowSearch(false);
  }, []);

  const rateExcuse = useCallback((isUp: boolean) => {
    if (!excuse) return;
    const currentVote = userVotes[excuse.text];
    if (currentVote) return; // Already voted
    const updated = saveRating(excuse.text, isUp);
    saveUserVote(excuse.text, isUp ? 'up' : 'down');
    setRatings(prev => ({ ...prev, [excuse.text]: updated }));
    setUserVotes(prev => ({ ...prev, [excuse.text]: isUp ? 'up' : 'down' }));
    setRateAnimation(isUp ? 'up' : 'down');
    setTimeout(() => setRateAnimation(null), 600);
  }, [excuse, userVotes]);

  // Check for shared excuse in URL on first load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedId = params.get('e');
    if (sharedId !== null) {
      const id = parseInt(sharedId, 10);
      const sharedExcuse = getExcuseById(id);
      if (sharedExcuse) {
        setExcuse(sharedExcuse);
        setIsSharedExcuse(true);
        // Clean up URL without reload
        window.history.replaceState({}, '', window.location.pathname);
        return;
      }
    }
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
      if (e.code === 'KeyF' && !e.repeat && !e.ctrlKey && !e.metaKey && document.activeElement?.tagName !== 'INPUT') {
        toggleFavorite();
      }
      if (e.code === 'KeyS' && !e.repeat && !e.ctrlKey && !e.metaKey && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setShowSearch(prev => !prev);
      }
      if (e.code === 'KeyH' && !e.repeat && !e.ctrlKey && !e.metaKey && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setShowHistory(prev => !prev);
      }
      if (e.code === 'Escape') {
        setBossMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generateExcuse, copyToClipboard, toggleFavorite, goToPrevious, goToNext]);

  return (
    <main className="min-h-screen bg-gradient-animate relative overflow-hidden">
      {/* Boss Mode - fake spreadsheet overlay */}
      {bossMode && (
        <div className="fixed inset-0 z-[100] bg-white text-black cursor-pointer" onClick={() => setBossMode(false)}>
          <div className="bg-[#217346] text-white px-4 py-2 flex items-center gap-4 text-sm">
            <span className="font-bold">📊 Excel Online</span>
            <span>File</span><span>Home</span><span>Insert</span><span>Data</span><span>Review</span>
          </div>
          <div className="bg-[#f3f3f3] border-b px-4 py-1 text-xs text-gray-600 flex items-center gap-4">
            <span>🔤 Calibri</span><span>11</span><span className="font-bold">B</span><span className="italic">I</span><span className="underline">U</span>
          </div>
          <div className="font-mono text-xs">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#e8e8e8]">
                  <th className="border border-gray-300 w-8 px-1 py-1 text-gray-500"></th>
                  {['A','B','C','D','E','F'].map(c => <th key={c} className="border border-gray-300 px-3 py-1 font-normal text-gray-600 min-w-[120px]">{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Q4 Budget Review','Revenue','Expenses','Net','Growth %','Status'],
                  ['Product Team','$847,200','$623,100','$224,100','12.3%','On Track'],
                  ['Engineering','$1,245,000','$1,180,400','$64,600','8.7%','Review'],
                  ['Marketing','$523,000','$498,750','$24,250','15.1%','On Track'],
                  ['Operations','$312,500','$287,300','$25,200','3.2%','At Risk'],
                  ['Sales','$2,100,000','$1,650,000','$450,000','22.4%','Exceeding'],
                  ['Support','$189,000','$175,400','$13,600','-2.1%','Review'],
                  ['Total','$5,216,700','$4,414,950','$801,750','11.8%','On Track'],
                  ['','','','','',''],
                  ['Notes:','Q4 targets met across most departments','','','',''],
                ].map((row, i) => (
                  <tr key={i} className={i === 0 ? 'bg-[#d6e4f0] font-semibold' : i === 7 ? 'bg-[#e2efda] font-semibold' : ''}>
                    <td className="border border-gray-300 px-1 py-1 text-center text-gray-500 bg-[#e8e8e8]">{i + 1}</td>
                    {row.map((cell, j) => <td key={j} className="border border-gray-300 px-3 py-1">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="fixed bottom-4 right-4 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded">
            Click anywhere or press Esc to return
          </div>
        </div>
      )}
      {/* Glowing orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-gray-400">120+ excuses and counting</span>
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
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                showFavorites
                  ? 'bg-gradient-to-r from-pink-500/20 to-red-500/20 text-pink-300 border border-pink-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              ❤️ {favorites.length > 0 && <span className="text-xs">({favorites.length})</span>}
            </button>
            <button
              onClick={() => { setComboMode(!comboMode); if (!comboMode) generateCombo(); }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                comboMode
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              🎰 Combo Mode
            </button>
            {/* History button moved below */}
            <button
              onClick={toggleSound}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                soundEnabled
                  ? 'bg-green-500/10 text-green-400 border-green-500/20'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border-white/10'
              }`}
              title={soundEnabled ? 'Sound effects on' : 'Sound effects off'}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '☀️' : '🌙'} {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <button
              onClick={() => setBossMode(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
              title="Boss coming? Quick, look productive! (or press Esc)"
            >
              🚨 Boss Mode
            </button>
            <button
              onClick={() => { setMeetingEscape(!meetingEscape); if (!meetingEscape) setMeetingExcuse(getRandomMeetingExcuse()); }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                meetingEscape
                  ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 border border-blue-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              🚪 Meeting Escape
            </button>
            <button
              onClick={() => {
                if (!showBingo) {
                  const card = generateBingoCard();
                  setBingoCard(card);
                  setBingoMarked(Array.from({length: 5}, (_, r) => Array.from({length: 5}, (_, c) => r === 2 && c === 2)));
                  setBingoWon(false);
                  setBingoWinCells([]);
                }
                setShowBingo(!showBingo);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                showBingo
                  ? 'bg-gradient-to-r from-yellow-500/20 to-green-500/20 text-yellow-300 border border-yellow-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              🎱 Excuse Bingo
            </button>
            <button
              onClick={() => { setShowSearch(!showSearch); if (showSearch) { setSearchQuery(''); setSearchResults([]); } }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                showSearch
                  ? 'bg-gradient-to-r from-violet-500/20 to-indigo-500/20 text-violet-300 border border-violet-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              🔍 Search
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                showHistory
                  ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 text-teal-300 border border-teal-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              🕐 History {history.length > 0 && <span className="text-xs">({history.length})</span>}
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

        {/* Shared Excuse Banner */}
        {isSharedExcuse && (
          <div className="w-full max-w-2xl mb-4 excuse-enter">
            <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20">
              <span className="text-violet-400">🔗</span>
              <span className="text-sm text-violet-300">Someone shared this excuse with you!</span>
              <button
                onClick={() => setIsSharedExcuse(false)}
                className="ml-2 text-violet-400/60 hover:text-violet-300"
              >
                ✕
              </button>
            </div>
          </div>
        )}

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

        {/* Meeting Escape Panel */}
        {meetingEscape && (
          <div className="w-full max-w-2xl mb-8 excuse-enter">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 border border-blue-500/20 p-6">
              <div className="absolute top-0 right-0 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-bl-lg">
                🚪 MEETING ESCAPE
              </div>
              <div className="mb-4">
                <p className="text-xs text-blue-400/70 mb-3">Need to leave a meeting? Copy one of these and drop it in the chat:</p>
              </div>
              <div className="flex items-center gap-4 mb-4 p-4 rounded-xl bg-white/5">
                <span className="text-3xl">🏃</span>
                <p className="text-lg font-medium text-white flex-1">"{meetingExcuse}"</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setMeetingExcuse(getRandomMeetingExcuse())}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-sm font-medium transition-all"
                >
                  🎲 Another Excuse
                </button>
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(meetingExcuse);
                      setMeetingCopied(true);
                      setTimeout(() => setMeetingCopied(false), 2000);
                    } catch (err) { console.error(err); }
                  }}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    meetingCopied
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                  }`}
                >
                  {meetingCopied ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bingo Panel */}
        {showBingo && bingoCard.length > 0 && (
          <div className="w-full max-w-3xl mb-8 excuse-enter">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-500/10 via-green-500/10 to-yellow-500/10 border border-yellow-500/20 p-6">
              <div className="absolute top-0 right-0 px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-semibold rounded-bl-lg">
                🎱 EXCUSE BINGO
              </div>
              {bingoWon && (
                <div className="mb-4 p-3 rounded-xl bg-green-500/20 border border-green-500/30 text-center">
                  <p className="text-2xl font-bold text-green-400">🎉 BINGO! 🎉</p>
                  <p className="text-sm text-green-300/70 mt-1">You've heard enough excuses for one meeting!</p>
                </div>
              )}
              <p className="text-xs text-yellow-400/70 mb-3">Click excuses you've heard in your standup. Get 5 in a row for BINGO!</p>
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {bingoCard.map((row, r) => row.map((cell, c) => {
                  const isMarked = bingoMarked[r]?.[c];
                  const isWinCell = bingoWinCells.some(([wr, wc]) => wr === r && wc === c);
                  const isFree = r === 2 && c === 2;
                  return (
                    <button
                      key={`${r}-${c}`}
                      onClick={() => {
                        if (isFree) return;
                        const newMarked = bingoMarked.map(row => [...row]);
                        newMarked[r][c] = !newMarked[r][c];
                        setBingoMarked(newMarked);
                        const { hasBingo, winningCells } = checkBingo(newMarked);
                        if (hasBingo && !bingoWon) {
                          setBingoWon(true);
                          setBingoWinCells(winningCells);
                          if (soundEnabled) playComboSound();
                        } else if (!hasBingo) {
                          setBingoWon(false);
                          setBingoWinCells([]);
                        }
                      }}
                      className={`aspect-square rounded-lg p-1 text-center flex flex-col items-center justify-center transition-all text-[10px] sm:text-xs leading-tight ${
                        isFree
                          ? 'bg-yellow-500/30 border border-yellow-500/40 text-yellow-300 font-bold cursor-default'
                          : isWinCell
                            ? 'bg-green-500/40 border-2 border-green-400 text-green-200 scale-105'
                            : isMarked
                              ? 'bg-violet-500/30 border border-violet-500/40 text-violet-200'
                              : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {isFree ? (
                        <>
                          <span className="text-xl sm:text-2xl">⭐</span>
                          <span>FREE</span>
                        </>
                      ) : cell ? (
                        <>
                          <span className="text-base sm:text-lg">{cell.emoji}</span>
                          <span className="line-clamp-2">{cell.text.length > 30 ? cell.text.slice(0, 28) + '…' : cell.text}</span>
                        </>
                      ) : null}
                    </button>
                  );
                }))}
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    const card = generateBingoCard();
                    setBingoCard(card);
                    setBingoMarked(Array.from({length: 5}, (_, r) => Array.from({length: 5}, (_, c) => r === 2 && c === 2)));
                    setBingoWon(false);
                    setBingoWinCells([]);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 text-sm font-medium transition-all"
                >
                  🔄 New Card
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History Panel removed (duplicate - see below) */}

        {/* Favorites Panel */}
        {showFavorites && (
          <div className="w-full max-w-2xl mb-8 excuse-enter">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500/10 via-red-500/10 to-pink-500/10 border border-pink-500/20 p-6">
              <div className="absolute top-0 right-0 px-3 py-1 bg-pink-500/20 text-pink-300 text-xs font-semibold rounded-bl-lg">
                ❤️ FAVORITES
              </div>
              {favorites.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No favorites yet! Click the ❤️ button on any excuse to save it.</p>
              ) : (
                <>
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={pickRandomFavorite}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 text-sm font-medium transition-all"
                    >
                      🎲 Random Favorite
                    </button>
                    <button
                      onClick={exportFavorites}
                      className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium transition-all border border-white/10"
                    >
                      📋 Export All
                    </button>
                  </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {favorites.map((fav, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                      <span className="text-2xl">{fav.emoji}</span>
                      <p className="flex-1 text-white text-sm">"{fav.text}"</p>
                      <button
                        onClick={() => {
                          const updated = favorites.filter(f => f.text !== fav.text);
                          setFavorites(updated);
                          saveFavorites(updated);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all p-1"
                        title="Remove from favorites"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Search Panel */}
        {showSearch && (
          <div className="w-full max-w-2xl mb-8 excuse-enter">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500/10 via-indigo-500/10 to-violet-500/10 border border-violet-500/20 p-6">
              <div className="absolute top-0 right-0 px-3 py-1 bg-violet-500/20 text-violet-300 text-xs font-semibold rounded-bl-lg">
                🔍 SEARCH
              </div>
              <div className="relative mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search excuses... (e.g. cache, bug, CSS)"
                  className="w-full px-4 py-3 pl-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all"
                  autoFocus
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
              {searchQuery && searchResults.length === 0 && (
                <p className="text-gray-400 text-center py-3 text-sm">No excuses match "{searchQuery}" 🤷</p>
              )}
              {searchResults.length > 0 && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  <p className="text-xs text-violet-400/70 mb-2">{searchResults.length} excuse{searchResults.length !== 1 ? 's' : ''} found</p>
                  {searchResults.map((result, i) => (
                    <button
                      key={i}
                      onClick={() => selectSearchResult(result)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">{result.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">"{result.text}"</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{categories.find(c => c.id === result.category)?.emoji} {categories.find(c => c.id === result.category)?.label}</span>
                          <span className="text-xs text-gray-600">{'🔥'.repeat(result.spice)}</span>
                        </div>
                      </div>
                      <span className="text-gray-600 group-hover:text-violet-400 transition-colors text-sm">→</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* History Panel */}
        {showHistory && (
          <div className="w-full max-w-2xl mb-8 excuse-enter">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/10 border border-teal-500/20 p-6">
              <div className="absolute top-0 right-0 px-3 py-1 bg-teal-500/20 text-teal-300 text-xs font-semibold rounded-bl-lg">
                🕐 HISTORY
              </div>
              {history.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No history yet! Generate some excuses to build your timeline.</p>
              ) : (
                <>
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setHistory([])}
                      className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium transition-all border border-white/10"
                    >
                      🗑️ Clear History
                    </button>
                  </div>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {history.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => { setExcuse(item); setShowHistory(false); }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left group"
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm truncate">"{item.text}"</p>
                          <span className="text-xs text-gray-500">{categories.find(c => c.id === item.category)?.emoji} {categories.find(c => c.id === item.category)?.label}</span>
                        </div>
                        <span className="text-gray-600 group-hover:text-teal-400 transition-colors text-xs">#{history.length - i}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
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

        {/* Combo Card */}
        {comboMode && comboExcuses && (
          <div className="w-full max-w-2xl mb-8">
            <div className="glass-card rounded-3xl p-8 sm:p-12 text-center excuse-enter">
              <div className="flex justify-center gap-4 mb-6">
                <span className={`text-5xl ${animateEmoji ? 'emoji-bounce' : ''}`}>{comboExcuses[0].emoji}</span>
                <span className="text-4xl text-cyan-400">+</span>
                <span className={`text-5xl ${animateEmoji ? 'emoji-bounce' : ''}`}>{comboExcuses[1].emoji}</span>
              </div>
              
              <div className="mb-4 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <p className="text-sm text-cyan-400 font-medium mb-1">💥 COMBO EXCUSE</p>
              </div>
              
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-white mb-6 leading-tight">
                "{comboText}"
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
                <span>Combined from:</span>
                <span className="px-2 py-1 rounded bg-white/5">{comboExcuses[0].text.slice(0, 30)}...</span>
                <span>+</span>
                <span className="px-2 py-1 rounded bg-white/5">{comboExcuses[1].text.slice(0, 30)}...</span>
              </div>
            </div>
          </div>
        )}

        {/* Excuse Card */}
        <div className={`w-full max-w-2xl mb-8 ${comboMode ? 'hidden' : ''}`}>
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
              
              <div className="flex flex-wrap items-center justify-center gap-2">
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
                <span className={`inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm ${
                  excuse.spice >= 4 ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  excuse.spice >= 3 ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                  'bg-green-500/10 text-green-400 border border-green-500/20'
                }`} title={getSpiceLabel(excuse.spice)}>
                  {'🔥'.repeat(excuse.spice)}
                  <span className="hidden sm:inline ml-1 text-xs opacity-75">{getSpiceLabel(excuse.spice)}</span>
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <span className="text-xs text-gray-500">Rate this excuse:</span>
                <button
                  onClick={() => rateExcuse(true)}
                  disabled={!!userVotes[excuse.text]}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all ${
                    userVotes[excuse.text] === 'up'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30 scale-110'
                      : userVotes[excuse.text]
                        ? 'bg-white/5 text-gray-600 border border-white/5 cursor-default'
                        : 'bg-white/5 text-gray-400 hover:bg-green-500/10 hover:text-green-400 border border-white/10 hover:border-green-500/20'
                  } ${rateAnimation === 'up' ? 'scale-125' : ''}`}
                >
                  👍 {ratings[excuse.text]?.up || 0}
                </button>
                <button
                  onClick={() => rateExcuse(false)}
                  disabled={!!userVotes[excuse.text]}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all ${
                    userVotes[excuse.text] === 'down'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30 scale-110'
                      : userVotes[excuse.text]
                        ? 'bg-white/5 text-gray-600 border border-white/5 cursor-default'
                        : 'bg-white/5 text-gray-400 hover:bg-red-500/10 hover:text-red-400 border border-white/10 hover:border-red-500/20'
                  } ${rateAnimation === 'down' ? 'scale-125' : ''}`}
                >
                  👎 {ratings[excuse.text]?.down || 0}
                </button>
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
          onClick={comboMode ? generateCombo : generateExcuse}
          disabled={isGenerating}
          className={`text-white font-semibold py-4 px-10 rounded-2xl text-lg mb-8 disabled:opacity-50 disabled:cursor-not-allowed relative ${
            comboMode ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500' : 'btn-primary'
          }`}
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
            ) : comboMode ? (
              <>🎰 New Combo</>
            ) : (
              <>🎲 Another Excuse</>
            )}
          </span>
        </button>

        {/* Action Buttons */}
        {(excuse || (comboMode && comboText)) && (
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={toggleFavorite}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                isFavorite
                  ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              } ${justFavorited ? 'scale-110' : ''}`}
              style={{ transition: 'all 0.2s ease' }}
            >
              {isFavorite ? '❤️ Saved' : '🤍 Favorite'}
            </button>
            
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
              onClick={copyShareLink}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                linkCopied 
                  ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {linkCopied ? '✓ Link Copied!' : '🔗 Share Link'}
            </button>
            
            <button
              onClick={copyForSlack}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                slackCopied
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {slackCopied ? '✓ Slack Copied!' : '💼 Slack'}
            </button>
            
            <button
              onClick={copyForStandup}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                standupCopied
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {standupCopied ? '✓ Standup Copied!' : '🧑‍💼 Standup'}
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
            {' '}new • {' '}
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400 font-mono">←</kbd>
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400 font-mono">→</kbd>
            {' '}history • {' '}
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400 font-mono">C</kbd>
            {' '}copy • {' '}
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400 font-mono">F</kbd>
            {' '}favorite • {' '}
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400 font-mono">S</kbd>
            {' '}search • {' '}
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400 font-mono">H</kbd>
            {' '}history • {' '}
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400 font-mono">Esc</kbd>
            {' '}boss mode
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
