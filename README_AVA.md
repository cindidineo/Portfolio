# Ava - Neurofive Sales Assistant Chatbot

A fully functional AI-powered sales chatbot built with OpenAI GPT, Flask, and a beautiful web interface. Ava helps customers learn about Neurofive products, answer questions, and guides them toward the right solutions.

## Features

✨ **AI-Powered Conversations** - Uses OpenAI GPT-4o-mini for intelligent, context-aware responses
🎨 **Beautiful Web UI** - Modern, responsive chat interface with gradient design
🚀 **Production Ready** - Includes error handling, rate limiting, and proper security practices
⚡ **Fast & Affordable** - Uses gpt-4o-mini for cost efficiency
📱 **Mobile Friendly** - Works seamlessly on desktop and mobile devices

## Products Ava Knows About

1. **Neurofive App** - Productivity and AI tools for teams
2. **Neurofive Store** - Tech gadgets, headphones, smart watches, laptops
3. **Neurofive Cloud** - Secure cloud storage and backup for businesses

## Ava's Personality

- Friendly and helpful
- Never pushy or aggressive
- Asks clarifying questions before recommending
- Provides clear next steps
- Steers off-topic conversations back to Neurofive products

## Setup Instructions

### Prerequisites

- Python 3.8+
- OpenAI API key (get one at https://platform.openai.com/api-keys)

### Installation

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Create Environment File**
   ```bash
   cp .env.example .env
   ```

3. **Add Your API Key**
   - Open `.env`
   - Replace `sk-your-actual-api-key-here` with your actual OpenAI API key
   - **Important:** Never commit `.env` to version control

4. **Verify Setup**
   ```bash
   python ava_chatbot.py
   ```
   This runs 5 test conversations to verify everything works.

## Usage

### Option 1: Command Line Testing

```bash
python ava_chatbot.py
```

Output example:
```
=== AVA: Neurofive Sales Assistant ===

Test 1 - CUSTOMER: Hi, I need software for my team of 10 people
AVA: Great question! To recommend the perfect solution for your team...
```

### Option 2: Web Interface (Recommended)

```bash
python app.py
```

Then open your browser to:
```
http://localhost:5000
```

Chat with Ava in the interactive web interface!

## File Structure

```
├── ava_chatbot.py          # Core chatbot logic
├── app.py                  # Flask web server
├── requirements.txt        # Python dependencies
├── .env.example           # Environment template
├── .env                   # Your API key (DO NOT COMMIT)
├── templates/
│   └── chat.html         # Web UI
└── README_AVA.md         # This file
```

## API Endpoint

If you want to integrate Ava with other applications:

**POST** `/chat`

**Request:**
```json
{
  "message": "Hi, I need software for my team"
}
```

**Response:**
```json
{
  "reply": "Great question! To help you find the perfect productivity solution..."
}
```

**Error Response:**
```json
{
  "error": "Invalid API key. Please check your OPENAI_API_KEY."
}
```

## Customization

### Change Ava's Personality

Edit the `SYSTEM_PROMPT` in both `ava_chatbot.py` and `app.py`:

```python
SYSTEM_PROMPT = """
You are "Ava", a friendly and helpful Sales Assistant...
"""
```

### Adjust Response Length

Modify `max_tokens` in the API call (default: 180):
```python
max_tokens=180,  # Increase for longer responses
```

### Change Model

Switch between OpenAI models:
```python
model="gpt-4o",      # Best quality, more expensive
model="gpt-4o-mini", # Fast and cheap (current)
model="gpt-3.5-turbo" # Even cheaper, simpler
```

### Customize Styling

Edit the CSS in `templates/chat.html` to match your brand colors.

## Troubleshooting

### "OPENAI_API_KEY not found"
- Verify `.env` file exists
- Check that the key is correctly formatted (starts with `sk-`)
- Ensure `.env` is in the same directory as the scripts

### "Invalid API key"
- Visit https://platform.openai.com/api-keys
- Generate a new API key
- Update your `.env` file

### "Rate limit exceeded"
- You've hit OpenAI's rate limits
- Wait a few moments and try again
- Consider upgrading your OpenAI plan for higher limits

### Chatbot gives poor responses
- Try using `gpt-4o` instead of `gpt-4o-mini` for better quality
- Adjust `temperature` (0-1): lower = more consistent, higher = more creative
- Refine the `SYSTEM_PROMPT` to be more specific

## Security Best Practices

✅ **Do:**
- Keep API key in `.env` (never in code)
- Add `.env` to `.gitignore`
- Use environment variables in production
- Validate user input
- Handle errors gracefully

❌ **Don't:**
- Commit `.env` to Git
- Log API keys or sensitive data
- Expose API key in client-side code
- Skip error handling

## Pricing

- OpenAI API: Pay per token used (gpt-4o-mini is very affordable)
- Flask server: Free to host (try Railway, Render, Heroku)
- No subscription fees for this code!

## Examples

### Sales Conversation
```
👤 Customer: I have a team of 50 people that needs collaboration tools
🤖 Ava: Perfect! A team of that size would really benefit from our Neurofive App...
```

### Product Query
```
👤 Customer: What gadgets do you sell?
🤖 Ava: We have a fantastic Neurofive Store with: headphones, smart watches, 
     laptops, and more tech gadgets...
```

### Off-Topic Handling
```
👤 Customer: How do I make pasta?
🤖 Ava: Ha! I'm better at sales than cooking! 😄 But speaking of productivity,
     have you considered our Neurofive App for team collaboration?
```

## Next Steps

- Deploy to production (Railway, Render, Heroku)
- Add conversation history/memory
- Integrate with your website
- Add customer data logging
- Create admin dashboard to track metrics

## Support

For issues with the chatbot, check:
1. `.env` file is correctly set up
2. OpenAI API key is valid and has available credits
3. Python version is 3.8+
4. All dependencies installed: `pip install -r requirements.txt`

## License

Feel free to use and modify this code for your own projects!

---

**Built with ❤️ for Neurofive Solutions**
