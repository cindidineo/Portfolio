import openai
import os

# 1. SET YOUR API KEY HERE
openai.api_key = "sk-YOUR_API_KEY_HERE"

# 2. SYSTEM PROMPT = This gives the bot its sales persona and rules
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

def chat_with_ava(user_message):
    response = openai.chat.completions.create(
        model="gpt-4o-mini", # cheap + fast. Use "gpt-4o" for better quality
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message}
        ],
        max_tokens=180,
        temperature=0.8
    )
    return response.choices[0].message.content

# 3. TEST WITH 5 MESSAGES
test_messages = [
    "Hi, I need software for my team of 10 people",
    "What gadgets do you sell in the Neurofive Store?",
    "How much does Neurofive Cloud cost per month?",
    "Can you recommend a good recipe for chicken curry?", # tricky/off-topic
    "Okay, can I get a demo of the Neurofive App?"
]

print("=== AVA: Neurofive Sales Assistant ===\n")
for i, msg in enumerate(test_messages, 1):
    print(f"Test {i} - CUSTOMER: {msg}")
    reply = chat_with_ava(msg)
    print(f"AVA: {reply}\n")
    print("-" * 50)
