from flask import Flask, render_template, request, jsonify
import os
import json
import re
import logging
import openai

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

# Read OpenAI API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    app.logger.warning("OPENAI_API_KEY is not set. Set it in your environment for the app to work.")

# Helper to extract JSON block from model output
def extract_json(text: str):
    """
    Try multiple strategies to extract JSON from the model response:
    - ```json ... ```
    - First matching {...} pair (greedy minimally)
    Returns parsed object or raises ValueError.
    """
    # 1) Try fenced json codeblock
    m = re.search(r"```json\s*(\{.*?\})\s*```", text, re.DOTALL | re.IGNORECASE)
    if m:
        return json.loads(m.group(1))

    # 2) Try any codeblock
    m = re.search(r"```(?:[\w+-]*)\s*(\{.*?\})\s*```", text, re.DOTALL)
    if m:
        return json.loads(m.group(1))

    # 3) Find the first {...} block (balanced braces attempt)
    # This attempts to find a top-level JSON object by scanning for braces
    start = text.find("{")
    if start != -1:
        # attempt to find the matching closing brace
        depth = 0
        for i in range(start, len(text)):
            if text[i] == "{":
                depth += 1
            elif text[i] == "}":
                depth -= 1
                if depth == 0:
                    candidate = text[start:i+1]
                    try:
                        return json.loads(candidate)
                    except json.JSONDecodeError:
                        break

    # 4) Last resort: attempt to parse the entire text
    raise ValueError("No valid JSON found in model output.")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    data = request.json or {}
    resume_text = data.get('resume', '').strip()
    job_title = data.get('job_title', '').strip()

    if not resume_text or not job_title:
        return jsonify({"success": False, "error": "Both 'resume' and 'job_title' are required."}), 400

    # Use a system message to instruct the model to return strict JSON
    system_message = (
        "You are an expert career coach and ATS resume scanner. "
        "When given a resume and a target job title, return ONLY valid JSON with the exact structure described."
    )

    user_prompt = f"""
Analyze this resume for the target job: {job_title}

Resume:
{resume_text}

Return ONLY valid JSON with this exact structure:
{{
  "ats_score": <integer 0-100>,
  "summary": "<2 sentence overall feedback>",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": [
    {{"area": "Keywords", "feedback": "Add more keywords like Python, SQL"}},
    {{"area": "Formatting", "feedback": "Use bullet points not paragraphs"}}
  ],
  "rewritten_bullet": "<Rewrite 1 weak bullet point to be more impact-driven>"
}}
Make sure the JSON is parseable by a standard JSON parser with no trailing text.
"""

    try:
        # NOTE: model name may vary based on your OpenAI plan; replace if needed.
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.2,
            max_tokens=600
        )

        ai_output = response.choices[0].message.content
        app.logger.info("Model raw output: %s", ai_output[:500])

        try:
            result = extract_json(ai_output)
        except ValueError as ve:
            # If extraction fails, include raw output in error for debugging (but avoid exposing full output in production)
            app.logger.error("JSON extraction failed: %s", ve)
            return jsonify({"success": False, "error": "Failed to parse AI output as JSON.", "raw": ai_output}), 500

        return jsonify({"success": True, "data": result})

    except Exception as e:
        app.logger.exception("Error calling OpenAI API")
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
