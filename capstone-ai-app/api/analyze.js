// Production-ready serverless endpoint improvements:
// - Moderation check using OpenAI Moderation API
// - Simple per-IP rate limiting (basic protection)
// - Input validation and length limits
// - Stronger JSON-only prompt with explicit schema enforcement

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const body = req.body && Object.keys(req.body).length ? req.body : JSON.parse(req?.body || '{}');
    const resume = (body.resume || '').trim();
    const job_title = (body.job_title || '').trim();

    // Basic validation
    if (!resume || !job_title) {
      return res.status(400).json({ success: false, error: 'Missing resume or job_title' });
    }

    if (resume.length > 100000) {
      return res.status(413).json({ success: false, error: 'Resume too large. Maximum 100,000 characters allowed.' });
    }

    // Rate limiting: simple in-memory per-IP counter
    // Note: Serverless environments may be stateless — for robust production use a shared store like Redis.
    const RATE_LIMIT = parseInt(process.env.RATE_LIMIT_PER_HOUR || '200'); // default 200 requests per hour
    const WINDOW_MS = 60 * 60 * 1000; // 1 hour

    if (!global.__rateLimitStore) {
      global.__rateLimitStore = new Map();
    }

    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const entry = global.__rateLimitStore.get(ip) || { count: 0, windowStart: now };

    if (now - entry.windowStart > WINDOW_MS) {
      entry.count = 0;
      entry.windowStart = now;
    }

    entry.count += 1;
    global.__rateLimitStore.set(ip, entry);

    if (entry.count > RATE_LIMIT) {
      return res.status(429).json({ success: false, error: `Rate limit exceeded (${RATE_LIMIT} requests/hour).` });
    }

    // Content moderation check
    const moderationResp = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({ model: 'omni-moderation-latest', input: resume })
    });

    if (!moderationResp.ok) {
      const txt = await moderationResp.text();
      console.error('Moderation API error:', txt);
      return res.status(502).json({ success: false, error: 'Moderation API error', detail: txt });
    }

    const moderationJson = await moderationResp.json();
    const flagged = moderationJson?.results?.[0]?.flagged;
    if (flagged) {
      return res.status(400).json({ success: false, error: 'Content flagged by moderation API' });
    }

    // Strong structured prompt
    const prompt = `You are an expert career coach and ATS resume scanner.\nAnalyze this resume for the target job: ${job_title}\n\nResume:\n${resume}\n\nReturn ONLY valid JSON with this exact structure and types (do not include extra fields):\n{\n  "ats_score": integer (0-100),\n  "summary": string (two-sentence overall feedback),\n  "strengths": [string],\n  "improvements": [{"area": string, "feedback": string}],\n  "rewritten_bullet": string\n}\nEnsure the output is strictly JSON with no markdown or commentary.\n`;

    const openaiResp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 900
      })
    });

    if (!openaiResp.ok) {
      const txt = await openaiResp.text();
      console.error('OpenAI API error:', txt);
      return res.status(502).json({ success: false, error: 'OpenAI API error', detail: txt });
    }

    const json = await openaiResp.json();
    const ai_content = (json.choices?.[0]?.message?.content || json.choices?.[0]?.text || '').toString().trim();

    // Remove fences if present
    const clean = ai_content.replace(/```json|```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch (parseErr) {
      // Parsing failed — return debugging info but do not reveal internal keys
      console.error('Failed to parse model output as JSON', parseErr, ai_content.substring(0, 1000));
      return res.status(500).json({
        success: false,
        error: 'Failed to parse model output as JSON',
        model_output_snippet: ai_content.substring(0, 1000)
      });
    }

    // Basic schema validation
    if (typeof parsed.ats_score !== 'number' || parsed.ats_score < 0 || parsed.ats_score > 100) {
      return res.status(500).json({ success: false, error: 'Invalid ats_score in model output' });
    }

    return res.status(200).json({ success: true, data: parsed });

  } catch (err) {
    console.error('Unhandled error in /api/analyze:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
