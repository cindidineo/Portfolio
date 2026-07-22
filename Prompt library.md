# Prompt Library v1: Customer Support Replies

A reusable prompt framework for generating professional, empathetic customer support responses. Tested with ChatGPT, Claude, and Meta AI.

---

## 1. Reusable Template Structure

Use this base for all support emails/chats. Copy it and swap the variables `{{ }}` for each customer interaction.

```
Role: You are a friendly, professional customer support agent for {{COMPANY_NAME}}.
Context: A customer contacted us about {{ISSUE_TYPE}}. Their tone is {{CUSTOMER_TONE}}. 
         Order/Issue ID: {{ORDER_ID}}. Product: {{PRODUCT_NAME}}.
Task: Write a support reply that resolves {{ISSUE_TYPE}} and makes the customer feel heard.
Format: 
1. Greeting + Empathy
2. Solution/Explanation 
3. Next Steps
4. Closing + Signature
Constraints: 
- Tone: {{TONE}} 
- Length: {{LENGTH}} words max
- Do not promise refunds unless {{CAN_REFUND}} = true
- Use the customer's name: {{CUSTOMER_NAME}}
```

---

## 2. Variable Reference Guide

| Variable | Description | Example |
|----------|-------------|---------|
| `{{COMPANY_NAME}}` | Your business/brand name | NeuroFive Store |
| `{{CUSTOMER_NAME}}` | Customer's first name | Sarah |
| `{{ISSUE_TYPE}}` | Problem category | late delivery, refund request, defective product |
| `{{CUSTOMER_TONE}}` | How the customer feels | frustrated, angry, calm, confused |
| `{{ORDER_ID}}` | Unique order/ticket number | NF-8821 |
| `{{PRODUCT_NAME}}` | Item purchased/service | Wireless Headphones, Online Course |
| `{{TONE}}` | Response tone | apologetic and helpful, professional and understanding |
| `{{LENGTH}}` | Word count limit | 150, 200 |
| `{{CAN_REFUND}}` | Is refund authorized? | true, false |

---

## 3. Five Core Prompt Examples + AI Outputs

### Prompt 1: Late Delivery
**Inputs:** 
- Customer: Sarah | Product: Wireless Headphones | Order ID: NF-8821 | Tone: Frustrated | Response Tone: Apologetic and helpful

**Output:**
```
Subject: Update on your NeuroFive Store Order NF-8821

Hi Sarah,

I'm really sorry to hear your Wireless Headphones haven't arrived yet. I completely understand how frustrating this is, especially when you were expecting them.

I've checked with our courier and there was a delay at the sorting hub. The good news is your order is now out for delivery and should reach you within the next 2 business days.

Next steps: I'll personally track this and send you an update tomorrow with the tracking link. As a thank you for your patience, I've also added a 10% discount code to your account for your next purchase.

Thank you for choosing NeuroFive Store. We appreciate you.

Best regards,  
Support Team
```

---

### Prompt 2: Refund Request
**Inputs:** 
- Customer: James | Product: Online Course | Order ID: NF-9102 | Tone: Calm | Response Tone: Professional and understanding

**Output:**
```
Subject: Your Refund Request for Order NF-9102

Hi James,

Thank you for reaching out and for giving our Online Course a try. I'm sorry it wasn't the right fit for you.

I've reviewed your order NF-9102 and you are eligible for a refund under our 14-day policy. I've initiated the refund to your original payment method. You should see it reflected in 5-7 business days.

Next steps: You'll receive a confirmation email once the refund is processed. You'll also automatically lose access to the course materials after 24 hours.

If there's anything else we can help with, just let us know. 

Warm regards,  
Support Team
```

---

### Prompt 3: Product Not Working
**Inputs:** 
- Customer: Aisha | Product: Smart Watch | Order ID: NF-3345 | Tone: Angry | Response Tone: Calm and solution-focused

**Output:**
```
Subject: Let's fix your Smart Watch - Order NF-3345

Hi Aisha,

I'm so sorry your Smart Watch isn't working properly. That's not the experience we want for you, and I'm here to get this sorted ASAP.

Let's try a quick fix first: Please hold the power button for 15 seconds to force restart. If that doesn't work, it may be a hardware issue.

Next steps: I can arrange a free replacement or a full refund for order NF-3345. Just reply with which option you prefer and your address, and we'll ship it out today with express delivery.

Again, I apologize for the trouble. We'll make this right.

Sincerely,  
Support Team
```

---

### Prompt 4: Wrong Item Shipped
**Inputs:** 
- Customer: David | Product: Laptop Bag | Order ID: NF-5567 | Tone: Disappointed | Response Tone: Empathetic and proactive

