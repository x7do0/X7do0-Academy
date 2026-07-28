/**
 * Theme Manager
 * Handles the color theme while the interface remains Arabic and RTL.
 */

// Immediate Execution to prevent flash
(function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    localStorage.removeItem('lang');

    // Apply immediately to root element
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.documentElement.classList.add('font-arabic');
})();

class ThemeManager {
    constructor() {
        this.html = document.documentElement;
        this.init();
    }

    init() {
        // Highlight Active Nav
        this.highlightActiveNav();

        // Event Listeners
        this.themeToggle = document.getElementById('theme-toggle');

        if (this.themeToggle) {
            this.updateIcons();
            this.themeToggle.addEventListener('click', () => {
                const newTheme = this.html.dataset.theme === 'dark' ? 'light' : 'dark';
                this.setTheme(newTheme);
            });
        }

    }

    highlightActiveNav() {
        const currentPage = document.body.dataset.page;
        if (currentPage) {
            const navKey = document.body.dataset.navSection || currentPage;
            const activeLinks = document.querySelectorAll(`[data-nav-link="${navKey}"]`);
            activeLinks.forEach(link => {
                link.classList.add('nav-link-active');
            });
        }
    }

    setTheme(theme) {
        this.html.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        this.updateIcons();
        const hljsLink = document.getElementById('hljs-theme-link');
        if (hljsLink) {
            hljsLink.href = theme === 'dark'
                ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
                : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
        }
    }

    updateIcons() {
        const theme = this.html.dataset.theme || 'light';

        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
            }
        }

    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
