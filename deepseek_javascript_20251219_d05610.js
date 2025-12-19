document.addEventListener('DOMContentLoaded', function() {
    // App State
    const appState = {
        currentScreen: 'auth',
        user: null,
        currentStream: null
    };

    // DOM Elements
    const screens = document.querySelectorAll('.app-screen');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const authLinks = document.querySelectorAll('.auth-link');
    const passwordToggles = document.querySelectorAll('.password-toggle');
    const navItems = document.querySelectorAll('.nav-item');
    const liveCards = document.querySelectorAll('.live-card');
    const streamerCards = document.querySelectorAll('.streamer-card');
    const categoryCards = document.querySelectorAll('.category-card');
    const goLiveBtn = document.getElementById('go-live-btn');
    const backButton = document.getElementById('back-button');
    const streamTitle = document.getElementById('stream-title');
    const streamerName = document.getElementById('streamer-name');

    // Switch between auth tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${tabId}-form`) {
                    form.classList.add('active');
                }
            });
        });
    });

    // Auth link switching
    authLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            document.querySelector(`.auth-tab[data-tab="${tabId}"]`).classList.add('active');
            
            // Show corresponding form
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${tabId}-form`) {
                    form.classList.add('active');
                }
            });
        });
    });

    // Password toggle functionality
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const inputId = this.id.replace('-toggle', '');
            const passwordInput = document.getElementById(inputId);
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Form submission
    const signInForm = document.getElementById('signin-form');
    const signUpForm = document.getElementById('signup-form');
    
    signInForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Simulate authentication
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        
        if (email && password) {
            appState.user = { username: email.split('@')[0] };
            switchScreen('home');
        } else {
            alert('Please enter both email and password');
        }
    });
    
    signUpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Simulate registration
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        
        if (username && email && password) {
            appState.user = { username };
            switchScreen('home');
        } else {
            alert('Please fill all fields');
        }
    });

    // Navigation functionality
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const screenId = this.getAttribute('data-screen');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Switch to the corresponding screen
            if (screenId === 'home') {
                switchScreen('home');
            } else if (screenId === 'profile' && !appState.user) {
                switchScreen('auth');
            } else {
                // For other screens, show a placeholder message
                alert(`${screenId.charAt(0).toUpperCase() + screenId.slice(1)} screen would be implemented here!`);
            }
        });
    });

    // Live card click - open stream
    liveCards.forEach(card => {
        card.addEventListener('click', function() {
            const streamer = this.getAttribute('data-stream');
            openStream(streamer);
        });
    });

    // Streamer card click - open stream
    streamerCards.forEach(card => {
        card.addEventListener('click', function() {
            const streamer = this.getAttribute('data-stream');
            openStream(streamer);
        });
    });

    // Category card click
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            alert(`Would show ${category} category streams!`);
        });
    });

    // Go Live button
    goLiveBtn.addEventListener('click', function() {
        if (appState.user) {
            alert('Starting your live stream...');
            // In a real app, this would open the streaming setup
        } else {
            switchScreen('auth');
        }
    });

    // Back button from stream screen
    backButton.addEventListener('click', function() {
        switchScreen('home');
    });

   