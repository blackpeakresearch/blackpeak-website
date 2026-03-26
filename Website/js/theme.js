
/**
 * BlackPeak Research - Theme Switcher
 * Handles Light/Dark mode toggling and persistence.
 */

(function() {
    // DOM Elements
    const html = document.documentElement;
    const STORAGE_KEY = 'blackpeak-theme';

    // Icons (SVG paths)
    const SUN_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>';
    
    const MOON_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>';

    // 1. Initial State Determination
    function getPreferredTheme() {
        const storedTheme = localStorage.getItem(STORAGE_KEY);
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    // 2. Apply Theme
    function setTheme(theme) {
        if (theme === 'light') {
            html.setAttribute('data-theme', 'light');
        } else {
            html.removeAttribute('data-theme'); // Default is dark
        }
        localStorage.setItem(STORAGE_KEY, theme);
        updateButtonIcon(theme);
    }

    // 3. Update Button Icon
    function updateButtonIcon(theme) {
        const btn = document.getElementById('theme-toggle-btn');
        if (btn) {
            btn.innerHTML = theme === 'light' ? MOON_ICON : SUN_ICON;
            btn.setAttribute('aria-label', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
        }
    }

    // 4. Create and Insert Toggle Button
    function insertToggleButton() {
        // Find existing nav-links to append to
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;

        // Check if button already exists
        if (document.getElementById('theme-toggle-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'theme-toggle-btn';
        btn.className = 'theme-toggle';
        btn.innerHTML = SUN_ICON; // Placeholder, updated immediately
        
        // Add click listener
        btn.addEventListener('click', toggleTheme);

        navLinks.appendChild(btn);
        
        // Update icon based on current state
        const currentTheme = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        updateButtonIcon(currentTheme);
    }

    // 5. Toggle Handler
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    // Initialize
    const savedTheme = getPreferredTheme();
    setTheme(savedTheme);

    // Wait for DOM to insert button if not ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertToggleButton);
    } else {
        insertToggleButton();
    }

})();
