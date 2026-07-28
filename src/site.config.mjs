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
    output: 'about/index.html',
    source: 'src/pages/about.html',
    root: '../',
    title: 'عن المشروع | أكاديمية X7do0',
    description: 'قصة أكاديمية X7do0 وقراراتها التعليمية والهندسية لتقديم تجربة برمجة عربية عملية.',
    bodyAttributes: `class="antialiased min-h-screen flex flex-col"
    data-page="about"
    data-nav-home="../index.html"
    data-nav-courses="../courses/index.html"
    data-nav-practice="../courses/python/practice/index.html"
    data-nav-connect="../accounts/index.html"`
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
  },
  {
    output: 'courses/python/project/index.html',
    source: 'src/pages/python-project.html',
    root: '../../../',
    title: 'المشروع الختامي | أكاديمية X7do0',
    description: 'مشروع مدير مهام ختامي لمسار Python، مقسم إلى مراحل تعليمية قابلة للتشغيل.',
    bodyAttributes: `class="antialiased pb-20"
    data-page="python-project"
    data-nav-section="courses"
    data-nav-home="../../../index.html"
    data-nav-courses="../../index.html"
    data-nav-practice="../practice/index.html"
    data-nav-connect="../../../accounts/index.html"`,
    styles: ['assets/css/python-project.css'],
    script: 'assets/js/python-project.js'
  },
  {
    output: 'courses/python/project/stage.html',
    source: 'src/pages/python-project-stage.html',
    root: '../../../',
    title: 'مرحلة المشروع الختامي | أكاديمية X7do0',
    description: 'مرحلة تعليمية تفاعلية من مشروع مدير المهام بلغة Python.',
    bodyAttributes: `class="antialiased pb-20"
    data-page="python-project-stage"
    data-nav-section="courses"
    data-nav-home="../../../index.html"
    data-nav-courses="../../index.html"
    data-nav-practice="../practice/index.html"
    data-nav-connect="../../../accounts/index.html"`,
    styles: ['assets/css/python-project.css'],
    script: 'assets/js/python-project-stage.js'
  },
  {
    output: 'courses/python/project/summary.html',
    source: 'src/pages/python-project-summary.html',
    root: '../../../',
    title: 'ملخص المشروع الختامي | أكاديمية X7do0',
    description: 'ملخص ما بناه الطالب وما تعلمه في مشروع Python الختامي.',
    bodyAttributes: `class="antialiased pb-20"
    data-page="python-project-summary"
    data-nav-section="courses"
    data-nav-home="../../../index.html"
    data-nav-courses="../../index.html"
    data-nav-practice="../practice/index.html"
    data-nav-connect="../../../accounts/index.html"`,
    styles: ['assets/css/python-project.css'],
    script: 'assets/js/python-project-summary.js'
  }
];
