// Login page specific script

// NOTE: Assumes theme.js is loaded BEFORE this script 
// (or move theme initialization logic here if theme.js isn't loaded on login page)

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme based on saved preference or OS
    // This relies on functions defined in theme.js being available globally 
    // or requires theme.js to be loaded first.
    // A more robust solution might involve shared modules if using a build system.
    if (typeof initializeTheme === 'function') {
        initializeTheme();
    } else {
        console.warn('theme.js not loaded or initializeTheme not found. Applying basic OS preference check.');
         // Basic fallback if theme.js isn't loaded/available
         if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
        }
    }
    
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const userTypeToggle = document.getElementById('user-type-toggle');
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        loginMessage.textContent = ''; // Clear previous messages

        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const isThinkTankMember = userTypeToggle.checked;
        const userType = isThinkTankMember ? 'think_tank' : 'member';

        // Basic validation (can be expanded)
        if (!username || !password) {
            loginMessage.textContent = 'Username and password are required.';
            return;
        }

        console.log(`Attempting login as ${userType}:`, { username });
        loginMessage.textContent = 'Attempting login...';
        loginMessage.style.color = 'inherit'; // Reset color

        // --- Placeholder for Authentication Logic ---
        // In a real app, you would send these details to a backend endpoint
        // Example using fetch API (replace with actual endpoint and logic):
        /*
        const endpoint = isThinkTankMember ? '/api/auth/think-tank/login' : '/api/auth/member/login';
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json(); 
        })
        .then(data => {
            console.log('Login successful:', data);
            // Redirect to the main app page upon successful login
            window.location.href = 'index.html'; 
        })
        .catch(error => {
            console.error('Login error:', error);
            loginMessage.textContent = 'Login failed. Please check your credentials.';
            loginMessage.style.color = 'red';
        });
        */

        // --- Mock Success/Failure for Demo --- 
        setTimeout(() => {
            // Simulate success for a specific user, failure otherwise
            if (username === "testuser" && password === "password") {
                 console.log('Mock Login successful');
                 // Redirect to the main app page upon successful login
                 window.location.href = 'index.html';
            } else {
                 console.log('Mock Login failed');
                 loginMessage.textContent = 'Login failed. Please check your credentials.';
                 loginMessage.style.color = 'red';
            }
        }, 1000); // Simulate network delay

    });
});

// Ensure theme.js functions are available (crude check)
if (typeof initializeTheme !== 'function') {
    console.error("Theme functions (like initializeTheme) not found. Ensure theme.js is loaded before login.script.js or include necessary theme logic here.");
    // Define basic theme functions here as a fallback if needed
    function initializeTheme() {
        console.log('Running basic fallback initializeTheme for login page.');
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
           document.body.classList.add('dark-mode');
       }
       window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
           if (event.matches) {
               document.body.classList.add('dark-mode');
           } else {
               document.body.classList.remove('dark-mode');
           }
        });
    }
} 