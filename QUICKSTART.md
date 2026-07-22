# 🚀 Ava Chatbot - Quick Start Guide

## 5-Minute Setup

### Step 1: Install Python Dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Get Your OpenAI API Key
1. Visit: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (it starts with `sk-`)

### Step 3: Configure Environment
```bash
cp .env.example .env
```

Then open `.env` and replace:
```
OPENAI_API_KEY=sk-your-actual-api-key-here
```
with your actual key.

### Step 4: Test the Chatbot
```bash
python ava_chatbot.py
```

You should see 5 test conversations running!

### Step 5: Launch Web Interface
```bash
python app.py
```

Open your browser to: **http://localhost:5000**

---

## 📁 File Structure

```
Portfolio/
├── ava_chatbot.py          # Core chatbot (run to test)
├── app.py                  # Flask web server
├── requirements.txt        # Python packages
├── .env                    # Your API key (DON'T COMMIT)
├── .env.example            # Template for .env
├── .gitignore              # Protect secrets
├── README_AVA.md           # Full documentation
├── templates/
│   └── chat.html          # Web UI
└── Sales chatbot           # Original file
```

---

## 🧪 Testing

### Option 1: Command Line
```bash
python ava_chatbot.py
```

### Option 2: Web Interface
```bash
python app.py
# Visit http://localhost:5000
```

---

## 🎯 What Ava Does

✅ Answers questions about Neurofive products
✅ Recommends products based on customer needs
✅ Provides pricing information (or redirects to sales)
✅ Steers off-topic conversations back on track
✅ Maintains a friendly, professional tone

---

## 🛠️ Customization

### Change Ava's Personality
Edit `SYSTEM_PROMPT` in:
- `ava_chatbot.py` (line 14-28)
- `app.py` (line 18-32)

### Change Response Quality
In `ava_chatbot.py` or `app.py`, change:
```python
model="gpt-4o-mini",  # Fast & cheap (current)
model="gpt-4o",       # Better quality, more expensive
```

### Change Max Response Length
```python
max_tokens=180,  # Increase for longer responses
```

---

## ⚠️ Common Issues

| Problem | Solution |
|---------|----------|
| `OPENAI_API_KEY not found` | Create `.env` file and add your key |
| `Invalid API key` | Check your key at openai.com/api-keys |
| `ModuleNotFoundError` | Run `pip install -r requirements.txt` |
| `ConnectionError` | Check internet connection and API key |

---

## 📊 API Endpoint

If integrating with other apps:

**POST** `/chat`

**Request:**
```json
{
  "message": "I need productivity software"
}
```

**Response:**
```json
{
  "reply": "Great! Let me help you find the perfect solution..."
}
```

---

## 🔒 Security Tips

✅ **DO:**
- Keep `.env` file secret (in `.gitignore`)
- Use environment variables
- Validate user input

❌ **DON'T:**
- Commit `.env` to Git
- Expose API keys in code
- Hardcode secrets

---

## 📚 Next Steps

- Deploy to **Heroku**, **Railway**, or **Render**
- Add conversation history/memory
- Integrate with your website
- Track customer interactions
- A/B test different personas

---

## 💬 Example Conversations

### Scenario 1: Sales Inquiry
```
👤: I have 50 employees needing collaboration tools
🤖 Ava: Perfect! For a team of that size, I'd recommend...
```

### Scenario 2: Product Question
```
👤: What's included in Neurofive Cloud?
🤖 Ava: Great question! Neurofive Cloud offers...
```

### Scenario 3: Off-Topic Handling
```
👤: How do I make pizza?
🤖 Ava: Ha! I'm better at sales than cooking! 😄 
     But speaking of productivity...
```

---

## 📞 Support

For OpenAI API issues: https://platform.openai.com/docs
For Flask help: https://flask.palletsprojects.com/

---

**Built with ❤️ for Neurofive Solutions**

Questions? Check `README_AVA.md` for full documentation!
