export const lessons = [
  {
    id: '01',
    title: 'الطباعة والمخرجات',
    items: [
      { type: 'keyword', label: 'الأرقام', code: 'print(100)\nprint(3.14)' },
      { type: 'keyword', label: 'النصوص وعلامات التنصيص', code: 'print("Hello World")\nprint("Ali"[0]) # A' },
      { type: 'keyword', label: 'العمليات الحسابية', code: 'print(5 + 5)\nprint(10 * 2)' },
      { type: 'keyword', label: 'سطر فارغ (\\n)', code: 'print("Line 1")\nprint()\nprint("Line 2")' },
      { type: 'keyword', label: 'المتغيرات', code: 'x = "Data"\nprint(x)' },
      {
        type: 'compound',
        label: 'قيم متعددة',
        code: 'name="Ali"\nprint("Hi " + name)\nprint(f"Hi {name}")\nprint("Hi", name)',
        note: { text: 'يجب أن تكون القيم من النوع نفسه عند استخدام +.', color: 'blue' }
      }
    ],
    files: {
      subject: '../../files/python/lesson-01/subject1.py',
      challenge: '../../files/python/lesson-01/challenge1.py'
    }
  },
  {
    id: '02',
    title: 'أنواع المتغيرات',
    items: [
      { type: 'keyword', label: 'الأعداد (int, float)', code: 'x = 10    # int\ny = 10.5  # float' },
      { type: 'keyword', label: 'النصوص (str)', code: 'name = "Python"' },
      { type: 'keyword', label: 'القيم المنطقية (bool)', code: 'is_ready = True\nis_admin = False' },
      { type: 'keyword', label: 'القوائم [ ] (list)', code: 'items = [1, 2, "a"]\nprint(items[0])' },
      { type: 'keyword', label: 'القواميس { } (dict)', code: 'user = {"id": 1, "name": "Ali"}' },
      { type: 'keyword', label: 'المجموعات المرتبة (tuple)', code: 'point = (10, 20)\n# point[0] = 5  (Error!)' }
    ],
    extraInfo: { text: 'بايثون لغة ديناميكية؛ يُحدَّد النوع تلقائيًا.', icon: 'fas fa-info-circle', color: 'blue' },
    files: {
      subject: '../../files/python/lesson-02/subject2.py',
      challenge: '../../files/python/lesson-02/challenge2.py'
    }
  },
  {
    id: '03',
    title: 'العمليات الحسابية',
    items: [
      { type: 'keyword', label: 'الضرب (*)', code: 'x = 5 * 2\nprint(x)' },
      { type: 'keyword', label: 'الأس (**)', code: 'x = 5 ** 2\nprint(x)' },
      { type: 'keyword', label: 'القسمة (/)', code: 'x = 10 / 3\nprint(x)' },
      { type: 'keyword', label: 'القسمة الصحيحة (//)', code: 'x = 10 // 3\nprint(x)' },
      { type: 'keyword', label: 'الجمع (+)', code: 'x = 10 + 7\nprint(x)' },
      { type: 'keyword', label: 'الطرح (-)', code: 'x = 10 - 4\nprint(x)' },
      { type: 'keyword', label: 'باقي القسمة (%)', code: 'x = 10 % 3\nprint(x)', span: 2 },
      { type: 'keyword', label: 'العمليات المركبة', code: 'x = 5\nx += 3  # x = 8\nx *= 2  # x = 16\nx -= 4  # x = 12\nx /= 2  # x = 6\nx %= 4  # x = 2', span: 2, align: 'center' }
    ],
    files: {
      subject: '../../files/python/lesson-03/subject3.py',
      challenge: '../../files/python/lesson-03/challenge3.py'
    }
  },
  {
    id: '04',
    title: 'مدخلات المستخدم',
    items: [
      { type: 'keyword', label: 'طريقة الإدخال', code: 'name = input("Enter name: ")', style: 'block', padding: 'py-3' },
      { type: 'alert', text: 'تُحفَظ المدخلات دائمًا كنص (String).', color: 'amber', icon: 'fas fa-exclamation-triangle' }
    ],
    files: {
      subject: '../../files/python/lesson-04/subject4.py',
      challenge: '../../files/python/lesson-04/challenge4.py'
    }
  },
  {
    id: '05',
    title: 'تحويل الأنواع',
    items: [
      {
        type: 'group',
        layout: 'flex',
        items: [
          { type: 'pill', label: 'str()', color: 'green' },
          { type: 'pill', label: 'int()', color: 'blue' },
          { type: 'pill', label: 'float()', color: 'purple' }
        ]
      },
      { type: 'keyword', label: 'معرفة النوع type(x)', code: 'x = 5\nprint(type(x))' },
      { type: 'keyword', label: 'طول النص len()', code: 'text = "Hello"\nprint(len(text)) # 5' },
      { type: 'alert', text: 'لا يمكن تحويل نص أبجدي إلى رقم (ValueError).', color: 'red', style: 'simple' }
    ],
    files: {
      subject: '../../files/python/lesson-05/subject5.py',
      challenge: '../../files/python/lesson-05/challenge5.py'
    }
  },
  {
    id: '06',
    title: 'دمج الدوال',
    items: [
      { type: 'text', text: 'دمج الدوال (Function Nesting)', icon: 'bar', color: 'slate' },
      {
        type: 'container',
        items: [
          { type: 'code-link', label: 'age = int(input())', code: 'age = int(input("Enter age: "))\nprint(age + 1)' },
          { type: 'divider' },
          { type: 'code-link', label: 'print(len(str(x)))', code: 'print(len(str(12345)))' }
        ]
      }
    ],
    files: {
      subject: '../../files/python/lesson-06/subject6.py',
      challenge: '../../files/python/lesson-06/challenge6.py'
    }
  },
  {
    id: '07',
    title: 'الجمل الشرطية',
    items: [
      { type: 'code-box', label: 'الشروط الأساسية if / elif / else', code: 'x = 10\nif x > 5:\n    print("Big")\nelif x == 5:\n    print("Equal")\nelse:\n    print("Small")', color: 'green' },
      { type: 'code-box', label: 'الجمل الشرطية المتداخلة', code: 'if x > 0:\n    if x % 2 == 0:\n        print("Positive Even")\n    else:\n        print("Positive Odd")', color: 'purple' },
      { type: 'logic-row', label: 'أو (OR)', code: 'if x > 5 or y > 5:\n    print("One of them is true")', explanation: 'يكفي تحقق أحد الشرطين', color: 'blue' },
      { type: 'logic-row', label: 'و (AND)', code: 'if x > 5 and y > 5:\n    print("Both are true")', explanation: 'يجب تحقق الشرطين', color: 'purple' },
      { type: 'logic-row', label: 'النفي (NOT)', code: 'if not x == 5:\n    print("x is Not 5")\n\nif x != 5:\n    print("x is Not 5")', explanation: 'عكس نتيجة الشرط', color: 'red' }
    ],
    files: {
      subject: '../../files/python/lesson-07/subject7.py',
      challenge: '../../files/python/lesson-07/challenge7.py'
    }
  },
  {
    id: '08',
    title: 'الحلقات التكرارية',
    items: [
      { type: 'code-box', label: 'حلقة for مع range', code: 'for i in range(101):\n    print(i)', note: 'تبدأ من 0 وتنتهي عند 100؛ لأن 101 غير مشمول.', style: 'simple' },
      { type: 'code-box', label: 'تحديد البداية والنهاية', code: 'for i in range(1, 101):\n    print(i)', note: 'تبدأ من 1 وتنتهي عند 100.', style: 'simple' },
      { type: 'code-box', label: 'تحديد خطوة التكرار', code: 'for i in range(1, 101, 2):\n    print(i)', note: 'تبدأ من 1 وتقفز خطوتين في كل دورة.', style: 'simple' },
      { type: 'code-box', label: 'المرور على قائمة عناصر', code: 'items = [10, 20, 30]\nfor x in items:\n    print(x)', note: 'يجب أن تكون القيمة قابلة للتكرار، مثل List أو String.', style: 'simple' },
      { type: 'code-box', label: 'حلقة while المشروطة', code: 'count = 0\nwhile count < 5:\n    print(count)\n    count += 1', color: 'green', style: 'simple' },
      {
        type: 'group',
        layout: 'flex',
        items: [
          { type: 'pill-box', label: 'الإنهاء break', code: 'for i in range(10):\n    if i == 5: break\n    print(i)', color: 'red' },
          { type: 'pill-box', label: 'التخطي continue', code: 'for i in range(10):\n    if i == 5: continue\n    print(i)', color: 'yellow' }
        ]
      }
    ],
    files: {
      subject: '../../files/python/lesson-08/subject8.py',
      challenge: '../../files/python/lesson-08/challenge8.py'
    }
  },
  {
    id: '09',
    title: 'الدوال المخصصة',
    items: [
      { type: 'code-box', label: 'دالة أساسية بلا معاملات', code: 'def say_hi():\n    print("Hello!")\n\nsay_hi()', color: 'green', style: 'left-align' },
      { type: 'code-box', label: 'دالة بمعاملات وقيمة معادة', code: 'def add(a, b):\n    return a + b\n\nresult = add(5, 10)\nprint(result)', color: 'green', style: 'left-align' }
    ],
    files: {
      subject: '../../files/python/lesson-09/subject9.py',
      challenge: '../../files/python/lesson-09/challenge9.py'
    }
  },
  {
    id: '10',
    title: 'المكتبات',
    items: [
      {
        type: 'module-box',
        label: 'مكتبة random',
        color: 'blue',
        content: [
          { code: 'random.randint(a, b)', comment: '# Int' },
          { code: 'random.random()', comment: '# Float' },
          { code: 'random.choice([...])', comment: '# Element' },
          { code: 'random.shuffle(list)', comment: '# Shuffle' },
          { code: 'random.choices(l, k=n)', comment: '# Many' }
        ]
      },
      {
        type: 'module-box',
        label: 'مكتبة string',
        color: 'purple',
        content: [
          { code: 'string.ascii_lowercase' },
          { code: 'string.ascii_uppercase' },
          { code: 'string.digits' },
          { code: 'string.punctuation' }
        ]
      }
    ],
    files: {
      subject: '../../files/python/lesson-10/subject10.py',
      challenge: '../../files/python/lesson-10/challenge10.py'
    }
  },
  {
    id: '11',
    title: 'القوائم والـ Tuple',
    items: [
      { type: 'keyword', label: 'إنشاء قائمة [ ]', code: 'numbers = [5, 2, 9, 1, 7]\nprint(numbers)' },
      { type: 'keyword', label: 'عدد العناصر (len)', code: 'print(len(numbers))' },
      { type: 'keyword', label: 'تقطيع القائمة [ : ]', code: 'print(numbers[0:3])   # 0 to 2\nprint(numbers[:3])    # Start to 2\nprint(numbers[2:])    # 2 to End' },
      { type: 'keyword', label: 'إضافة عنصر (append)', code: 'numbers.append(10)\nprint(numbers)' },
      { type: 'keyword', label: 'موقع عنصر (index)', code: 'print(numbers.index(9))' },
      { type: 'keyword', label: 'إدخال عنصر (insert)', code: 'numbers.insert(1, 100)\nprint(numbers)' },
      { type: 'keyword', label: 'ترتيب القائمة (sort)', code: 'numbers.sort()\nprint(numbers)' },
      { type: 'keyword', label: 'حذف عنصر (remove)', code: 'numbers.remove(5)\nprint(numbers)' },
      { type: 'keyword', label: 'عكس الترتيب (reverse)', code: 'numbers.reverse()\nprint(numbers)' },
      { type: 'keyword', label: 'أصغر وأكبر قيمة (min, max)', code: 'print(min(numbers))\nprint(max(numbers))' },
      { type: 'keyword', label: 'حذف القائمة بالكامل (del)', code: 'del numbers' },
      { type: 'keyword', label: 'إنشاء Tuple ( )', code: 'my_tuple = (10, 20, 30, 40)\nprint(my_tuple[0])\nprint(my_tuple[1:3])' },
      { type: 'alert', text: 'الـ Tuple غير قابلة للتعديل (Immutable)، لذلك لا تعمل معها append أو remove.', color: 'amber', icon: 'fas fa-exclamation-triangle' }
    ],
    files: {
      subject: '../../files/python/lesson-11/subject11.py',
      challenge: '../../files/python/lesson-11/challenge11.py'
    }
  },
  {
    id: '12',
    title: 'القواميس والمجموعات',
    items: [
      { type: 'code-box', label: 'إنشاء Dictionary', code: 'student = {\n    "name": "Ali",\n    "age": 21,\n    "grade": "A"\n}\nprint(student)', color: 'blue' },
      { type: 'keyword', label: 'الوصول بالقيمة المفتاحية', code: 'print(student["name"])' },
      { type: 'keyword', label: 'الوصول الآمن (get)', code: 'print(student.get("age"))' },
      { type: 'keyword', label: 'حذف عنصر (pop)', code: 'student.pop("grade")\nprint(student)' },
      { type: 'keyword', label: 'حذف عنصر (del)', code: 'del student["age"]\nprint(student)' },
      { type: 'code-box', label: 'إنشاء Sets', code: 'a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a)\nprint(b)', color: 'green' },
      { type: 'keyword', label: 'إضافة عنصر (add)', code: 'a.add(10)\nprint(a)' },
      { type: 'keyword', label: 'حذف عنصر (remove)', code: 'a.remove(2)\nprint(a)' },
      { type: 'keyword', label: 'اتحاد المجموعتين (|)', code: 'print(a | b)' },
      { type: 'keyword', label: 'تقاطع المجموعتين (&)', code: 'print(a & b)' },
      { type: 'keyword', label: 'الفرق بين المجموعتين (-)', code: 'print(a - b)' },
      { type: 'alert', text: 'يخزن Dictionary مفاتيح وقيمًا، بينما لا تسمح Set بالعناصر المكررة ولا تضمن ترتيبها.', color: 'blue', icon: 'fas fa-info-circle' }
    ],
    files: {
      subject: '../../files/python/lesson-12/subject12.py',
      challenge: '../../files/python/lesson-12/challenge12.py'
    }
  }
];
