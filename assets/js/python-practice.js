import { questions, categories } from '../../data/python-practice-questions.js';
import { createProgressTracker } from './progress-tracker.js';
import i18n from './i18n.js';
import { escapeHtml, formatInlineCode } from './content-format.js';

const tracker = createProgressTracker('python', questions);

const PracticeController = {
  state: {
    data: {
      questions: [],
      categories: []
    },
    ui: {
      selectedQuestionId: null,
      selectedCategoryId: null,
      searchTerm: null
    },
    initialized: false
  },

  getLang() { return i18n.currentLang || 'ar'; },

  localize(value) {
    if (value && typeof value === 'object') return value.ar || '';
    return value || '';
  },

  selectQuestion(questionId, updateUrl = true) {
    const q = this.getQuestionById(questionId);
    if (!q) {
      console.warn(`[PracticeController] Cannot select invalid question: ${questionId}`);
      return;
    }

    this.state.ui.selectedQuestionId = q.id;
    this.renderQuestionDetails(q.id);

    if (updateUrl) {
      this.updateUrlState({ questionId: q.id });
    }
  },

  init() {
    console.log('[PracticeController] Initializing...');

    if (this.validateData(questions, categories)) {
      this.state.data.questions = questions;
      this.state.data.categories = categories;
      this.state.initialized = true;

      this.renderProgress();

      this.syncStateFromUrl();
      window.addEventListener('popstate', () => {
        this.syncStateFromUrl();
        this.applySearch(this.state.ui.searchTerm, false);
        this.renderQuestionDetails(this.state.ui.selectedQuestionId);
        this.renderCategories();
      });

      const searchInput = document.getElementById('practice-search');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          this.applySearch(e.target.value);
        });
        if (this.state.ui.searchTerm) {
          searchInput.value = this.state.ui.searchTerm;
          this.applySearch(this.state.ui.searchTerm, false);
        }
      }
    } else {
      console.error('[PracticeController] Data validation failed.');
    }
  },

  filterQuestions(searchTerm, categoryId) {
    let filtered = this.state.data.questions;

    if (categoryId) {
      filtered = filtered.filter(q => q.categoryId === categoryId);
    }

    if (searchTerm && searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(q => {
        const category = this.getCategoryById(q.categoryId);
        const catName = category ? this.localize(category.label).toLowerCase() : '';
        return this.localize(q.title).toLowerCase().includes(term) ||
          this.localize(q.prompt).toLowerCase().includes(term) ||
          catName.includes(term);
      });
    }

    return filtered;
  },

  applyCategoryFilter(categoryId, updateUrl = true) {
    this.state.ui.selectedCategoryId = categoryId || null;
    if (updateUrl) {
      this.updateUrlState({ categoryId: categoryId || null });
    }
    this.renderQuestionList();
    this.renderCategories();
  },

  renderCategories() {
    let container = document.getElementById('practice-categories-sidebar');
    if (!container) return;

    container.innerHTML = '';
    const allCount = this.state.data.questions.length;
    const allCompletedCount = tracker.getCompletedQuestions().length;
    const allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className = `category-btn w-full text-start px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${!this.state.ui.selectedCategoryId ? 'active' : ''}`;
    allBtn.innerHTML = `${i18n.t('python.practice.all_questions')} <span class="opacity-50 font-mono text-xs">(${allCompletedCount}/${allCount})</span>`;
    allBtn.addEventListener('click', () => this.applyCategoryFilter(null));
    container.appendChild(allBtn);

    this.state.data.categories.forEach(cat => {
      const progress = tracker.getCategoryProgress(cat.id);

      let indicatorClass = 'bg-slate-300';
      if (progress.completed === progress.total) indicatorClass = 'bg-green-500';
      else if (progress.completed > 0) indicatorClass = 'bg-blue-500';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `category-btn w-full text-start px-4 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-between ${this.state.ui.selectedCategoryId === cat.id ? 'active' : ''}`;
      btn.innerHTML = `
        <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full ${indicatorClass}"></span>
            ${this.localize(cat.label)}
        </div>
        <span class="opacity-50 font-mono text-xs">${progress.completed}/${progress.total}</span>
      `;
      btn.addEventListener('click', () => this.applyCategoryFilter(cat.id));
      container.appendChild(btn);
    });
  },

  applySearch(searchTerm, updateUrl = true) {
    this.state.ui.searchTerm = searchTerm;
    if (updateUrl) {
      this.updateUrlState({ searchTerm: searchTerm || null });
    }
    this.renderQuestionList();
    this.renderCategories();
  },

  renderProgress() {
    const mount = document.getElementById('progress-mount-point');
    if (!mount) return;

    const percentage = tracker.getCompletionPercentage();
    const completed = tracker.getCompletedQuestions().length;
    const total = this.state.data.questions.length;
    const q = tracker.getFirstIncompleteQuestion();
    const barWidth = Math.min(percentage, 100);

    let resumeHtml = '';
    if (q) {
      const category = this.getCategoryById(q.categoryId);
      resumeHtml = `
        <div class="flex flex-wrap items-center gap-3 text-xs font-bold text-academic-primary">
            <span class="text-academic-secondary">${i18n.t('python.practice.resume')}:</span>
            <span style="color:var(--accent)">${this.localize(q.title)}</span>
            <span class="opacity-50">(${category ? this.localize(category.label) : ''})</span>
            <a href="./question.html?id=${q.id}" class="btn-accent px-3 py-1.5 text-[11px] inline-flex items-center ms-auto" style="text-decoration:none;">
                ${i18n.t('python.practice.continue_learning')}
            </a>
        </div>
      `;
    } else {
      resumeHtml = `
        <div class="text-xs font-bold flex items-center gap-2" style="color:var(--success);">
            <i class="fas fa-check-circle"></i> ${i18n.t('python.practice.all_completed')}
        </div>
      `;
    }

    mount.innerHTML = `
      <div class="progress-surface flex flex-col sm:flex-row sm:items-center gap-6">
        <div class="min-w-[140px]">
            <div class="flex justify-between items-center mb-2">
                <span class="label-sm">${i18n.t('python.practice.progress')}</span>
                <span class="text-xs font-mono font-bold" style="color:var(--accent);">${percentage}%</span>
            </div>
            <div class="progress-bar-bg" role="progressbar"
                 aria-label="${i18n.t('python.practice.progress')}"
                 aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percentage}">
                <div class="progress-bar-fill" style="width: ${barWidth}%"></div>
            </div>
            <div class="text-[11px] font-bold text-academic-secondary mt-2">${i18n.t('python.practice.completed_count', { completed, total })}</div>
        </div>
        <div class="flex-grow">
            ${resumeHtml}
        </div>
      </div>
    `;
  },

  parseUrlState() {
    const params = new URLSearchParams(window.location.search);
    return {
      questionId: params.get('question'),
      categoryId: params.get('category'),
      searchTerm: params.get('search')
    };
  },

  buildUrlState(state) {
    const params = new URLSearchParams(window.location.search);

    if (state.questionId) params.set('question', state.questionId);
    else params.delete('question');

    if (state.categoryId) params.set('category', state.categoryId);
    else params.delete('category');

    if (state.searchTerm) params.set('search', state.searchTerm);
    else params.delete('search');

    return `?${params.toString()}`;
  },

  updateUrlState(newState, replace = false) {
    const url = this.buildUrlState({ ...this.state.ui, ...newState });
    if (replace) {
      window.history.replaceState(null, '', url);
    } else {
      window.history.pushState(null, '', url);
    }
    this.state.ui = { ...this.state.ui, ...newState };
  },

  restoreUrlState(parsedState) {
    const validatedState = {
      selectedQuestionId: null,
      selectedCategoryId: null,
      searchTerm: parsedState.searchTerm
    };

    if (parsedState.questionId) {
      const q = this.getQuestionById(parseInt(parsedState.questionId));
      if (q) validatedState.selectedQuestionId = q.id;
      else console.warn(`[PracticeController] Invalid question ID: ${parsedState.questionId}`);
    }

    if (parsedState.categoryId) {
      const c = this.getCategoryById(parsedState.categoryId);
      if (c) validatedState.selectedCategoryId = c.id;
      else console.warn(`[PracticeController] Invalid category ID: ${parsedState.categoryId}`);
    }

    this.state.ui = validatedState;
  },

  syncStateFromUrl() {
    const parsed = this.parseUrlState();
    this.restoreUrlState(parsed);
  },

  validateData(q, c) {
    return Array.isArray(q) && Array.isArray(c) && q.length > 0 && c.length > 0;
  },

  getQuestionById(id) {
    return this.state.data.questions.find(q => q.id === id);
  },

  getQuestionsByCategory(categoryId) {
    return this.state.data.questions.filter(q => q.categoryId === categoryId);
  },

  getCategoryById(id) {
    return this.state.data.categories.find(c => c.id === id);
  },

  createQuestionCard(q) {
    const category = this.getCategoryById(q.categoryId);
    const categoryName = category ? this.localize(category.label) : i18n.t('python.practice.unknown_category');

    const card = document.createElement('a');
    const isSelected = this.state.ui.selectedQuestionId === q.id;
    card.className = `practice-question-card p-5 flex flex-col gap-3`;
    card.href = `./question.html?id=${q.id}`;
    if (isSelected) card.style.borderColor = 'var(--accent)';
    card.setAttribute('aria-label', `${i18n.t('python.question.label')}: ${this.localize(q.title)}`);

    const isCompleted = tracker.isQuestionCompleted(q.id);

    card.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
            <span class="question-number">${q.id}</span>
            ${isCompleted ? '<i class="fas fa-check-circle text-green-500 text-sm"></i>' : ''}
        </div>
        <span class="category-tag">${categoryName}</span>
      </div>
      <h3 class="text-base text-academic-primary font-semibold leading-snug">${escapeHtml(this.localize(q.title))}</h3>
    `;
    return card;
  },

  renderQuestionList() {
    const container = document.getElementById('practice-questions-container');
    if (!container) return;

    container.innerHTML = '';

    const filtered = this.filterQuestions(this.state.ui.searchTerm, this.state.ui.selectedCategoryId);

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-20 flex flex-col items-center justify-center text-center" style="opacity:0.5;">
            <i class="fas fa-search text-4xl mb-4" style="color:var(--text-muted);"></i>
            <h3 class="text-xl font-bold text-academic-primary">${i18n.t('python.practice.no_results_title')}</h3>
            <p class="text-academic-secondary mt-2">${i18n.t('python.practice.no_results_desc')}</p>
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();
    filtered.forEach(q => {
      fragment.appendChild(this.createQuestionCard(q));
    });

    container.appendChild(fragment);
  },

  createQuestionDetails(q) {
    const category = this.getCategoryById(q.categoryId);
    const categoryName = category ? this.localize(category.label) : i18n.t('python.practice.unknown_category');

    const container = document.createElement('div');
    container.className = 'academic-card p-8 flex flex-col gap-6';
    container.innerHTML = `
      <div class="flex items-center justify-between pb-4" style="border-bottom:1px solid var(--border-soft);">
        <span class="text-[10px] font-mono text-academic-muted uppercase tracking-wider font-bold">#${q.id}</span>
        <span class="category-tag">${categoryName}</span>
      </div>
      <h2 class="text-3xl font-bold text-academic-primary">${escapeHtml(this.localize(q.title))}</h2>
      <div class="text-academic-secondary leading-relaxed text-base">
        <p>${formatInlineCode(this.localize(q.prompt))}</p>
      </div>
      ${q.steps ? `
        <div class="section-surface">
          <div class="label mb-4">${i18n.t('python.question.steps')}</div>
          <ul class="list-decimal list-inside text-sm text-academic-primary space-y-2">
            ${this.localize(q.steps).map(step => `<li>${formatInlineCode(step)}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      ${q.code ? `
        <div>
          <div class="label mb-4">${i18n.t('python.question.solution')}</div>
          <div class="code-surface overflow-hidden">
              <pre class="p-5 overflow-x-auto text-sm font-mono leading-relaxed"><code>${escapeHtml(q.code)}</code></pre>
          </div>
        </div>
      ` : ''}
      ${q.output ? `
        <div>
          <div class="label mb-4">${i18n.t('python.question.output')}</div>
          <div class="code-surface">
              <pre class="p-4 overflow-x-auto text-sm font-mono"><code>${escapeHtml(q.output)}</code></pre>
          </div>
        </div>
      ` : ''}
    `;
    return container;
  },

  renderQuestionDetails(questionId) {
    const container = document.getElementById('practice-details-container');
    if (!container) return;

    container.innerHTML = '';

    const q = this.getQuestionById(questionId);

    if (!q) {
      container.innerHTML = `
        <div class="academic-card p-8 text-center text-academic-muted">
          <p>${i18n.t('python.practice.select_question')}</p>
        </div>
      `;
      return;
    }

    container.appendChild(this.createQuestionDetails(q));
    if (typeof hljs !== 'undefined') {
      container.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
    }
  }
};

(async () => {
  await i18n.init();
  PracticeController.init();
  PracticeController.renderQuestionList();
  PracticeController.renderCategories();
  if (PracticeController.state.ui.selectedQuestionId) {
    PracticeController.renderQuestionDetails(PracticeController.state.ui.selectedQuestionId);
  }
})();
