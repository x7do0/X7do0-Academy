export const courses = [
  {
    id: 'python',
    title: {
      en: 'Python Fundamentals',
      ar: 'أساسيات بايثون'
    },
    description: {
      en: 'Master the language of modern computing. From variables to complex data structures, designed for clarity.',
      ar: 'أتقن لغة الحوسبة الحديثة. من المتغيرات إلى هياكل البيانات المعقدة، مصممة بوضوح.'
    },
    icon: 'fab fa-python',
    color: 'blue',
    status: 'active',
    lessonsCount: 12,
    questionsCount: 25,
    path: '/courses/python/'
  },
  {
    id: 'cpp',
    title: {
      en: 'C++ Systems',
      ar: 'أنظمة C++'
    },
    description: {
      en: 'Deep dive into memory management and high-performance computing.',
      ar: 'تعمق في إدارة الذاكرة والحوسبة عالية الأداء.'
    },
    icon: 'fas fa-microchip',
    color: 'purple',
    status: 'planned',
    lessonsCount: 0,
    questionsCount: 0,
    path: null
  },
  {
    id: 'csharp',
    title: {
      en: 'C# Development',
      ar: 'تطوير C#'
    },
    description: {
      en: 'Build robust applications with the .NET platform.',
      ar: 'ابنِ تطبيقات قوية باستخدام منصة .NET.'
    },
    icon: 'fas fa-code',
    color: 'green',
    status: 'planned',
    lessonsCount: 0,
    questionsCount: 0,
    path: null
  }
];

export function getCourse(courseId) {
  return courses.find(c => c.id === courseId) || null;
}

export function getActiveCourses() {
  return courses.filter(c => c.status === 'active');
}

export function getNavSection(courseId) {
  const course = getCourse(courseId);
  return course ? 'courses' : null;
}
