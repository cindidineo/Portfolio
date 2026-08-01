# Neo AI Learning Assistant

This repo contains a front-end and a simple Node/Express backend for Neo — an AI tutor for school and varsity students.

Important: This is NOT a demo-only system — it calls the OpenAI API to generate real answers. You must provide an OpenAI API key and deploy the backend.

## Files
- `index.html` — main UI (chat).
- `english-levels.html` — static page of English levels.
- `server.js` — Express backend exposing `POST /api/chat`.
- `package.json` — server dependencies.

## Setup (local)
1. Install Node.js (18+).
2. In the project root:
   - npm install
3. Create an env var:
   - export OPENAI_API_KEY="sk-..."
4. Start server:
   - npm start
5. Open `index.html` in a browser (or serve site via static host). For development, you can serve `index.html` with a static server (or integrate into Express).

## Deployment
- Deploy the static site (index.html + english-levels.html) on GitHub Pages, Vercel, Netlify, or any static host.
- Deploy `server.js` as a serverless function or a Node app (Vercel, Render, Heroku). Set OPENAI_API_KEY in environment.
- Ensure your static site calls the backend URL (adjust `/api/chat` to full URL if backend is hosted elsewhere).

## Security & Quality notes
- Use a production model appropriate for your account and budget.
- Temperature set to 0.0 in server code to prioritize correctness; you can adjust after testing.
- The system prompt forces the model to be cautious; still supervise and test answers thoroughly before using in high-stakes settings.
- Consider adding caching, usage logging, parental consent, and content moderation depending on your audience.
