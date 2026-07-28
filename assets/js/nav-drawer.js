/**
 * Mobile Navigation Drawer
 * Reads nav paths from body data attributes, builds a slide-over drawer.
 * Usage: <body data-nav-home="..." data-nav-courses="..." data-nav-connect="...">
 */

import i18n from './i18n.js';

const DRAWER_ID = 'mobile-nav-drawer';
const OVERLAY_ID = 'nav-overlay';
const HAMBURGER_ID = 'hamburger-btn';
const BOTTOM_NAV_ID = 'mobile-bottom-nav';
const OPEN_CLASS = 'open';
const VISIBLE_CLASS = 'visible';
const DRAWER_OPEN_CLASS = 'drawer-open';

const i18nKeys = {
    home: 'nav.home',
    courses: 'nav.courses',
    connect: 'nav.connect',
};

const NavDrawer = {
    init() {
        const body = document.body;
        this.homePath = body.dataset.navHome;
        this.coursesPath = body.dataset.navCourses;
        this.connectPath = body.dataset.navConnect;
        this.currentPage = body.dataset.page;

        if (!this.homePath) return;

        this.buildBottomNav();
        this.buildDrawer();
        this.buildOverlay();
        this.bindEvents();
    },

    buildBottomNav() {
        if (document.getElementById(BOTTOM_NAV_ID)) return;

        const activeKey = this.currentPage === 'home'
            ? 'home'
            : this.currentPage === 'connect'
                ? 'connect'
                : this.currentPage?.startsWith('python-practice')
                    ? 'practice'
                    : 'courses';

        const items = [
            { key: 'home', path: this.homePath, icon: 'fa-home', labelKey: 'nav.home' },
            { key: 'courses', path: this.coursesPath, icon: 'fa-folder', labelKey: 'nav.courses' },
            { key: 'practice', path: `${this.homePath}#progress`, icon: 'fa-chart-column', labelKey: 'dashboard.progress_title' },
            { key: 'connect', path: this.connectPath, icon: 'fa-circle-ellipsis', labelKey: 'dashboard.more' },
        ];

        const nav = document.createElement('nav');
        nav.id = BOTTOM_NAV_ID;
        nav.className = 'mobile-bottom-nav';
        nav.setAttribute('aria-label', i18n.t('nav.quick_navigation'));
        nav.dataset.i18nAriaLabel = 'nav.quick_navigation';

        items.forEach(({ key, path, icon, labelKey }) => {
            if (!path) return;

            const link = document.createElement('a');
            link.href = path;
            link.className = 'mobile-bottom-link';
            link.dataset.bottomNav = key;
            if (key === activeKey) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }

            const iconElement = document.createElement('i');
            iconElement.className = `fas ${icon}`;
            iconElement.setAttribute('aria-hidden', 'true');

            const label = document.createElement('span');
            label.dataset.i18n = labelKey;
            label.textContent = i18n.t(labelKey);

            link.append(iconElement, label);
            nav.appendChild(link);
        });

        document.body.appendChild(nav);
    },

    buildDrawer() {
        const drawer = document.createElement('div');
        drawer.id = DRAWER_ID;
        drawer.className = 'nav-drawer';
        drawer.setAttribute('role', 'dialog');
        drawer.setAttribute('aria-modal', 'true');
        drawer.setAttribute('aria-hidden', 'true');
        drawer.setAttribute('aria-label', i18n.t('nav.menu_label'));
        drawer.dataset.i18nAriaLabel = 'nav.menu_label';
        drawer.inert = true;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'nav-drawer-close';
        closeBtn.setAttribute('aria-label', i18n.t('nav.close_menu'));
        closeBtn.dataset.i18nAriaLabel = 'nav.close_menu';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';

        const nav = document.createElement('nav');
        nav.className = 'nav-drawer-links';

        const items = [
            { key: 'home', path: this.homePath },
            { key: 'courses', path: this.coursesPath },
            { key: 'connect', path: this.connectPath },
        ];

        items.forEach(({ key, path }) => {
            const link = document.createElement('a');
            link.href = path;
            link.className = 'nav-drawer-link';
            link.dataset.i18n = i18nKeys[key];
            link.dataset.navLink = key;
            link.textContent = i18n.t(i18nKeys[key]);

            const currentSection = document.body.dataset.navSection || this.currentPage;
            if (currentSection === key) {
                link.classList.add('nav-link-active');
            }

            link.addEventListener('click', () => this.close());
            nav.appendChild(link);
        });

        drawer.appendChild(closeBtn);
        drawer.appendChild(nav);
        document.body.appendChild(drawer);

        this.drawer = drawer;
        this.closeBtn = closeBtn;
    },

    buildOverlay() {
        const overlay = document.createElement('div');
        overlay.id = OVERLAY_ID;
        overlay.className = 'nav-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        document.body.appendChild(overlay);
        this.overlay = overlay;
    },

    bindEvents() {
        this.hamburger = document.getElementById(HAMBURGER_ID);
        if (!this.hamburger) return;

        this.hamburger.addEventListener('click', () => this.toggle());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.drawer.contains(e.target) && e.target !== this.hamburger && !this.hamburger.contains(e.target)) {
                this.close();
            }
        });
    },

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    },

    open() {
        this.isOpen = true;
        this.drawer.inert = false;
        this.drawer.classList.add(OPEN_CLASS);
        this.drawer.setAttribute('aria-hidden', 'false');
        this.overlay.classList.add(VISIBLE_CLASS);
        document.body.classList.add(DRAWER_OPEN_CLASS);
        this.hamburger.setAttribute('aria-expanded', 'true');

        this.closeBtn.focus();
        this.focusTrap();
    },

    close() {
        this.isOpen = false;
        this.drawer.classList.remove(OPEN_CLASS);
        this.drawer.setAttribute('aria-hidden', 'true');
        this.drawer.inert = true;
        this.overlay.classList.remove(VISIBLE_CLASS);
        document.body.classList.remove(DRAWER_OPEN_CLASS);
        this.hamburger.setAttribute('aria-expanded', 'false');

        if (this._focusHandler) {
            this.drawer.removeEventListener('keydown', this._focusHandler);
            this._focusHandler = null;
        }
        this.hamburger.focus();
    },

    focusTrap() {
        if (this._focusHandler) {
            this.drawer.removeEventListener('keydown', this._focusHandler);
        }
        const focusable = this.drawer.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        const handler = (e) => {
            if (e.key !== 'Tab') return;
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        this.drawer.addEventListener('keydown', handler);
        this._focusHandler = handler;
    },
};

document.addEventListener('DOMContentLoaded', async () => {
    await i18n.init();
    NavDrawer.init();
    i18n.updateUI();
});
