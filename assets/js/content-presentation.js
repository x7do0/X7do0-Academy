const coursePresentation = {
  python: {
    icon: 'fab fa-python',
    color: 'blue'
  }
};

const lessonPresentation = {
  '01': { icon: 'fas fa-print', color: 'blue' },
  '02': { icon: 'fas fa-layer-group', color: 'purple' },
  '03': { icon: 'fas fa-calculator', color: 'green', layout: 'grid' },
  '04': { icon: 'fas fa-keyboard', color: 'blue' },
  '05': { icon: 'fas fa-magic', color: 'pink' },
  '06': { icon: 'fas fa-code-branch', color: 'blue' },
  '07': { icon: 'fas fa-random', color: 'blue' },
  '08': { icon: 'fas fa-sync', color: 'yellow' },
  '09': { icon: 'fas fa-cube', color: 'blue' },
  '10': { icon: 'fas fa-boxes', color: 'purple' },
  '11': { icon: 'fas fa-tools', color: 'indigo' },
  '12': { icon: 'fas fa-key', color: 'indigo' }
};

export function getCoursePresentation(courseId) {
  return coursePresentation[courseId] ?? { icon: 'fas fa-book', color: 'blue' };
}

export function getLessonPresentation(lessonId) {
  return lessonPresentation[lessonId] ?? { icon: 'fas fa-book-open', color: 'blue' };
}
