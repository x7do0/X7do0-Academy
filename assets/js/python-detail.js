import { questions, categories } from '../../data/python-practice-questions.js';
import { createProgressTracker } from './progress-tracker.js';
import i18n from './i18n.js';
import { escapeHtml, formatInlineCode } from './content-format.js';

const tracker = createProgressTracker('python', questions);
const arabicLabel = value => escapeHtml(value || '');
const siteUrl = 'https://x7do0.github.io/X7do0-Academy';

const setMetaContent = (selector, content) => {
    const element = document.querySelector(selector);
    if (element) element.setAttribute('content', content);
};

const updateQuestionMetadata = question => {
    const title = `${question.title} | أكاديمية X7do0`;
    const description = `${question.prompt} تمرين Python عملي من أكاديمية X7do0.`;
    const canonical = `${siteUrl}/courses/python/practice/question.html?id=${question.id}`;

    document.title = title;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', canonical);
    return { title, description, canonical };
};

const renderCodePanel = ({ code, label, type, language = 'python' }) => `
    <div class="code-panel code-panel--${type}" dir="ltr">
        <div class="code-panel__toolbar">
            <div class="code-panel__traffic-lights" aria-hidden="true">
                <span></span><span></span><span></span>
            </div>
            <span class="code-panel__label" dir="rtl">${escapeHtml(label)}</span>
            <div class="code-panel__actions">
                <span class="code-panel__language" aria-hidden="true">${type === 'source' ? 'PY' : '›_'}</span>
                ${type === 'source' ? `
                    <button type="button" class="code-copy-button" data-copy-code aria-label="نسخ الكود">
                        <i class="far fa-copy" aria-hidden="true"></i>
                        <span>نسخ</span>
                    </button>` : ''}
            </div>
        </div>
        <pre dir="ltr" tabindex="0"><code dir="ltr" class="${language === 'python' ? 'language-python' : 'nohighlight'}">${escapeHtml(code)}</code></pre>
    </div>`;

