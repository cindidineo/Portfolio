# AI Resume Feedback Tool (Production-ready instructions)

This folder contains a static frontend (index.html) and a serverless API (api/analyze.js) which calls OpenAI's API to analyze resumes and return structured JSON feedback.

What changed from the demo:
- UI copy removed "demo" language and updated for production.
- Serverless endpoint now includes input validation, moderation checks, simple rate limiting, and stronger prompt instructions.

Required environment variables (set these in your deployment provider):
- OPENAI_API_KEY : your OpenAI API key (required)
- OPENAI_MODEL (optional) : model name to use (defaults to gpt-4o-mini)
- RATE_LIMIT_PER_HOUR (optional) : integer requests allowed per IP per hour (defaults to 200)

Security & production notes:
- Do NOT commit your OpenAI API key to the repo.
- The rate limiting implemented here is in-memory and best-effort; in production use a centralized store (Redis) to enforce limits across instances.
- Moderation is enforced using OpenAI's moderation endpoint. Any flagged resume will be rejected.
- For a fully secure production app, add authentication (OAuth, sign-in), server-side session management, and request logging/monitoring.

Deploy to Vercel (recommended):
1. Import the GitHub repo into Vercel.
2. Set the "Root Directory" to `capstone-ai-app` when creating the project.
3. In Project Settings -> Environment Variables add:
   - OPENAI_API_KEY (your key)
   - OPENAI_MODEL (optional, e.g. gpt-4o)
   - RATE_LIMIT_PER_HOUR (optional)
4. Deploy. After build finishes you'll get a live URL.

Testing locally with Vercel CLI:
1. Install Vercel CLI: `npm i -g vercel`
2. From the repo root: `cd capstone-ai-app`
3. Create a file `.env.local` with your key:
```
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
RATE_LIMIT_PER_HOUR=200
```
4. Run: `vercel dev`

If you want me to deploy this for you and return the live URL:
- Add me as a collaborator to your Vercel project OR
- Share a Vercel deploy token (not recommended) and project/org IDs via a secure channel.

If you'd like I can also:
- Add Redis-backed rate limiting and request logging
- Add user accounts and protected feedback (so only signed-in users can submit resumes)
- Add PDF upload/processing and RAG-style context for role-specific prompts