**Output:**
```
Subject: Sorry about your order NF-5567

Hi David,

Thank you for letting us know, and I'm sorry we sent the wrong Laptop Bag. I understand how disappointing that is.

We've made a mistake and we'll fix it. I've already shipped the correct item to you with express delivery at no extra cost. You should receive it in 2-3 days.

Next steps: Please keep the wrong item. A courier will contact you in the next 48 hours to arrange a free pickup. I've also added a R200 voucher to your account.

Thank you for your patience. 

Best,  
Support Team
```

---

### Prompt 5: Account Login Issue
**Inputs:** 
- Customer: Priya | Product: NeuroFive Mobile App | Order ID: N/A | Tone: Confused | Response Tone: Patient and clear

**Output:**
```
Subject: Help with logging into NeuroFive App

Hi Priya,

No worries — I can help you get back into your account!

It looks like you may need to reset your password. Please tap "Forgot Password" on the login screen of the NeuroFive Mobile App and we'll send a reset link to your email.

Next steps: 
1. Check your inbox and spam folder for the reset email
2. Create a new password
3. Log back in

If you still have trouble, just reply with the email linked to your account and I'll check it for you.

We're here to help!  
Support Team
```

---

## 4. Three Advanced Prompt Examples (Escalations & Complaints)

### Prompt 6: Complaint / Service Failure
**Inputs:** 
- Customer: Marcus | Product: Premium Membership | Order ID: NF-4429 | Tone: Frustrated | Response Tone: Empathetic and accountable | CAN_REFUND: true

**Output:**
```
Subject: We're sorry, and here's how we'll make this right

Hi Marcus,

I read your complaint about your Premium Membership experience, and I want to sincerely apologize. You deserve better, and we failed to deliver.

I've personally reviewed what happened. Our team should have caught this issue days ago. Here's what I'm doing immediately:

1. I've issued a full refund for this billing cycle (will appear in 3-5 business days)
2. I'm upgrading you to our VIP tier at no cost for the next 3 months
3. You'll have my direct contact for priority support going forward

Next steps: I'd love to understand what we can do differently. Can I schedule a quick 15-min call this week to discuss?

Thank you for giving us a chance to make this right.

Sincerely,  
[Support Lead Name]
Support Team
```

---

### Prompt 7: Upsell / Cross-Sell (Positive Tone)
**Inputs:** 
- Customer: Lisa | Product: Fitness Tracker | Order ID: NF-7712 | Tone: Happy | Response Tone: Enthusiastic and helpful

**Output:**
```
Subject: You're doing great! 🎉

Hi Lisa,

I noticed you've been consistently using your Fitness Tracker and hitting your goals — that's amazing!

Since you love the tracker so much, I wanted to let you know about our Companion App, which syncs with your device and gives you deeper insights into your activity, sleep, and recovery. Many customers like you use it to unlock advanced features.

If you'd like to try it, I've added a 30-day free trial to your account. Just log in to see it.

No pressure at all — just wanted to make sure you knew about it!

Best,  
Support Team
```

---

### Prompt 8: Reactivation / Win-Back
**Inputs:** 
- Customer: Tom | Product: Subscription Service | Order ID: N/A (lapsed) | Tone: Cold/Indifferent | Response Tone: Friendly and humble

**Output:**
```
Subject: We miss you, Tom — special offer inside

Hi Tom,

I noticed you haven't used your Subscription Service in 3 months, and I wanted to reach out. We'd love to have you back.

Here's what's new since you left:
- New features you requested (automated dashboards, team collaboration)
- 50% faster performance
- Mobile app (finally! 😊)

As a thank you for being a customer, I'd like to offer you **3 months at 50% off** if you decide to come back this week.

No hard feelings if it's not the right time — I'm here if you have any questions.

Best,  
Support Team
```

---

## 5. Success Metrics for Each Prompt

Track these KPIs to measure if your support responses are working:

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **First Response Time** | < 2 hours | Track timestamp of response sent |
| **Customer Satisfaction (CSAT)** | ≥ 90% | Post-interaction survey (1-5 scale) |
| **Resolution Rate** | ≥ 85% | Issues fully resolved on first reply |
| **Repeat Complaints** | < 5% | Same customer, same issue, within 30 days |
| **Customer Retention** | ≥ 80% | Customers active 30+ days after support |
| **Response Length** | 150-200 words | Lean, scannable replies; mobile-friendly |
| **Tone Match** | 95%+ | Response tone matches customer's emotion appropriately |

---

## 6. Pro Tips for Best Results

### Before You Run the Prompt:
- ✅ **Personalize everything** — Use customer's name, order ID, and specific product name (not "item")
- ✅ **Match the tone** — If customer is angry, sound calm and solution-focused. If confused, sound patient and clear
- ✅ **Test first** — Run 2-3 prompts in your AI tool before going live with customers
- ✅ **Keep it under 200 words** — Most people read on mobile; long replies get deleted

