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
