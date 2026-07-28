export const lessons = [
    {
        id: "01",
        title: "Print & Output",
        titleAr: "الطباعة والمخرجات",
        icon: "fas fa-print",
        color: "blue",
        items: [
            { type: "keyword", label: "Numbers", labelAr: "الأرقام", code: "print(100)\nprint(3.14)" },
            { type: "keyword", label: "String", labelAr: "النصوص (تنصيص)", code: 'print("Hello World")\nprint("Ali"[0]) # A' },
            { type: "keyword", label: "Operator", labelAr: "العمليات الحسابية", code: "print(5 + 5)\nprint(10 * 2)" },
            { type: "keyword", label: "Empty (\n)", labelAr: "سطر فارغ (\n)", code: 'print("Line 1")\nprint()\nprint("Line 2")' },
            { type: "keyword", label: "Variable", labelAr: "المتغيرات", code: 'x = "Data"\nprint(x)' },
            {
                type: "compound",
                label: "Multiple Values",
                labelAr: "قيم متعددة",
                code: 'name="Ali"\nprint("Hi " + name)\nprint(f"Hi {name}")\nprint("Hi", name)',
                note: { text: "يجب أن تكون القيم من نفس النوع عند استخدام +", color: "blue" }
            }
        ],
        files: {
            subject: "../../files/python/lesson-01/subject1.py",
            challenge: "../../files/python/lesson-01/challenge1.py"
        }
    },
    {
        id: "02",
        title: "Variable Types",
        titleAr: "أنواع المتغيرات",
        icon: "fas fa-layer-group",
        color: "purple",
        items: [
            { type: "keyword", label: "Numbers (int, float)", labelAr: "الأعداد (int, float)", code: 'x = 10    # int\ny = 10.5  # float' },
            { type: "keyword", label: "String", labelAr: "النصوص (str)", code: 'name = "Python"' },
            { type: "keyword", label: "Bool (True, False)", labelAr: "القيم المنطقية (bool)", code: 'is_ready = True\nis_admin = False' },
            { type: "keyword", label: "List [ ]", labelAr: "القوائم [ ] (list)", code: 'items = [1, 2, "a"]\nprint(items[0])' },
            { type: "keyword", label: "Dictionary { }", labelAr: "القواميس { } (dict)", code: 'user = {"id": 1, "name": "Ali"}' },
            { type: "keyword", label: "Tuple ( )", labelAr: "المجموعات المرتبة ( ) (tuple)", code: 'point = (10, 20)\n# point[0] = 5  (Error!)' }
        ],
        extraInfo: { text: "بايثون لغة ديناميكية؛ يتم تحديد النوع تلقائياً.", icon: "fas fa-info-circle", color: "blue" },
        files: {
            subject: "../../files/python/lesson-02/subject2.py",
            challenge: "../../files/python/lesson-02/challenge2.py"
        }
    },
    {
        id: "03",
        title: "Operators",
        titleAr: "العمليات الحسابية",
        icon: "fas fa-calculator",
        color: "green",
        layout: "grid",
        items: [
            { type: "keyword", label: "Multiplication (*)", labelAr: "الضرب (*)", code: 'x = 5 * 2\nprint(x)' },
            { type: "keyword", label: "Exponentiation (**)", labelAr: "الأس (**)", code: 'x = 5 ** 2\nprint(x)' },
            { type: "keyword", label: "Division (/)", labelAr: "القسمة (/)", code: 'x = 10 / 3\nprint(x)' },
            { type: "keyword", label: "Floor Div (//)", labelAr: "القسمة الصحيحة (//)", code: 'x = 10 // 3\nprint(x)' },
            { type: "keyword", label: "Addition (+)", labelAr: "الجمع (+)", code: 'x = 10 + 7\nprint(x)' },
            { type: "keyword", label: "Subtraction (-)", labelAr: "الطرح (-)", code: 'x = 10 - 4\nprint(x)' },
            { type: "keyword", label: "Modulus (%)", labelAr: "باقي القسمة (%)", code: 'x = 10 % 3\nprint(x)', span: 2 },
            { type: "keyword", label: "Compound Ops (+=, -=, *=, /=, %=)", labelAr: "العمليات المركبة", code: 'x = 5\nx += 3  # x = 8\nx *= 2  # x = 16\nx -= 4  # x = 12\nx /= 2  # x = 6\nx %= 4  # x = 2', span: 2, align: "center" }
        ],
        files: {
            subject: "../../files/python/lesson-03/subject3.py",
            challenge: "../../files/python/lesson-03/challenge3.py"
        }
    },
    {
        id: "04",
        title: "User Input",
        titleAr: "مدخلات المستخدم",
        icon: "fas fa-keyboard",
        color: "blue",
        items: [
            { type: "keyword", label: "Input Method", labelAr: "طريقة الإدخال", code: 'name = input("Enter name: ")', style: "block", padding: "py-3" },
            { type: "alert", text: "* يتم دائماً حفظ المدخلات كنص (String).", color: "amber", icon: "fas fa-exclamation-triangle" }
        ],
        files: {
            subject: "../../files/python/lesson-04/subject4.py",
            challenge: "../../files/python/lesson-04/challenge4.py"
        }
    },
    {
        id: "05",
        title: "Type Casting",
        titleAr: "تحويل الأنواع",
        icon: "fas fa-magic",
        color: "pink",
        items: [
            {
                type: "group",
                layout: "flex",
                items: [
                    { type: "pill", label: "str()", labelAr: "str()", color: "green" },
                    { type: "pill", label: "int()", labelAr: "int()", color: "blue" },
                    { type: "pill", label: "float()", labelAr: "float()", color: "purple" }
                ]
            },
            { type: "keyword", label: "type(x)", labelAr: "معرفة النوع type(x)", code: 'x = 5\nprint(type(x))' },
            { type: "keyword", label: "len()", labelAr: "طول النص len()", code: 'text = "Hello"\nprint(len(text)) # 5' },
            { type: "alert", text: "* لا يمكن تحويل نص أبجدي إلى رقم (ValueError).", color: "red", style: "simple" }
        ],
        files: {
            subject: "../../files/python/lesson-05/subject5.py",
            challenge: "../../files/python/lesson-05/challenge5.py"
        }
    },
    {
        id: "06",
        title: "Function Nesting",
        titleAr: "دمج الدوال",
        icon: "fas fa-code-branch",
        color: "blue",
        items: [
            { type: "text", text: "دمج الدوال (Function Nesting)", icon: "bar", color: "slate" },
            {
                type: "container",
                items: [
                    { type: "code-link", label: "age = int(input())", labelAr: "age = int(input())", code: 'age = int(input("Enter age: "))\nprint(age + 1)' },
                    { type: "divider" },
                    { type: "code-link", label: "print(len(str(x)))", labelAr: "print(len(str(x)))", code: 'print(len(str(12345)))' }
                ]
            }
        ],
        files: {
            subject: "../../files/python/lesson-06/subject6.py",
            challenge: "../../files/python/lesson-06/challenge6.py"
        }
    },
    {
        id: "07",
        title: "Conditionals",
        titleAr: "الجمل الشرطية",
        icon: "fas fa-random",
        color: "blue",
        items: [
            { type: "code-box", label: "Standard If/Elif/Else", labelAr: "شروط إف الشرطية الأساسية", code: 'x = 10\nif x > 5:\n    print("Big")\nelif x == 5:\n    print("Equal")\nelse:\n    print("Small")', color: "green" },
            { type: "code-box", label: "Nested If", labelAr: "الجمل الشرطية المتداخلة", code: 'if x > 0:\n    if x % 2 == 0:\n        print("Positive Even")\n    else:\n        print("Positive Odd")', color: "purple" },
            { type: "logic-row", label: "OR", labelAr: "أو (OR)", code: 'if x > 5 or y > 5:\n    print("One of them is true")', arText: "أو (إحداهما صحيح)", color: "blue" },
            { type: "logic-row", label: "AND", labelAr: "و (AND)", code: 'if x > 5 and y > 5:\n    print("Both are true")', arText: "و (كلاهما صحيح)", color: "purple" },
            { type: "logic-row", label: "NOT (!=)", labelAr: "نفي / ليس (NOT)", code: 'if not x == 5:\n    print("x is Not 5")\n\nif x != 5:\n    print("x is Not 5")', arText: "نفي / ليس", color: "red" }
        ],
        files: {
            subject: "../../files/python/lesson-07/subject7.py",
            challenge: "../../files/python/lesson-07/challenge7.py"
        }
    },
    {
        id: "08",
        title: "Loops",
        titleAr: "الحلقات التكرارية",
        icon: "fas fa-sync",
        color: "yellow",
        items: [
            { type: "code-box", label: "For Range (100)", labelAr: "حلقة For التكرارية مع range", code: 'for i in range(101):\n    print(i)', note: "بداية: 0، نهاية: 100 (101 غير شامل)", style: "simple" },
            { type: "code-box", label: "For Range (1 to 100)", labelAr: "تحديد البداية والنهاية", code: 'for i in range(1, 101):\n    print(i)', note: "بداية: 1، نهاية: 100 (101 غير شامل)", style: "simple" },
            { type: "code-box", label: "For Range with Step", labelAr: "تحديد حلقة تكرار بخطوة محددة", code: 'for i in range(1, 101, 2):\n    print(i)', note: "بداية: 1، نهاية: 100، مع تحديد خطوة (101 غير شامل)", style: "simple" },
            { type: "code-box", label: "For Iterable", labelAr: "حلقة For للمرور على قائمة عناصر", code: 'items = [10, 20, 30]\nfor x in items:\n    print(x)', note: "يجب أن يكون المتغير Iterable (مثل List أو String).", style: "simple" },
            { type: "code-box", label: "While Loop", labelAr: "حلقة التكرار المشروطة While", code: 'count = 0\nwhile count < 5:\n    print(count)\n    count += 1', color: "green", style: "simple" },
            {
                type: "group", layout: "flex", items: [
                    { type: "pill-box", label: "break", labelAr: "الإنهاء break", code: 'for i in range(10):\n    if i == 5: break\n    print(i)', color: "red" },
                    { type: "pill-box", label: "continue", labelAr: "التخطي continue", code: 'for i in range(10):\n    if i == 5: continue\n    print(i)', color: "yellow" }
                ]
            }
        ],
        files: {
            subject: "../../files/python/lesson-08/subject8.py",
            challenge: "../../files/python/lesson-08/challenge8.py"
        }
    },
    {
        id: "09",
        title: "Function",
        titleAr: "الدوال المخصصة",
        icon: "fas fa-cube",
        color: "blue",
        items: [
            { type: "code-box", label: "Basic: def NAME():", labelAr: "دالة أساسية بدون معاملات", code: 'def say_hi():\n    print("Hello!")\n\nsay_hi()', color: "green", style: "left-align" },
            { type: "code-box", label: "With Return & Params", labelAr: "دالة مع معاملات وإرجاع قيم", code: 'def add(a, b):\n    return a + b\n\nresult = add(5, 10)\nprint(result)', color: "green", style: "left-align" }
        ],
        files: {
            subject: "../../files/python/lesson-09/subject9.py",
            challenge: "../../files/python/lesson-09/challenge9.py"
        }
    },
    {
        id: "10",
        title: "Libraries",
        titleAr: "المكتبات",
        icon: "fas fa-boxes",
        color: "purple",
        items: [
            {
                type: "module-box",
                title: "import random",
                labelAr: "مكتبة عشوائي random",
                color: "blue",
                content: [
                    { code: "random.randint(a, b)", comment: "# Int" },
                    { code: "random.random()", comment: "# Float" },
                    { code: "random.choice([...])", comment: "# Element" },
                    { code: "random.shuffle(list)", comment: "# Shuffle" },
                    { code: "random.choices(l, k=n)", comment: "# Many" }
                ]
            },
            {
                type: "module-box",
                title: "import string",
                labelAr: "مكتبة النصوص string",
                color: "purple",
                content: [
                    { code: "string.ascii_lowercase" },
                    { code: "string.ascii_uppercase" },
                    { code: "string.digits" },
                    { code: "string.punctuation" }
                ]
            }
        ],
        files: {
            subject: "../../files/python/lesson-10/subject10.py",
            challenge: "../../files/python/lesson-10/challenge10.py"
        }
    },
    {
        id: "11",
        title: "List & Tuple",
        titleAr: "القوائم والـ Tuple",
        icon: "fas fa-tools",
        color: "indigo",
        items: [
            { type: "keyword", label: "Create List [ ]", labelAr: "إنشاء قائمة [ ]", code: 'numbers = [5, 2, 9, 1, 7]\nprint(numbers)' },
            { type: "keyword", label: "List Length (len)", labelAr: "عدد العناصر (len)", code: 'print(len(numbers))' },
            { type: "keyword", label: "Slicing [ : ]", labelAr: "تقطيع القائمة [ : ]", code: 'print(numbers[0:3])   # 0 to 2\nprint(numbers[:3])    # Start to 2\nprint(numbers[2:])    # 2 to End' },
            { type: "keyword", label: "Append Element", labelAr: "إضافة عنصر (append)", code: 'numbers.append(10)\nprint(numbers)' },
            { type: "keyword", label: "Find Index", labelAr: "موقع عنصر (index)", code: 'print(numbers.index(9))' },
            { type: "keyword", label: "Insert Element", labelAr: "إدخال عنصر (insert)", code: 'numbers.insert(1, 100)\nprint(numbers)' },
            { type: "keyword", label: "Sort List", labelAr: "ترتيب القائمة (sort)", code: 'numbers.sort()\nprint(numbers)' },
            { type: "keyword", label: "Remove Element", labelAr: "حذف عنصر (remove)", code: 'numbers.remove(5)\nprint(numbers)' },
            { type: "keyword", label: "Reverse List", labelAr: "عكس الترتيب (reverse)", code: 'numbers.reverse()\nprint(numbers)' },
            { type: "keyword", label: "Min & Max", labelAr: "أصغر وأكبر قيمة (min, max)", code: 'print(min(numbers))\nprint(max(numbers))' },
            { type: "keyword", label: "Delete List", labelAr: "حذف القائمة بالكامل (del)", code: 'del numbers' },
            { type: "keyword", label: "Create Tuple ( )", labelAr: "إنشاء Tuple ( )", code: 'my_tuple = (10, 20, 30, 40)\nprint(my_tuple[0])\nprint(my_tuple[1:3])' },
            { type: "alert", text: "* الـ Tuple غير قابلة للتعديل (Immutable)؛ لا يمكن استخدام append أو remove معها.", color: "amber", icon: "fas fa-exclamation-triangle" }
        ],
        files: {
            subject: "../../files/python/lesson-11/subject11.py",
            challenge: "../../files/python/lesson-11/challenge11.py"
        }
    },
    {
        id: "12",
        title: "Dict & Set",
        titleAr: "القواميس والمجموعات",
        icon: "fas fa-key",
        color: "indigo",
        items: [
            { type: "code-box", label: "Create Dictionary", labelAr: "إنشاء القاموس (Dictionary)", code: 'student = {\n    "name": "Ali",\n    "age": 21,\n    "grade": "A"\n}\nprint(student)', color: "blue" },
            { type: "keyword", label: "Access Value (key)", labelAr: "الوصول للقيمة باستخدام المفتاح", code: 'print(student["name"])' },
            { type: "keyword", label: "Safe Access (get)", labelAr: "الوصول الآمن (get)", code: 'print(student.get("age"))' },
            { type: "keyword", label: "Pop Element (pop)", labelAr: "حذف عنصر بالمناداة (pop)", code: 'student.pop("grade")\nprint(student)' },
            { type: "keyword", label: "Delete Element (del)", labelAr: "حذف عنصر بالكلمة المفتاحية (del)", code: 'del student["age"]\nprint(student)' },
            { type: "code-box", label: "Create Sets", labelAr: "إنشاء المجموعات (Sets)", code: 'a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a)\nprint(b)', color: "green" },
            { type: "keyword", label: "Add Element (add)", labelAr: "إضافة عنصر (add)", code: 'a.add(10)\nprint(a)' },
            { type: "keyword", label: "Remove Element (remove)", labelAr: "حذف عنصر (remove)", code: 'a.remove(2)\nprint(a)' },
            { type: "keyword", label: "Set Union (|)", labelAr: "اتحاد المجموعتين (|)", code: 'print(a | b)' },
            { type: "keyword", label: "Set Intersection (&)", labelAr: "تقاطع المجموعتين (&)", code: 'print(a & b)' },
            { type: "keyword", label: "Set Difference (-)", labelAr: "الفرق بين المجموعتين (-)", code: 'print(a - b)' },
            { type: "alert", text: "* الـ Dictionary يخزن مفاتيح وقيم، بينما الـ Set لا تقبل عناصر متكررة وغير مرتبة.", color: "blue", icon: "fas fa-info-circle" }
        ],
        files: {
            subject: "../../files/python/lesson-12/subject12.py",
            challenge: "../../files/python/lesson-12/challenge12.py"
        }
    }
];
