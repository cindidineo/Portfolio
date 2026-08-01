/**
 * Simple Express server for Neo AI assistant.
 * - POST /api/chat { q, grade, subject } -> { answer }
 *
 * Requirements:
 *   - Set OPENAI_API_KEY in environment
 *   - npm install express openai cors express-rate-limit
 *
 * Notes:
 *   - The system prompt below forces the model to answer step-by-step,
 *     tailored to the requested grade & subject, and to say "I don't know"
 *     when uncertain (to reduce hallucination).
 *   - Tweak model selection and prompt as you test.
 */

import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
app.use(express.json());
app.use(cors());

// Basic rate limiting to avoid abuse
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: 'Too many requests - please slow down'
});
app.use(limiter);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY environment variable.');
  process.exit(1);
}
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// System prompt that encourages correct, grade-appropriate answers and shows steps
const systemPrompt = `
You are Neo, an educational AI tutor for school and university students.
Your goals:
- Always produce correct, step-by-step, curriculum-appropriate answers.
- Tailor language and explanations to the provided grade (e.g., "Grade 7" -> simpler language).
- For math/science problems: show reasoning as explicit steps (but do NOT reveal internal chain-of-thought).
- If you quote facts, provide short references or say where the info comes from.
- If uncertain or if data is missing, say "I don't know" or ask clarifying questions.
- Provide a short practice question and a one-line summary at the end.
- Keep answers concise and clear; use simple language for grades below 9.
`;

// POST /api/chat
app.post('/api/chat', async (req, res) => {
  try {
    const { q, grade = '', subject = '' } = req.body || {};
    if (!q || typeof q !== 'string') return res.status(400).send('Missing question "q".');

    // Build user-visible context to send to model
    const userContent = `
Grade: ${grade || 'unspecified'}
Subject: ${subject || 'unspecified'}
Question: ${q}
Answer clearly and step-by-step for the student's grade.
    `;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userContent }
    ];

    // Call OpenAI Chat Completions
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // change to appropriate model for your account
      messages,
      temperature: 0.0,   // lower temp for correctness
      max_tokens: 800
    });

    const answer = completion.choices?.[0]?.message?.content?.trim() || "I'm sorry, I couldn't generate an answer.";

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error: ' + (err?.message || String(err)));
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Neo AI server listening on ${PORT}`));
