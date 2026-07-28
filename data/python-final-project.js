export const finalProject = {
  id: 'task-manager',
  title: 'مدير مهام بسيط بـPython',
  summary: 'مشروع ختامي يجمع القوائم والقواميس والدوال والتحقق من الإدخال وحفظ البيانات داخل ملف JSON.',
  outcomes: [
    'تحويل المتطلبات إلى خطوات برمجية واضحة.',
    'تصميم بيانات قابلة للتوسعة باستخدام القوائم والقواميس.',
    'تقسيم البرنامج إلى دوال صغيرة ذات مسؤوليات محددة.',
    'التحقق من القيم قبل تعديل البيانات.',
    'حفظ المهام واستعادتها من ملف JSON.',
    'جمع الأجزاء داخل بنية نهائية سهلة القراءة والتطوير.'
  ],
  stages: [
    {
      id: 'requirements',
      number: 1,
      title: 'تحديد المتطلبات',
      goal: 'تحويل فكرة مدير المهام إلى وظائف يمكن برمجتها واختبارها.',
      explanation: [
        'المستخدم يحتاج إلى إضافة مهمة وعرض المهام وتغيير حالة المهمة.',
        'كل مهمة تحتوي عنواناً وحالة إنجاز.',
        'تبدأ النسخة الأولى ببيانات داخل الذاكرة قبل إضافة الحفظ في ملف.'
      ],
      expected: 'تظهر قائمة واضحة بالوظائف الأساسية التي سيبنيها البرنامج.',
      hint: 'ابدأ بالأفعال التي ينفذها المستخدم: إضافة، عرض، إكمال، وحفظ.',
      completion: 'يستطيع الطالب شرح الوظائف الأربع الأساسية وحدود النسخة الأولى.',
      code: `requirements = [
    "Add a task",
    "List tasks",
    "Complete a task",
    "Save tasks"
]

for item in requirements:
    print("-", item)`,
      expectedOutput: `- Add a task
- List tasks
- Complete a task
- Save tasks`
    },
    {
      id: 'data',
      number: 2,
      title: 'تصميم البيانات',
      goal: 'تمثيل كل مهمة بقاموس وجمع المهام داخل قائمة.',
      explanation: [
        'القاموس مناسب لتجميع عنوان المهمة وحالتها.',
        'القائمة تحفظ عدة مهام وتحافظ على ترتيب إضافتها.',
        'استخدام مفاتيح ثابتة يجعل التعامل مع البيانات أوضح.'
      ],
      expected: 'قائمة تحتوي مهمتين، ولكل مهمة title وcompleted.',
      hint: 'استخدم قائمة من القواميس، واجعل completed قيمة منطقية.',
      completion: 'يمكن إضافة قاموس جديد وقراءة عنوانه وحالته بدون تغيير بنية البرنامج.',
      code: `tasks = [
    {"title": "Study lists", "completed": True},
    {"title": "Build a task manager", "completed": False}
]

for task in tasks:
    print(task["title"], "-", task["completed"])`,
      expectedOutput: `Study lists - True
Build a task manager - False`
    },
    {
      id: 'functions',
      number: 3,
      title: 'بناء الوظائف',
      goal: 'فصل إضافة المهام وعرضها داخل دوال قابلة لإعادة الاستخدام.',
      explanation: [
        'الدالة add_task تعدّل القائمة وتضيف مهمة جديدة.',
        'الدالة list_tasks مسؤولة عن العرض فقط.',
        'فصل المسؤوليات يقلل التكرار ويسهّل الاختبار.'
      ],
      expected: 'إضافة مهمتين وعرضهما مع رقم وحالة واضحة.',
      hint: 'مرّر قائمة المهام إلى كل دالة بدلاً من الاعتماد على متغير عام.',
      completion: 'تعمل دالتا الإضافة والعرض ويمكن استدعاؤهما أكثر من مرة.',
      code: `def add_task(tasks, title):
    tasks.append({"title": title, "completed": False})

def list_tasks(tasks):
    for index, task in enumerate(tasks, start=1):
        status = "Done" if task["completed"] else "Pending"
        print(index, task["title"], "-", status)

tasks = []
add_task(tasks, "Study functions")
add_task(tasks, "Build the project")
list_tasks(tasks)`,
      expectedOutput: `1 Study functions - Pending
2 Build the project - Pending`
    },
    {
      id: 'validation',
      number: 4,
      title: 'التحقق من الإدخال',
      goal: 'منع العناوين الفارغة والأرقام غير الموجودة من تغيير البيانات.',
      explanation: [
        'يُرفض عنوان المهمة إذا كان فارغاً بعد حذف المسافات.',
        'يُتحقق من رقم المهمة قبل محاولة الوصول إلى القائمة.',
        'تعيد الدالة نتيجة منطقية توضّح نجاح العملية أو فشلها.'
      ],
      expected: 'ترفض القيمة الفارغة، وتقبل المهمة الصحيحة، ثم تغيّر حالتها.',
      hint: 'استخدم strip() للعناوين، وافحص أن الرقم بين 1 وطول القائمة.',
      completion: 'لا يؤدي الإدخال الفارغ أو الرقم الخاطئ إلى خطأ أو تعديل غير مقصود.',
      code: `def add_task(tasks, title):
    title = title.strip()
    if not title:
        return False
    tasks.append({"title": title, "completed": False})
    return True

def complete_task(tasks, number):
    if number < 1 or number > len(tasks):
        return False
    tasks[number - 1]["completed"] = True
    return True

tasks = []
print(add_task(tasks, "   "))
print(add_task(tasks, "Validate input"))
print(complete_task(tasks, 1))
print(tasks[0]["completed"])`,
      expectedOutput: `False
True
True
True`
    },
    {
      id: 'storage',
      number: 5,
      title: 'حفظ البيانات في ملف',
      goal: 'حفظ قائمة المهام بصيغة JSON ثم استعادتها عند تشغيل البرنامج.',
      explanation: [
        'JSON يحافظ على بنية القوائم والقواميس بشكل واضح.',
        'تكتب دالة save_tasks البيانات في الملف.',
        'تعيد دالة load_tasks قائمة فارغة إذا لم يكن الملف موجوداً.'
      ],
      expected: 'تُحفظ مهمتان ثم تُستعادان من الملف وتُطبع عناوينهما.',
      hint: 'استخدم json.dump للحفظ وjson.load للقراءة مع ترميز UTF-8.',
      completion: 'تبقى البيانات متاحة بعد إعادة القراءة من الملف.',
      code: `import json

def save_tasks(tasks, filename):
    with open(filename, "w", encoding="utf-8") as file:
        json.dump(tasks, file, ensure_ascii=False, indent=2)

def load_tasks(filename):
    try:
        with open(filename, "r", encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        return []

tasks = [
    {"title": "Save data", "completed": True},
    {"title": "Load data", "completed": False}
]
save_tasks(tasks, "tasks.json")
loaded_tasks = load_tasks("tasks.json")
for task in loaded_tasks:
    print(task["title"])`,
      expectedOutput: `Save data
Load data`
    },
    {
      id: 'refactor',
      number: 6,
      title: 'تحسين الكود وتجميع المشروع',
      goal: 'تجميع الوظائف داخل فئة صغيرة تمثل مدير المهام النهائي.',
      explanation: [
        'تحتفظ الفئة بقائمة المهام وتدير العمليات المتعلقة بها.',
        'تبقى واجهة الاستخدام منفصلة ويمكن تطويرها لاحقاً.',
        'أسماء الدوال الواضحة تجعل المشروع أسهل للصيانة.'
      ],
      expected: 'إضافة مهمتين وإكمال الأولى ثم عرض الحالة النهائية.',
      hint: 'اجعل tasks خاصية داخل الكائن، واستدعِ العمليات من خلال manager.',
      completion: 'يعمل المنتج الصغير كوحدة مترابطة ويمكن إضافة واجهة تفاعلية له لاحقاً.',
      code: `class TaskManager:
    def __init__(self):
        self.tasks = []

    def add(self, title):
        title = title.strip()
        if title:
            self.tasks.append({"title": title, "completed": False})

    def complete(self, number):
        if 1 <= number <= len(self.tasks):
            self.tasks[number - 1]["completed"] = True

    def show(self):
        for index, task in enumerate(self.tasks, start=1):
            status = "Done" if task["completed"] else "Pending"
            print(index, task["title"], "-", status)

manager = TaskManager()
manager.add("Finish Python course")
manager.add("Share the project")
manager.complete(1)
manager.show()`,
      expectedOutput: `1 Finish Python course - Done
2 Share the project - Pending`
    }
  ]
};
