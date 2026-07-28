const i18n = {
    currentLang: 'ar',
    resources: {},
    cache: {},
    initialized: false,
    initPromise: null,
    aliases: {
        // theme-manager flat keys → JSON dotted keys
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
        // Homepage
        welcome_label: 'home.welcome_label',
        hero_title: 'home.hero_title_html',
        hero_desc: 'home.hero_desc',
        cta_start: 'home.cta_start',
        cta_contact: 'home.cta_contact',
        feat_struct_title: 'home.features.struct_title',
        feat_struct_desc: 'home.features.struct_desc',
        feat_code_title: 'home.features.code_title',
        feat_code_desc: 'home.features.code_desc',
        feat_deep_title: 'home.features.deep_title',
        feat_deep_desc: 'home.features.deep_desc',
        instructor_title: 'home.instructor.title',
        instructor_bio: 'home.instructor.bio',
        instructor_link: 'home.instructor.link',
        // Courses
        courses_title: 'courses.title',
        courses_desc: 'courses.desc',
        back_home: 'courses.back_home',
        course_catalog: 'courses.catalog',
        active_badge: 'courses.active_badge',
        planned_badge: 'courses.planned_badge',
        coming_soon: 'courses.coming_soon',
        lessons_count: 'courses.lessons_count',
        course_python_title: 'courses.python.title',
        course_python_desc: 'courses.python.desc',
        course_cpp_title: 'courses.cpp.title',
        course_cpp_desc: 'courses.cpp.desc',
        course_csharp_title: 'courses.csharp.title',
        course_csharp_desc: 'courses.csharp.desc',
        // Connect
        connect_title: 'connect.title',
        connect_desc: 'connect.desc',
        desc_tg_personal: 'connect.telegram_personal',
        desc_tg_channel: 'connect.telegram_channel',
        desc_youtube: 'connect.youtube',
        desc_instagram: 'connect.instagram',
        // Python page (additional)
        files_resources: 'python.files_resources',
        lesson_code: 'python.lesson_code',
        challenge: 'python.challenge'
    },

    async init() {
        if (this.initPromise) return this.initPromise;

        this.initPromise = (async () => {
            localStorage.removeItem('lang');
            await this.loadResources();
            this.applySettings();
            this.updateUI();
            this.initialized = true;
            return this;
        })();

        return this.initPromise;
    },

    getResourceUrl() {
        return new URL('../i18n/ar.json', import.meta.url);
    },

    async fetchResources() {
        if (this.cache.ar) return this.cache.ar;
        const response = await fetch(this.getResourceUrl());
        if (!response.ok) throw new Error('تعذر تحميل ملف اللغة العربية');
        this.cache.ar = await response.json();
        return this.cache.ar;
    },

    async loadResources() {
        try {
            this.resources = await this.fetchResources();
        } catch (e) {
            console.error('تعذر تحميل نصوص الواجهة العربية', e);
            this.resources = {};
        }
    },

    resolveKey(key) {
        return this.aliases[key] || key;
    },

    resolveValue(source, key) {
        const resolvedKey = this.resolveKey(key);
        if (Object.prototype.hasOwnProperty.call(source, resolvedKey)) {
            return source[resolvedKey];
        }

        return resolvedKey.split('.').reduce((obj, k) => (obj || {})[k], source);
    },

    format(value, params = {}) {
        if (typeof value !== 'string') return value;
        return Object.entries(params).reduce(
            (text, [name, replacement]) => text.replaceAll(`{${name}}`, replacement),
            value
        );
    },

    humanizeMissingKey(key) {
        return 'نص غير متاح';
    },

    t(key, params = {}) {
        const value = this.resolveValue(this.resources, key);

        if (value === undefined || value === null) {
            console.warn(`[i18n] Missing translation: ${key}`);
            return this.humanizeMissingKey(key);
        }

        return this.format(value, params);
    },

    applySettings() {
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        document.documentElement.classList.add('font-arabic');
    },

    updateUI() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            if (!translation) return;

            if (el.dataset.i18nHtml === 'true') {
                el.innerHTML = translation;
            } else {
                el.textContent = translation;
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.setAttribute('placeholder', this.t(el.getAttribute('data-i18n-placeholder')));
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
            el.setAttribute('aria-label', this.t(el.getAttribute('data-i18n-aria-label')));
        });

        // Update document title using lookup table
        const page = document.body.dataset.page;
        const titleKey = `page_title.${page}`;
        const title = this.resolveValue(this.resources, titleKey);
        if (typeof title === 'string' && title) {
            document.title = title;
        }
    }
};

export default i18n;
