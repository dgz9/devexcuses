export type Category = 'frontend' | 'backend' | 'devops' | 'management' | 'universal';

export interface Excuse {
  text: string;
  category: Category;
  emoji: string;
  spice: 1 | 2 | 3 | 4 | 5; // Spice level: 1=safe, 5=risky
}

export const excuses: Excuse[] = [
  // Universal classics
  { text: "It works on my machine", category: "universal", emoji: "💻", spice: 2 },
  { text: "It's a feature, not a bug", category: "universal", emoji: "✨", spice: 3 },
  { text: "That's not a bug, it's undocumented behavior", category: "universal", emoji: "📝", spice: 4 },
  { text: "Must be a caching issue", category: "universal", emoji: "🗄️", spice: 1 },
  { text: "Have you tried clearing your cache?", category: "universal", emoji: "🧹", spice: 1 },
  { text: "The tests passed locally", category: "universal", emoji: "✅", spice: 2 },
  { text: "It worked in staging", category: "universal", emoji: "🎭", spice: 2 },
  { text: "Must be a cosmic ray bit flip", category: "universal", emoji: "☄️", spice: 5 },
  { text: "Mercury is in retrograde", category: "universal", emoji: "🪐", spice: 5 },
  { text: "The intern touched production", category: "universal", emoji: "👶", spice: 4 },
  { text: "DNS propagation", category: "universal", emoji: "🌐", spice: 1 },
  { text: "It's a race condition", category: "universal", emoji: "🏃", spice: 2 },
  { text: "That's legacy code, we don't touch that", category: "universal", emoji: "🏚️", spice: 3 },
  { text: "The requirements changed", category: "universal", emoji: "📋", spice: 2 },
  { text: "I thought you were handling that", category: "universal", emoji: "🤷", spice: 4 },
  { text: "That's outside the scope", category: "universal", emoji: "🔭", spice: 2 },
  { text: "It's on the backlog", category: "universal", emoji: "📚", spice: 2 },
  { text: "We need to refactor first", category: "universal", emoji: "🔧", spice: 3 },
  { text: "The documentation is outdated", category: "universal", emoji: "📖", spice: 2 },
  { text: "That's technically correct", category: "universal", emoji: "🤓", spice: 3 },
  { text: "It was like that when I got here", category: "universal", emoji: "🏃‍♂️", spice: 3 },
  { text: "The previous developer did that", category: "universal", emoji: "👻", spice: 4 },
  { text: "Have you tried turning it off and on again?", category: "universal", emoji: "🔌", spice: 1 },
  { text: "I'll fix it in the next sprint", category: "universal", emoji: "🏃‍♀️", spice: 3 },
  { text: "That's a known issue", category: "universal", emoji: "📌", spice: 2 },
  
  // Frontend
  { text: "CSS is hard", category: "frontend", emoji: "🎨", spice: 2 },
  { text: "It works in Chrome", category: "frontend", emoji: "🌐", spice: 3 },
  { text: "Safari is being Safari", category: "frontend", emoji: "🧭", spice: 2 },
  { text: "The designer approved this", category: "frontend", emoji: "🎨", spice: 4 },
  { text: "JavaScript fatigue", category: "frontend", emoji: "😮‍💨", spice: 3 },
  { text: "The framework changed overnight", category: "frontend", emoji: "⚛️", spice: 3 },
  { text: "npm install broke everything", category: "frontend", emoji: "📦", spice: 2 },
  { text: "node_modules ate my disk space", category: "frontend", emoji: "🕳️", spice: 2 },
  { text: "It's a z-index issue", category: "frontend", emoji: "📐", spice: 1 },
  { text: "Flexbox is flexing wrong", category: "frontend", emoji: "💪", spice: 2 },
  { text: "The pixels were off by one", category: "frontend", emoji: "🔍", spice: 1 },
  { text: "Users shouldn't zoom anyway", category: "frontend", emoji: "🔎", spice: 5 },
  { text: "It's responsive if you don't resize", category: "frontend", emoji: "📱", spice: 4 },
  { text: "The animation was too smooth", category: "frontend", emoji: "🎬", spice: 3 },
  
  // Backend
  { text: "The database was slow", category: "backend", emoji: "🐢", spice: 2 },
  { text: "The API returned unexpected data", category: "backend", emoji: "📡", spice: 2 },
  { text: "We hit the rate limit", category: "backend", emoji: "🚧", spice: 1 },
  { text: "It's an eventual consistency issue", category: "backend", emoji: "⏰", spice: 3 },
  { text: "The microservice was down", category: "backend", emoji: "🔬", spice: 2 },
  { text: "Someone dropped the table", category: "backend", emoji: "🗑️", spice: 5 },
  { text: "The query was O(n²) but n was small... until now", category: "backend", emoji: "📈", spice: 3 },
  { text: "Memory leak? It's a memory feature", category: "backend", emoji: "🧠", spice: 5 },
  { text: "The connection pool was exhausted", category: "backend", emoji: "🏊", spice: 2 },
  { text: "The third-party API changed", category: "backend", emoji: "🔗", spice: 1 },
  { text: "It's a timezone issue", category: "backend", emoji: "🌍", spice: 2 },
  { text: "The logs didn't capture that", category: "backend", emoji: "📝", spice: 3 },
  { text: "Null pointer? That's impossible", category: "backend", emoji: "👆", spice: 4 },
  { text: "The cache invalidated itself", category: "backend", emoji: "💨", spice: 3 },
  
  // DevOps
  { text: "The container crashed", category: "devops", emoji: "🐳", spice: 2 },
  { text: "Kubernetes is being Kubernetes", category: "devops", emoji: "☸️", spice: 2 },
  { text: "The pipeline was green last night", category: "devops", emoji: "🚦", spice: 2 },
  { text: "AWS us-east-1 went down", category: "devops", emoji: "☁️", spice: 1 },
  { text: "The SSL certificate expired", category: "devops", emoji: "🔐", spice: 3 },
  { text: "Someone committed secrets to main", category: "devops", emoji: "🔑", spice: 5 },
  { text: "The deploy script has a mind of its own", category: "devops", emoji: "🤖", spice: 3 },
  { text: "We ran out of disk space", category: "devops", emoji: "💾", spice: 2 },
  { text: "The load balancer was unbalanced", category: "devops", emoji: "⚖️", spice: 2 },
  { text: "The firewall rules changed", category: "devops", emoji: "🧱", spice: 2 },
  { text: "Terraform drifted", category: "devops", emoji: "🏗️", spice: 3 },
  { text: "The auto-scaling scaled wrong", category: "devops", emoji: "📊", spice: 3 },
  { text: "The health check lied", category: "devops", emoji: "❤️", spice: 4 },
  { text: "GitHub was down", category: "devops", emoji: "🐙", spice: 1 },
  
  // Management
  { text: "That wasn't in the spec", category: "management", emoji: "📄", spice: 2 },
  { text: "We need to circle back on that", category: "management", emoji: "🔄", spice: 2 },
  { text: "Let's take this offline", category: "management", emoji: "📴", spice: 2 },
  { text: "It's a resource allocation issue", category: "management", emoji: "📊", spice: 3 },
  { text: "The timeline was aggressive", category: "management", emoji: "📅", spice: 3 },
  { text: "We're still in discovery phase", category: "management", emoji: "🔍", spice: 2 },
  { text: "The stakeholders changed priorities", category: "management", emoji: "🎯", spice: 2 },
  { text: "That's a Q4 initiative now", category: "management", emoji: "📆", spice: 3 },
  { text: "We need more story points", category: "management", emoji: "📊", spice: 4 },
  { text: "The velocity was miscalculated", category: "management", emoji: "🏎️", spice: 3 },
  { text: "It's on the roadmap", category: "management", emoji: "🗺️", spice: 2 },
  { text: "We're pivoting", category: "management", emoji: "🔀", spice: 4 },
  { text: "The MVP was already shipped", category: "management", emoji: "🚀", spice: 3 },
  { text: "We'll address that in phase 2", category: "management", emoji: "2️⃣", spice: 3 },

  // AI & Modern Era (2025+)
  { text: "The AI wrote that code, not me", category: "universal", emoji: "🤖", spice: 3 },
  { text: "Copilot suggested it, I just hit Tab", category: "universal", emoji: "🤷", spice: 4 },
  { text: "The LLM hallucinated that function", category: "universal", emoji: "🧠", spice: 4 },
  { text: "I asked ChatGPT and it said it was fine", category: "universal", emoji: "💬", spice: 5 },
  { text: "The prompt was ambiguous", category: "universal", emoji: "📝", spice: 3 },
  { text: "It's an AI alignment issue", category: "universal", emoji: "🎯", spice: 5 },
  { text: "The model was trained on outdated Stack Overflow answers", category: "backend", emoji: "📚", spice: 4 },
  { text: "The GPU ran out of VRAM", category: "devops", emoji: "🎮", spice: 2 },
  { text: "Vibes-based development has its tradeoffs", category: "universal", emoji: "✨", spice: 5 },
  { text: "The AI code review approved it", category: "universal", emoji: "✅", spice: 4 },
  { text: "That's a known Tailwind footgun", category: "frontend", emoji: "💨", spice: 2 },
  { text: "The monorepo dependencies conflicted", category: "devops", emoji: "🏗️", spice: 2 },
  { text: "The edge function timed out", category: "backend", emoji: "⏱️", spice: 2 },
  { text: "Vercel's cold start was too cold", category: "devops", emoji: "🥶", spice: 2 },
  { text: "TypeScript said 'any' was fine", category: "frontend", emoji: "🏴‍☠️", spice: 4 },

  // Remote Work & WFH
  { text: "My internet went out during the deploy", category: "devops", emoji: "📡", spice: 2 },
  { text: "Sorry, I was on mute the whole standup", category: "management", emoji: "🔇", spice: 2 },
  { text: "My cat walked across the keyboard", category: "universal", emoji: "🐱", spice: 3 },
  { text: "I was in a different timezone when I pushed that", category: "universal", emoji: "🌍", spice: 3 },
  { text: "The VPN dropped mid-commit", category: "devops", emoji: "🔒", spice: 2 },
  { text: "Slack ate my message with the fix instructions", category: "management", emoji: "💬", spice: 3 },
  { text: "I thought the meeting was tomorrow", category: "management", emoji: "📅", spice: 3 },
  { text: "My home office setup doesn't reproduce the bug", category: "universal", emoji: "🏠", spice: 3 },
  { text: "The coffee machine broke so I couldn't think straight", category: "universal", emoji: "☕", spice: 4 },
  { text: "I was pair programming with my dog", category: "universal", emoji: "🐕", spice: 5 },
  { text: "My standing desk motor glitched and I lost focus", category: "universal", emoji: "🪑", spice: 4 },
  { text: "The Zoom call drained my laptop right before I could push", category: "devops", emoji: "🔋", spice: 3 },

  // Standup Specials
  { text: "I was blocked by the design team", category: "management", emoji: "🎨", spice: 2 },
  { text: "I spent all day in code review", category: "universal", emoji: "👀", spice: 2 },
  { text: "I was yak shaving — it's all connected, I promise", category: "universal", emoji: "🐃", spice: 4 },
  { text: "I'm still ramping up on the codebase", category: "universal", emoji: "📚", spice: 2 },
  { text: "I pair-programmed for 6 hours and forgot to commit", category: "universal", emoji: "👥", spice: 3 },
  { text: "I was investigating a production incident that turned out to be a typo", category: "backend", emoji: "🔍", spice: 3 },
  { text: "My PR has been open for 3 days with no reviewers", category: "management", emoji: "⏳", spice: 3 },
  { text: "I automated myself out of the task", category: "devops", emoji: "🤖", spice: 4 },
  { text: "I was optimizing something that didn't need optimizing", category: "backend", emoji: "⚡", spice: 3 },
  { text: "The linter and I had a disagreement", category: "frontend", emoji: "🧹", spice: 2 },
  { text: "I wrote the tests but forgot the implementation", category: "universal", emoji: "🧪", spice: 3 },
  { text: "I spent 4 hours on a bug that was a missing semicolon", category: "frontend", emoji: "😤", spice: 2 },
  { text: "The Docker image is still building", category: "devops", emoji: "🐳", spice: 2 },
  { text: "I accidentally rebased the wrong branch", category: "universal", emoji: "🌿", spice: 4 },
  { text: "My IDE crashed and took my unsaved changes with it", category: "universal", emoji: "💥", spice: 3 },
];

