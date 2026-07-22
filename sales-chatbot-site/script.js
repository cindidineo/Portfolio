// Demo logic for the static Ava chatbot.
const testMessages = [
  "Hi, I need software for my team of 10 people",
  "What gadgets do you sell in the Neurofive Store?",
  "How much does Neurofive Cloud cost per month?",
  "Can you recommend a good recipe for chicken curry?",
  "Okay, can I get a demo of the Neurofive App?"
];

const chatEl = document.getElementById('chat');
const testsList = document.getElementById('testsList');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

function appendMessage(text, who='ava'){
  const div = document.createElement('div');
  div.className = 'msg ' + (who==='user'? 'user':'ava');
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  div.appendChild(bubble);
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
}

// Very small rule-based responder to emulate the persona & rules in the Python file.
function avaRespond(userText){
  const t = userText.toLowerCase();

  // Team software -> recommend Neurofive App
  if(/team|people|users|team of|users/.test(t)){
    return "For a team of 10, I recommend the Neurofive App — team productivity tools, AI-assisted workflows, and centralized collaboration. Key benefits: 1) boosts team productivity, 2) built-in AI workflows, 3) easy admin controls. Would you like a demo or a pricing link?";
  }

  // Store gadgets
  if(/store|gadgets|headphones|watch|laptop|what gadgets/.test(t)){
    return "In the Neurofive Store we sell headphones, smart watches, laptops, and productivity accessories. Benefits: curated tech, warranty support, competitive pricing. Would you like a link to the Store or product recommendations?";
  }

  // Pricing / cost -> don't make up pricing
  if(/how much|cost|price|per month|monthly/.test(t)){
    return "I don\'t want to guess pricing — let me connect you to sales@neurofive.com for exact pricing details. Would you like me to draft an email for you?";
  }

  // Demo request
  if(/demo|show me|can i get a demo|try the app/.test(t)){
    return "Great! I can arrange a demo of the Neurofive App. Next step: I can send a demo link or connect you with sales@neurofive.com — which do you prefer?";
  }

  // Off-topic -> steer back
  if(/recipe|cook|curry|what to cook|chicken/.test(t)){
    return "That sounds fun, but I focus on Neurofive products. If you\'re interested in products that help with cooking (smart kitchen gadgets) I can help — otherwise I can connect you to a general info resource. Would you like links to the Store?";
  }

  // Default fallback (short, enthusiastic)
  return "Thanks for asking! Could you tell me 1-2 things about what you need so I can recommend the best Neurofive product?";
}

// Wire up tests list
testMessages.forEach(msg => {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.textContent = msg;
  btn.onclick = () => {
    sendMessage(msg);
  };
  li.appendChild(btn);
  testsList.appendChild(li);
});

function sendMessage(text){
  appendMessage(text, 'user');
  // simulate typing delay
  setTimeout(()=>{
    const reply = avaRespond(text);
    appendMessage(reply, 'ava');
  }, 600);
}

// form handlers
sendBtn.addEventListener('click', ()=>{
  const t = userInput.value.trim();
  if(!t) return;
  sendMessage(t);
  userInput.value = '';
});

userInput.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter'){
    sendBtn.click();
    e.preventDefault();
  }
});

// initial greeting
appendMessage('Hi! I\'m Ava — friendly Sales Assistant for Neurofive. How can I help you today?');
