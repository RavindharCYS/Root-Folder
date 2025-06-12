// START OF FILE bot/bot.js

function initializeTzurBot() {
    'use strict';
    
    if (document.body.hasAttribute('data-tzurbot-initialized')) return;
    document.body.setAttribute('data-tzurbot-initialized', 'true');

    // DOM Elements
    const petWidget = document.getElementById('pet-dog-widget');
    const petImage = document.getElementById('pet-dog-image');
    const bubble = document.getElementById('pet-dog-bubble');
    const chatWindow = document.getElementById('pet-chat-window');
    const closeBtn = document.getElementById('close-pet-chat');
    const messagesContainer = chatWindow.querySelector('.pet-chat-messages');
    const inputArea = chatWindow.querySelector('.pet-chat-input-area');
    
    // --- Image Sources ---
    const walkingGif = "https://images.squarespace-cdn.com/content/v1/5e565a79a627132356d89ef7/52801fe1-73cd-46d0-843d-23e4cb111d47/Dog-Walk.gif";
    const idleImageSrc = "https://images.squarespace-cdn.com/content/v1/5e565a79a627132356d89ef7/52801fe1-73cd-46d0-843d-23e4cb111d47/Dog-Idle.png";

    const idleImage = new Image();
    idleImage.src = idleImageSrc;
    
    // --- Conversation Tree ---
    const conversation = {
        'start': {
            bot: "Woof! I'm TzurBot, your friendly guide.<br>How can I help you today?",
            options: [
                { text: 'Book Consultation', next: 'bookingInfo', icon: 'fas fa-calendar-check' },
                { text: 'Contact Us', next: 'contactInfo', icon: 'fas fa-envelope-open-text' },
                { text: 'Our Services', next: 'servicesInfo', icon: 'fas fa-cogs' },
                { text: 'Careers', next: 'careersInfo', icon: 'fas fa-briefcase' }
            ]
        },
        'bookingInfo': {
            bot: "It's easy! Just follow these steps:<br>1. Click the 'Book Consultation' button in the header.<br>2. Choose the service you're interested in.<br>3. Select a date and time.<br>4. Fill in your details and confirm!",
            action: 'showMainMenuPrompt'
        },
        'contactInfo': {
            bot: "The best way is to visit our Contact page. You can find our email, phone number, and a form to send us a direct message.",
            action: 'showMainMenuPrompt'
        },
        'servicesInfo': {
            bot: "We offer a range of digital solutions! Including Web Development, Cyber Security, SEO, PPC, and more. See details on our Services page.",
            action: 'showMainMenuPrompt'
        },
        'careersInfo': {
            bot: "We're always looking for talent! Visit our Careers page for current openings or to submit your resume.",
            action: 'showMainMenuPrompt'
        },
        'mainMenuPrompt': {
            bot: "Is there anything else I can help with?",
            options: [
                { text: 'Book Consultation', next: 'bookingInfo', icon: 'fas fa-calendar-check' },
                { text: 'Contact Us', next: 'contactInfo', icon: 'fas fa-envelope-open-text' },
                { text: 'Our Services', next: 'servicesInfo', icon: 'fas fa-cogs' },
                { text: 'Careers', next: 'careersInfo', icon: 'fas fa-briefcase' },
                { text: "No, thanks!", next: 'endGoodbye', icon: 'fas fa-thumbs-up' }
            ]
        },
        'endGoodbye': {
            bot: "You're welcome! Have a paws-itively great day!",
            action: 'closeChat'
        }
    };
    
    // --- Core Chat Functions ---
    const toggleChat = (forceState) => {
        const isActive = chatWindow.classList.toggle('active', forceState);
        petImage.src = isActive ? idleImageSrc : walkingGif;
    };
    
    function addMessage(text, type = 'bot') {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const typingIndicator = messagesContainer.querySelector('.typing-indicator-wrapper');
        if (typingIndicator) typingIndicator.remove();
        
        const msgWrapper = document.createElement('div');
        msgWrapper.className = `pet-chat-message ${type}`;
        
        let messageHtml = `<div class="message-content">${text}<span class="message-timestamp">${time}</span></div>`;
        if (type === 'bot') {
            msgWrapper.innerHTML = `<div class="bot-avatar"><i class="fas fa-robot"></i></div>` + messageHtml;
        } else {
            msgWrapper.innerHTML = messageHtml;
        }

        messagesContainer.appendChild(msgWrapper);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function showTypingIndicator() {
        const typingWrapper = document.createElement('div');
        typingWrapper.className = 'pet-chat-message bot typing-indicator-wrapper';
        typingWrapper.innerHTML = `<div class="bot-avatar"><i class="fas fa-robot"></i></div><div class="message-content"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
        messagesContainer.appendChild(typingWrapper);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function processStep(stepKey) {
        const step = conversation[stepKey];
        if (!step) return;

        showTypingIndicator();
        setTimeout(() => {
            if (step.bot) addMessage(step.bot, 'bot');
            if (step.action) runAction(step.action);
            else if (step.options) displayOptions(step.options);
        }, 1200);
    }

    function displayOptions(options) {
        inputArea.innerHTML = '';
        const grid = document.createElement('div');
        grid.className = 'chat-options-grid';
        
        grid.style.gridTemplateColumns = (options.length <= 3) ? '1fr' : '1fr 1fr';
        
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'chat-option';
            btn.innerHTML = `<div class="option-icon"><i class="${opt.icon}"></i></div><span>${opt.text}</span>`;
            
            btn.onclick = () => {
                addMessage(opt.text, 'user');
                processStep(opt.next);
            };
            grid.appendChild(btn);
        });
        inputArea.appendChild(grid);
    }
    
    function runAction(action) {
        inputArea.innerHTML = ''; 
        switch(action) {
            case 'closeChat':
                setTimeout(() => toggleChat(false), 2000);
                break;
            case 'showMainMenuPrompt':
                setTimeout(() => processStep('mainMenuPrompt'), 1200);
                break;
        }
    }

    // --- Main Initialization & Event Listeners ---
    function init() {
        // --- LOGIC FOR SCROLLING BEHAVIOR ---
        const handleScroll = () => {
            if (window.scrollY > 400) {
                petWidget.classList.add('raised');
            } else {
                petWidget.classList.remove('raised');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Run on load
        
        // ========== START: NEW ROBUST FIX FOR Z-INDEX ==========
        // This function will wait for the scroll-to-top button to appear and then fix it.
        const fixButtonZIndex = () => {
            let attempts = 0;
            const maxAttempts = 20; // Try for 10 seconds (20 * 500ms)
            
            const interval = setInterval(() => {
                const scrollToTopButton = document.getElementById('scrollToTop');
                
                if (scrollToTopButton) {
                    // Button found! Apply the fix and stop checking.
                    scrollToTopButton.style.zIndex = '1011';
                    clearInterval(interval);
                } else {
                    // Button not found yet, try again.
                    attempts++;
                    if (attempts > maxAttempts) {
                        // Stop trying after 10 seconds to avoid performance issues.
                        clearInterval(interval);
                    }
                }
            }, 500); // Check every half second
        };

        fixButtonZIndex(); // Start checking for the button
        // ========== END: NEW ROBUST FIX FOR Z-INDEX ==========

        // --- ALL OTHER ORIGINAL LOGIC ---
        setInterval(() => {
            if (!chatWindow.classList.contains('active')) {
                bubble.classList.add('show');
                setTimeout(() => bubble.classList.remove('show'), 3500);
            }
        }, 5000);

        petWidget.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!chatWindow.classList.contains('active')) {
                toggleChat(true);
                if (messagesContainer.children.length === 0) {
                    processStep('start');
                }
            }
        });
        
        closeBtn.addEventListener('click', () => toggleChat(false));
    }
    
    init();
}

// Make the function globally accessible for the loader script
window.initializeTzurBot = initializeTzurBot;