// Get spice level label
export function getSpiceLabel(spice: number): string {
  const labels: Record<number, string> = {
    1: 'Safe bet',
    2: 'Mostly harmless', 
    3: 'Proceed with caution',
    4: 'Risky business',
    5: 'Career limiting'
  };
  return labels[spice] || '';
}

export function getRandomExcuse(category?: Category): Excuse {
  const filtered = category 
    ? excuses.filter(e => e.category === category)
    : excuses;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// Daily Excuse - same excuse for everyone that day
export function getDailyExcuse(): Excuse {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const year = today.getFullYear();
  // Use a simple hash to deterministically pick an excuse
  const seed = dayOfYear * 31 + year;
  const index = seed % excuses.length;
  return excuses[index];
}

// Get the next excuse in line for tomorrow
export function getTomorrowsExcuse(): Excuse {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayOfYear = Math.floor((tomorrow.getTime() - new Date(tomorrow.getFullYear(), 0, 0).getTime()) / 86400000);
  const year = tomorrow.getFullYear();
  const seed = dayOfYear * 31 + year;
  const index = seed % excuses.length;
  return excuses[index];
}

export function getExcusesByCategory(category: Category): Excuse[] {
  return excuses.filter(e => e.category === category);
}

export const categories: { id: Category; label: string; emoji: string }[] = [
  { id: 'universal', label: 'Universal', emoji: '🌟' },
  { id: 'frontend', label: 'Frontend', emoji: '🎨' },
  { id: 'backend', label: 'Backend', emoji: '⚙️' },
  { id: 'devops', label: 'DevOps', emoji: '🚀' },
  { id: 'management', label: 'Management', emoji: '📊' },
];

// Shareable URL helpers
export function getExcuseById(id: number): Excuse | null {
  if (id >= 0 && id < excuses.length) {
    return excuses[id];
  }
  return null;
}

export function getExcuseId(excuse: Excuse): number {
  return excuses.findIndex(e => e.text === excuse.text);
}

export function generateShareUrl(excuse: Excuse): string {
  const id = getExcuseId(excuse);
  if (typeof window !== 'undefined') {
    return `${window.location.origin}?e=${id}`;
  }
  return `?e=${id}`;
}

// Excuse combinator - combine two excuses for maximum deflection
const combinationTemplates = [
  (a: string, b: string) => `${a}, but also ${b.toLowerCase()}`,
  (a: string, b: string) => `${a}. Besides, ${b.toLowerCase()}`,
  (a: string, b: string) => `${a} — and to be fair, ${b.toLowerCase()}`,
  (a: string, b: string) => `Look, ${a.toLowerCase()}, plus ${b.toLowerCase()}`,
  (a: string, b: string) => `${a}. On top of that, ${b.toLowerCase()}`,
  (a: string, b: string) => `Not only ${a.toLowerCase()}, but ${b.toLowerCase()}`,
];

export function combineExcuses(excuse1: Excuse, excuse2: Excuse): string {
  const template = combinationTemplates[Math.floor(Math.random() * combinationTemplates.length)];
  return template(excuse1.text, excuse2.text);
}

export function getRandomComboExcuses(): [Excuse, Excuse] {
  const shuffled = [...excuses].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}

// Format excuse for Slack
export function formatForSlack(excuse: Excuse): string {
  const spiceBar = '🔥'.repeat(excuse.spice);
  return `>${excuse.emoji} _"${excuse.text}"_\n${spiceBar} • via <https://devexcuses-one.vercel.app|DevExcuses>`;
}

// Generate a standup-ready excuse with context
const standupTemplates = [
  (excuse: Excuse) => `🟡 *Blocker:* ${excuse.text}\n📋 *Status:* Investigating workaround\n⏭️ *Next:* Will try a different approach today`,
  (excuse: Excuse) => `⚠️ *Yesterday:* Got stuck — ${excuse.text.toLowerCase()}\n🔨 *Today:* Picking up where I left off\n🚧 *Blocker:* Still unresolved`,
  (excuse: Excuse) => `📊 *Update:* Made progress but hit a snag\n❌ *Issue:* ${excuse.text}\n✅ *Plan:* Pairing with someone to unblock`,
  (excuse: Excuse) => `🔄 *In Progress:* Feature development\n🐛 *Challenge:* ${excuse.text.toLowerCase()}\n🎯 *ETA:* End of sprint (optimistically)`,
];

export function formatForStandup(excuse: Excuse): string {
  const template = standupTemplates[Math.floor(Math.random() * standupTemplates.length)];
  return template(excuse);
}

// Meeting escape excuses - for when you need to leave a meeting
export const meetingExcuses: string[] = [
  "I have a hard stop — there's a production incident I need to look at",
  "Sorry, I have to jump — there's a deploy that needs my approval",
  "I need to drop off, my CI/CD pipeline is failing and blocking the team",
  "Apologies, I have a conflict — need to join the security review",
  "I have to go, my PR reviewer just went online and I need to pair",
  "Sorry, my Docker containers are acting up and I need to check on them",
  "I need to leave early — the staging server is down",
  "Gotta run, there's a merge conflict I've been putting off all day",
  "I have another meeting in 2 minutes, sorry!",
  "Need to drop — the client is pinging me about a blocker",
  "Sorry, my internet is getting unstable, let me reconnect... *leaves*",
  "I just got paged — looks like an alert from production monitoring",
  "Quick heads up, I have a 1:1 right after this I can't move",
  "I need to go debug something before the end of day deadline",
  "The load balancer is acting weird, I should probably check on that",
  "My laptop is about to die and my charger is in the other room, brb never",
  "I have a standup with the other team that just got moved to now",
  "Need to bounce — Sprint planning starts in 3 minutes",
  "Sorry, just got a Slack from my manager marked urgent",
  "I have to jump, there's a hotfix that needs to go out ASAP",
];

export function getRandomMeetingExcuse(): string {
  return meetingExcuses[Math.floor(Math.random() * meetingExcuses.length)];
}

// Generate a bingo card of 25 random excuses (5x5 grid, center is FREE)
export function generateBingoCard(): (Excuse | null)[][] {
  const shuffled = [...excuses].sort(() => Math.random() - 0.5).slice(0, 24);
  const grid: (Excuse | null)[][] = [];
  let idx = 0;
  for (let row = 0; row < 5; row++) {
    const r: (Excuse | null)[] = [];
    for (let col = 0; col < 5; col++) {
      if (row === 2 && col === 2) {
        r.push(null); // FREE space
      } else {
        r.push(shuffled[idx++]);
      }
    }
    grid.push(r);
  }
  return grid;
}

// Check if bingo is achieved (any row, column, or diagonal)
export function checkBingo(marked: boolean[][]): { hasBingo: boolean; winningCells: [number, number][] } {
  // Rows
  for (let r = 0; r < 5; r++) {
    if (marked[r].every(Boolean)) return { hasBingo: true, winningCells: marked[r].map((_, c) => [r, c] as [number, number]) };
  }
  // Columns
  for (let c = 0; c < 5; c++) {
    if (marked.every(row => row[c])) return { hasBingo: true, winningCells: marked.map((_, r) => [r, c] as [number, number]) };
  }
  // Diagonals
  if ([0,1,2,3,4].every(i => marked[i][i])) return { hasBingo: true, winningCells: [0,1,2,3,4].map(i => [i, i] as [number, number]) };
  if ([0,1,2,3,4].every(i => marked[i][4-i])) return { hasBingo: true, winningCells: [0,1,2,3,4].map(i => [i, 4-i] as [number, number]) };
  return { hasBingo: false, winningCells: [] };
}

// Quiz: get a random excuse with wrong category options for guessing
export interface QuizQuestion {
  excuse: Excuse;
  options: Category[];
  correctIndex: number;
}

export function generateQuizQuestion(): QuizQuestion {
  const excuse = excuses[Math.floor(Math.random() * excuses.length)];
  const allCats: Category[] = ['frontend', 'backend', 'devops', 'management', 'universal'];
  const wrongCats = allCats.filter(c => c !== excuse.category).sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [...wrongCats, excuse.category].sort(() => Math.random() - 0.5);
  const correctIndex = options.indexOf(excuse.category);
  return { excuse, options, correctIndex };
}

// Scenario system - pick a work situation and get tailored excuses
export interface Scenario {
  id: string;
  name: string;
  emoji: string;
  description: string;
  keywords: string[];
  categories: Category[];
  spiceRange: [number, number]; // [min, max] spice
}

export const scenarios: Scenario[] = [
  { id: 'standup', name: 'Daily Standup', emoji: '🧑‍💼', description: "When you didn't finish yesterday's task", keywords: ['blocker', 'blocked', 'ramp', 'investigating', 'still', 'backlog', 'sprint', 'pr', 'review'], categories: ['universal', 'management'], spiceRange: [1, 3] },
  { id: 'code-review', name: 'Code Review', emoji: '👀', description: "Defending your questionable PR", keywords: ['works', 'feature', 'legacy', 'refactor', 'technically', 'documentation', 'tests'], categories: ['universal', 'frontend', 'backend'], spiceRange: [2, 4] },
  { id: 'prod-incident', name: 'Production Incident', emoji: '🚨', description: "Something broke in prod", keywords: ['production', 'staging', 'cache', 'deploy', 'pipeline', 'container', 'down', 'crashed', 'certificate', 'dns', 'health', 'load', 'memory'], categories: ['devops', 'backend', 'universal'], spiceRange: [1, 5] },
  { id: 'missed-deadline', name: 'Missed Deadline', emoji: '⏰', description: "The sprint ended but your ticket didn't", keywords: ['timeline', 'scope', 'requirements', 'changed', 'backlog', 'sprint', 'velocity', 'resource', 'phase', 'roadmap', 'priority', 'q4'], categories: ['management', 'universal'], spiceRange: [2, 4] },
  { id: 'demo-day', name: 'Demo Day', emoji: '🎪', description: "The feature doesn't work for the demo", keywords: ['works', 'machine', 'staging', 'feature', 'cache', 'locally'], categories: ['universal', 'frontend'], spiceRange: [2, 5] },
  { id: 'client-call', name: 'Client Call', emoji: '📞', description: "Explaining delays to the client", keywords: ['scope', 'timeline', 'requirements', 'phase', 'roadmap', 'discovery', 'stakeholder', 'mvp', 'circle', 'offline'], categories: ['management'], spiceRange: [1, 3] },
  { id: 'onboarding', name: 'First Week', emoji: '🆕', description: "When you're new and everything's confusing", keywords: ['ramp', 'legacy', 'documentation', 'outdated', 'previous', 'codebase'], categories: ['universal'], spiceRange: [1, 3] },
  { id: 'friday-deploy', name: 'Friday Deploy', emoji: '🍻', description: "You deployed on a Friday and regret it", keywords: ['deploy', 'production', 'pipeline', 'rollback', 'cache', 'container', 'secrets', 'certificate'], categories: ['devops', 'universal'], spiceRange: [3, 5] },
];

export function getExcusesForScenario(scenario: Scenario): Excuse[] {
  return excuses.filter(e => {
    // Must match category
    if (!scenario.categories.includes(e.category)) return false;
    // Must be in spice range
    if (e.spice < scenario.spiceRange[0] || e.spice > scenario.spiceRange[1]) return false;
    // Bonus: check keyword relevance
    const textLower = e.text.toLowerCase();
    const keywordMatch = scenario.keywords.some(kw => textLower.includes(kw));
    return keywordMatch;
  });
}

export function getRandomExcuseForScenario(scenario: Scenario): Excuse {
  const matched = getExcusesForScenario(scenario);
  if (matched.length === 0) {
    // Fallback: just filter by category
    const fallback = excuses.filter(e => scenario.categories.includes(e.category));
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
  return matched[Math.floor(Math.random() * matched.length)];
}

// Search excuses by keyword
export function searchExcuses(query: string, category?: Category): Excuse[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  let filtered = excuses;
  if (category) filtered = filtered.filter(e => e.category === category);
  return filtered.filter(e => e.text.toLowerCase().includes(q));
}
