export const lessons = [
  {
    id: '01',
    title: 'الأساسيات',
    items: [
      { type: 'keyword', label: 'مكتبة iostream', code: '#include <iostream>    // مكتبة ادخال و اخراج البيانات' },
      { type: 'keyword', label: 'مساحة الاسم القياسية', code: 'using namespace std; // استخدام مساحة الاسم القياسية' },
      { type: 'code-box', label: 'الدالة الرئيسية main()', code: 'int main()\n{\n    // بداية البرنامج\n    return 0;\n}' },
      { type: 'group', items: [
        { type: 'pill-box', label: 'cout', code: 'cout << "Hello";' },
        { type: 'pill-box', label: 'cin', code: 'cin >> x;' },
        { type: 'pill-box', label: 'endl', code: 'cout << endl;' }
      ] }
    ],
    extraInfo: { text: 'من مكتبة iostream نستخدم هنا cin و cout و endl بصورة أساسية.', icon: 'fas fa-info-circle' },
    files: { subject: '../../files/cpp/lesson-01/subject01.cpp', challenge: '../../files/cpp/lesson-01/challenge01.cpp' }
  },
  {
    id: '02',
    title: 'الإدخال والإخراج',
    items: [
      { type: 'keyword', label: 'cout للطباعة', code: 'cout << "Hi there" << endl;' },
      { type: 'keyword', label: 'cin للإدخال', code: 'string name;\ncin >> name;' },
      { type: 'keyword', label: 'دمج النص والمتغير', code: 'cout << "Hello " << name << endl;' },
      { type: 'keyword', label: 'endl سطر جديد', code: 'cout << "one" << endl;\ncout << "two";' }
    ],
    files: { subject: '../../files/cpp/lesson-02/subject02.cpp', challenge: '../../files/cpp/lesson-02/challenge02.cpp' }
  },
  {
    id: '03',
    title: 'حروف الهروب',
    items: [
      { type: 'keyword', label: '\\n — New Line', code: 'cout << "one\\ntwo";' },
      { type: 'keyword', label: '\\t — Tab', code: 'cout << "one\\ttwo";' },
      { type: 'keyword', label: '\\\\ — Backslash', code: 'cout << "one\\\\two";' },
      { type: 'keyword', label: '\\" — Double Quote', code: 'cout << "one\\\"two";' },
      { type: 'keyword', label: '\\b — Backspace', code: 'cout << "one\\btwo";' }
    ],
    files: { subject: '../../files/cpp/lesson-03/subject03.cpp', challenge: '../../files/cpp/lesson-03/challenge03.cpp' }
  },
  {
    id: '04',
    title: 'المتغيرات',
    items: [
      { type: 'keyword', label: 'int', code: 'int age = 20;' },
      { type: 'keyword', label: 'double', code: 'double degree = 84.62;' },
      { type: 'keyword', label: 'float', code: 'float price = 2.5;' },
      { type: 'keyword', label: 'char', code: "char symbol = '!';" },
      { type: 'keyword', label: 'bool', code: 'bool ready = true;' },
      { type: 'keyword', label: 'string', code: 'string name = "Haidara";' }
    ],
    files: { subject: '../../files/cpp/lesson-04/subject04.cpp', challenge: '../../files/cpp/lesson-04/challenge04.cpp' }
  },
  {
    id: '05',
    title: 'العمليات الرياضية',
    items: [
      { type: 'code-box', label: 'العمليات الاعتيادية', code: 'cout << 10 + 6 << endl;\ncout << 10 - 6 << endl;\ncout << 10 * 6 << endl;\ncout << 10 / 6 << endl;\ncout << 10 % 6 << endl;' },
      { type: 'code-box', label: 'العمليات المركبة', code: 'a += 6;\na -= 6;\na *= 6;\na /= 6;' },
      { type: 'code-box', label: 'العمليات الأحادية', code: 'a++;\n++a;\na--;\n--a;' }
    ],
    files: { subject: '../../files/cpp/lesson-05/subject05.cpp', challenge: '../../files/cpp/lesson-05/challenge05.cpp' }
  },
  {
    id: '06',
    title: 'العمليات المنطقية',
    items: [
      { type: 'logic-row', label: 'AND (&&)', code: 'if (a && b)\n{\n    cout << "1";\n}', explanation: 'يجب أن يتحقق الشرطان' },
      { type: 'logic-row', label: 'OR (||)', code: 'if (a || b)\n{\n    cout << "1";\n}', explanation: 'يكفي تحقق شرط واحد' },
      { type: 'logic-row', label: 'NOT (!)', code: 'if (!a)\n{\n    cout << "NOT a";\n}', explanation: 'يعكس نتيجة الشرط' }
    ],
    files: { subject: '../../files/cpp/lesson-06/subject06.cpp', challenge: '../../files/cpp/lesson-06/challenge06.cpp' }
  },
  {
    id: '07',
    title: 'الجمل الشرطية',
    items: [
      { type: 'code-box', label: 'if / else if / else', code: 'if (age > 18)\n{\n    cout << "adult";\n}\nelse if (age == 18)\n{\n    cout << "18";\n}\nelse\n{\n    cout << "kid";\n}' },
      { type: 'code-box', label: 'switch', code: 'switch (x)\n{\n    case 1: cout << "Saturday"; break;\n    case 2: cout << "Sunday"; break;\n    default: cout << "invalid";\n}' }
    ],
    files: { subject: '../../files/cpp/lesson-07/subject07.cpp', challenge: '../../files/cpp/lesson-07/challenge07.cpp' }
  },
  {
    id: '08',
    title: 'الحلقات التكرارية',
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
    items: [
      { type: 'code-box', label: 'Array أحادية البعد', code: 'int numbers[5] = {1,2,3,4,5};\ncout << numbers[0];' },
      { type: 'code-box', label: 'المرور على Array', code: 'for (int i = 0; i < 5; i++)\n{\n    cout << numbers[i] << " ";\n}' },
      { type: 'code-box', label: 'Matrix ثنائية البعد', code: 'int matrix[2][2] =\n{\n    {1,2},\n    {3,4}\n};\ncout << matrix[1][0];' },
      { type: 'keyword', label: 'القطر الرئيسي', code: 'if (i == j)\n{\n    cout << matrix[i][j];\n}' }
    ],
    files: { subject: '../../files/cpp/lesson-09/subject09.cpp', challenge: '../../files/cpp/lesson-09/challenge09.cpp' }
  },
  {
    id: '10',
    title: 'الدوال',
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
    items: [
      { type: 'module-box', label: 'cctype', content: [
        { code: 'isalpha(c)', comment: '# letter ?' },
        { code: 'isdigit(c)', comment: '# digit ?' },
        { code: 'isupper(c)', comment: '# uppercase ?' },
        { code: 'tolower(c)', comment: '# to lowercase' }
      ] },
      { type: 'module-box', label: 'cstring', content: [
        { code: 'strcpy(a, b)', comment: '# copy' },
        { code: 'strcat(a, b)', comment: '# concatenate' },
        { code: 'strlen(a)', comment: '# length' },
        { code: 'strcmp(a, b)', comment: '# compare' }
      ] },
      { type: 'module-box', label: 'cmath', content: [
        { code: 'pow(x, y)', comment: '# power' },
        { code: 'sqrt(x)', comment: '# square root' },
        { code: 'abs(x)', comment: '# absolute' },
        { code: 'round(x)', comment: '# rounding' }
      ] }
    ],
    files: { subject: '../../files/cpp/lesson-11/subject11.cpp', challenge: '../../files/cpp/lesson-11/challenge11.cpp' }
  },
  {
    id: '12',
    title: 'Pointers',
    items: [
      { type: 'keyword', label: 'عنوان المتغير', code: 'int x = 10;\ncout << &x;' },
      { type: 'keyword', label: 'تعريف Pointer', code: 'int *px = &x;' },
      { type: 'keyword', label: 'Dereference', code: 'cout << *px; // قيمة x' },
      { type: 'keyword', label: 'Reference', code: 'int &b = x;' },
      { type: 'code-box', label: 'Const Pointer', code: 'const int *const px = &x;\n// القيمة والعنوان ثابتان' },
      { type: 'code-box', label: 'Pointer مع Array', code: 'int v[5] = {10,20,30,40,50};\nint *ptr = v;\ncout << *ptr;\nptr++;\ncout << *ptr;' }
    ],
    files: { subject: '../../files/cpp/lesson-12/subject12.cpp', challenge: '../../files/cpp/lesson-12/challenge12.cpp' }
  },
  {
    id: '13',
    title: 'Struct',
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
    items: [
      { type: 'keyword', label: 'تعريف Vector', code: 'vector<string> arr;' },
      { type: 'keyword', label: 'push_back()', code: 'arr.push_back("a");' },
      { type: 'keyword', label: 'pop_back()', code: 'arr.pop_back();' },
      { type: 'keyword', label: 'size()', code: 'cout << arr.size();' },
      { type: 'keyword', label: 'empty()', code: 'cout << arr.empty();' },
      { type: 'keyword', label: 'clear()', code: 'arr.clear();' },
      { type: 'keyword', label: 'insert()', code: 'arr.insert(arr.begin(), "a");' }
    ],
    files: { subject: '../../files/cpp/lesson-15/subject15.cpp', challenge: '../../files/cpp/lesson-15/challenge15.cpp' }
  }
];
