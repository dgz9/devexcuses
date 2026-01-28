export type Category = 'frontend' | 'backend' | 'devops' | 'management' | 'universal';

export interface Excuse {
  text: string;
  category: Category;
  emoji: string;
}

export const excuses: Excuse[] = [
  // Universal classics
  { text: "It works on my machine", category: "universal", emoji: "💻" },
  { text: "It's a feature, not a bug", category: "universal", emoji: "✨" },
  { text: "That's not a bug, it's undocumented behavior", category: "universal", emoji: "📝" },
  { text: "Must be a caching issue", category: "universal", emoji: "🗄️" },
  { text: "Have you tried clearing your cache?", category: "universal", emoji: "🧹" },
  { text: "The tests passed locally", category: "universal", emoji: "✅" },
  { text: "It worked in staging", category: "universal", emoji: "🎭" },
  { text: "Must be a cosmic ray bit flip", category: "universal", emoji: "☄️" },
  { text: "Mercury is in retrograde", category: "universal", emoji: "🪐" },
  { text: "The intern touched production", category: "universal", emoji: "👶" },
  { text: "DNS propagation", category: "universal", emoji: "🌐" },
  { text: "It's a race condition", category: "universal", emoji: "🏃" },
  { text: "That's legacy code, we don't touch that", category: "universal", emoji: "🏚️" },
  { text: "The requirements changed", category: "universal", emoji: "📋" },
  { text: "I thought you were handling that", category: "universal", emoji: "🤷" },
  { text: "That's outside the scope", category: "universal", emoji: "🔭" },
  { text: "It's on the backlog", category: "universal", emoji: "📚" },
  { text: "We need to refactor first", category: "universal", emoji: "🔧" },
  { text: "The documentation is outdated", category: "universal", emoji: "📖" },
  { text: "That's technically correct", category: "universal", emoji: "🤓" },
  { text: "It was like that when I got here", category: "universal", emoji: "🏃‍♂️" },
  { text: "The previous developer did that", category: "universal", emoji: "👻" },
  { text: "Have you tried turning it off and on again?", category: "universal", emoji: "🔌" },
  { text: "I'll fix it in the next sprint", category: "universal", emoji: "🏃‍♀️" },
  { text: "That's a known issue", category: "universal", emoji: "📌" },
  
  // Frontend
  { text: "CSS is hard", category: "frontend", emoji: "🎨" },
  { text: "It works in Chrome", category: "frontend", emoji: "🌐" },
  { text: "Safari is being Safari", category: "frontend", emoji: "🧭" },
  { text: "The designer approved this", category: "frontend", emoji: "🎨" },
  { text: "JavaScript fatigue", category: "frontend", emoji: "😮‍💨" },
  { text: "The framework changed overnight", category: "frontend", emoji: "⚛️" },
  { text: "npm install broke everything", category: "frontend", emoji: "📦" },
  { text: "node_modules ate my disk space", category: "frontend", emoji: "🕳️" },
  { text: "It's a z-index issue", category: "frontend", emoji: "📐" },
  { text: "Flexbox is flexing wrong", category: "frontend", emoji: "💪" },
  { text: "The pixels were off by one", category: "frontend", emoji: "🔍" },
  { text: "Users shouldn't zoom anyway", category: "frontend", emoji: "🔎" },
  { text: "It's responsive if you don't resize", category: "frontend", emoji: "📱" },
  { text: "The animation was too smooth", category: "frontend", emoji: "🎬" },
  
  // Backend
  { text: "The database was slow", category: "backend", emoji: "🐢" },
  { text: "The API returned unexpected data", category: "backend", emoji: "📡" },
  { text: "We hit the rate limit", category: "backend", emoji: "🚧" },
  { text: "It's an eventual consistency issue", category: "backend", emoji: "⏰" },
  { text: "The microservice was down", category: "backend", emoji: "🔬" },
  { text: "Someone dropped the table", category: "backend", emoji: "🗑️" },
  { text: "The query was O(n²) but n was small... until now", category: "backend", emoji: "📈" },
  { text: "Memory leak? It's a memory feature", category: "backend", emoji: "🧠" },
  { text: "The connection pool was exhausted", category: "backend", emoji: "🏊" },
  { text: "The third-party API changed", category: "backend", emoji: "🔗" },
  { text: "It's a timezone issue", category: "backend", emoji: "🌍" },
  { text: "The logs didn't capture that", category: "backend", emoji: "📝" },
  { text: "Null pointer? That's impossible", category: "backend", emoji: "👆" },
  { text: "The cache invalidated itself", category: "backend", emoji: "💨" },
  
  // DevOps
  { text: "The container crashed", category: "devops", emoji: "🐳" },
  { text: "Kubernetes is being Kubernetes", category: "devops", emoji: "☸️" },
  { text: "The pipeline was green last night", category: "devops", emoji: "🚦" },
  { text: "AWS us-east-1 went down", category: "devops", emoji: "☁️" },
  { text: "The SSL certificate expired", category: "devops", emoji: "🔐" },
  { text: "Someone committed secrets to main", category: "devops", emoji: "🔑" },
  { text: "The deploy script has a mind of its own", category: "devops", emoji: "🤖" },
  { text: "We ran out of disk space", category: "devops", emoji: "💾" },
  { text: "The load balancer was unbalanced", category: "devops", emoji: "⚖️" },
  { text: "The firewall rules changed", category: "devops", emoji: "🧱" },
  { text: "Terraform drifted", category: "devops", emoji: "🏗️" },
  { text: "The auto-scaling scaled wrong", category: "devops", emoji: "📊" },
  { text: "The health check lied", category: "devops", emoji: "❤️" },
  { text: "GitHub was down", category: "devops", emoji: "🐙" },
  
  // Management
  { text: "That wasn't in the spec", category: "management", emoji: "📄" },
  { text: "We need to circle back on that", category: "management", emoji: "🔄" },
  { text: "Let's take this offline", category: "management", emoji: "📴" },
  { text: "It's a resource allocation issue", category: "management", emoji: "📊" },
  { text: "The timeline was aggressive", category: "management", emoji: "📅" },
  { text: "We're still in discovery phase", category: "management", emoji: "🔍" },
  { text: "The stakeholders changed priorities", category: "management", emoji: "🎯" },
  { text: "That's a Q4 initiative now", category: "management", emoji: "📆" },
  { text: "We need more story points", category: "management", emoji: "📊" },
  { text: "The velocity was miscalculated", category: "management", emoji: "🏎️" },
  { text: "It's on the roadmap", category: "management", emoji: "🗺️" },
  { text: "We're pivoting", category: "management", emoji: "🔀" },
  { text: "The MVP was already shipped", category: "management", emoji: "🚀" },
  { text: "We'll address that in phase 2", category: "management", emoji: "2️⃣" },
];

export function getRandomExcuse(category?: Category): Excuse {
  const filtered = category 
    ? excuses.filter(e => e.category === category)
    : excuses;
  return filtered[Math.floor(Math.random() * filtered.length)];
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
