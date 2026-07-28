export const pages = [
  {
    output: 'index.html',
    source: 'src/pages/home.html',
    root: './',
    title: 'أكاديمية X7do0',
    description: 'دروس وتمارين برمجية عربية منظّمة.',
    bodyAttributes: `class="antialiased min-h-screen flex flex-col"
    data-page="home"
    data-nav-home="./index.html"
    data-nav-courses="./courses/index.html"
    data-nav-practice="./courses/python/practice/index.html"
    data-nav-connect="./accounts/index.html"`,
    styles: ['assets/css/home.css'],
    script: 'assets/js/home-dashboard.js'
  },
  {
    output: 'accounts/index.html',
    source: 'src/pages/connect.html',
    root: '../',
    title: 'تواصل معي | أكاديمية X7do0',
    description: 'روابط التواصل الخاصة بأكاديمية X7do0.',
    bodyAttributes: `class="antialiased min-h-screen flex flex-col"
    data-page="connect"
    data-nav-home="../index.html"
    data-nav-courses="../courses/index.html"
    data-nav-practice="../courses/python/practice/index.html"
    data-nav-connect="./index.html"`
  },
  {
    output: 'courses/index.html',
    source: 'src/pages/courses.html',
    root: '../',
    title: 'الدورات | أكاديمية X7do0',
    description: 'مسارات البرمجة العربية المتاحة في أكاديمية X7do0.',
    bodyAttributes: `class="antialiased min-h-screen flex flex-col"
    data-page="courses"
    data-nav-home="../index.html"
    data-nav-courses="./index.html"
    data-nav-practice="./python/practice/index.html"
    data-nav-connect="../accounts/index.html"`
  },
  {
    output: 'courses/python/index.html',
    source: 'src/pages/python.html',
    root: '../../',
    title: 'أساسيات بايثون | أكاديمية X7do0',
    description: 'دروس أساسيات بايثون باللغة العربية.',
    bodyAttributes: `class="antialiased pb-20"
    data-page="python"
    data-nav-section="courses"
    data-nav-home="../../index.html"
    data-nav-courses="../index.html"
    data-nav-practice="./practice/index.html"
    data-nav-connect="../../accounts/index.html"`,
    script: 'assets/js/app.js'
  },
  {
    output: 'courses/python/practice/index.html',
    source: 'src/pages/python-practice.html',
    root: '../../../',
    title: 'تمارين بايثون | أكاديمية X7do0',
    description: 'تمارين وتحديات بايثون باللغة العربية.',
    bodyAttributes: `class="antialiased pb-20"
    data-page="python-practice"
    data-nav-section="courses"
    data-nav-home="../../../index.html"
    data-nav-courses="../../index.html"
    data-nav-practice="./index.html"
    data-nav-connect="../../../accounts/index.html"`,
    styles: ['assets/css/python-practice.css'],
    script: 'assets/js/python-practice.js'
  },
  {
    output: 'courses/python/practice/question.html',
    source: 'src/pages/python-question.html',
    root: '../../../',
    title: 'سؤال بايثون | أكاديمية X7do0',
    description: 'سؤال برمجي تفاعلي من تمارين بايثون.',
    bodyAttributes: `class="antialiased pb-20"
    data-page="python-practice-detail"
    data-nav-section="courses"
    data-nav-home="../../../index.html"
    data-nav-courses="../../index.html"
    data-nav-practice="./index.html"
    data-nav-connect="../../../accounts/index.html"`,
    styles: ['assets/css/python-practice.css'],
    highlight: true,
    scripts: ['assets/js/python-detail.js', 'assets/js/python-runner.js']
  }
];
