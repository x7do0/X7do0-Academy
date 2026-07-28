/**
 * Mobile navigation built from page-relative paths declared on <body>.
 * Required attributes: data-nav-home, data-nav-courses, data-nav-practice,
 * and data-nav-connect.
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
    about: 'nav.about',
    overview: 'nav.overview',
    lessons: 'nav.lessons',
    practice: 'nav.practice',
    project: 'nav.project',
    connect: 'nav.connect',
};

const NavDrawer = {
    init() {
        const body = document.body;
        this.homePath = body.dataset.navHome;
        this.coursesPath = body.dataset.navCourses;
        this.practicePath = body.dataset.navPractice;
        this.overviewPath = body.dataset.navOverview;
        this.lessonsPath = body.dataset.navLessons;
        this.projectPath = body.dataset.navProject;
        this.aboutPath = body.dataset.navAbout;
        this.connectPath = body.dataset.navConnect;
        this.currentPage = body.dataset.page;
        this.isCourseContext = this.currentPage?.startsWith('python');
        this.activeKey = this.getActiveKey();

        if (!this.homePath) return;

        this.buildBottomNav();
        this.buildDrawer();
        this.buildOverlay();
        this.bindEvents();
    },

    getActiveKey() {
        if (this.currentPage === 'home') return 'home';
        if (this.currentPage === 'connect') return 'connect';
        if (this.currentPage === 'about') return 'about';
        if (this.currentPage === 'python-lessons') return 'lessons';
        if (this.currentPage?.startsWith('python-practice')) return 'practice';
        if (this.currentPage?.startsWith('python-project')) return 'project';
        if (this.isCourseContext) return 'courses';
        return 'courses';
    },

    getItems() {
        const globalItems = [
            { key: 'home', path: this.homePath, icon: 'fa-home' },
            { key: 'courses', path: this.coursesPath, icon: 'fa-layer-group' },
            { key: 'connect', path: this.connectPath, icon: 'fa-circle-ellipsis' },
        ];
        const courseItems = [
            { key: 'home', path: this.homePath, icon: 'fa-home' },
            { key: 'courses', path: this.coursesPath, icon: 'fa-layer-group' },
            { key: 'lessons', path: this.lessonsPath, icon: 'fa-book-open' },
            { key: 'practice', path: this.practicePath, icon: 'fa-code' },
            { key: 'project', path: this.projectPath, icon: 'fa-folder' },
        ];

        return (this.isCourseContext ? courseItems : globalItems).filter(item => item.path);
    },

    getDrawerItems() {
        return [
            { key: 'home', path: this.homePath },
            { key: 'courses', path: this.coursesPath },
            { key: 'about', path: this.aboutPath },
            { key: 'connect', path: this.connectPath },
        ].filter(item => item.path);
    },

    buildBottomNav() {
        if (document.getElementById(BOTTOM_NAV_ID)) return;

        const nav = document.createElement('nav');
        nav.id = BOTTOM_NAV_ID;
        nav.className = 'mobile-bottom-nav';
        nav.classList.add(this.isCourseContext ? 'mobile-bottom-nav--course' : 'mobile-bottom-nav--primary');
        nav.setAttribute('aria-label', i18n.t('nav.quick_navigation'));
        nav.dataset.i18nAriaLabel = 'nav.quick_navigation';

        this.getItems().forEach(({ key, path, icon }) => {
            const link = document.createElement('a');
            link.href = path;
            link.className = 'mobile-bottom-link';
            link.dataset.bottomNav = key;

            if (key === this.activeKey) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }

            const iconElement = document.createElement('i');
            iconElement.className = `fas ${icon}`;
            iconElement.setAttribute('aria-hidden', 'true');

            const label = document.createElement('span');
            label.dataset.i18n = i18nKeys[key];
            label.textContent = i18n.t(i18nKeys[key]);

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

        this.getDrawerItems().forEach(({ key, path }) => {
            const link = document.createElement('a');
            link.href = path;
            link.className = 'nav-drawer-link';
            link.dataset.i18n = i18nKeys[key];
            link.dataset.navLink = key;
            link.textContent = i18n.t(i18nKeys[key]);

            if (key === this.activeKey) {
                link.classList.add('nav-link-active');
                link.setAttribute('aria-current', 'page');
            }

            link.addEventListener('click', () => this.close());
            nav.appendChild(link);
        });

        drawer.append(closeBtn, nav);
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

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && this.isOpen) this.close();
        });

        document.addEventListener('click', event => {
            if (
                this.isOpen &&
                !this.drawer.contains(event.target) &&
                event.target !== this.hamburger &&
                !this.hamburger.contains(event.target)
            ) {
                this.close();
            }
        });
    },

    toggle() {
        this.isOpen ? this.close() : this.open();
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

        this._focusHandler = event => {
            if (event.key !== 'Tab') return;
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        this.drawer.addEventListener('keydown', this._focusHandler);
    },
};

document.addEventListener('DOMContentLoaded', async () => {
    await i18n.init();
    NavDrawer.init();
});
