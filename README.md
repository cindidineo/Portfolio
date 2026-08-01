# NeuroFive - AI Resume Feedback Tool

This is a small Flask app that analyzes a resume for a target job title using the OpenAI API and returns structured JSON feedback (ATS score, strengths, improvements, rewritten bullet).

## Setup (local)

1. Create a virtual environment:
   - python -m venv venv
   - source venv/bin/activate  (Windows: venv\\Scripts\\activate)

2. Install dependencies:
   - pip install -r requirements.txt

3. Set your OpenAI API key in the environment:
   - export OPENAI_API_KEY="sk-..."   (Windows PowerShell: $env:OPENAI_API_KEY="sk-...")

4. Run:
   - python app.py
   - Open http://127.0.0.1:5000

## Deploying

You can deploy to Render, Railway, Heroku, or any host that supports Python+Gunicorn.

General steps for Render:
- Create a new Web Service and connect your GitHub repo.
- Set the environment variable `OPENAI_API_KEY` in Render's dashboard.
- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn app:app`

For Heroku:
- git push heroku main
- heroku config:set OPENAI_API_KEY="sk-..."
- Procfile included.

## Security
- Do NOT commit your OpenAI API key. Use environment variables or secret management on the host.
- Limit model usage and monitor costs.

## Notes
- The app expects the OpenAI model to return strict JSON. If parsing fails, the app returns the raw model output for debugging.
- Model name used: `gpt-4o-mini` — change if your account does not have access.
