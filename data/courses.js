export const courses = [
  {
    id: 'python',
    title: 'أساسيات بايثون',
    description: 'تعلّم بايثون من المتغيرات إلى هياكل البيانات عبر دروس واضحة وتمارين عملية.',
    status: 'active',
    lessonsCount: 12,
    questionsCount: 25,
    path: '/courses/python/'
  }
];

export function getCourse(courseId) {
  return courses.find(course => course.id === courseId) || null;
}

export function getActiveCourses() {
  return courses;
}

export function getNavSection(courseId) {
  return getCourse(courseId) ? 'courses' : null;
}
