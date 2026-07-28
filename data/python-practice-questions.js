// العناوين والشرح بالعربية، مع نص المطلوب بالإنجليزية أيضاً والشيفرات بصياغتها البرمجية الصحيحة.

export const categories = [
  {
    "id": "fibonacci",
    "label": "فيبوناتشي"
  },
  {
    "id": "factorial",
    "label": "المضروب"
  },
  {
    "id": "lists",
    "label": "القوائم"
  },
  {
    "id": "prime-numbers",
    "label": "الأعداد الأولية"
  },
  {
    "id": "functions",
    "label": "الدوال"
  },
  {
    "id": "conditions",
    "label": "الشروط"
  },
  {
    "id": "loops",
    "label": "الحلقات التكرارية"
  },
  {
    "id": "sets",
    "label": "المجموعات"
  },
  {
    "id": "dictionary",
    "label": "القواميس"
  },
  {
    "id": "strings",
    "label": "النصوص"
  },
  {
    "id": "numbers-problems",
    "label": "مسائل الأعداد"
  }
];

export const questions = [
  {
    "id": 1,
    "categoryId": "fibonacci",
    "title": "طباعة أول N من متتالية فيبوناتشي",
    "prompt": "اكتب برنامج يطلب من المستخدم إدخال عدد صحيح موجب `N`، ثم يقوم بطباعة أول `N` رقم من متتالية فيبوناتشي.",
    "promptEn": "Write a program that asks the user to enter a positive integer `N`, then prints the first `N` numbers of the `Fibonacci` sequence.",
    "steps": [
      "1- قراءة العدد `N` من المستخدم.",
      "2- تهيئة المتغير `a` بصفر والمتغير `b` بواحد.",
      "3- استخدام حلقة تكرار للمرور `N` من المرات.",
      "4- طباعة قيمة المتغير `a` في كل دورة.",
      "5- حساب المتغير `c` بجمع `a + b`، ثم تحديث قيم المتغيرات للحلقة القادمة."
    ],
    "code": "n = int(input(\"Enter n: \"))\n\na = 0\nb = 1\n\nfor i in range(n):\n    print(a)\n    c = a + b\n    a = b\n    b = c",
    "output": "Enter n: 5\n0\n1\n1\n2\n3"
  },
  {
    "id": 2,
    "categoryId": "fibonacci",
    "title": "أعداد فيبوناتشي القابلة للقسمة على 3",
    "prompt": "اكتب برنامج يطلب من المستخدم إدخال عدد صحيح موجب `N`، ثم يقوم بتوليد أول `N` رقم من متتالية فيبوناتشي وتخزينها داخل قائمة، وبعد ذلك يقوم بطباعة القيم التي تقبل القسمة على `3` بدون باقي.",
    "promptEn": "Write a program that asks the user to enter a positive integer `N`, generates the first `N` numbers of the `Fibonacci` sequence, stores them in a `List`, and then prints the values that are divisible by `3` without a remainder.",
    "steps": [
      "1- قراءة العدد `N` من المستخدم.",
      "2- إنشاء قائمة فارغة لتخزين أرقام فيبوناتشي.",
      "3- استخدام حلقة تكرار لإضافة أرقام السلسلة إلى القائمة باستخدام نفس الطريقة الأساسية.",
      "4- استخدام حلقة تكرار جديدة للمرور على القائمة.",
      "5- طباعة الرقم إذا كان يقبل القسمة على `3` ولا يساوي صفراً (`num % 3 == 0`)."
    ],
    "code": "n = int(input(\"Enter n: \"))\n\nfib_list = []\na = 0\nb = 1\n\nfor i in range(n):\n    fib_list.append(a)\n    c = a + b\n    a = b\n    b = c\n\nfor num in fib_list:\n    if num % 3 == 0 and num != 0:\n        print(num)",
    "output": "Enter n: 10\n3\n21"
  },
  {
    "id": 3,
    "categoryId": "fibonacci",
    "title": "أعداد فيبوناتشي الأصغر من N",
    "prompt": "اكتب برنامج يطلب من المستخدم إدخال عدد صحيح موجب `N`، ثم يقوم بطباعة جميع أرقام متتالية فيبوناتشي التي تكون أقل من العدد المدخل `N`.",
    "promptEn": "Write a program that asks the user to enter a positive integer `N`, then prints all `Fibonacci` sequence numbers that are strictly less than the entered number `N`.",
    "steps": [
      "1- قراءة العدد `N` من المستخدم.",
      "2- تهيئة المتغيرات الأساسية `a = 0` و `b = 1`.",
      "3- استخدام حلقة تكرار `while` التي تستمر طالما أن قيمة `a < N`.",
      "4- طباعة قيمة `a` ثم تحديث القيم للحصول على الرقم التالي."
    ],
    "code": "n = int(input(\"Enter n: \"))\n\na = 0\nb = 1\n\nwhile a < n:\n    print(a)\n    c = a + b\n    a = b\n    b = c",
    "output": "Enter n: 20\n0\n1\n1\n2\n3\n5\n8\n13"
  },
  {
    "id": 4,
    "categoryId": "factorial",
    "title": "حساب مضروب عدد",
    "prompt": "اكتب برنامج يطلب من المستخدم إدخال عدد صحيح موجب `N`، ثم يقوم بحساب مضروب العدد المدخل وطباعته.",
    "promptEn": "Write a program that asks the user to enter a positive integer `N`, calculates the `Factorial` value of the entered number, and prints it.",
    "steps": [
      "1- قراءة العدد المطلوب من المستخدم.",
      "2- تهيئة المتغير `fact` بقيمة `1` كبداية للضرب.",
      "3- استخدام حلقة تكرار للعد من `1` إلى `N` (شاملة).",
      "4- تحديث المتغير بصيغة `fact = fact * i`.",
      "5- طباعة الناتج النهائي للمضروب."
    ],
    "code": "n = int(input(\"Enter number: \"))\n\nfact = 1\n\nfor i in range(1, n + 1):\n    fact = fact * i\n\nprint(\"Factorial =\", fact)",
    "output": "Enter number: 5\nFactorial = 120"
  },
  {
    "id": 5,
    "categoryId": "factorial",
    "title": "تحديد زوجية ناتج المضروب",
    "prompt": "اكتب برنامج يطلب من المستخدم إدخال عدد صحيح موجب `N`، ثم يقوم بحساب مضروب العدد المدخل، وبعد ذلك يتحقق هل الناتج زوجي أم فردي ويطبع النتيجة.",
    "promptEn": "Write a program that asks the user to enter a positive integer `N`, calculates its `Factorial`, checks if the result is even or odd, and prints the result.",
    "steps": [
      "1- قراءة الدخل من المستخدم كمتغير `N`.",
      "2- حساب الناتج النهائي للمضروب كما في الطريقة الأساسية.",
      "3- استخدام الجملة الشرطية لاختبار باقي القسمة للناتج بدلالة `fact % 2 == 0`.",
      "4- طباعة ما إذا كان الرقم زوجياً أو فردياً بناءً على النتيجة."
    ],
    "code": "n = int(input(\"Enter number: \"))\n\nfact = 1\n\nfor i in range(1, n + 1):\n    fact = fact * i\n\nprint(\"Factorial =\", fact)\n\nif fact % 2 == 0:\n    print(\"Even\")\nelse:\n    print(\"Odd\")",
    "output": "Enter number: 3\nFactorial = 6\nEven"
  },
  {
    "id": 6,
    "categoryId": "factorial",
    "title": "جمع المضاريب من 1 إلى N",
    "prompt": "اكتب برنامج يطلب من المستخدم إدخال عدد صحيح موجب `N`، ثم يقوم بحساب مجموع القيم من `1!` إلى `N!` وطباعة الناتج.",
    "promptEn": "Write a program that asks the user to enter a positive integer `N`, calculates the sum of factorials from `1!` to `N!`, and prints the result.",
    "steps": [
      "1- قراءة العدد `N` من قبل المستخدم.",
      "2- تهيئة المتغير `fact = 1` لحفظ قيمة المضروب، والمتغير `total = 0` لجمع القيم بصورة تراكمية.",
      "3- استخدام حلقة التكرار للمرور والتصاعد من `1` إلى `N`.",
      "4- في كل دورة يتم ضرب قيمة `fact` وتحديثها برقم الدورة الحالية `i` للحصول على المضروب.",
      "5- إضافة هذا المضروب المستخرج مباشرة إلى المجموع `total`.",
      "6- طباعة المجموع النهائي `total` خارج الحلقة التكرارية."
    ],
    "code": "n = int(input(\"Enter a number: \"))\n\nfact = 1\ntotal = 0\n\nfor i in range(1, n + 1):\n    fact = fact * i\n    total += fact\n\nprint (total)",
    "output": "Enter a number: 3\n9"
  },
  {
    "id": 7,
    "categoryId": "lists",
    "title": "تحليل قائمة من عشرة أعداد",
    "prompt": "اكتب برنامج يطلب من المستخدم إدخال `10` أرقام صحيحة وتخزينها داخل قائمة، ثم يقوم بتنفيذ مجموعة من المطالب (طباعة، مجموع، معدل، الأكبر، الأصغر، أكبر/أقل من المعدل).",
    "promptEn": "Write a program that takes `10` integers from the user, stores them in a `List`, and performs various operations (Print, Sum, Average, Maximum, Minimum, Elements greater/less than average).",
    "steps": [
      "1- إنشاء قائمة فارغة وكتابة حلقة تكرار باستخدام الدالة `range(10)` لطلب الأرقام.",
      "2- استخدام حلقة للمرور على القائمة وحساب المجموع الكلي لمعرفة المعدل `avg = total / 10`.",
      "3- استخدام الدوال المدمجة للاستخراج المباشر لأكبر رقم `max()` وأصغر رقم `min()`.",
      "4- طباعة الأرقام المحددة بشكل مطابق للشروط `x > avg` و `x < avg`."
    ],
    "code": "numbers = []\n\nfor i in range(10):\n    num = int(input(\"Enter number: \"))\n    numbers.append(num)\n\nprint(\"Elements:\", numbers)\n\ntotal = 0\nfor x in numbers:\n    total = total + x\nprint(\"Sum:\", total)\n\navg = total / 10\nprint(\"Average:\", avg)\n\nprint(\"Maximum:\", max(numbers))\nprint(\"Minimum:\", min(numbers))\n\nprint(\"Greater than average:\")\nfor x in numbers:\n    if x > avg:\n        print(x)\n\nprint(\"Less than average:\")\nfor x in numbers:\n    if x < avg:\n        print(x)",
    "output": "Enter number: 1\n[... inputs 2 to 10]\nElements: [1, 2, ... ]\nSum: 55\nAverage: 5.5\nMaximum: 10\nMinimum: 1\nGreater than average: ..."
  },
  {
    "id": 8,
    "categoryId": "lists",
    "title": "تصفية الأعداد الأكبر من قيمة محددة",
    "prompt": "اكتب برنامج يطلب من المستخدم إدخال أرقام صحيحة إلى أن يتم إدخال `0` لإيقاف الحلقة. ثم يطلب إدخال رقم معين ويقوم بطباعة جميع الأرقام الأكبر منه وعددها.",
    "promptEn": "Write a program that asks the user to enter integers until `0` is entered to stop the loop. Then, request a specific target number and print all numbers greater than it along with their count.",
    "steps": [
      "1- استخدام حلقة التكرار `while True` لسؤال المستخدم عن الرقم إلى أن يتم إدخال `0`.",
      "2- إيقاف الحلقة عبر أمر `break` وسؤال المستخدم عن الرقم المستهدف `target`.",
      "3- استخدام حلقة للبحث عن الأرقام التي تعدت قيمتها `x > target` وعدّها بمتغير `count`.",
      "4- طباعة القائمة الجديدة والعدد النهائي للحالات."
    ],
    "code": "numbers = []\n\nwhile True:\n    num = int(input(\"Enter number (0 to stop): \"))\n    if num == 0:\n        break\n    numbers.append(num)\n\ntarget = int(input(\"Enter target number: \"))\n\ngreater_list = []\ncount = 0\n\nfor x in numbers:\n    if x > target:\n        greater_list.append(x)\n        count = count + 1\n\nprint(\"Numbers greater than target:\", greater_list)\nprint(\"Count =\", count)",
    "output": "Enter number (0 to stop): 15\nEnter number (0 to stop): 0\nEnter target number: 10\nNumbers greater than target: [15]\nCount = 1"
  },
  {
    "id": 9,
    "categoryId": "lists",
    "title": "تصفية قائمة حسب قابلية القسمة",
    "prompt": "اكتب برنامج يطلب إدخال `10` أرقام في قائمة، ثم يطلب رقماً معيناً، ويطبع جميع الأرقام التي تقبل القسمة عليه.",
    "promptEn": "Write a program that asks for `10` numbers to populate a `List`, then asks for a specific divisor, and prints all numbers in the list that are fully divisible by it.",
    "steps": [
      "1- قراءة `10` أرقام كالمعتاد وحفظهم داخل القائمة الطويلة.",
      "2- قراءة الرقم الذي سنستخدمه كمقسوم عليه `divisor`.",
      "3- اختبار الأرقام في محتوى القائمة باستخدام معامل باقي القسمة `x % divisor == 0`.",
      "4- طباعة كل رقم إذا كان الحاصل مساوياً للصفر أي تقبل القسمة بدون باقي."
    ],
    "code": "numbers = []\n\nfor i in range(10):\n    num = int(input(\"Enter number: \"))\n    numbers.append(num)\n\ndivisor = int(input(\"Enter divisor: \"))\n\nprint(\"Numbers divisible by\", divisor, \":\")\nfor x in numbers:\n    if divisor != 0 and x % divisor == 0:\n        print(x)",
    "output": "Enter number: 2\n[...]\nEnter divisor: 2\nNumbers divisible by 2 :\n2\n4\n..."
  },
  {
    "id": 10,
    "categoryId": "prime-numbers",
    "title": "التحقق من العدد الأولي",
    "prompt": "اكتب برنامج للتحقق هل العدد المدخل عدد أولي أم لا وطباعة `True` او `False`.",
    "promptEn": "Write a program to verify whether the entered number is a prime number and print `True` or `False` accordingly.",
    "steps": [
      "1- قراءة الرقم `N` المدخل من المستخدم بغرض الفحص.",
      "2- تهيئة متغير منطقي `prime = True` واعتباره صحيحاً في البداية.",
      "3- التحقق المسبق؛ إذا كان `N <= 1` فلا يمكن أن يكون الرقم أولي.",
      "4- تشغيل حلقة التكرار للمرور على كل الأرقام المحتملة لقسمتها بشكل كامل.",
      "5- طباعة النتيجة `True` أو طباعة `False` إذا قَبِل القسمة على عدد آخر."
    ],
    "code": "n = int(input(\"Enter number: \"))\n\nprime = True\n\nif n <= 1:\n    prime = False\nelse:\n    for i in range(2, n):\n        if n % i == 0:\n            prime = False\n            break\n\nprint(prime)",
    "output": "Enter number: 7\nTrue"
  },
  {
    "id": 11,
    "categoryId": "prime-numbers",
    "title": "الأعداد الأولية حتى N",
    "prompt": "برنامج يطبع الأعداد الأولية من `1` إلى `N`، ثم يطبع أول عدد أولي يأتي بعد الرقم المدخل `N`.",
    "promptEn": "A program that prints prime numbers from `1` to `N`, and then finds and prints the very first prime number coming right after `N`.",
    "steps": [
      "1- قراءة العدد `N` لحصر النطاق وتحديده.",
      "2- تشغيل حلقة التكرار من `1` إلى `N` والتحقق من كون الأرقام أولية وطباعتهم.",
      "3- استخدام حلقة `while` مع متغير جديد يبدأ من نقطة `N + 1` للبحث عن الرقم المستقبلي التدريجي.",
      "4- إيقاف الحلقة عبر `break` وطباعة العدد بمجرد إيجاد عدد أولي جديد يحقق الشروط."
    ],
    "code": "n = int(input(\"Enter number: \"))\n\nprint(\"Primes from 1 to\", n, \":\")\nfor i in range(1, n + 1):\n    prime = True\n    if i <= 1:\n        prime = False\n    else:\n        for j in range(2, i):\n            if i % j == 0:\n                prime = False\n                break\n    \n    if prime == True:\n        print(i)\n\nnext_num = n + 1\nwhile True:\n    prime = True\n    for j in range(2, next_num):\n        if next_num % j == 0:\n            prime = False\n            break\n            \n    if prime == True:\n        print(\"Next prime =\", next_num)\n        break\n        \n    next_num = next_num + 1",
    "output": "Enter number: 10\nPrimes from 1 to 10:\n2\n3\n5\n7\nNext prime = 11"
  },
  {
    "id": 12,
    "categoryId": "functions",
    "title": "اختبار القسمة على 2 و3",
    "prompt": "برنامج يولد عدداً عشوائياً ويمرره إلى دالة تتحقق مما إذا كان يقبل القسمة على `2` و`3` معاً.",
    "promptEn": "A program that generates a random number and passes it to a `Function` to verify if it is divisible by both `2` and `3` completely.",
    "steps": [
      "1- استيراد مكتبة `random` للتعامل مع الأرقام العشوائية وتوليد رقم فوري.",
      "2- إنشاء دالة تستقبل المتغير، وتشغل اختباراً مزدوجاً بباقي القسمة بطريقة `num % 2 == 0 and num % 3 == 0`.",
      "3- تمرير الرقم المُولد بشكل نظيف إلى الدالة للحصول على الجواب الصحيح وطباعته."
    ],
    "code": "import random\n\ndef check_divisibility(num):\n    if num % 2 == 0 and num % 3 == 0:\n        print(num, \"is divisible by 2 and 3\")\n    else:\n        print(num, \"is NOT divisible by 2 and 3\")\n\nrand_num = random.randint(1, 100)\nprint(\"Generated Number =\", rand_num)\ncheck_divisibility(rand_num)",
    "output": "Generated Number = 12\n12 is divisible by 2 and 3"
  },
  {
    "id": 13,
    "categoryId": "functions",
    "title": "إيجاد أصغر وأكبر قيمة في قائمة",
    "prompt": "دالة تستقبل قائمة، وتطبع أكبر قيمة وأصغر قيمة فيها.",
    "promptEn": "A `Function` that accepts a `List` structure as input, and prints the highest and the lowest numerical values residing inside it.",
    "steps": [
      "1- تعريف الدالة لاستقبال القائمة المُسماة `numbers` كمعطى أساسي.",
      "2- استخدام دوال بايثون المدمجة `max()` لاستخراج الرقم الأكبر، و `min()` لاستخراج الرقم الأصغر بشكل مباشر.",
      "3- طباعة المخرجات مباشرة من داخل الدالة البرمجية."
    ],
    "code": "def print_min_max(numbers):\n    high = max(numbers)\n    low = min(numbers)\n            \n    print(\"Maximum =\", high)\n    print(\"Minimum =\", low)\n\nmy_list = [10, 20, 5, 40, 1]\nprint_min_max(my_list)",
    "output": "Maximum = 40\nMinimum = 1"
  },
  {
    "id": 14,
    "categoryId": "functions",
    "title": "اختبار العدد الأولي والمربع الكامل",
    "prompt": "اكتب دالة تختبر العدد للتحقق مما إذا كان عدداً أولياً ومربعاً كاملاً، ثم تطبع النتيجة كقيمة منطقية `True` أو `False`.",
    "promptEn": "Write a `Function` that examines a number to check whether it represents a `Prime` entity, and if it comprises a `Perfect Square`, printing boolean variables `True` or `False` for both.",
    "steps": [
      "1- إنشاء الدالة لتحديد قسمين مستقلين لاختبار كل مطلب على حدة.",
      "2- القسم الأول: تستخدم خوارزمية التحقق من العدد الأولي المعتادة لضبط قيمة المتغير الثنائي `is_prime`.",
      "3- القسم الثاني: يتم البحث عن المربع الكامل بواسطة `i * i == n` لضبط وتأكيد قيمة `is_square`.",
      "4- إجراء عمليات الطباعة مباشرة من داخل الدالة دون استخدام خاصية الإرجاع المتقدمة `return`."
    ],
    "code": "def check_prime_and_square(n):\n    is_prime = True\n    if n <= 1:\n        is_prime = False\n    else:\n        for i in range(2, n):\n            if n % i == 0:\n                is_prime = False\n                break\n                \n    is_square = False\n    for i in range(1, n + 1):\n        if i * i == n:\n            is_square = True\n            break\n            \n    print(\"prime:\", is_prime)\n    print(\"square:\", is_square)\n\nn = int(input(\"Enter number: \"))\n\ncheck_prime_and_square(n)",
    "output": "Enter number: 25\nprime: False\nsquare: True"
  },
  {
    "id": 15,
    "categoryId": "conditions",
    "title": "تصنيف درجات الطلبة",
    "prompt": "أدخل `10` درجات في قائمة، وصنّفها بنظام تقديرات الجامعات، ثم اطبع عدد الطلبة الحاصلين على التقدير `A`.",
    "promptEn": "Input `10` exam scores into a `List`, categorize them under university grading bounds, and print the total subset achieving exactly an `A` grade.",
    "steps": [
      "1- كتابة حلقة لطلب `10` درجات دراسية وتعبئتها رقمياً.",
      "2- إدراج وتخزين الدرجات في القائمة بشكل متسلسل.",
      "3- تهيئة المتغير `count_A = 0` لعدّ وتجميع التقديرات الخاصة بـالدرجة `A` بالتحديد.",
      "4- تمرير إشراط التقدير بمبدأ `g >= 90` وإضافة العدد في المتغير في حال التحقق."
    ],
    "code": "grades = []\n\nfor i in range(10):\n    val = int(input(\"Enter grade: \"))\n    grades.append(val)\n\ncount_A = 0\n\nfor g in grades:\n    if g >= 90:\n        count_A = count_A + 1\n\nprint(\"Number of students with A =\", count_A)",
    "output": "Enter grade: 95\n[...]\nNumber of students with A = 2"
  },
  {
    "id": 16,
    "categoryId": "conditions",
    "title": "تحديد العدد الزوجي أو الفردي",
    "prompt": "برنامج يسأل عن عدد صحيح `N`، ويتحقق هل هو زوجي أم فردي، ثم يطبع النتيجة.",
    "promptEn": "A short program asking for an integer `N`, subsequently verifying whether it stands as even or odd, rendering `Even` for matches and `Odd` for discrepancies.",
    "steps": [
      "1- قراءة القيمة `N` من المستخدم كمدخل مباشر.",
      "2- التحقق من باقي القسمة على الرقم اثنان باستخدام عملية `n % 2 == 0` القابلة للمقارنة.",
      "3- إذا كان الباقي يساوي صفراً نطبع نتيجة تدل على أن العدد زوجي.",
      "4- في غير هذه الحالة نطبع نتيجة تدل على أن العدد فردي."
    ],
    "code": "n = int(input(\"Enter number: \"))\n\nif n % 2 == 0:\n    print(\"Even\")\nelse:\n    print(\"Odd\")",
    "output": "Enter number: 8\nEven"
  },
  {
    "id": 17,
    "categoryId": "loops",
    "title": "رسم هرم باستخدام النجوم",
    "prompt": "ارسم الشكل الهرمي باستخدام أداة النجوم `*` بناءً على عملية التصاعد في الحلقات المتكررة للأسطر.",
    "promptEn": "Render a geometric pyramid layout utilizing trailing star indices `*` generated via an ascending looped iteration over consecutive screen lines.",
    "steps": [
      "1- الدوران والمضي حول نطاق الأسطر المطلوب وهو مثال هنا من `1` إلى النطاق الكلي `6`.",
      "2- استخدام خاصية تكرار النصوص في بايثون بكتابة النجمة على التوالي كـ `\"*\" * i`.",
      "3- طباعة المخرجات المتدرجة في كل سطر في التحديث الحلقي."
    ],
    "code": "for i in range(1, 6):\n    print(\"*\" * i)",
    "output": "*\n**\n***\n****\n*****"
  },
  {
    "id": 18,
    "categoryId": "sets",
    "title": "اكتشاف التكرار باستخدام مجموعة",
    "prompt": "أدخل قائمة أرقام، ثم حوّلها إلى مجموعة، واطبع القائمة والمجموعة، وتحقق من وجود قيم مكررة، ثم اطبع القيم المحذوفة.",
    "promptEn": "Input an array list series, map it subsequently onto a `Set` scope, print both collections, verify duplication events logging `True`/`False`, and explicitly output cleared properties.",
    "steps": [
      "1- استقبال الأرقام وتخزينها في قائمة.",
      "2- تحويل القائمة مباشرة إلى مجموعة للتخلص من القيم المكررة.",
      "3- المقارنة بين طولهما باستخدام دالة `len` للتحقق الحاسم من حدوث أي حالة تكرار.",
      "4- البحث عن العناصر المتكررة المحذوفة وإدراجها في قائمة المتغير `deleted` لمعاينتها في الطباعة."
    ],
    "code": "my_list = []\n\nfor i in range(5):\n    num = int(input(\"Enter number: \"))\n    my_list.append(num)\n\nmy_set = set(my_list)\n\nprint(\"Original List:\", my_list)\nprint(\"Set without duplicates:\", my_set)\n\nif len(my_list) != len(my_set):\n    print(\"Found duplicates: True\")\nelse:\n    print(\"Found duplicates: False\")\n\nseen = []\ndeleted = []\n\nfor x in my_list:\n    if x in seen:\n        if x not in deleted:\n            deleted.append(x)\n    else:\n        seen.append(x)\n\nprint(\"Deleted values:\", deleted)",
    "output": "Enter number: 1\n[...]\nOriginal List: [1, 2, 2, 3, 4]\nSet without duplicates: {1, 2, 3, 4}\nFound duplicates: True\nDeleted values: [2]"
  },
  {
    "id": 19,
    "categoryId": "sets",
    "title": "مقارنة مجموعتين",
    "prompt": "أدخل أرقاماً في قائمتين، ثم حوّلهما إلى مجموعتين، واطبع الاتحاد والتقاطع والفرق، وتحقق من تساوي المجموعتين.",
    "promptEn": "Populate two distinct `List` bounds manually, shift them to topological `Set` scopes rendering mathematical `Union`, `Intersection`, standard `Difference`, and ultimately confirm their symmetric integrity.",
    "steps": [
      "1- تجهيز قائمتين فارغتين واستخدام حلقة التكرار لملئهما بخمسة أرقام مدخلة لكل واحدة كحد أقصى.",
      "2- تحويل القائمتين الممتلئتين إلى مجموعات عبر الدالة `set()` لنفي أي تكرار بالأرقام.",
      "3- استخدام المُعاملات الرياضية المختصرة للعمليات: للاتحاد نستخدم `|`، للتقاطع نستخدم `&`، وللفرق المعياري نستخدم `-`.",
      "4- التحقق من تساوي المجموعتين عبر الجملة الشرطية `if set1 == set2`، ثم طباعة النتيجة."
    ],
    "code": "list1 = []\nlist2 = []\n\nfor i in range(5):\n    num = int(input(\"Enter number for list1: \"))\n    list1.append(num)\n\nfor i in range(5):\n    num = int(input(\"Enter number for list2: \"))\n    list2.append(num)\n\nset1 = set(list1)\nset2 = set(list2)\n\nprint(\"Union =\", set1 | set2)\nprint(\"Intersection =\", set1 & set2)\nprint(\"Difference =\", set1 - set2)\n\nif set1 == set2:\n    print(\"Sets are equal\")\nelse:\n    print(\"Sets are not equal\")",
    "output": "Enter number for list1: 1\n[...]\nUnion = {1, 2, 3, 4, 5, 6}\nIntersection = {3, 4}\nDifference = {1, 2}\nSets are not equal"
  },
  {
    "id": 20,
    "categoryId": "sets",
    "title": "المشتركات والفروقات بين مجموعتين",
    "prompt": "أنشئ مجموعتين من الأرقام التي يدخلها المستخدم، ثم استخرج العناصر المشتركة، والعناصر الموجودة في كل مجموعة فقط، والعناصر غير المشتركة.",
    "promptEn": "Generate two operational `Set` bounds iteratively fetched, extracting overlapping intersections, explicitly localized exclusive items, and uniquely unshared components respectively.",
    "steps": [
      "1- تهيئة وإنشاء مجموعتين متفرقتين وفارغتين باستخدام `set()` لتلقي العناصر لاحقاً.",
      "2- تشغيل حلقة تكرار مرتين لطلب وإضافة `5` أرقام لكل مجموعة عبر دالة الإضافة `add()`.",
      "3- استخدام المعاملات الجبرية المختصرة لاستخراج المشترك عبر `&` والعناصر الحصرية باستخدام معاملات الفرق `-`.",
      "4- طباعة العناصر غير المشتركة في المجموعتين باستخدام المعامل `^`."
    ],
    "code": "set1 = set()\nset2 = set()\n\nfor i in range(5):\n    num = int(input(\"Enter number for set1: \"))\n    set1.add(num)\n\nfor i in range(5):\n    num = int(input(\"Enter number for set2: \"))\n    set2.add(num)\n\nprint(\"Common =\", set1 & set2)\n\nprint(\"Only in set1 =\", set1 - set2)\n\nprint(\"Only in set2 =\", set2 - set1)\n\nprint(\"Non repeated =\", set1 ^ set2)",
    "output": "Enter number for set1: 1\n[...]\nCommon = {3}\nOnly in set1 = {1, 2}\nOnly in set2 = {4, 5}\nNon repeated = {1, 2, 4, 5}"
  },
  {
    "id": 21,
    "categoryId": "dictionary",
    "title": "تخزين قوى العدد في قاموس",
    "prompt": "أنشئ قاموساً لحفظ الأرقام، وبداخل كل عنصر قاموس آخر يحتوي على مربع الرقم ومكعبه وقوته الرابعة.",
    "promptEn": "Nest a dictionary layer storing operational attributes computing trailing explicit geometric sequences mapping quadratic, cubic, and quadric polynomial equivalents internally mapping exponential shortcuts.",
    "steps": [
      "1- تهيئة المعجم الرئيسي في المتغير `data` وتجهيزه فارغاً كبداية للمنظومة.",
      "2- تشغيل حلقة التكرار للعد من `1` إلى التصاعد المطلوب باستخدام الدالة `range`.",
      "3- في كل دورة، عيّن المفتاح `i` واجعل قيمته قاموساً داخلياً يحتوي على نواتج الأسس باستخدام المعامل `**`.",
      "4- طباعة بنية ومعمار البيانات النهائية والكاملة للمعجم."
    ],
    "code": "data = {}\n\nfor i in range(1, 4):\n    data[i] = {\n        \"square\": i ** 2,\n        \"cube\": i ** 3,\n        \"power_four\": i ** 4\n    }\n\nprint(data)",
    "output": "{1: {'square': 1, 'cube': 1, 'power_four': 1}, 2: {'square': 4, 'cube': 8, 'power_four': 16}, 3: {'square': 9, 'cube': 27, 'power_four': 81}}"
  },
  {
    "id": 22,
    "categoryId": "dictionary",
    "title": "تخزين أزواج القوى بصيغة زوج مرتب",
    "prompt": "أنشئ قاموساً لحفظ الأرقام كما في الفكرة السابقة، لكن اجعل القيم أزواجاً مرتبة تحتوي على القوى المطلوبة.",
    "promptEn": "Construct identical scalar dictionary configurations adopting static paired constraints utilizing strictly grouped `Tuple` variants instead of sub-dictionaries alongside expedited algorithmic scaling tools.",
    "steps": [
      "1- تهيئة وإنشاء المعجم الرئيسي في متغير `data` وتفريغه للاستقبال.",
      "2- تشغيل حلقة التكرار `for` للتتابع وتوليد الأرقام عبر دالة `range`.",
      "3- ابنِ الأزواج المرتبة باستخدام الأقواس المستديرة `()`، واستعمل المعامل `**` لحساب قوى الرقم.",
      "4- استخدام المفتاح `i` وتمرير البيانات ثم طباعة الناتج بالكامل."
    ],
    "code": "data = {}\n\nfor i in range(1, 4):\n    data[i] = (i ** 2, i ** 3, i ** 4)\n\nprint(data)",
    "output": "{1: (1, 1, 1), 2: (4, 8, 16), 3: (9, 27, 81)}"
  },
  {
    "id": 23,
    "categoryId": "strings",
    "title": "عد حروف العلة والحروف الساكنة",
    "prompt": "استقبال نص صريح، وحساب عدد حروف العلة المكتوبة بالصيغة المتعارفة كـ `vowels` بالإضافة للحروف الساكنة الأخرى والرموز المرافقة.",
    "promptEn": "Prompt open plain texts, scanning tracking vocalic identities practically known explicitly as `vowels`, accompanying concurrent metric assessments concerning trailing solid consonants explicitly ignoring loose punctuation structures.",
    "steps": [
      "1- استقبال السلسلة النصية الواردة كمدخل يُدعى بـ `text`.",
      "2- تحديد السلسلة اللينة التي تحتوي على نطاق حروف العلة لعمل وإكمال المقارنة المطلوبة.",
      "3- عبور حلقة التكرار وتفصيل الجملة حرفاً حرفاً وفحصه بإشراط وتأكيد كونه حرفاً وليس مسافة عبر أداة `isalpha` المحددة.",
      "4- زيادة وطرح العداد الخاص بكل جانب في المسارات التشعبية، ومن ثم طباعة جميع القيم المتوفرة للنتيجة الختامية."
    ],
    "code": "text = input(\"Enter text: \")\n\nvowels = \"aeiouAEIOU\"\nv_count = 0\nc_count = 0\n\nfor char in text:\n    if char.isalpha():\n        if char in vowels:\n            v_count = v_count + 1\n        else:\n            c_count = c_count + 1\n\nprint(\"Vowels =\", v_count)\nprint(\"Consonants =\", c_count)",
    "output": "Enter text: Hello\nVowels = 2\nConsonants = 3"
  },
  {
    "id": 24,
    "categoryId": "strings",
    "title": "تحويل حالة أحرف النص",
    "prompt": "أدخل نصاً، ثم حوّل أحرفه إلى صيغة الأحرف الكبيرة وصيغة الأحرف الصغيرة.",
    "promptEn": "Accept targeted text streams entered securely by arbitrary visitors, subsequently processing raw contents triggering full up-shift transformations creating standardized `upper case` sequences alongside miniaturized `lower case` formats explicitly.",
    "steps": [
      "1- قراءة وقبول النص المستخرج من المستخدِم كمتغير نصي اعتيادي للملف.",
      "2- طباعة وعرض النص مصحوباً باستخدام توجيه وتفعيل الدالة `upper()` لجعل جميع الحروف كبيرة واضحة.",
      "3- طباعة وعرض هذا النص باستخدام تطبيق الدالة المعروفة `lower()` في المقابل لجعل وطباعة الحروف صغيرة بشكل تسلسلي."
    ],
    "code": "text = input(\"Enter text: \")\n\nprint(\"Upper:\", text.upper())\nprint(\"Lower:\", text.lower())",
    "output": "Enter text: Hello World\nUpper: HELLO WORLD\nLower: hello world"
  },
  {
    "id": 25,
    "categoryId": "numbers-problems",
    "title": "عكس ترتيب أرقام العدد",
    "prompt": "عكس وقلب اتجاه ترتيب أرقام العدد كاملة (مثال: من الرقم الأصلي `123` بالاتجاه الصاعد إلى `321` بصورته الهابطة المعكوسة).",
    "promptEn": "Reverse flip and actively re-arrange absolute whole number string sets procedurally overriding standard sequences (Example rendering specifically: converting source input `123` incrementally shifted into backward `321` arrangements dynamically).",
    "steps": [
      "1- قراءة العدد من المستخدم واستقباله كمتغير نصي.",
      "2- استخدام التقطيع النصي عبر المعامل العكسي `[::-1]` لعكس ترتيب جميع أرقام العدد.",
      "3- الاعتماد المباشر على هذه الأداة البسيطة ومن ثم طباعة الرقم بصورته المعكوسة فوراً."
    ],
    "code": "N = input(\"Enter N: \")\n\nprint(N[::-1])",
    "output": "Enter N: 123\n321"
  }
];
