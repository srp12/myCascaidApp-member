// Theme management (Dark/Light Mode)

const THEME_KEY = 'myCascaidTheme';

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

function getSavedTheme() {
    return localStorage.getItem(THEME_KEY);
}

function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
}

function getPreferredTheme() {
    const savedTheme = getSavedTheme();
    if (savedTheme) {
        return savedTheme;
    }
    // Fallback to OS preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light'; // Default to light
}

function initializeTheme() {
    const preferredTheme = getPreferredTheme();
    applyTheme(preferredTheme);

    // Listen for OS theme changes if no preference is saved
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (!getSavedTheme()) { // Only react if no theme explicitly saved by user
            const newTheme = event.matches ? 'dark' : 'light';
            applyTheme(newTheme);
        }
    });
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    saveTheme(newTheme);
}

// Export functions or attach listeners if needed outside this module
// For simple cases, just ensuring initializeTheme runs is enough

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();

    // Make the toggle button functional if it exists on the page
    const themeToggleButton = document.getElementById('theme-toggle-button');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }
}); 