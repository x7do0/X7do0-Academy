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
    data-nav-lessons="./courses/python/lessons/index.html"
    data-nav-practice="./courses/python/practice/index.html"
    data-nav-project="./courses/python/project/index.html"
    data-nav-about="./about/index.html"
    data-nav-connect="./accounts/index.html"`,
    styles: ['assets/css/home.css'],
    script: 'assets/js/home-dashboard.js'
  },
  {
    output: 'accounts/index.html',
    source: 'src/pages/connect.html',
    root: '../',
    title: 'تواصل معي | أكاديمية X7do0',
    description: 'روابط يوتيوب وإنستغرام وتيليغرام الرسمية الخاصة بأكاديمية X7do0.',
    bodyAttributes: `class="antialiased min-h-screen flex flex-col"
    data-page="connect"
    data-nav-home="../index.html"
    data-nav-courses="../courses/index.html"
    data-nav-lessons="../courses/python/lessons/index.html"
    data-nav-practice="../courses/python/practice/index.html"
    data-nav-project="../courses/python/project/index.html"
    data-nav-about="../about/index.html"
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
    data-nav-lessons="../courses/python/lessons/index.html"
    data-nav-practice="../courses/python/practice/index.html"
    data-nav-project="../courses/python/project/index.html"
    data-nav-about="./index.html"
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
    data-nav-lessons="./python/lessons/index.html"
    data-nav-practice="./python/practice/index.html"
    data-nav-project="./python/project/index.html"
    data-nav-about="../about/index.html"
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
    data-nav-overview="./index.html"
    data-nav-lessons="./lessons/index.html"
    data-nav-practice="./practice/index.html"
    data-nav-project="./project/index.html"
    data-nav-about="../../about/index.html"
    data-nav-connect="../../accounts/index.html"`,
    styles: ['assets/css/course-shell.css', 'assets/css/code-experience.css'],
    script: 'assets/js/app.js',
    highlight: true,
    courseSection: 'overview',
    courseHome: './index.html',
    lessonsHome: './lessons/index.html',
    practiceHome: './practice/index.html',
    projectHome: './project/index.html'
  },
  {
    output: 'courses/python/lessons/index.html',
    source: 'src/pages/python-lessons.html',
    root: '../../../',
    title: 'دروس بايثون | أكاديمية X7do0',
    description: 'شرح تفصيلي لدروس أساسيات بايثون مع أمثلة وملفات الموضوع والتحدي.',
    bodyAttributes: `class="antialiased pb-20"
    data-page="python-lessons"
    data-nav-section="courses"
    data-nav-home="../../../index.html"
    data-nav-courses="../../index.html"
    data-nav-overview="../index.html"
    data-nav-lessons="./index.html"
    data-nav-practice="../practice/index.html"
    data-nav-project="../project/index.html"
    data-nav-about="../../../about/index.html"
    data-nav-connect="../../../accounts/index.html"`,
    styles: ['assets/css/course-shell.css', 'assets/css/code-experience.css'],
    script: 'assets/js/python-lessons.js',
    highlight: true,
    courseSection: 'lessons',
    courseHome: '../index.html',
    lessonsHome: './index.html',
    practiceHome: '../practice/index.html',
    projectHome: '../project/index.html'
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
    data-nav-overview="../index.html"
    data-nav-lessons="../lessons/index.html"
    data-nav-practice="./index.html"
    data-nav-project="../project/index.html"
    data-nav-about="../../../about/index.html"
    data-nav-connect="../../../accounts/index.html"`,
    styles: ['assets/css/course-shell.css', 'assets/css/python-practice.css'],
    scripts: ['assets/js/python-practice.js', 'assets/js/practice-category-drawer.js'],
    courseSection: 'practice',
    courseHome: '../index.html',
    lessonsHome: '../lessons/index.html',
    practiceHome: './index.html',
    projectHome: '../project/index.html'
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
    data-nav-overview="../index.html"
    data-nav-lessons="../lessons/index.html"
    data-nav-practice="./index.html"
    data-nav-project="../project/index.html"
    data-nav-about="../../../about/index.html"
    data-nav-connect="../../../accounts/index.html"`,
    styles: ['assets/css/course-shell.css', 'assets/css/python-practice.css'],
    highlight: true,
    scripts: ['assets/js/python-detail.js', 'assets/js/python-runner.js', 'assets/js/practice-category-drawer.js'],
    courseSection: 'practice',
    courseHome: '../index.html',
    lessonsHome: '../lessons/index.html',
    practiceHome: './index.html',
    projectHome: '../project/index.html'
  },
  {
    output: 'courses/python/project/index.html',
    source: 'src/pages/python-project.html',
    root: '../../../',
    title: 'المشروع الختامي | أكاديمية X7do0',
    description: 'مشروع مدير مهام ختامي لمسار بايثون، معروض على مراحل عملية واضحة.',
    bodyAttributes: `class="antialiased pb-20"
    data-page="python-project"
    data-nav-section="courses"
    data-nav-home="../../../index.html"
    data-nav-courses="../../index.html"
    data-nav-overview="../index.html"
    data-nav-lessons="../lessons/index.html"
    data-nav-practice="../practice/index.html"
    data-nav-project="./index.html"
    data-nav-about="../../../about/index.html"
    data-nav-connect="../../../accounts/index.html"`,
    styles: ['assets/css/course-shell.css', 'assets/css/python-project.css'],
    script: 'assets/js/python-project.js',
    courseSection: 'project',
    courseHome: '../index.html',
    lessonsHome: '../lessons/index.html',
    practiceHome: '../practice/index.html',
    projectHome: './index.html'
  },
  {
    output: 'courses/python/project/stage.html',
    source: 'src/pages/python-project-stage.html',
    root: '../../../',
    title: 'مرحلة المشروع الختامي | أكاديمية X7do0',
    description: 'تفاصيل مرحلة من مراحل مشروع مدير المهام بلغة بايثون.',
    bodyAttributes: `class="antialiased pb-20"
    data-page="python-project-stage"
    data-nav-section="courses"
    data-nav-home="../../../index.html"
    data-nav-courses="../../index.html"
    data-nav-overview="../index.html"
    data-nav-lessons="../lessons/index.html"
    data-nav-practice="../practice/index.html"
    data-nav-project="./index.html"
    data-nav-about="../../../about/index.html"
    data-nav-connect="../../../accounts/index.html"`,
    styles: ['assets/css/course-shell.css', 'assets/css/python-project.css'],
    script: 'assets/js/python-project-stage.js',
    courseSection: 'project',
    courseHome: '../index.html',
    lessonsHome: '../lessons/index.html',
    practiceHome: '../practice/index.html',
    projectHome: './index.html'
  }
];
