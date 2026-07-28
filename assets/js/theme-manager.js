/**
 * يدير مظهر الألوان، بينما تبقى الواجهة عربية واتجاهها من اليمين إلى اليسار.
 */

(function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
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
        this.highlightActiveNav();
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
        if (!currentPage) return;

        const navKey = document.body.dataset.navSection || currentPage;
        document.querySelectorAll(`[data-nav-link="${navKey}"]`).forEach(link => {
            link.classList.add('nav-link-active');
        });
    }

    setTheme(theme) {
        this.html.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        this.updateIcons();
    }

    updateIcons() {
        const icon = this.themeToggle?.querySelector('i');
        if (!icon) return;
        icon.className = this.html.dataset.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
