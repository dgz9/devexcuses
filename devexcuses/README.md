# DevExcuses 🎲

> "It works on my machine" and 70+ other developer excuses

A random excuse generator for developers. Perfect for standups, PR comments, and Slack.

## Features

- 🎰 Random excuse generator with smooth animations
- 📁 Filter by category (Frontend, Backend, DevOps, Management, Universal)
- 📋 One-click copy to clipboard
- 𝕏 Share directly to Twitter
- 🔌 API endpoint for integrations
- 📱 Fully responsive design

## API Usage

```bash
# Get a random excuse
curl https://devexcuses.vercel.app/api/excuse

# Get a random excuse from a specific category
curl https://devexcuses.vercel.app/api/excuse?category=frontend
```

Response:
```json
{
  "excuse": "It works on my machine",
  "emoji": "💻",
  "category": "universal"
}
```

Categories: `universal`, `frontend`, `backend`, `devops`, `management`

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Contributing

Got a good excuse? PRs welcome! Add your excuse to `lib/excuses.ts`.

## License

MIT

---

Made with 🦞 by [Luke](https://luke-lobster-site.vercel.app)
