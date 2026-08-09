const i18n = {
    resources: {},
    initPromise: null,
    aliases: {
        nav_home: 'nav.home',
        nav_courses: 'nav.courses',
        nav_connect: 'nav.connect',
        preview_title: 'preview.title',
        python_header_sub: 'python.header_sub',
        course_python_header_title: 'python.header_notes_html',
        course_python_notes_header_title: 'python.header_notes_html',
        course_python_practice_header_title: 'python.header_practice_html',
        python_name: 'python.name',
        python_notes_card_title: 'python.notes',
        python_notes_card_desc: 'python.notes_desc',
        python_practice_card_title: 'python.practice_questions',
        python_practice_card_desc: 'python.practice_desc',
        courses_title: 'courses.title',
        courses_desc: 'courses.desc',
        active_badge: 'courses.active_badge',
        lessons_count: 'courses.lessons_count',
        course_python_title: 'courses.python.title',
        course_python_desc: 'courses.python.desc',
        connect_title: 'connect.title',
        connect_desc: 'connect.desc',
        desc_youtube: 'connect.youtube',
        desc_instagram: 'connect.instagram',
        files_resources: 'python.files_resources',
        lesson_code: 'python.lesson_code',
        challenge: 'python.challenge'
    },

    async init() {
        if (this.initPromise) return this.initPromise;

        this.initPromise = (async () => {
            await this.loadResources();
            this.applyArabicSettings();
            this.updateUI();
            return this;
        })();

        return this.initPromise;
    },

    getResourceUrl() {
        return new URL('../i18n/ar.json', import.meta.url);
    },

    async loadResources() {
        try {
            const response = await fetch(this.getResourceUrl());
            if (!response.ok) throw new Error('تعذر تحميل ملف النصوص العربية');
            this.resources = await response.json();
        } catch (error) {
            console.error('تعذر تحميل نصوص الواجهة العربية', error);
            this.resources = {};
        }
    },

    resolveKey(key) {
        return this.aliases[key] || key;
    },

    resolveValue(key) {
        const resolvedKey = this.resolveKey(key);
        return resolvedKey.split('.').reduce((value, part) => value?.[part], this.resources);
    },

    format(value, params = {}) {
        if (typeof value !== 'string') return value;
        return Object.entries(params).reduce(
            (text, [name, replacement]) => text.replaceAll(`{${name}}`, replacement),
            value
        );
    },

    t(key, params = {}) {
        const value = this.resolveValue(key);
        if (value === undefined || value === null) {
            console.warn(`[i18n] Missing Arabic text: ${key}`);
            return 'نص غير متاح';
        }
        return this.format(value, params);
    },

    applyArabicSettings() {
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        document.documentElement.classList.add('font-arabic');
    },

    updateUI() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const translation = this.t(element.dataset.i18n);
            if (element.dataset.i18nHtml === 'true') {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            element.setAttribute('placeholder', this.t(element.dataset.i18nPlaceholder));
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
            element.setAttribute('aria-label', this.t(element.dataset.i18nAriaLabel));
        });

        const pageTitle = this.resolveValue(`page_title.${document.body.dataset.page}`);
        if (typeof pageTitle === 'string') document.title = pageTitle;
    }
};

export default i18n;
