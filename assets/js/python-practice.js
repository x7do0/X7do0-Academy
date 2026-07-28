import { questions, categories } from '../../data/python-practice-questions.js';
import { createProgressTracker } from './progress-tracker.js';
import i18n from './i18n.js';
import { escapeHtml } from './content-format.js';

const tracker = createProgressTracker('python', questions);
const arabicLabel = value => escapeHtml(value || '');

const PracticeController = {
  state: {
    selectedCategoryId: null,
    searchTerm: ''
  },

  init() {
    if (!Array.isArray(questions) || !Array.isArray(categories)) {
      console.error('[PracticeController] بيانات التمارين غير صالحة.');
      return;
    }

    this.restoreUrlState();
    this.bindSearch();
    this.renderProgress();
    this.renderCategories();
    this.renderQuestionList();

    window.addEventListener('popstate', () => {
      this.restoreUrlState();
      this.syncSearchInput();
      this.renderCategories();
      this.renderQuestionList();
    });
  },

  bindSearch() {
    const searchInput = document.getElementById('practice-search');
    if (!searchInput) return;

    this.syncSearchInput();
    searchInput.addEventListener('input', event => {
      this.state.searchTerm = event.target.value;
      this.updateUrlState();
      this.renderQuestionList();
    });
  },

  syncSearchInput() {
    const searchInput = document.getElementById('practice-search');
    if (searchInput) searchInput.value = this.state.searchTerm;
  },

  restoreUrlState() {
    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get('category');
    this.state.selectedCategoryId = categories.some(category => category.id === categoryId)
      ? categoryId
      : null;
    this.state.searchTerm = params.get('search') || '';
  },

  updateUrlState() {
    const params = new URLSearchParams();
    if (this.state.selectedCategoryId) params.set('category', this.state.selectedCategoryId);
    if (this.state.searchTerm.trim()) params.set('search', this.state.searchTerm.trim());
    const query = params.toString();
    window.history.pushState(null, '', query ? `?${query}` : window.location.pathname);
  },

  getCategory(categoryId) {
    return categories.find(category => category.id === categoryId) || null;
  },

  getFilteredQuestions() {
    const term = this.state.searchTerm.trim().toLowerCase();

    return questions.filter(question => {
      if (this.state.selectedCategoryId && question.categoryId !== this.state.selectedCategoryId) {
        return false;
      }
      if (!term) return true;

      const category = this.getCategory(question.categoryId);
      return [question.title, question.prompt, category?.label || '']
        .some(value => value.toLowerCase().includes(term));
    });
  },

  selectCategory(categoryId) {
    this.state.selectedCategoryId = categoryId;
    this.updateUrlState();
    this.renderCategories();
    this.renderQuestionList();
  },

  renderCategories() {
    const container = document.getElementById('practice-categories-sidebar');
    if (!container) return;
    container.innerHTML = '';

    const appendButton = ({ id, labelHtml, completed, total }) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `category-btn w-full text-start px-4 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-between ${this.state.selectedCategoryId === id ? 'active' : ''}`;
      button.innerHTML = `<span>${labelHtml}</span><span class="opacity-50 font-mono text-xs">${completed}/${total}</span>`;
      button.addEventListener('click', () => this.selectCategory(id));
      container.appendChild(button);
    };

    appendButton({
      id: null,
      labelHtml: escapeHtml(i18n.t('python.practice.all_questions')),
      completed: tracker.getCompletedQuestions().length,
      total: questions.length
    });

    categories.forEach(category => {
      const progress = tracker.getCategoryProgress(category.id);
      appendButton({
        id: category.id,
        labelHtml: arabicLabel(category.label),
        completed: progress.completed,
        total: progress.total
      });
    });
  },

  renderProgress() {
    const mount = document.getElementById('progress-mount-point');
    if (!mount) return;

    const percentage = tracker.getCompletionPercentage();
    const completed = tracker.getCompletedQuestions().length;
    const total = questions.length;
    const nextQuestion = tracker.getFirstIncompleteQuestion();
    const nextCategory = nextQuestion ? this.getCategory(nextQuestion.categoryId) : null;

    const nextStep = nextQuestion ? `
      <div class="flex flex-wrap items-center gap-3 text-xs font-bold text-academic-primary">
        <span class="text-academic-secondary">${i18n.t('python.practice.resume')}:</span>
        <span style="color:var(--accent)">${arabicLabel(nextQuestion.title)}</span>
        <span class="opacity-50">${nextCategory ? arabicLabel(nextCategory.label) : ''}</span>
        <a href="./question.html?id=${nextQuestion.id}" class="btn-accent px-3 py-1.5 text-[11px] inline-flex items-center ms-auto">${i18n.t('python.practice.continue_learning')}</a>
      </div>` : `
      <div class="text-xs font-bold flex items-center gap-2" style="color:var(--success);">
        <i class="fas fa-check-circle"></i>${i18n.t('python.practice.all_completed')}
      </div>`;

    mount.innerHTML = `
      <div class="progress-surface flex flex-col sm:flex-row sm:items-center gap-6">
        <div class="min-w-[140px]">
          <div class="flex justify-between items-center mb-2">
            <span class="label-sm">${i18n.t('python.practice.progress')}</span>
            <span class="text-xs font-mono font-bold" style="color:var(--accent);">${percentage}%</span>
          </div>
          <div class="progress-bar-bg" role="progressbar" aria-label="${i18n.t('python.practice.progress')}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percentage}">
            <div class="progress-bar-fill" style="width:${Math.min(percentage, 100)}%"></div>
          </div>
          <div class="text-[11px] font-bold text-academic-secondary mt-2">${i18n.t('python.practice.completed_count', { completed, total })}</div>
        </div>
        <div class="flex-grow">${nextStep}</div>
      </div>`;
  },

  createQuestionCard(question) {
    const category = this.getCategory(question.categoryId);
    const card = document.createElement('a');
    card.className = 'practice-question-card p-5 flex flex-col gap-3';
    card.href = `./question.html?id=${question.id}`;
    card.setAttribute('aria-label', `${i18n.t('python.question.label')}: ${question.title}`);

    card.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="question-number">${question.id}</span>
          ${tracker.isQuestionCompleted(question.id) ? '<i class="fas fa-check-circle text-green-500 text-sm"></i>' : ''}
        </div>
        <span class="category-tag">${category ? arabicLabel(category.label) : i18n.t('python.practice.unknown_category')}</span>
      </div>
      <h3 class="text-base text-academic-primary font-semibold leading-snug">
        <span class="block">${escapeHtml(question.title)}</span>
      </h3>`;

    return card;
  },

  renderQuestionList() {
    const container = document.getElementById('practice-questions-container');
    if (!container) return;
    container.innerHTML = '';

    const filtered = this.getFilteredQuestions();
    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-20 flex flex-col items-center justify-center text-center" style="opacity:0.5;">
          <i class="fas fa-search text-4xl mb-4" style="color:var(--text-muted);"></i>
          <h3 class="text-xl font-bold text-academic-primary">${i18n.t('python.practice.no_results_title')}</h3>
          <p class="text-academic-secondary mt-2">${i18n.t('python.practice.no_results_desc')}</p>
        </div>`;
      return;
    }

    const fragment = document.createDocumentFragment();
    filtered.forEach(question => fragment.appendChild(this.createQuestionCard(question)));
    container.appendChild(fragment);
  }
};

(async () => {
  await i18n.init();
  PracticeController.init();
})();
