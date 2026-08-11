export const courses = [
  {
    id: 'python',
    title: 'أساسيات بايثون',
    description: 'تعلّم بايثون من المتغيرات إلى هياكل البيانات عبر دروس واضحة وتمارين عملية.',
    status: 'active',
    lessonsCount: 12,
    questionsCount: 25,
    path: '/courses/python/'
  },
  {
    id: 'cpp',
    title: 'أساسيات C++',
    description: 'أساسيات C++ من بنية البرنامج والإدخال والإخراج إلى المؤشرات والملفات وVector.',
    status: 'draft',
    lessonsCount: 15,
    questionsCount: 15,
    path: '/courses/cpp/'
  }
];

export function getCourse(courseId) { return courses.find(course => course.id === courseId) || null; }
export function getActiveCourses() { return courses; }
export function getNavSection(courseId) { return getCourse(courseId) ? 'courses' : null; }
