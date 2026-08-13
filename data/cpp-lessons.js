export const lessons = [
  {
    id: '01',
    title: 'الأساسيات',
    summary: 'هنا نركز فقط على شكل برنامج C++ وترتيبه: المكتبة، مساحة الاسم، الدالة الرئيسية، وبداية ونهاية التنفيذ.',
    items: [
      { type: 'keyword', label: 'مكتبة iostream', code: '#include <iostream>    // مكتبة إدخال وإخراج البيانات' },
      { type: 'keyword', label: 'مساحة الاسم القياسية', code: 'using namespace std; // حتى نستخدم عناصر std بدون كتابة std:: كل مرة' },
      { type: 'code-box', label: 'الدالة الرئيسية main()', code: 'int main()\n{\n    // يبدأ تنفيذ البرنامج من هنا\n\n    return 0; // نهاية البرنامج\n}' },
      { type: 'code-box', label: 'الشكل الأساسي للبرنامج', code: '#include <iostream>\nusing namespace std;\n\nint main()\n{\n    cout << "Hello world" << endl; // Hello world\n\n    return 0;\n}' }
    ],
    extraInfo: { text: 'بهذا الدرس المهم تعرف ترتيب البرنامج فقط. cout و cin ناخذهن بالتفصيل بالدرس التالي.', icon: 'fas fa-info-circle' },
    files: { subject: '../../files/cpp/lesson-01/subject01.cpp' }
  },
  {
    id: '02',
    title: 'الإدخال والإخراج',
    summary: 'cout نستخدمها حتى نطلع بيانات للمستخدم، و cin حتى نستلم منه قيمة ونخزنها داخل متغير.',
    items: [
      { type: 'code-box', label: 'cout — إخراج البيانات', code: 'cout << "Hello" << endl;      // Hello\ncout << 25 << endl;           // 25\n\nint age = 20;\ncout << age << endl;          // 20\ncout << "Age: " << age;       // Age: 20', note: 'نقدر نطبع نص، رقم، متغير، أو أكثر من قيمة بنفس السطر. النص يكون بين علامتي اقتباس، أما المتغير فنكتب اسمه مباشرة.' },
      { type: 'code-box', label: 'cin — إدخال البيانات', code: 'int age;\ncin >> age;       // أدخل رقم صحيح، وينخزن داخل age\n\ndouble degree;\ncin >> degree;    // أدخل رقم، وينخزن داخل degree\n\nchar letter;\ncin >> letter;    // أدخل حرف واحد\n\nstring name;\ncin >> name;      // أدخل كلمة', note: 'cin لازم تستلم القيمة داخل متغير. والقيمة اللي تدخلها لازم تناسب نوع المتغير: int لرقم صحيح، double لرقم، char لحرف، و string للنص.' },
      { type: 'code-box', label: 'إدخال أكثر من قيمة', code: 'int age;\ndouble degree;\n\ncin >> age >> degree;\n\ncout << "Age: " << age << endl;\ncout << "Degree: " << degree << endl;' },
      { type: 'code-box', label: 'endl — سطر جديد', code: 'cout << "one" << endl;\ncout << "two";\n\n// الناتج:\n// one\n// two' }
    ],
    extraInfo: { text: 'إذا أدخلت قيمة ما تناسب نوع المتغير، مثل نص داخل int، ما راح ينجح الإدخال بصورة صحيحة.', icon: 'fas fa-info-circle' },
    files: { subject: '../../files/cpp/lesson-02/subject02.cpp', challenge: '../../files/cpp/lesson-02/challenge02.cpp' }
  },
  {
    id: '03',
    title: 'حروف الهروب',
    summary: 'حروف الهروب تبدأ بـ \\ ونستخدمها داخل النص حتى ننفذ معنى خاص مثل سطر جديد أو Tab أو طباعة علامة اقتباس.',
    items: [
      { type: 'keyword', label: '\\n — New Line', code: 'cout << "one\\ntwo"; // ينزل لسطر جديد' },
      { type: 'keyword', label: '\\a — Alert', code: 'cout << "one\\atwo"; // صوت تنبيه إذا الطرفية تدعمه' },
      { type: 'keyword', label: '\\t — Tab', code: 'cout << "one\\ttwo"; // Tab بين الكلمتين' },
      { type: 'keyword', label: '\\b — Backspace', code: 'cout << "one\\btwo"; // يرجع خانة للخلف' },
      { type: 'keyword', label: '\\\\ — Backslash', code: 'cout << "C:\\\\Code"; // C:\\Code' },
      { type: 'keyword', label: "\\' — Single Quote", code: 'cout << "It\\\'s C++"; // It\'s C++' },
      { type: 'keyword', label: '\\" — Double Quote', code: 'cout << "Say \\\"Hi\\\""; // Say "Hi"' },
      { type: 'keyword', label: '\\? — Question Mark', code: 'cout << "Ready\\?"; // Ready?' }
    ],
    files: { subject: '../../files/cpp/lesson-03/subject03.cpp', challenge: '../../files/cpp/lesson-03/challenge03.cpp' }
  },
  {
    id: '04',
    title: 'المتغيرات',
    summary: 'المتغير مكان نخزن بيه قيمة، ونحدد نوعه حسب البيانات اللي نريد نخزنها.',
    items: [
      { type: 'keyword', label: 'int', code: 'int age = 20;          // رقم صحيح' },
      { type: 'keyword', label: 'double', code: 'double degree = 84.62; // رقم عشري' },
      { type: 'keyword', label: 'float', code: 'float price = 2.5;      // رقم عشري' },
      { type: 'keyword', label: 'char', code: "char symbol = '!';       // حرف واحد" },
      { type: 'keyword', label: 'bool', code: 'bool ready = true;      // true أو false' },
      { type: 'keyword', label: 'string', code: 'string name = "Haidara"; // نص' }
    ],
    extraInfo: { text: 'اختار نوع المتغير حسب القيمة اللي راح تخزنها، لأن النوع يحدد شنو البيانات المقبولة وطريقة التعامل وياها.', icon: 'fas fa-info-circle' },
    files: { subject: '../../files/cpp/lesson-04/subject04.cpp', challenge: '../../files/cpp/lesson-04/challenge04.cpp' }
  },
  {
    id: '05',
    title: 'العمليات الرياضية',
    summary: 'العمليات الرياضية تشمل العمليات الاعتيادية، المركبة، وعمليات الزيادة والنقصان ++ و --.',
    items: [
      { type: 'code-box', label: 'العمليات الاعتيادية', code: 'cout << 10 + 6 << endl;   // 16\ncout << 10 - 6 << endl;   // 4\ncout << 10 * 6 << endl;   // 60\ncout << 10 / 6 << endl;   // 1 لأن القيم int\ncout << 10 % 6 << endl;   // 4 باقي القسمة\ncout << 10.0 / 6 << endl; // 1.66667 تقريباً' },
      { type: 'code-box', label: 'العمليات المركبة', code: 'int a = 10;\n\na += 6;  // a = 16\na -= 6;  // a = 10\na *= 6;  // a = 60\na /= 6;  // a = 10\n\ncout << a; // 10' },
      { type: 'code-box', label: 'العمليات الأحادية', code: 'int a = 5;\n\ncout << a++ << endl; // 5 ثم تصبح a = 6\ncout << a << endl;   // 6\ncout << ++a << endl; // تصبح 7 ثم يطبع 7\n\ncout << a-- << endl; // 7 ثم تصبح a = 6\ncout << --a << endl; // تصبح 5 ثم يطبع 5' }
    ],
    files: { subject: '../../files/cpp/lesson-05/subject05.cpp', challenge: '../../files/cpp/lesson-05/challenge05.cpp' }
  },
  {
    id: '06',
    title: 'العمليات المنطقية',
    summary: 'أي مقارنة بالنهاية تعطي true أو false، والعمليات المنطقية تربط أكثر من شرط أو تعكس نتيجته.',
    items: [
      { type: 'code-box', label: 'الشرط يعطي true أو false', code: 'cout << boolalpha;\n\ncout << (10 > 5) << endl;  // true\ncout << (10 == 5) << endl; // false', note: 'boolalpha تخلي cout تطبع true و false بدل 1 و 0.' },
      { type: 'logic-row', label: 'AND (&&)', code: 'cout << boolalpha;\n\nint age = 20;\nint degree = 70;\n\ncout << (age >= 18 && degree >= 50); // true', explanation: 'AND ترجع true فقط إذا كل الشروط صحيحة.' },
      { type: 'logic-row', label: 'OR (||)', code: 'cout << boolalpha;\n\nint age = 16;\nint degree = 70;\n\ncout << (age >= 18 || degree >= 50); // true', explanation: 'OR يكفي بيها شرط واحد صحيح حتى تكون النتيجة true.' },
      { type: 'logic-row', label: 'NOT (!)', code: 'cout << boolalpha;\n\nbool ready = true;\n\ncout << !ready; // false', explanation: 'NOT تعكس النتيجة: true تصير false و false تصير true.' },
      { type: 'code-box', label: 'مثال سريع على الثلاثة', code: 'cout << boolalpha;\n\nbool a = true;\nbool b = false;\n\ncout << (a && b) << endl; // false\ncout << (a || b) << endl; // true\ncout << (!a) << endl;     // false' }
    ],
    files: { subject: '../../files/cpp/lesson-06/subject06.cpp', challenge: '../../files/cpp/lesson-06/challenge06.cpp' }
  },
  {
    id: '07',
    title: 'الجمل الشرطية',
    summary: 'الجمل الشرطية تخلي البرنامج يختار شنو ينفذ حسب تحقق الشرط، إما باستخدام if أو switch.',
    items: [
      { type: 'code-box', label: 'if / else if / else', code: 'if (age > 18)\n{\n    cout << "adult";\n}\nelse if (age == 18)\n{\n    cout << "18";\n}\nelse\n{\n    cout << "kid";\n}' },
      { type: 'code-box', label: 'switch', code: 'switch (x)\n{\n    case 1: cout << "Saturday"; break;\n    case 2: cout << "Sunday"; break;\n    default: cout << "invalid";\n}' }
    ],
    files: { subject: '../../files/cpp/lesson-07/subject07.cpp', challenge: '../../files/cpp/lesson-07/challenge07.cpp' }
  },
  {
    id: '08',
    title: 'الحلقات التكرارية',
    summary: 'الحلقات التكرارية تعيد نفس الكود أكثر من مرة: for لعدد تكرارات واضح، while حسب شرط، و do while تنفذ مرة على الأقل.',
    items: [
      { type: 'code-box', label: 'for loop', code: 'for (int x = 1; x <= 10; ++x)\n{\n    cout << x << endl;\n}' },
      { type: 'code-box', label: 'while loop', code: 'int y = 1;\nwhile (y <= 10)\n{\n    cout << y << endl;\n    ++y;\n}' },
      { type: 'code-box', label: 'do while loop', code: 'int z = 1;\ndo\n{\n    cout << z << endl;\n    ++z;\n}\nwhile (z <= 10);' }
    ],
    extraInfo: { text: 'for تناسب عدد تكرارات معروف، بينما do while تنفذ مرة واحدة على الأقل.', icon: 'fas fa-info-circle' },
    files: { subject: '../../files/cpp/lesson-08/subject08.cpp', challenge: '../../files/cpp/lesson-08/challenge08.cpp' }
  },
  {
    id: '09',
    title: 'المصفوفات',
    summary: 'المصفوفة تخزن أكثر من قيمة من نفس النوع، ونوصل للعناصر عن طريق الـ index الذي يبدأ من 0.',
    items: [
      { type: 'code-box', label: 'Array أحادية البعد', code: 'int numbers[5] = {1,2,3,4,5};\ncout << numbers[0]; // 1' },
      { type: 'code-box', label: 'المرور على Array', code: 'for (int i = 0; i < 5; i++)\n{\n    cout << numbers[i] << " ";\n}\n// 1 2 3 4 5' },
      { type: 'code-box', label: 'Matrix ثنائية البعد', code: 'int matrix[2][2] =\n{\n    {1,2},\n    {3,4}\n};\ncout << matrix[1][0]; // 3' },
      { type: 'keyword', label: 'القطر الرئيسي', code: 'if (i == j)\n{\n    cout << matrix[i][j];\n}' }
    ],
    files: { subject: '../../files/cpp/lesson-09/subject09.cpp', challenge: '../../files/cpp/lesson-09/challenge09.cpp' }
  },
  {
    id: '10',
    title: 'الدوال',
    summary: 'الدالة تجمع كود له مهمة محددة حتى نقدر نستدعيه وقت الحاجة، وقد تستلم Parameters أو ترجع قيمة.',
    items: [
      { type: 'code-box', label: 'void بدون Parameters', code: 'void hi()\n{\n    cout << "Hello";\n}' },
      { type: 'code-box', label: 'void مع Parameters', code: 'void sum(int a, int b)\n{\n    cout << a + b;\n}' },
      { type: 'code-box', label: 'ترجع قيمة بدون Parameters', code: 'int number()\n{\n    return 10;\n}' },
      { type: 'code-box', label: 'ترجع قيمة مع Parameters', code: 'int sum(int a, int b)\n{\n    return a + b;\n}' },
      { type: 'keyword', label: 'Pass by Value', code: 'void increment(int x)\n{\n    x++;\n}' },
      { type: 'keyword', label: 'Pass by Reference', code: 'void increment(int &x)\n{\n    x++;\n}' },
      { type: 'keyword', label: 'Recursion', code: 'int fact(int n)\n{\n    if (n == 0) return 1;\n    return n * fact(n - 1);\n}' }
    ],
    extraInfo: { text: 'الـ Scope يحدد المكان الذي يمكن الوصول منه إلى المتغير، مثل Global و Function scope.', icon: 'fas fa-info-circle' },
    files: { subject: '../../files/cpp/lesson-10/subject10.cpp', challenge: '../../files/cpp/lesson-10/challenge10.cpp' }
  },
  {
    id: '11',
    title: 'المكتبات',
    summary: 'المكتبات تضيف دوال جاهزة لمهام محددة، وهنا نركز على cctype و cstring و cmath.',
    items: [
      { type: 'module-box', label: 'cctype', content: [
        { code: 'isalpha(c)', comment: '// هل هو حرف؟' },
        { code: 'isdigit(c)', comment: '// هل هو رقم؟' },
        { code: 'isupper(c)', comment: '// هل الحرف كبير؟' },
        { code: 'tolower(c)', comment: '// تحويل إلى حرف صغير' }
      ] },
      { type: 'module-box', label: 'cstring', content: [
        { code: 'strcpy(a, b)', comment: '// نسخ النص' },
        { code: 'strcat(a, b)', comment: '// دمج النصوص' },
        { code: 'strlen(a)', comment: '// طول النص' },
        { code: 'strcmp(a, b)', comment: '// مقارنة النصوص' }
      ] },
      { type: 'module-box', label: 'cmath', content: [
        { code: 'pow(x, y)', comment: '// القوة' },
        { code: 'sqrt(x)', comment: '// الجذر التربيعي' },
        { code: 'abs(x)', comment: '// القيمة المطلقة' },
        { code: 'round(x)', comment: '// التقريب' }
      ] }
    ],
    files: { subject: '../../files/cpp/lesson-11/subject11.cpp', challenge: '../../files/cpp/lesson-11/challenge11.cpp' }
  },
  {
    id: '12',
    title: 'Pointers',
    summary: 'الـ Pointer يخزن عنوان متغير بالذاكرة، ومن خلاله نقدر نوصل للقيمة أو نتعامل ويا العناوين مباشرة.',
    items: [
      { type: 'keyword', label: 'عنوان المتغير', code: 'int x = 10;\ncout << &x;' },
      { type: 'keyword', label: 'تعريف Pointer', code: 'int *px = &x;' },
      { type: 'keyword', label: 'Dereference', code: 'cout << *px; // 10، وهي قيمة x' },
      { type: 'keyword', label: 'Reference', code: 'int &b = x;' },
      { type: 'code-box', label: 'Const Pointer', code: 'const int *const px = &x;\n// القيمة والعنوان ثابتان' },
      { type: 'code-box', label: 'Pointer مع Array', code: 'int v[5] = {10,20,30,40,50};\nint *ptr = v;\ncout << *ptr; // 10\nptr++;\ncout << *ptr; // 20' }
    ],
    files: { subject: '../../files/cpp/lesson-12/subject12.cpp', challenge: '../../files/cpp/lesson-12/challenge12.cpp' }
  },
  {
    id: '13',
    title: 'Struct',
    summary: 'الـ struct يجمع عدة متغيرات مرتبطة ببعض داخل نوع واحد نعرّفه بنفسنا.',
    items: [
      { type: 'code-box', label: 'تعريف struct', code: 'struct Person\n{\n    string name;\n    int age;\n};' },
      { type: 'keyword', label: 'إنشاء متغير', code: 'Person id;' },
      { type: 'keyword', label: 'الوصول إلى الأعضاء', code: 'id.name = "Haidara";\nid.age = 20;' }
    ],
    files: { subject: '../../files/cpp/lesson-13/subject13.cpp', challenge: '../../files/cpp/lesson-13/challenge13.cpp' }
  },
  {
    id: '14',
    title: 'Fstream',
    summary: 'fstream نستخدمها للتعامل مع الملفات: ifstream للقراءة و ofstream للكتابة.',
    items: [
      { type: 'keyword', label: 'ifstream للقراءة', code: 'ifstream read("file_1.txt");' },
      { type: 'keyword', label: 'ofstream للكتابة', code: 'ofstream write("file_2.txt");' },
      { type: 'code-box', label: 'قراءة ثم كتابة', code: 'int x;\nread >> x;\nread.close();\n\nwrite << x;\nwrite.close();' }
    ],
    files: { subject: '../../files/cpp/lesson-14/subject14.cpp', challenge: '../../files/cpp/lesson-14/challenge14.cpp' }
  },
  {
    id: '15',
    title: 'Vector',
    summary: 'Vector يشبه Array لكن حجمه مرن ونقدر نضيف ونحذف عناصر أثناء تشغيل البرنامج.',
    items: [
      { type: 'keyword', label: 'تعريف Vector', code: 'vector<string> arr;' },
      { type: 'keyword', label: 'push_back()', code: 'arr.push_back("a"); // إضافة عنصر بالنهاية' },
      { type: 'keyword', label: 'pop_back()', code: 'arr.pop_back(); // حذف آخر عنصر' },
      { type: 'keyword', label: 'size()', code: 'cout << arr.size(); // عدد العناصر' },
      { type: 'keyword', label: 'empty()', code: 'cout << arr.empty(); // هل الـ Vector فارغ؟' },
      { type: 'keyword', label: 'clear()', code: 'arr.clear(); // حذف جميع العناصر' },
      { type: 'keyword', label: 'insert()', code: 'arr.insert(arr.begin(), "a"); // إضافة بالبداية' }
    ],
    files: { subject: '../../files/cpp/lesson-15/subject15.cpp', challenge: '../../files/cpp/lesson-15/challenge15.cpp' }
  }
];