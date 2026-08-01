# AI Resume Feedback Tool (NeuroFive demo)

This folder contains a static frontend (index.html) and a serverless API (api/analyze.js) which calls OpenAI's API to analyze resumes and return structured JSON feedback.

Security note:
- Never put your OpenAI key in client-side code.
- Set OPENAI_API_KEY as an environment variable on your deployment platform (Vercel/Netlify/etc).

Deploy to Vercel (recommended, fast):

1. If you want the project hosted from this subfolder (capstone-ai-app):
   - In Vercel, when importing the GitHub repo, set "Root Directory" to `capstone-ai-app` so Vercel builds the app from this folder.

2. In Vercel project settings -> Environment Variables add:
   - Name: OPENAI_API_KEY
   - Value: (your OpenAI API key)
   - Environment: Production (and Preview if desired)

3. Deploy. After build finishes you'll get a URL like:
   https://your-project-name.vercel.app

Usage:
- Open the deployed site, paste a resume and a job title, then click "Get AI Feedback".
- The model used: gpt-4o-mini (adjust in api/analyze.js if needed).

If you want me to deploy this for you, I can push it to the repository's root or set up the Vercel project — tell me which and I will continue.