### While the AI Generates:
- 📋 **Review the output** — Check that it:
  - Starts with empathy (not just "here's the fix")
  - Has clear, numbered next steps
  - Uses customer's name at least once
  - Offers a solution or next action (not just an explanation)
  
### After You Send It:
- 📊 **Log the response** — Save to a CRM or spreadsheet to track what works
- 👂 **Listen for feedback** — Did customer reply? Did they feel heard?
- 🔄 **Iterate** — Adjust tone/template based on what reduces follow-up emails

### AI Tool Tips:
- **ChatGPT**: Best for longer, warmer responses; good empathy
- **Claude**: Best for technical/complex issues; clearer logic
- **Meta AI**: Good for casual, friendly tone; faster

---

## 7. How to Use This Library

### Step-by-Step Workflow:

1. **Identify the issue type** — Match customer problem to one of the 8 prompts (or pick template + variables)
2. **Fill in all variables** — Replace all `{{ }}` with customer-specific info
3. **Copy the prompt** — Paste into ChatGPT, Claude, or Meta AI
4. **Generate response** — Let AI write the reply
5. **Review** — Read output; adjust tone/length if needed
6. **Send to customer** — Share the final response
7. **Save & log** — Keep a copy in your CRM for team reference

### Template Customization:
If your company has different policies (e.g., refund window, warranty), edit the template section and save as **Prompt Library v1 - [Your Company Name]**.

---

## 8. Getting Started: Quick Checklist

- [ ] **Download this file** as `.md` or paste into Google Docs / Notion
- [ ] **Customize Section 1** — Update company name, policies, tone guidelines
- [ ] **Test all 5 core prompts** — Run in your AI tool; save screenshots
- [ ] **Train your team** — Share library with support staff; do a 15-min walkthrough
- [ ] **Pick 2 scenarios** — Start with Prompt 1 (Late Delivery) and Prompt 3 (Product Issue)
- [ ] **Track results** — Log 20 responses over 2 weeks; measure CSAT
- [ ] **Refine** — Adjust template based on what resonates with your customers

---

## 9. Demo Video Script (2-3 min Loom)

**Outline:**
1. **Intro (15 sec)** — "This is my Prompt Library, a template system for 10x faster support replies"
2. **Show Template (30 sec)** — Display Section 1; highlight key variables
3. **Run Prompt 1 Live (60 sec)** — Fill in variables, paste into ChatGPT, show output
4. **Run Prompt 3 Live (60 sec)** — Different tone (calm/solution-focused); show how output changes
5. **Outro (15 sec)** — "Try it with your own company. Questions?"

**Recording Tips:**
- Use a clean desktop / Canva mockup as background
- Set ChatGPT font to 120% zoom (easier to read on video)
- Narrate as you fill variables — explain *why* you picked each one
- Pause briefly on each output to let viewers absorb

---

## 10. Version History & Roadmap

### Current Version:
- **v1.0** (July 2026) 
  - ✅ 5 core support prompts (late delivery, refund, defective, wrong item, login)
  - ✅ 3 advanced prompts (escalation, upsell, reactivation)
  - ✅ Reusable template structure
  - ✅ Variable reference guide
  - ✅ Success metrics

### Planned for v2:
- 🔄 Add 3 more scenarios (billing issues, feature requests, pre-sales questions)
- 🔄 AI training guide for your support team
- 🔄 Real customer examples (anonymized)
- 🔄 Integration templates for HubSpot, Zendesk, Intercom
- 🔄 Multi-language versions (Spanish, French, German)

### Feedback:
If you find prompts that work really well (or need tweaking), please share:
- Which prompt you used
- What you changed
- How it performed (CSAT, resolution rate)
- Any customer feedback

---

## 11. Final Submission Checklist

Before you submit or share, check:

- [ ] All 8 prompts tested in ChatGPT/Claude/Meta AI
- [ ] Screenshots of 3-5 best outputs saved
- [ ] This markdown file finalized and named "Prompt Library v1 - [Company].md"
- [ ] Loom video recorded (2-3 min, includes Prompt 1 + Prompt 3 live runs)
- [ ] LinkedIn post drafted with video + link to GitHub repo
- [ ] Tag: **@NeuroFive Solutions** (or your company)
- [ ] Share link in team Slack / email

---

## 12. Support & Questions

- **Need help filling variables?** Check Section 2 (Variable Reference)
- **Want to tweak a response?** Use Section 6 (Pro Tips) 
- **Need more scenarios?** Jump to Section 4 (Advanced Prompts) or create your own
- **Track performance?** Use the metrics in Section 5

---

**Happy supporting! 🎉**

*Made with ❤️ for teams that want to scale support without losing the personal touch.*
