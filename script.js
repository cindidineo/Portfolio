const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            updateActiveNav(this.getAttribute('href'));
        }
    });
});

function updateActiveNav(hash) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`a[href="${hash}"]`).classList.add('active');
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    messageInput.value = '';
    sendBtn.disabled = true;
    
    // Show loading state
    showLoading();
    
    // Send to backend
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        removeLoading();
        sendBtn.disabled = false;
        if (data.reply) {
            addMessage(data.reply, 'ava');
        } else if (data.error) {
            addMessage(`⚠️ ${data.error}`, 'ava');
        }
    })
    .catch(error => {
        removeLoading();
        sendBtn.disabled = false;
        console.error('Error:', error);
        addMessage('Sorry, I encountered an error. Please try again.', 'ava');
    });
    
    messageInput.focus();
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    let avatar = sender === 'user' ? '👤' : '🤖';
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">${escapeHtml(text)}</div>
    `;
    
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showLoading() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ava';
    messageDiv.id = 'loading';
    messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="loading">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function removeLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.remove();
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Allow Enter key to send message
messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !sendBtn.disabled) {
        sendMessage();
    }
});

// Focus on input when page loads
messageInput.focus();

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});