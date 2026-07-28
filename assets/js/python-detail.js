import { questions, categories } from '../../data/python-practice-questions.js';
import { createProgressTracker } from './progress-tracker.js';
import i18n from './i18n.js';
import { escapeHtml, formatInlineCode } from './content-format.js';

const tracker = createProgressTracker('python', questions);

const DetailController = {
    state: {
        data: {
            questions: questions,
            categories: categories
        }
    },

    getLang() { return i18n.currentLang || 'ar'; },

    localize(value) {
        if (value && typeof value === 'object') return value.ar || '';
        return value || '';
    },

    getQuestionById(id) {
        return this.state.data.questions.find(q => q.id === id);
    },

    getCategoryById(id) {
        return this.state.data.categories.find(c => c.id === id);
    },

    init() {
        const params = new URLSearchParams(window.location.search);
        const questionId = parseInt(params.get('id'));

        if (isNaN(questionId)) {
            console.warn('[DetailController] No valid question ID provided.');
            this.renderError(i18n.t('python.question.invalid_id'));
            return;
        }

        const q = this.getQuestionById(questionId);
        if (!q) {
            console.error(`[DetailController] Question not found: ${questionId}`);
            this.renderError(i18n.t('python.question.not_found', { id: questionId }));
            return;
        }

        this.currentQuestion = q;
        this.render(q);

    },

    getPrevNext(qId) {
        const currentIndex = this.state.data.questions.findIndex(q => q.id === qId);
        return {
            prev: this.state.data.questions[currentIndex - 1] || null,
            next: this.state.data.questions[currentIndex + 1] || null
        };
    },

    getQuestionsByCategory(categoryId) {
        return this.state.data.questions.filter(q => q.categoryId === categoryId);
    },

    handleComplete() {
        tracker.markQuestionCompleted(this.currentQuestion.id);
        this.render(this.currentQuestion);
    },

    handleIncomplete() {
        tracker.unmarkQuestionCompleted(this.currentQuestion.id);
        this.render(this.currentQuestion);
    },

    renderSidebar(q) {
        const cats = this.state.data.categories;

        document.getElementById('sidebar').innerHTML = `
            <div class="sticky top-24 space-y-4">
                <div class="academic-card p-4 md:hidden">
                    <button type="button" id="mobile-menu-toggle" class="w-full flex items-center justify-between text-academic-primary font-bold">
                        <span>${i18n.t('python.question.menu')}</span>
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
                <div id="sidebar-content" class="hidden md:block">
                    <div class="label mb-4">${i18n.t('python.practice.categories')}</div>
                    <div class="space-y-4">
                        ${cats.map(cat => {
            const catQuestions = this.getQuestionsByCategory(cat.id);
            const isActiveCat = catQuestions.some(item => item.id === q.id);
            const completedCount = catQuestions.filter(item => tracker.isQuestionCompleted(item.id)).length;

            return `
                                <div class="space-y-1">
                                    <button type="button" class="category-disclosure w-full flex items-center justify-between text-sm font-bold text-academic-primary group"
                                            aria-expanded="${isActiveCat}" aria-controls="question-category-${cat.id}">
                                        <span>${this.localize(cat.label)}</span>
                                        <span class="text-[10px] opacity-50">${completedCount}/${catQuestions.length}</span>
                                    </button>
                                    <div id="question-category-${cat.id}" class="${isActiveCat ? '' : 'hidden'} space-y-1 mt-2 ps-4 border-s" style="border-color:var(--border-soft);">
                                        ${catQuestions.map(item => {
                const isCompleted = tracker.isQuestionCompleted(item.id);
                return `
                                                <a href="./question.html?id=${item.id}" 
                                                   class="block text-xs py-1.5 px-2 rounded" style="${item.id === q.id ? 'background:var(--accent-soft);color:var(--accent);font-weight:700;' : 'color:var(--text-secondary);'}">
                                                    <i class="fas ${isCompleted ? 'fa-check-circle text-green-500' : 'fa-circle text-[6px]'} me-2"></i>
                                                    ${escapeHtml(this.localize(item.title))}
                                                </a>
                                            `;}).join('')}
                                    </div>
                                </div>
                            `;}).join('')}
                    </div>
                </div>
            </div>
        `;

        const toggle = document.getElementById('mobile-menu-toggle');
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-controls', 'sidebar-content');
            toggle.addEventListener('click', () => {
                const content = document.getElementById('sidebar-content');
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                content.classList.toggle('hidden', isExpanded);
                toggle.setAttribute('aria-expanded', String(!isExpanded));
            });
        }

        document.querySelectorAll('.category-disclosure').forEach(button => {
            button.addEventListener('click', () => {
                const content = document.getElementById(button.getAttribute('aria-controls'));
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                content?.classList.toggle('hidden', isExpanded);
                button.setAttribute('aria-expanded', String(!isExpanded));
            });
        });
    },

    render(q) {
        const isCompleted = tracker.isQuestionCompleted(q.id);
        const { prev, next } = this.getPrevNext(q.id);
        const category = this.getCategoryById(q.categoryId);

        document.getElementById('question-view').innerHTML = `
      <div id="q-header" class="mb-8">
        <div class="flex items-center gap-3 mb-2">
            <span class="category-tag">${category ? this.localize(category.label) : i18n.t('python.practice.unknown_category')}</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-academic-primary">${escapeHtml(this.localize(q.title))}</h1>
      </div>

      <div id="q-prompt" class="mb-8">
        <div class="academic-card p-6">
            <div class="label mb-3">${i18n.t('python.question.prompt')}</div>
            <div class="text-academic-secondary leading-relaxed text-base">${formatInlineCode(this.localize(q.prompt))}</div>
        </div>
      </div>
      
        <div id="q-reveals" class="space-y-4 mb-8">
        ${q.steps ? `
            <div>
                <button type="button" class="reveal-toggle" aria-expanded="false">
                    <span>${i18n.t('python.question.show_steps')}</span>
                    <i class="fas fa-chevron-down reveal-icon"></i>
                </button>
                <div class="reveal-content">
                    <div class="section-surface">
                        <ul class="space-y-2 text-sm text-academic-primary">
                            ${this.localize(q.steps).map(step => `<li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style="background:var(--accent);"></span>${formatInlineCode(step)}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        ` : ''}
        
        ${q.code ? `
            <div>
                <button type="button" class="reveal-toggle" aria-expanded="false">
                    <span>${i18n.t('python.question.show_solution')}</span>
                    <i class="fas fa-chevron-down reveal-icon"></i>
                </button>
                <div class="reveal-content">
                    <div class="code-surface overflow-hidden">
                        <pre class="p-5 overflow-x-auto text-sm font-mono leading-relaxed"><code>${escapeHtml(q.code)}</code></pre>
                    </div>
                </div>
            </div>
        ` : ''}

        ${q.output ? `
            <div>
                <button type="button" class="reveal-toggle" aria-expanded="false">
                    <span>${i18n.t('python.question.show_output')}</span>
                    <i class="fas fa-chevron-down reveal-icon"></i>
                </button>
                <div class="reveal-content">
                    <div class="code-surface">
                        <pre class="p-4 overflow-x-auto text-sm font-mono"><code>${escapeHtml(q.output)}</code></pre>
                    </div>
                </div>
            </div>
        ` : ''}
      </div>

      <div class="flex items-center justify-between mb-8">
        <div class="text-xs font-mono uppercase tracking-widest font-bold" style="color:var(--text-muted);">
            ${isCompleted ? `<span style="color:var(--success);"><i class="fas fa-check-circle me-1"></i> ${i18n.t('python.question.status_completed')}</span>` : i18n.t('python.question.status_incomplete')}
        </div>
        <button type="button" id="complete-btn" class="px-6 py-2 rounded-lg text-sm font-bold transition-all ${isCompleted ? '' : 'btn-accent'}">
            ${isCompleted ? i18n.t('python.question.mark_incomplete') : i18n.t('python.question.mark_completed')}
        </button>
      </div>

      <div id="q-nav" class="grid grid-cols-2 gap-4 pt-8 border-t" style="border-color:var(--border);">
        <a ${prev ? `href="./question.html?id=${prev.id}"` : 'aria-disabled="true" tabindex="-1"'} class="${!prev ? 'opacity-30' : ''} academic-card p-4 transition-all ${!prev ? '' : 'hover:border-accent'}">
            <span class="text-xs text-academic-muted block mb-1">← ${i18n.t('python.question.previous')}</span>
            <span class="font-bold text-academic-primary">${i18n.t('python.question.label')} ${prev ? prev.id : ''}</span>
        </a>
        <a ${next ? `href="./question.html?id=${next.id}"` : 'aria-disabled="true" tabindex="-1"'} class="${!next ? 'opacity-30' : ''} academic-card p-4 transition-all text-end ${!next ? '' : 'hover:border-accent'}">
            <span class="text-xs text-academic-muted block mb-1">${i18n.t('python.question.next')} →</span>
            <span class="font-bold text-academic-primary">${i18n.t('python.question.label')} ${next ? next.id : ''}</span>
        </a>
      </div>
    `;

        document.getElementById('complete-btn').addEventListener('click', () => isCompleted ? this.handleIncomplete() : this.handleComplete());
        this.setupRevealToggles();
        this.renderSidebar(q);
        if (typeof hljs !== 'undefined') {
            document.querySelectorAll('#q-reveals pre code').forEach(el => hljs.highlightElement(el));
        }
    },

    setupRevealToggles() {
        const container = document.getElementById('q-reveals');
        if (!container) return;
        container.addEventListener('click', (e) => {
            const toggle = e.target.closest('.reveal-toggle');
            if (toggle) {
                const content = toggle.nextElementSibling;
                if (!content) return;
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                toggle.setAttribute('aria-expanded', !isExpanded);
                content.classList.toggle('expanded');
            }
        });
    },

    renderError(msg) {
        document.getElementById('question-view').innerHTML = `
      <div class="academic-card p-8 text-center">
        <h2 class="text-2xl font-bold text-academic-primary mb-2">${i18n.t('python.question.error')}</h2>
        <p class="text-academic-secondary">${msg}</p>
        <a href="./index.html" class="mt-6 inline-block btn-accent px-6 py-2 text-sm" style="text-decoration:none;">${i18n.t('python.question.return_to_questions')}</a>
      </div>
    `;
    }
};

(async () => {
    await i18n.init();
    DetailController.init();
})();
