# Sales Chatbot Site

This folder contains a small full-stack example to run "AVA" — Neurofive's sales assistant — as a live site.

Quick start (local):

1. Install dependencies: `npm install` in the project root (`sales-chatbot-site`).
2. Make sure you're running Node 18+ (required for streaming support).
3. Set environment variable: `OPENAI_API_KEY` with your OpenAI API key.
4. Run: `npm start` and open http://localhost:3000

Deployment:

- Deploy to Vercel (recommended): create a new Vercel project from this repo and set `OPENAI_API_KEY` in the Vercel project environment variables. The API endpoint is `https://<your-site>/api/chat-stream` for streaming.

Contact / Support

- Sales email: sales@neurofive.com
- Support: support@neurofive.com
- Company site: https://neurofive.example.com

Notes

- Do NOT commit your OpenAI API key. Use environment variables.
- This example uses the OpenAI HTTP API streaming mode; make sure your Node runtime is recent enough (18+).
- If your host doesn't support long-lived streaming connections, use the non-streaming endpoint `/api/chat` instead.
