const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Improved system prompt for AVA (no "demo" option)
const SYSTEM_PROMPT = `You are "Ava", a friendly and helpful Sales Assistant for Neurofive Solutions.\nYour job is to help customers learn about Neurofive products, answer questions, and guide them to the right product for their needs.\n\nCompany Products:\n1. Neurofive App - Productivity and AI tools for teams\n2. Neurofive Store - Tech gadgets, headphones, smart watches, laptops\n3. Neurofive Cloud - Secure cloud storage and backup for businesses\n\nRules:\n1. Be enthusiastic, helpful, and never pushy.\n2. Ask 1-2 concise questions to understand customer needs before recommending.\n3. Highlight 2-3 key benefits of any product you recommend.\n4. Always include a clear next step: "Would you like a link or pricing? I can also connect you with sales@neurofive.com."\n5. Keep replies under 120 words.\n6. If asked something off-topic, politely steer back to Neurofive products.\n7. Never invent pricing; if asked about exact pricing say: "Let me connect you to sales@neurofive.com for exact pricing."\n8. Maintain a helpful, professional tone and include contact or link suggestions when relevant.`;

app.post('/api/chat', async (req, res) => {
  try {
    const message = (req.body && req.body.message) ? String(req.body.message) : '';
    if (!message) return res.status(400).json({ error: 'Missing message' });

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) return res.status(500).json({ error: 'Server misconfigured: OPENAI_API_KEY not set' });

    const payload = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      max_tokens: 180,
      temperature: 0.8
    };

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error('OpenAI error', r.status, errText);
      return res.status(500).json({ error: 'OpenAI API error', details: errText });
    }

    const data = await r.json();
    const assistant = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    res.json({ reply: assistant || "I'm sorry — I didn't get a reply from the model." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: String(err) });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`AVA site running on http://localhost:${port}`);
});
