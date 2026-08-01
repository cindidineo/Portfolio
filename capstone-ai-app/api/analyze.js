// For Vercel: place this file at /api/analyze.js inside the project root or the subfolder when deploying from a subdirectory.
// Uses fetch to call OpenAI REST API using OPENAI_API_KEY environment variable.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const body = req.body && Object.keys(req.body).length ? req.body : JSON.parse(req?.body || '{}');
    const resume = (body.resume || '').trim();
    const job_title = (body.job_title || '').trim();

    if (!resume || !job_title) {
      return res.status(400).json({ success: false, error: 'Missing resume or job_title' });
    }

    const prompt = `
You are an expert career coach and ATS resume scanner.
Analyze this resume for the target job: ${job_title}

Resume:
${resume}

Return ONLY valid JSON with this exact structure:
{
  "ats_score": 0-100,
  "summary": "2 sentence overall feedback",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": [
    {"area": "Keywords", "feedback": "Add more keywords like Python, SQL"},
    {"area": "Formatting", "feedback": "Use bullet points not paragraphs"}
  ],
  "rewritten_bullet": "Rewrite 1 weak bullet point to be more impact-driven"
}
`;

    const openaiResp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.25,
        max_tokens: 700
      })
    });

    if (!openaiResp.ok) {
      const txt = await openaiResp.text();
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
      // Return the raw text for debugging if parsing fails
      return res.status(500).json({
        success: false,
        error: 'Failed to parse model output as JSON',
        model_output: ai_content,
        parse_error: parseErr.toString()
      });
    }

    return res.status(200).json({ success: true, data: parsed });

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
