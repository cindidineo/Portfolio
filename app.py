"""
Flask Web Application for Ava Sales Chatbot
Provides REST API endpoint and web UI for the chatbot
"""

from flask import Flask, request, jsonify, render_template
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

if not openai.api_key:
    raise ValueError("OPENAI_API_KEY not found in environment variables. Please set it in .env file")

app = Flask(__name__)

SYSTEM_PROMPT = """
You are "Ava", a friendly and helpful Sales Assistant for Neurofive Solutions.
Your job is to help customers learn about Neurofive products, answer questions,
and guide them to the right product for their needs.

Company Products:
1. Neurofive App - Productivity and AI tools for teams
2. Neurofive Store - Tech gadgets, headphones, smart watches, laptops
3. Neurofive Cloud - Secure cloud storage and backup for businesses

Rules:
1. Be enthusiastic, helpful, and never pushy
2. Ask 1-2 questions to understand customer needs before recommending
3. Highlight 2-3 key benefits of any product you recommend
4. Always include a clear next step: "Would you like a demo / link / pricing?"
5. Keep replies under 120 words
6. If asked something off-topic, politely steer back to Neurofive products
7. Never make up pricing. If unsure say: "Let me connect you to sales@neurofive.com for exact pricing"
"""

@app.route('/')
def index():
    """Serve the chat interface"""
    return render_template('chat.html')

@app.route('/chat', methods=['POST'])
def chat():
    """
    Handle chat messages
    
    Expects JSON: {"message": "user message"}
    Returns JSON: {"reply": "ava response"}
    """
    data = request.json
    user_message = data.get('message', '').strip() if data else ''
    
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    
    try:
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ],
            max_tokens=180,
            temperature=0.8
        )
        ava_reply = response.choices[0].message.content
        return jsonify({'reply': ava_reply}), 200
    except openai.AuthenticationError:
        return jsonify({'error': 'Invalid API key. Please check your OPENAI_API_KEY.'}), 401
    except openai.RateLimitError:
        return jsonify({'error': 'Rate limit exceeded. Please try again later.'}), 429
    except Exception as e:
        return jsonify({'error': f'Error: {str(e)}'}), 500

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def server_error(error):
    """Handle 500 errors"""
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
