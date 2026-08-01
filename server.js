const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Configure these in .env
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_ENDPOINT = process.env.OPENAI_API_ENDPOINT || 'https://api.openai.com/v1/chat/completions';
const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4o'; // change to an available model you have access to

if (!OPENAI_KEY) {
  console.warn('Warning: OPENAI_API_KEY not set. Set it in .env before running.');
}

const SYSTEM_PROMPT_WRITER = `You are AGENT 1: THE WRITER.
Your job: Draft clear, engaging content on the given topic.
Be creative, use examples, write 3-4 paragraphs.
Do not edit yourself. Just output the draft.`;

const SYSTEM_PROMPT_EDITOR = `You are AGENT 2: THE EDITOR/CRITIC.
Your job: Review the draft from Agent 1 and improve it.
Tasks: 1. Fix grammar and clarity 2. Add structure with headings
3. Remove fluff 4. Make it more professional and actionable.
Output ONLY the improved final version. Do not explain your changes.`;

async function callOpenAI(messages, temperature = 0.7, max_tokens = 1000) {
  const body = {
    model: DEFAULT_MODEL,
    messages,
    temperature,
    max_tokens,
  };

  const res = await axios.post(OPENAI_API_ENDPOINT, body, {
    headers: {
      'Authorization': `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json'
    },
    timeout: 20000
  });

  // adapt depending on provider reply shape
  if (res.data && res.data.choices && res.data.choices[0] && res.data.choices[0].message) {
    return res.data.choices[0].message.content;
  }
  // fallback for other structures
  if (res.data && res.data.choices && res.data.choices[0] && typeof res.data.choices[0].text === 'string') {
    return res.data.choices[0].text;
  }
  throw new Error('Unexpected response shape from provider: ' + JSON.stringify(res.data).slice(0, 400));
}

// single endpoint to run an agent
app.post('/api/ai', async (req, res) => {
  try {
    const { agent, topic, draft, temperature } = req.body;
    if (!agent) return res.status(400).json({ error: 'Missing agent field (writer or editor)' });

    if (agent === 'writer') {
      if (!topic) return res.status(400).json({ error: 'Missing topic for writer' });
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT_WRITER },
        { role: 'user', content: `Write about: ${topic}` }
      ];
      const text = await callOpenAI(messages, temperature ?? 0.7);
      return res.json({ text });
    }

    if (agent === 'editor') {
      if (!draft) return res.status(400).json({ error: 'Missing draft for editor' });
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT_EDITOR },
        { role: 'user', content: `Here is the draft to improve:\n\n${draft}` }
      ];
      const text = await callOpenAI(messages, temperature ?? 0.3);
      return res.json({ text });
    }

    return res.status(400).json({ error: 'Unknown agent value. Use "writer" or "editor".' });
  } catch (err) {
    console.error(err?.response?.data || err.message || err);
    return res.status(500).json({ error: err?.response?.data || err.message || 'server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AI proxy server running on port ${PORT}`));
