const OLD_STORAGE_KEY = 'academy_progress';

function getStorageKey(courseId) {
  return `academy_progress:${courseId}`;
}

function migrateLegacyData(courseId) {
  const oldData = localStorage.getItem(OLD_STORAGE_KEY);
  if (!oldData) return;
  try {
    const parsed = JSON.parse(oldData);
    if (parsed && Array.isArray(parsed.completedQuestions)) {
      localStorage.setItem(getStorageKey(courseId), JSON.stringify({ completedQuestions: parsed.completedQuestions }));
      localStorage.removeItem(OLD_STORAGE_KEY);
    }
  } catch (e) {
    console.warn('[ProgressTracker] Failed to migrate legacy data:', e);
  }
}

function readProgress(courseId) {
  const data = localStorage.getItem(getStorageKey(courseId));
  if (data) {
    try { return JSON.parse(data).completedQuestions || []; } catch (e) { return []; }
  }
  return [];
}

function writeProgress(courseId, completed) {
  localStorage.setItem(getStorageKey(courseId), JSON.stringify({ completedQuestions: completed }));
}

export function createProgressTracker(courseId, questionsData) {
  migrateLegacyData(courseId);

  return {
    courseId,
    questions: questionsData,

    getCompletedQuestions() {
      return readProgress(this.courseId);
    },

    isQuestionCompleted(id) {
      return this.getCompletedQuestions().includes(id);
    },

    markQuestionCompleted(id) {
      const completed = this.getCompletedQuestions();
      if (!completed.includes(id)) {
        completed.push(id);
        writeProgress(this.courseId, completed);
      }
    },

    unmarkQuestionCompleted(id) {
      const completed = this.getCompletedQuestions();
      const index = completed.indexOf(id);
      if (index !== -1) {
        completed.splice(index, 1);
        writeProgress(this.courseId, completed);
      }
    },

    getCompletionPercentage() {
      const completed = this.getCompletedQuestions();
      return Math.round((completed.length / this.questions.length) * 100);
    },

    getCategoryProgress(categoryId) {
      const categoryQuestions = this.questions.filter(q => q.categoryId === categoryId);
      const completedCount = categoryQuestions.filter(q => this.isQuestionCompleted(q.id)).length;
      return {
        completed: completedCount,
        total: categoryQuestions.length,
        percentage: Math.round((completedCount / categoryQuestions.length) * 100)
      };
    },

    getFirstIncompleteQuestion() {
      return this.questions.find(q => !this.isQuestionCompleted(q.id));
    }
  };
}