const DetailController = {
    getQuestion(questionId) {
        return questions.find(question => question.id === questionId) || null;
    },

    getCategory(categoryId) {
        return categories.find(category => category.id === categoryId) || null;
    },

    getQuestionsByCategory(categoryId) {
        return questions.filter(question => question.categoryId === categoryId);
    },

    init() {
        const questionId = Number.parseInt(new URLSearchParams(window.location.search).get('id'), 10);
        if (!Number.isInteger(questionId)) {
            this.renderError(i18n.t('python.question.invalid_id'));
            return;
        }

        const question = this.getQuestion(questionId);
        if (!question) {
            this.renderError(i18n.t('python.question.not_found', { id: questionId }));
            return;
        }

        this.currentQuestion = question;
        updateQuestionMetadata(question);
        this.render(question);
    },

    getPrevNext(questionId) {
        const currentIndex = questions.findIndex(question => question.id === questionId);
        return {
            prev: questions[currentIndex - 1] || null,
            next: questions[currentIndex + 1] || null
        };
    },

    renderSidebar(question) {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        sidebar.innerHTML = `
            <div class="sticky top-24 space-y-4">
                <div class="academic-card p-4 md:hidden">
                    <button type="button" id="mobile-menu-toggle" class="w-full flex items-center justify-between text-academic-primary font-bold" aria-expanded="false" aria-controls="sidebar-content">
                        <span>${i18n.t('python.question.menu')}</span>
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
                <div id="sidebar-content" class="hidden md:block">
                    <div class="label mb-4">${i18n.t('python.practice.categories')}</div>
                    <div class="space-y-4">
                        ${categories.map(category => {
                            const categoryQuestions = this.getQuestionsByCategory(category.id);
                            const isActiveCategory = categoryQuestions.some(item => item.id === question.id);
                            const completedCount = categoryQuestions.filter(item => tracker.isQuestionCompleted(item.id)).length;

                            return `
                                <div class="space-y-1">
                                    <button type="button" class="category-disclosure w-full flex items-center justify-between text-sm font-bold text-academic-primary group" aria-expanded="${isActiveCategory}" aria-controls="question-category-${category.id}">
                                        <span>${arabicLabel(category.label)}</span>
                                        <span class="text-[10px] opacity-50">${completedCount}/${categoryQuestions.length}</span>
                                    </button>
                                    <div id="question-category-${category.id}" class="${isActiveCategory ? '' : 'hidden'} space-y-1 mt-2 ps-4 border-s" style="border-color:var(--border-soft);">
                                        ${categoryQuestions.map(item => {
                                            return `
                                                <a href="./question.html?id=${item.id}" class="block text-xs py-1.5 px-2 rounded" style="${item.id === question.id ? 'background:var(--accent-soft);color:var(--accent);font-weight:700;' : 'color:var(--text-secondary);'}">
                                                    <i class="fas ${tracker.isQuestionCompleted(item.id) ? 'fa-check-circle text-green-500' : 'fa-circle text-[6px]'} me-2"></i>
                                                    <span class="block">${escapeHtml(item.title)}</span>
                                                </a>`;
                                        }).join('')}
                                    </div>
                                </div>`;
                        }).join('')}
                    </div>
                </div>
            </div>`;

        const mobileToggle = document.getElementById('mobile-menu-toggle');
        mobileToggle?.addEventListener('click', () => {
            const content = document.getElementById('sidebar-content');
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            content?.classList.toggle('hidden', isExpanded);
            mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
        });

        document.querySelectorAll('.category-disclosure').forEach(button => {
            button.addEventListener('click', () => {
                const content = document.getElementById(button.getAttribute('aria-controls'));
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                content?.classList.toggle('hidden', isExpanded);
                button.setAttribute('aria-expanded', String(!isExpanded));
            });
        });
    },

    render(question) {
        const container = document.getElementById('question-view');
        if (!container) return;

        const { prev, next } = this.getPrevNext(question.id);
        const category = this.getCategory(question.categoryId);
        const steps = question.steps || [];

        container.innerHTML = `
            <div id="q-header" class="mb-8">
                <div class="flex flex-wrap items-center gap-3 mb-2">
                    <span class="category-tag">${category ? arabicLabel(category.label) : i18n.t('python.practice.unknown_category')}</span>
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-academic-primary">
                    <span class="block">${escapeHtml(question.title)}</span>
                </h1>
            </div>

            <div id="q-prompt" class="mb-8">
                <div class="academic-card p-6 space-y-5">
                    <div>
                        <div class="label mb-3">${i18n.t('python.question.prompt')}</div>
                        <div class="text-academic-secondary leading-relaxed text-base">${formatInlineCode(question.prompt)}</div>
                        ${question.promptEn ? `
                            <div class="question-prompt-english" lang="en" dir="ltr">
                                ${formatInlineCode(question.promptEn)}
                            </div>` : ''}
                    </div>
                </div>
            </div>

            <div id="q-reveals" class="space-y-4 mb-8">
                ${steps.length ? `
                    <div id="q-steps">
                        <button type="button" class="reveal-toggle" aria-expanded="false">
                            <span>${i18n.t('python.question.show_steps')}</span>
                            <i class="fas fa-chevron-down reveal-icon"></i>
                        </button>
                        <div class="reveal-content">
                            <div class="section-surface">
                                <ul class="space-y-2 text-sm text-academic-primary">
                                    ${steps.map(step => `<li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style="background:var(--accent);"></span>${formatInlineCode(step)}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>` : ''}

                ${question.code ? `
                    <div>
                        <button type="button" class="reveal-toggle" aria-expanded="false">
                            <span>${i18n.t('python.question.show_solution')}</span>
                            <i class="fas fa-chevron-down reveal-icon"></i>
                        </button>
                        <div class="reveal-content">
                            ${renderCodePanel({
                                code: question.code,
                                label: 'كود Python',
                                type: 'source'
                            })}
                        </div>
                    </div>` : ''}

            </div>

            <div id="q-nav" class="grid grid-cols-2 gap-4 pt-8 border-t" style="border-color:var(--border);">
                <a ${prev ? `href="./question.html?id=${prev.id}"` : 'aria-disabled="true" tabindex="-1"'} class="${prev ? '' : 'opacity-30'} academic-card p-4 transition-all ${prev ? 'hover:border-accent' : ''}">
                    <span class="text-xs text-academic-muted block mb-1">← ${i18n.t('python.question.previous')}</span>
                    <span class="font-bold text-academic-primary">${i18n.t('python.question.label')} ${prev?.id || ''}</span>
                </a>
                <a ${next ? `href="./question.html?id=${next.id}"` : 'aria-disabled="true" tabindex="-1"'} class="${next ? '' : 'opacity-30'} academic-card p-4 transition-all text-end ${next ? 'hover:border-accent' : ''}">
                    <span class="text-xs text-academic-muted block mb-1">${i18n.t('python.question.next')} →</span>
                    <span class="font-bold text-academic-primary">${i18n.t('python.question.label')} ${next?.id || ''}</span>
                </a>
            </div>`;

        document.getElementById('q-reveals')?.addEventListener('click', async event => {
            const copyButton = event.target.closest('[data-copy-code]');
            if (copyButton) {
                const code = copyButton.closest('.code-panel')?.querySelector('code')?.textContent || '';
                try {
                    let copied = false;
                    if (navigator.clipboard?.writeText) {
                        try {
                            await navigator.clipboard.writeText(code);
                            copied = true;
                        } catch {
                            copied = false;
                        }
                    }
                    if (!copied) {
                        const field = document.createElement('textarea');
                        field.value = code;
                        field.style.position = 'fixed';
                        field.style.opacity = '0';
                        document.body.appendChild(field);
                        field.select();
                        copied = document.execCommand('copy');
                        field.remove();
                    }
                    if (!copied) throw new Error('Copy command failed');
                    copyButton.classList.add('is-copied');
                    copyButton.querySelector('span').textContent = 'تم النسخ';
                    window.setTimeout(() => {
                        copyButton.classList.remove('is-copied');
                        copyButton.querySelector('span').textContent = 'نسخ';
                    }, 1600);
                } catch (error) {
                    console.error('[CopyCode]', error);
                    copyButton.querySelector('span').textContent = 'تعذر النسخ';
                }
                return;
            }

            const toggle = event.target.closest('.reveal-toggle');
            if (!toggle) return;
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!isExpanded));
            toggle.nextElementSibling?.classList.toggle('expanded');
        });

        this.renderSidebar(question);
        document.addEventListener('academy:question-completed', event => {
            if (event.detail?.questionId === question.id) {
                this.renderSidebar(question);
            }
        }, { once: true });
        if (typeof hljs !== 'undefined') {
            document.querySelectorAll('#q-reveals code.language-python').forEach(element => hljs.highlightElement(element));
        }
    },

    renderError(message) {
        const container = document.getElementById('question-view');
        if (!container) return;
        container.innerHTML = `
            <div class="academic-card p-8 text-center">
                <h2 class="text-2xl font-bold text-academic-primary mb-2">${i18n.t('python.question.error')}</h2>
                <p class="text-academic-secondary">${message}</p>
                <a href="./index.html" class="mt-6 inline-block btn-accent px-6 py-2 text-sm">${i18n.t('python.question.return_to_questions')}</a>
            </div>`;
    }
};

(async () => {
    await i18n.init();
    DetailController.init();
})();
