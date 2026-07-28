// Native Python practice data for X7do0 Academy.
// Keep interface translations in theme-manager.js; this file owns practice content only.

export const categories = [
  {
    "id": "fibonacci",
    "label": {
      "en": "Fibonacci",
      "ar": "فيبوناتشي"
    }
  },
  {
    "id": "factorial",
    "label": {
      "en": "Factorial",
      "ar": "المضروب"
    }
  },
  {
    "id": "lists",
    "label": {
      "en": "Lists",
      "ar": "القوائم"
    }
  },
  {
    "id": "prime-numbers",
    "label": {
      "en": "Prime Numbers",
      "ar": "الأعداد الأولية"
    }
  },
  {
    "id": "functions",
    "label": {
      "en": "Functions",
      "ar": "الدوال"
    }
  },
  {
    "id": "conditions",
    "label": {
      "en": "Conditions",
      "ar": "الشروط"
    }
  },
  {
    "id": "loops",
    "label": {
      "en": "Loops",
      "ar": "الحلقات التكرارية"
    }
  },
  {
    "id": "sets",
    "label": {
      "en": "Sets",
      "ar": "المجموعات"
    }
  },
  {
    "id": "dictionary",
    "label": {
      "en": "Dictionary",
      "ar": "القواميس"
    }
  },
  {
    "id": "strings",
    "label": {
      "en": "Strings",
      "ar": "النصوص"
    }
  },
  {
    "id": "numbers-problems",
    "label": {
      "en": "Numbers Problems",
      "ar": "مسائل الأعداد"
    }
  }
];

export const questions = [
  {
    "id": 1,
    "categoryId": "fibonacci",
    "title": {
      "en": "Question 1: Print the First N Fibonacci Numbers",
      "ar": "السؤال 1: طباعة أول N من متتالية فيبوناتشي"
    },
    "prompt": {
      "en": "Write a program that asks the user to enter a positive integer `N`, then prints the first `N` numbers of the `Fibonacci` sequence.",
      "ar": "اكتب برنامج يطلب من المستخدم إدخال عدد صحيح موجب `N`، ثم يقوم بطباعة أول `N` رقم من `Fibonacci`."
    },
    "steps": {
      "en": [
        "1- Read the number `N` from the user.",
        "2- Initialize variable `a` to 0 and variable `b` to 1.",
        "3- Use a loop to iterate `N` times.",
        "4- Print the value of variable `a` in each iteration.",
        "5- Calculate variable `c` by adding `a + b`, then update the variables' values for the next iteration."
      ],
      "ar": [
        "1- قراءة العدد `N` من المستخدم.",
        "2- تهيئة المتغير `a` بصفر والمتغير `b` بواحد.",
        "3- استخدام حلقة تكرار للمرور `N` من المرات.",
        "4- طباعة قيمة المتغير `a` في كل دورة.",
        "5- حساب المتغير `c` بجمع `a + b`، ثم تحديث قيم المتغيرات للحلقة القادمة."
      ]
    },
    "code": "n = int(input(\"Enter n: \"))\n\na = 0\nb = 1\n\nfor i in range(n):\n    print(a)\n    c = a + b\n    a = b\n    b = c",
    "output": "Enter n: 5\n0\n1\n1\n2\n3"
  },
  {
    "id": 2,
    "categoryId": "fibonacci",
    "title": {
      "en": "Question 2: Fibonacci Numbers Divisible by 3",
      "ar": "السؤال 2: أعداد فيبوناتشي القابلة للقسمة على 3"
    },
    "prompt": {
      "en": "Write a program that asks the user to enter a positive integer `N`, generates the first `N` numbers of the `Fibonacci` sequence, stores them in a `List`, and then prints the values that are divisible by `3` without a remainder.",
      "ar": "اكتب برنامج يطلب من المستخدم إدخال عدد صحيح موجب `N`، ثم يقوم بتوليد أول `N` رقم من سلسلة `Fibonacci` وتخزينها داخل `List`، وبعد ذلك يقوم بطباعة القيم التي تقبل القسمة على `3` بدون باقي."
    },
    "steps": {
      "en": [
        "1- Read the number `N` from the user.",
        "2- Create an empty list to store the `Fibonacci` numbers.",
        "3- Use a loop to append sequence numbers to the list using the standard approach.",
        "4- Use a new loop to iterate over the populated list.",
        "5- Print the number if it is divisible by `3` and not equal to zero (`num % 3 == 0`)."
      ],
      "ar": [
        "1- قراءة العدد `N` من المستخدم.",
        "2- إنشاء قائمة فارغة لتخزين أرقام `Fibonacci`.",
        "3- استخدام حلقة تكرار لإضافة أرقام السلسلة إلى القائمة باستخدام نفس الطريقة الأساسية.",
        "4- استخدام حلقة تكرار جديدة للمرور على القائمة.",
        "5- طباعة الرقم إذا كان يقبل القسمة على `3` ولا يساوي صفراً (`num % 3 == 0`)."
      ]
    },
    "code": "n = int(input(\"Enter n: \"))\n\nfib_list = []\na = 0\nb = 1\n\nfor i in range(n):\n    fib_list.append(a)\n    c = a + b\n    a = b\n    b = c\n\nfor num in fib_list:\n    if num % 3 == 0 and num != 0:\n        print(num)",
    "output": "Enter n: 10\n3\n21"
  },
  {
    "id": 3,
    "categoryId": "fibonacci",
    "title": {
      "en": "Question 3: Fibonacci Numbers Below N",
      "ar": "السؤال 3: أعداد فيبوناتشي الأصغر من N"
    },
    "prompt": {
      "en": "Write a program that asks the user to enter a positive integer `N`, then prints all `Fibonacci` sequence numbers that are strictly less than the entered number `N`.",
      "ar": "اكتب برنامج يطلب من المستخدم إدخال عدد صحيح موجب `N`، ثم يقوم بطباعة جميع أرقام سلسلة `Fibonacci` التي تكون أقل من العدد المدخل `N`."
    },
    "steps": {
      "en": [
        "1- Read the number `N` from the user.",
        "2- Initialize the primary variables `a = 0` and `b = 1`.",
        "3- Use a `while` loop that continues as long as `a < N`.",
        "4- Print the value of `a` and sequentially update the variables to get the next number."
      ],
      "ar": [
        "1- قراءة العدد `N` من المستخدم.",
        "2- تهيئة المتغيرات الأساسية `a = 0` و `b = 1`.",
        "3- استخدام حلقة تكرار `while` التي تستمر طالما أن قيمة `a < N`.",
        "4- طباعة قيمة `a` ثم تحديث القيم للحصول على الرقم التالي."
      ]
    },
    "code": "n = int(input(\"Enter n: \"))\n\na = 0\nb = 1\n\nwhile a < n:\n    print(a)\n    c = a + b\n    a = b\n    b = c",
    "output": "Enter n: 20\n0\n1\n1\n2\n3\n5\n8\n13"
  },
  {
    "id": 4,
    "categoryId": "factorial",
    "title": {
      "en": "Question 4: Calculate a Factorial",
      "ar": "السؤال 4: حساب مضروب عدد"
    },
    "prompt": {
      "en": "Write a program that asks the user to enter a positive integer `N`, calculates the `Factorial` value of the entered number, and prints it.",
      "ar": "اكتب برنامج يطلب من المستخدم إدخال عدد صحيح موجب `N`، ثم يقوم بحساب قيمة `Factorial` للعدد المدخل وطباعته."
    },
    "steps": {
      "en": [
        "1- Read the requested number from the user.",
        "2- Initialize the variable `fact` to `1` as the starting point for multiplication.",
        "3- Use a loop to iterate from `1` up to `N` (inclusive).",
        "4- Update the variable using the formula `fact = fact * i`.",
        "5- Print the final calculated factorial result."
      ],
      "ar": [
        "1- قراءة العدد المطلوب من المستخدم.",
        "2- تهيئة المتغير `fact` بقيمة `1` كبداية للضرب.",
        "3- استخدام حلقة تكرار للعد من `1` إلى `N` (شاملة).",
        "4- تحديث المتغير بصيغة `fact = fact * i`.",
        "5- طباعة الناتج النهائي للمضروب."
      ]
    },
    "code": "n = int(input(\"Enter number: \"))\n\nfact = 1\n\nfor i in range(1, n + 1):\n    fact = fact * i\n\nprint(\"Factorial =\", fact)",
    "output": "Enter number: 5\nFactorial = 120"
  },
  {
    "id": 5,
    "categoryId": "factorial",
    "title": {
      "en": "Question 5: Factorial Result Parity",
      "ar": "السؤال 5: تحديد زوجية ناتج المضروب"
    },
    "prompt": {
      "en": "Write a program that asks the user to enter a positive integer `N`, calculates its `Factorial`, checks if the result is even or odd, and prints the result.",
      "ar": "اكتب برنامج يطلب من المستخدم إدخال عدد صحيح موجب `N`، ثم يقوم بحساب قيمة `Factorial` للعدد المدخل، وبعد ذلك يتحقق هل الناتج زوجي أم فردي ويطبع النتيجة."
    },
    "steps": {
      "en": [
        "1- Read the input from the user into the variable `N`.",
        "2- Calculate the final factorial result using the standard method.",
        "3- Use a conditional statement to check the remainder using `fact % 2 == 0`.",
        "4- Print `Even` or `Odd` based on the evaluated condition."
      ],
      "ar": [
        "1- قراءة الدخل من المستخدم كمتغير `N`.",
        "2- حساب الناتج النهائي للمضروب كما في الطريقة الأساسية.",
        "3- استخدام الجملة الشرطية لاختبار باقي القسمة للناتج بدلالة `fact % 2 == 0`.",
        "4- طباعة ما إذا كان الرقم `Even` زوجياً أو `Odd` فردياً بناءً على النتيجة."
      ]
    },
    "code": "n = int(input(\"Enter number: \"))\n\nfact = 1\n\nfor i in range(1, n + 1):\n    fact = fact * i\n\nprint(\"Factorial =\", fact)\n\nif fact % 2 == 0:\n    print(\"Even\")\nelse:\n    print(\"Odd\")",
    "output": "Enter number: 3\nFactorial = 6\nEven"
  },
  {
    "id": 6,
    "categoryId": "factorial",
    "title": {
      "en": "Question 6: Sum Factorials from 1 to N",
      "ar": "السؤال 6: جمع المضاريب من 1 إلى N"
    },
    "prompt": {
      "en": "Write a program that asks the user to enter a positive integer `N`, calculates the sum of factorials from `1!` to `N!`, and prints the result.",
      "ar": "اكتب برنامج يطلب من المستخدم إدخال عدد صحيح موجب `N`، ثم يقوم بحساب مجموع القيم من `1!` إلى `N!` وطباعة الناتج."
    },
    "steps": {
      "en": [
        "1- Read the number `N` provided by the user.",
        "2- Initialize `fact = 1` to hold the factorial value, and `total = 0` to accumulate the sums.",
        "3- Use a loop to iterate upwards from `1` to `N`.",
        "4- In each iteration, multiply and update the `fact` variable by the current loop index `i`.",
        "5- Directly add the extracted factorial value to the `total` sum variable.",
        "6- Print the final accumulated `total` outside the loop."
      ],
      "ar": [
        "1- قراءة العدد `N` من قبل المستخدم.",
        "2- تهيئة المتغير `fact = 1` لحفظ قيمة المضروب، والمتغير `total = 0` لجمع القيم بصورة تراكمية.",
        "3- استخدام حلقة التكرار للمرور والتصاعد من `1` إلى `N`.",
        "4- في كل دورة يتم ضرب قيمة `fact` وتحديثها برقم الدورة الحالية `i` للحصول على المضروب.",
        "5- إضافة هذا المضروب المستخرج مباشرة إلى المجموع `total`.",
        "6- طباعة المجموع النهائي `total` خارج الحلقة التكرارية."
      ]
    },
    "code": "n = int(input(\"Enter a number: \"))\n\nfact = 1\ntotal = 0\n\nfor i in range(1, n + 1):\n    fact = fact * i\n    total += fact\n\nprint (total)",
    "output": "Enter a number: 3\n9"
  },
  {
    "id": 7,
    "categoryId": "lists",
    "title": {
      "en": "Question 7: Analyze a List of Ten Numbers",
      "ar": "السؤال 7: تحليل قائمة من عشرة أعداد"
    },
    "prompt": {
      "en": "Write a program that takes `10` integers from the user, stores them in a `List`, and performs various operations (Print, Sum, Average, Maximum, Minimum, Elements greater/less than average).",
      "ar": "اكتب برنامج يطلب من المستخدم إدخال `10` أرقام صحيحة وتخزينها داخل `List`، ثم يقوم بتنفيذ مجموعة من المطالب (طباعة، مجموع، معدل، الأكبر، الأصغر، أكبر/أقل من المعدل)."
    },
    "steps": {
      "en": [
        "1- Create an empty list and use a loop with `range(10)` to prompt for numbers.",
        "2- Use a loop to iterate over the list, calculate the total sum, and find the average via `avg = total / 10`.",
        "3- Use built-in functions to directly extract the largest number `max()` and the smallest number `min()`.",
        "4- Print the specific numbers matching the conditions `x > avg` and `x < avg`."
      ],
      "ar": [
        "1- إنشاء قائمة فارغة وكتابة حلقة تكرار باستخدام الدالة `range(10)` لطلب الأرقام.",
        "2- استخدام حلقة للمرور على القائمة وحساب المجموع الكلي لمعرفة المعدل `avg = total / 10`.",
        "3- استخدام الدوال المدمجة للاستخراج المباشر لأكبر رقم `max()` وأصغر رقم `min()`.",
        "4- طباعة الأرقام المحددة بشكل مطابق للشروط `x > avg` و `x < avg`."
      ]
    },
    "code": "numbers = []\n\nfor i in range(10):\n    num = int(input(\"Enter number: \"))\n    numbers.append(num)\n\nprint(\"Elements:\", numbers)\n\ntotal = 0\nfor x in numbers:\n    total = total + x\nprint(\"Sum:\", total)\n\navg = total / 10\nprint(\"Average:\", avg)\n\nprint(\"Maximum:\", max(numbers))\nprint(\"Minimum:\", min(numbers))\n\nprint(\"Greater than average:\")\nfor x in numbers:\n    if x > avg:\n        print(x)\n\nprint(\"Less than average:\")\nfor x in numbers:\n    if x < avg:\n        print(x)",
    "output": "Enter number: 1\n[... inputs 2 to 10]\nElements: [1, 2, ... ]\nSum: 55\nAverage: 5.5\nMaximum: 10\nMinimum: 1\nGreater than average: ..."
  },
  {
    "id": 8,
    "categoryId": "lists",
    "title": {
      "en": "Question 8: Filter Numbers Above a Threshold",
      "ar": "السؤال 8: تصفية الأعداد الأكبر من قيمة محددة"
    },
    "prompt": {
      "en": "Write a program that asks the user to enter integers until `0` is entered to stop the loop. Then, request a specific target number and print all numbers greater than it along with their count.",
      "ar": "اكتب برنامج يطلب من المستخدم إدخال أرقام صحيحة إلى أن يتم إدخال `0` لإيقاف الحلقة. ثم يطلب إدخال رقم معين ويقوم بطباعة جميع الأرقام الأكبر منه وعددها."
    },
    "steps": {
      "en": [
        "1- Use a `while True` loop to ask the user for a number until `0` is entered.",
        "2- Break the loop using the `break` command, then ask the user for the target number.",
        "3- Iterate through the list to find numbers where `x > target` and tally them with a `count` variable.",
        "4- Print out the newly formed list alongside the final event count."
      ],
      "ar": [
        "1- استخدام حلقة التكرار `while True` لسؤال المستخدم عن الرقم إلى أن يتم إدخال `0`.",
        "2- إيقاف الحلقة عبر أمر `break` وسؤال المستخدم عن الرقم المستهدف `target`.",
        "3- استخدام حلقة للبحث عن الأرقام التي تعدت قيمتها `x > target` وعدّها بمتغير `count`.",
        "4- طباعة القائمة الجديدة والعدد النهائي للحالات."
      ]
    },
    "code": "numbers = []\n\nwhile True:\n    num = int(input(\"Enter number (0 to stop): \"))\n    if num == 0:\n        break\n    numbers.append(num)\n\ntarget = int(input(\"Enter target number: \"))\n\ngreater_list = []\ncount = 0\n\nfor x in numbers:\n    if x > target:\n        greater_list.append(x)\n        count = count + 1\n\nprint(\"Numbers greater than target:\", greater_list)\nprint(\"Count =\", count)",
    "output": "Enter number (0 to stop): 15\nEnter number (0 to stop): 0\nEnter target number: 10\nNumbers greater than target: [15]\nCount = 1"
  },
  {
    "id": 9,
    "categoryId": "lists",
    "title": {
      "en": "Question 9: Filter a List by Divisibility",
      "ar": "السؤال 9: تصفية قائمة حسب قابلية القسمة"
    },
    "prompt": {
      "en": "Write a program that asks for `10` numbers to populate a `List`, then asks for a specific divisor, and prints all numbers in the list that are fully divisible by it.",
      "ar": "اكتب برنامج يطلب إدخال `10` أرقام في قائمة `List`، ثم يطلب رقم معين، ويطبع جميع الأرقام التي تقبل القسمة عليه."
    },
    "steps": {
      "en": [
        "1- Read `10` numbers recursively and append them inside the list structure.",
        "2- Read the target number to be used as the `divisor`.",
        "3- Test each list item against the divisor using the modulo operator `x % divisor == 0`.",
        "4- Print the number if the remainder equals zero, indicating perfect divisibility."
      ],
      "ar": [
        "1- قراءة `10` أرقام كالمعتاد وحفظهم داخل القائمة الطويلة.",
        "2- قراءة الرقم الذي سنستخدمه كمقسوم عليه `divisor`.",
        "3- اختبار الأرقام في محتوى القائمة باستخدام معامل باقي القسمة `x % divisor == 0`.",
        "4- طباعة كل رقم إذا كان الحاصل مساوياً للصفر أي تقبل القسمة بدون باقي."
      ]
    },
    "code": "numbers = []\n\nfor i in range(10):\n    num = int(input(\"Enter number: \"))\n    numbers.append(num)\n\ndivisor = int(input(\"Enter divisor: \"))\n\nprint(\"Numbers divisible by\", divisor, \":\")\nfor x in numbers:\n    if divisor != 0 and x % divisor == 0:\n        print(x)",
    "output": "Enter number: 2\n[...]\nEnter divisor: 2\nNumbers divisible by 2 :\n2\n4\n..."
  },
  {
    "id": 10,
    "categoryId": "prime-numbers",
    "title": {
      "en": "Question 10: Check Whether a Number Is Prime",
      "ar": "السؤال 10: التحقق من العدد الأولي"
    },
    "prompt": {
      "en": "Write a program to verify whether the entered number is a prime number and print `True` or `False` accordingly.",
      "ar": "اكتب برنامج للتحقق هل العدد المدخل عدد أولي أم لا وطباعة `True` او `False`."
    },
    "steps": {
      "en": [
        "1- Read the number `N` entered by the user for internal validation.",
        "2- Initialize a boolean variable `prime = True`, assuming the number is prime initially.",
        "3- Pre-check: if `N <= 1`, then the number fundamentally cannot be prime.",
        "4- Execute a loop to iterate through all possible denominators for division verification.",
        "5- Print `True` if conditions hold, or print `False` if the number is divisible by any alternative value."
      ],
      "ar": [
        "1- قراءة الرقم `N` المدخل من المستخدم بغرض الفحص.",
        "2- تهيئة متغير منطقي `prime = True` واعتباره صحيحاً في البداية.",
        "3- التحقق المسبق؛ إذا كان `N <= 1` فلا يمكن أن يكون الرقم أولي.",
        "4- تشغيل حلقة التكرار للمرور على كل الأرقام المحتملة لقسمتها بشكل كامل.",
        "5- طباعة النتيجة `True` أو طباعة `False` إذا قَبِل القسمة على عدد آخر."
      ]
    },
    "code": "n = int(input(\"Enter number: \"))\n\nprime = True\n\nif n <= 1:\n    prime = False\nelse:\n    for i in range(2, n):\n        if n % i == 0:\n            prime = False\n            break\n\nprint(prime)",
    "output": "Enter number: 7\nTrue"
  },
  {
    "id": 11,
    "categoryId": "prime-numbers",
    "title": {
      "en": "Question 11: Prime Numbers Through N",
      "ar": "السؤال 11: الأعداد الأولية حتى N"
    },
    "prompt": {
      "en": "A program that prints prime numbers from `1` to `N`, and then finds and prints the very first prime number coming right after `N`.",
      "ar": "برنامج يطبع الأعداد الأولية من `1` إلى `N`، ثم يطبع أول عدد أولي يأتي بعد الرقم المدخل `N`."
    },
    "steps": {
      "en": [
        "1- Read the bounds defined by variable `N`.",
        "2- Iterate via a loop from `1` to `N`, internally verify if the numbers are prime, and print them.",
        "3- Utilize a `while` loop using a shifting increment starting from `N + 1` to search continuously.",
        "4- Terminate the loop using `break` and print the value once a novel prime number condition is met."
      ],
      "ar": [
        "1- قراءة العدد `N` لحصر النطاق وتحديده.",
        "2- تشغيل حلقة التكرار من `1` إلى `N` والتحقق من كون الأرقام أولية وطباعتهم.",
        "3- استخدام حلقة `while` مع متغير جديد يبدأ من نقطة `N + 1` للبحث عن الرقم المستقبلي التدريجي.",
        "4- إيقاف الحلقة عبر `break` وطباعة العدد بمجرد إيجاد عدد أولي جديد يحقق الشروط."
      ]
    },
    "code": "n = int(input(\"Enter number: \"))\n\nprint(\"Primes from 1 to\", n, \":\")\nfor i in range(1, n + 1):\n    prime = True\n    if i <= 1:\n        prime = False\n    else:\n        for j in range(2, i):\n            if i % j == 0:\n                prime = False\n                break\n    \n    if prime == True:\n        print(i)\n\nnext_num = n + 1\nwhile True:\n    prime = True\n    for j in range(2, next_num):\n        if next_num % j == 0:\n            prime = False\n            break\n            \n    if prime == True:\n        print(\"Next prime =\", next_num)\n        break\n        \n    next_num = next_num + 1",
    "output": "Enter number: 10\nPrimes from 1 to 10:\n2\n3\n5\n7\nNext prime = 11"
  },
  {
    "id": 12,
    "categoryId": "functions",
    "title": {
      "en": "Question 12: Test Divisibility by 2 and 3",
      "ar": "السؤال 12: اختبار القسمة على 2 و3"
    },
    "prompt": {
      "en": "A program that generates a random number and passes it to a `Function` to verify if it is divisible by both `2` and `3` completely.",
      "ar": "برنامج يولد عدد عشوائي ويمرره إلى الـ `Function` لكي تتحقق مما إذا كان يقبل القسمة على `2` و `3` معاً."
    },
    "steps": {
      "en": [
        "1- Import the `random` library to manage generation and instantly spawn a number.",
        "2- Define a function taking that variable, running a dual modulo test via `num % 2 == 0 and num % 3 == 0`.",
        "3- Cleanly pass the randomly generated number into the function to trigger the calculation and print."
      ],
      "ar": [
        "1- استيراد مكتبة `random` للتعامل مع الأرقام العشوائية وتوليد رقم فوري.",
        "2- إنشاء دالة تستقبل المتغير، وتشغل اختباراً مزدوجاً بباقي القسمة بطريقة `num % 2 == 0 and num % 3 == 0`.",
        "3- تمرير الرقم المُولد بشكل نظيف إلى الدالة للحصول على الجواب الصحيح وطباعته."
      ]
    },
    "code": "import random\n\ndef check_divisibility(num):\n    if num % 2 == 0 and num % 3 == 0:\n        print(num, \"is divisible by 2 and 3\")\n    else:\n        print(num, \"is NOT divisible by 2 and 3\")\n\nrand_num = random.randint(1, 100)\nprint(\"Generated Number =\", rand_num)\ncheck_divisibility(rand_num)",
    "output": "Generated Number = 12\n12 is divisible by 2 and 3"
  },
  {
    "id": 13,
    "categoryId": "functions",
    "title": {
      "en": "Question 13: Find a List Minimum and Maximum",
      "ar": "السؤال 13: إيجاد أصغر وأكبر قيمة في قائمة"
    },
    "prompt": {
      "en": "A `Function` that accepts a `List` structure as input, and prints the highest and the lowest numerical values residing inside it.",
      "ar": "دالة أو `Function` تستقبل مدخل من نوع القائمة `List`، وتطبع أكبر قيمة وأصغر قيمة."
    },
    "steps": {
      "en": [
        "1- Declare the function intended to receive the parameter named `numbers`.",
        "2- Leverage Python's built-in functions `max()` to extract the largest value and `min()` for the smallest respectively.",
        "3- Execute output printing directly from inside the function scope."
      ],
      "ar": [
        "1- تعريف الدالة لاستقبال القائمة المُسماة `numbers` كمعطى أساسي.",
        "2- استخدام دوال بايثون المدمجة `max()` لاستخراج الرقم الأكبر، و `min()` لاستخراج الرقم الأصغر بشكل مباشر.",
        "3- طباعة المخرجات مباشرة من داخل الدالة البرمجية."
      ]
    },
    "code": "def print_min_max(numbers):\n    high = max(numbers)\n    low = min(numbers)\n            \n    print(\"Maximum =\", high)\n    print(\"Minimum =\", low)\n\nmy_list = [10, 20, 5, 40, 1]\nprint_min_max(my_list)",
    "output": "Maximum = 40\nMinimum = 1"
  },
  {
    "id": 14,
    "categoryId": "functions",
    "title": {
      "en": "Question 14: Prime and Perfect-Square Tests",
      "ar": "السؤال 14: اختبار العدد الأولي والمربع الكامل"
    },
    "prompt": {
      "en": "Write a `Function` that examines a number to check whether it represents a `Prime` entity, and if it comprises a `Perfect Square`, printing boolean variables `True` or `False` for both.",
      "ar": "كتابة `Function` تختبر العدد للتحقق إذا كان أولياً `Prime` وإذا كان مربعاً كاملاً `Perfect Square` ويدرج كقيمة منطقية `True` أم `False`."
    },
    "steps": {
      "en": [
        "1- Create the logic function dividing evaluations into two independent segments.",
        "2- Segment 1: Apply standard prime verification to dynamically flag the boolean variable `is_prime`.",
        "3- Segment 2: Sweep for a complete square via the multiplication format `i * i == n` setting `is_square`.",
        "4- Enforce direct printing operations internally without executing explicit `return` instructions."
      ],
      "ar": [
        "1- إنشاء الدالة لتحديد قسمين مستقلين لاختبار كل مطلب على حدة.",
        "2- القسم الأول: تستخدم خوارزمية التحقق من العدد الأولي المعتادة لضبط قيمة المتغير الثنائي `is_prime`.",
        "3- القسم الثاني: يتم البحث عن المربع الكامل بواسطة `i * i == n` لضبط وتأكيد قيمة `is_square`.",
        "4- إجراء عمليات الطباعة مباشرة من داخل الدالة دون استخدام خاصية الإرجاع المتقدمة `return`."
      ]
    },
    "code": "def check_prime_and_square(n):\n    is_prime = True\n    if n <= 1:\n        is_prime = False\n    else:\n        for i in range(2, n):\n            if n % i == 0:\n                is_prime = False\n                break\n                \n    is_square = False\n    for i in range(1, n + 1):\n        if i * i == n:\n            is_square = True\n            break\n            \n    print(\"prime:\", is_prime)\n    print(\"square:\", is_square)\n\nn = int(input(\"Enter number: \"))\n\ncheck_prime_and_square(n)",
    "output": "Enter number: 25\nprime: False\nsquare: True"
  },
  {
    "id": 15,
    "categoryId": "conditions",
    "title": {
      "en": "Question 15: Classify Student Grades",
      "ar": "السؤال 15: تصنيف درجات الطلبة"
    },
    "prompt": {
      "en": "Input `10` exam scores into a `List`, categorize them under university grading bounds, and print the total subset achieving exactly an `A` grade.",
      "ar": "إدخال `10` درجات في `List`، وتصنيف الدرجات بنظام تقديرات الجامعات وطباعة العدد الحاصل على التقدير `A` كمثال محدد للعمليات."
    },
    "steps": {
      "en": [
        "1- Instantiate a loop block prompting exactly `10` periodic academic scores numerically.",
        "2- Store and append those scores inside the initialized variable structure.",
        "3- Prepare `count_A = 0` specifically designed to track and cumulate absolute `A` conditions.",
        "4- Filter using evaluations modeled as `g >= 90`, incrementally updating the tally on success."
      ],
      "ar": [
        "1- كتابة حلقة لطلب `10` درجات دراسية وتعبئتها رقمياً.",
        "2- إدراج وتخزين الدرجات في القائمة بشكل متسلسل.",
        "3- تهيئة المتغير `count_A = 0` لعدّ وتجميع التقديرات الخاصة بـالدرجة `A` بالتحديد.",
        "4- تمرير إشراط التقدير بمبدأ `g >= 90` وإضافة العدد في المتغير في حال التحقق."
      ]
    },
    "code": "grades = []\n\nfor i in range(10):\n    val = int(input(\"Enter grade: \"))\n    grades.append(val)\n\ncount_A = 0\n\nfor g in grades:\n    if g >= 90:\n        count_A = count_A + 1\n\nprint(\"Number of students with A =\", count_A)",
    "output": "Enter grade: 95\n[...]\nNumber of students with A = 2"
  },
  {
    "id": 16,
    "categoryId": "conditions",
    "title": {
      "en": "Question 16: Determine Even or Odd",
      "ar": "السؤال 16: تحديد العدد الزوجي أو الفردي"
    },
    "prompt": {
      "en": "A short program asking for an integer `N`, subsequently verifying whether it stands as even or odd, rendering `Even` for matches and `Odd` for discrepancies.",
      "ar": "برنامج يسأل عن عدد صحيح `N`، ويتحقق هل هو زوجي أم فردي ويطبع النتيجة ككلمة `Even` للزوجي أو `Odd` للفردي."
    },
    "steps": {
      "en": [
        "1- Read the direct variable input parameter `N`.",
        "2- Test mathematical division remainder via logic comparison structured as `n % 2 == 0`.",
        "3- Assuming a zero-matching remainder, strictly print `Even` corresponding to uniform pairs.",
        "4- Conversely under a failed comparison, trigger printing `Odd` conveying an asymmetric state."
      ],
      "ar": [
        "1- قراءة القيمة `N` من المستخدم كمدخل مباشر.",
        "2- التحقق من باقي القسمة على الرقم اثنان باستخدام عملية `n % 2 == 0` القابلة للمقارنة.",
        "3- إذا كان الباقي يساوي صفراً نطبع `Even` ليتم التعرف على كونه زوجياً.",
        "4- في غير هذه الحالة نطبع `Odd` للدلالة على العدد الفردي."
      ]
    },
    "code": "n = int(input(\"Enter number: \"))\n\nif n % 2 == 0:\n    print(\"Even\")\nelse:\n    print(\"Odd\")",
    "output": "Enter number: 8\nEven"
  },
  {
    "id": 17,
    "categoryId": "loops",
    "title": {
      "en": "Question 17: Draw a Star Pyramid",
      "ar": "السؤال 17: رسم هرم باستخدام النجوم"
    },
    "prompt": {
      "en": "Render a geometric pyramid layout utilizing trailing star indices `*` generated via an ascending looped iteration over consecutive screen lines.",
      "ar": "ارسم الشكل الهرمي باستخدام أداة النجوم `*` بناءً على عملية التصاعد في الحلقات المتكررة للأسطر."
    },
    "steps": {
      "en": [
        "1- Iterate across necessary visual bounding margins using a range scaling from `1` up to roughly `6`.",
        "2- Take advantage of Python's string repetition properties formulating expressions equivalent to `\"*\" * i`.",
        "3- Output progressively scaled text values row-by-row mapping properly synchronized indices."
      ],
      "ar": [
        "1- الدوران والمضي حول نطاق الأسطر المطلوب وهو مثال هنا من `1` إلى النطاق الكلي `6`.",
        "2- استخدام خاصية تكرار النصوص في بايثون بكتابة النجمة على التوالي كـ `\"*\" * i`.",
        "3- طباعة المخرجات المتدرجة في كل سطر في التحديث الحلقي."
      ]
    },
    "code": "for i in range(1, 6):\n    print(\"*\" * i)",
    "output": "*\n**\n***\n****\n*****"
  },
  {
    "id": 18,
    "categoryId": "sets",
    "title": {
      "en": "Question 18: Detect Duplicates with a Set",
      "ar": "السؤال 18: اكتشاف التكرار باستخدام Set"
    },
    "prompt": {
      "en": "Input an array list series, map it subsequently onto a `Set` scope, print both collections, verify duplication events logging `True`/`False`, and explicitly output cleared properties.",
      "ar": "أدخل قائمة أرقام، ثُم حوّلها إلى التابع `Set`، واطبع الـ `List` ثم مجموعة الـ `Set`، وتأكد من حدوث التكرار بتمرير `True` أو `False`، واطبع القيم المحذوفة."
    },
    "steps": {
      "en": [
        "1- Receive integers populating the central variable `List` instance structure incrementally.",
        "2- Port the raw arrays transparently into a `Set` schema inherently purging trailing repetitions via native logic.",
        "3- Employ differential analysis comparing overall lengths utilizing `len` revealing actual mutation traces.",
        "4- Perform a linear scan detecting removed redundant items populating a distinct `deleted` collector block for layout viewing."
      ],
      "ar": [
        "1- استقبال كمية الأرقام في `List` لتكوين وتخزين القائمة المعنية.",
        "2- تحويل القائمة مباشرة إلى `Set` للتخلص من أي بيانات مكررة تلقائياً داخل الدالة.",
        "3- المقارنة بين طولهما باستخدام دالة `len` للتحقق الحاسم من حدوث أي حالة تكرار.",
        "4- البحث عن العناصر المتكررة المحذوفة وإدراجها في قائمة المتغير `deleted` لمعاينتها في الطباعة."
      ]
    },
    "code": "my_list = []\n\nfor i in range(5):\n    num = int(input(\"Enter number: \"))\n    my_list.append(num)\n\nmy_set = set(my_list)\n\nprint(\"Original List:\", my_list)\nprint(\"Set without duplicates:\", my_set)\n\nif len(my_list) != len(my_set):\n    print(\"Found duplicates: True\")\nelse:\n    print(\"Found duplicates: False\")\n\nseen = []\ndeleted = []\n\nfor x in my_list:\n    if x in seen:\n        if x not in deleted:\n            deleted.append(x)\n    else:\n        seen.append(x)\n\nprint(\"Deleted values:\", deleted)",
    "output": "Enter number: 1\n[...]\nOriginal List: [1, 2, 2, 3, 4]\nSet without duplicates: {1, 2, 3, 4}\nFound duplicates: True\nDeleted values: [2]"
  },
  {
    "id": 19,
    "categoryId": "sets",
    "title": {
      "en": "Question 19: Compare Two Sets",
      "ar": "السؤال 19: مقارنة مجموعتين"
    },
    "prompt": {
      "en": "Populate two distinct `List` bounds manually, shift them to topological `Set` scopes rendering mathematical `Union`, `Intersection`, standard `Difference`, and ultimately confirm their symmetric integrity.",
      "ar": "إدخال أرقام لقائمتين `List`، ثم تحويلهما إلى مجموعتين `Set` لطباعة قيم الاتحاد `Union`، والتقاطع `Intersection`، والتفرقة `Difference`، والتأكد من التساوي."
    },
    "steps": {
      "en": [
        "1- Construct placeholder arrays filling them sequentially prompting precisely maximum limits scaling per variable group.",
        "2- Transcribe raw bounds directly towards identical unrepeated collections implementing native `set()` algorithms.",
        "3- Implement succinct operand syntax: piping `|` dictates Unions, associative `&` pulls Intersections, and `-` retrieves standard differences.",
        "4- Finalize boolean symmetric inspection cross-referencing logic explicitly validating the `set1 == set2` boolean."
      ],
      "ar": [
        "1- تجهيز قائمتين فارغتين واستخدام حلقة التكرار لملئهما بخمسة أرقام مدخلة لكل واحدة كحد أقصى.",
        "2- تحويل القائمتين الممتلئتين إلى مجموعات عبر الدالة `set()` لنفي أي تكرار بالأرقام.",
        "3- استخدام المُعاملات الرياضية المختصرة للعمليات: للاتحاد نستخدم `|`، للتقاطع نستخدم `&`، وللفرق المعياري نستخدم `-`.",
        "4- استكمال التحقق المنطقي من المساواة التامة عبر الجملة الشرطية `if set1 == set2` وطباعة النتيجة مباشرة كـ `Sets are equal`."
      ]
    },
    "code": "list1 = []\nlist2 = []\n\nfor i in range(5):\n    num = int(input(\"Enter number for list1: \"))\n    list1.append(num)\n\nfor i in range(5):\n    num = int(input(\"Enter number for list2: \"))\n    list2.append(num)\n\nset1 = set(list1)\nset2 = set(list2)\n\nprint(\"Union =\", set1 | set2)\nprint(\"Intersection =\", set1 & set2)\nprint(\"Difference =\", set1 - set2)\n\nif set1 == set2:\n    print(\"Sets are equal\")\nelse:\n    print(\"Sets are not equal\")",
    "output": "Enter number for list1: 1\n[...]\nUnion = {1, 2, 3, 4, 5, 6}\nIntersection = {3, 4}\nDifference = {1, 2}\nSets are not equal"
  },
  {
    "id": 20,
    "categoryId": "sets",
    "title": {
      "en": "Question 20: Set Similarities and Differences",
      "ar": "السؤال 20: المشتركات والفروقات بين مجموعتين"
    },
    "prompt": {
      "en": "Generate two operational `Set` bounds iteratively fetched, extracting overlapping intersections, explicitly localized exclusive items, and uniquely unshared components respectively.",
      "ar": "بناء مجموعتين `Set` عبر إدخال الأرقام من المستخدم، ثم استخراج المشترك، والموجود بالأولى فقط، وبالمجموعة الثانية فقط، والغير مشترك بينهما."
    },
    "steps": {
      "en": [
        "1- Declare strictly empty `set()` placeholders pre-allocated to intercept sequential pushes efficiently.",
        "2- Instigate looping phases manually iterating pushing routines driving numeric payloads mapping `add()`.",
        "3- Execute logic parsing via compact arithmetic shortcuts invoking intersections `&` against unilateral subsets spanning `-` vectors.",
        "4- Reveal unconditionally separated elements isolated amongst groups leveraging structural `XOR` bit-logic `^` operands."
      ],
      "ar": [
        "1- تهيئة وإنشاء مجموعتين متفرقتين وفارغتين باستخدام `set()` لتلقي العناصر لاحقاً.",
        "2- تشغيل حلقة تكرار مرتين لطلب وإضافة `5` أرقام لكل مجموعة عبر دالة الإضافة `add()`.",
        "3- استخدام المعاملات الجبرية المختصرة لاستخراج المشترك عبر `&` والعناصر الحصرية باستخدام معاملات الفرق `-`.",
        "4- طباعة العناصر غير المشتركة في كلي المجموعتين باستخدام المعامل `^` الذي يمثل البوابة `XOR`."
      ]
    },
    "code": "set1 = set()\nset2 = set()\n\nfor i in range(5):\n    num = int(input(\"Enter number for set1: \"))\n    set1.add(num)\n\nfor i in range(5):\n    num = int(input(\"Enter number for set2: \"))\n    set2.add(num)\n\nprint(\"Common =\", set1 & set2)\n\nprint(\"Only in set1 =\", set1 - set2)\n\nprint(\"Only in set2 =\", set2 - set1)\n\nprint(\"Non repeated =\", set1 ^ set2)",
    "output": "Enter number for set1: 1\n[...]\nCommon = {3}\nOnly in set1 = {1, 2}\nOnly in set2 = {4, 5}\nNon repeated = {1, 2, 4, 5}"
  },
  {
    "id": 21,
    "categoryId": "dictionary",
    "title": {
      "en": "Question 21: Store Number Powers in a Dictionary",
      "ar": "السؤال 21: تخزين قوى العدد في Dictionary"
    },
    "prompt": {
      "en": "Nest a dictionary layer storing operational attributes computing trailing explicit geometric sequences mapping quadratic, cubic, and quadric polynomial equivalents internally mapping exponential shortcuts.",
      "ar": "إنشاء `Dictionary` للرقم نفسه لحفظ البيانات، وبداخله مُعجم آخر مُرتبط بحساب قيم التربيع، والتكعيب، والأس الرابع للرقم باستخدام الأسس المباشرة."
    },
    "steps": {
      "en": [
        "1- Boot the primary mapping module named `data` initialized blank preserving initial layout memory.",
        "2- Enforce progressive numeric iteration loops invoking numeric generation spans via `range` parameterization.",
        "3- Inject sub-property trees sequentially binding root numerical keys `i` straight scaling raw associative values processing direct exponentials `**` parameters inside another tier.",
        "4- Conclusively project the comprehensive dimensional resulting layout to visible debugging screens."
      ],
      "ar": [
        "1- تهيئة المعجم الرئيسي في المتغير `data` وتجهيزه فارغاً كبداية للمنظومة.",
        "2- تشغيل حلقة التكرار للعد من `1` إلى التصاعد المطلوب باستخدام الدالة `range`.",
        "3- في كل دورة، يتم تعيين المفتاح `i` وتهيئة قيمته مباشرة كمعجم داخلي يحتوي على نواتج الأسس المتتابعة `**` بصورة قاموسية `Dictionary`.",
        "4- طباعة بنية ومعمار البيانات النهائية والكاملة للمعجم."
      ]
    },
    "code": "data = {}\n\nfor i in range(1, 4):\n    data[i] = {\n        \"square\": i ** 2,\n        \"cube\": i ** 3,\n        \"power_four\": i ** 4\n    }\n\nprint(data)",
    "output": "{1: {'square': 1, 'cube': 1, 'power_four': 1}, 2: {'square': 4, 'cube': 8, 'power_four': 16}, 3: {'square': 9, 'cube': 27, 'power_four': 81}}"
  },
  {
    "id": 22,
    "categoryId": "dictionary",
    "title": {
      "en": "Question 22: Store Power Pairs as Tuples",
      "ar": "السؤال 22: تخزين أزواج القوى بصيغة Tuple"
    },
    "prompt": {
      "en": "Construct identical scalar dictionary configurations adopting static paired constraints utilizing strictly grouped `Tuple` variants instead of sub-dictionaries alongside expedited algorithmic scaling tools.",
      "ar": "إنشاء `Dictionary` للرقم نفسه لحفظ البيانات كما في الفكرة السابقة، ولكن القيم عبارة عن أزواج مرتبة `Tuple` باستخدام الأسس السريعة."
    },
    "steps": {
      "en": [
        "1- Blank out parent mapped frameworks structurally storing output sequences inside the identifier variable `data`.",
        "2- Instigate dynamic counting metrics iterating continuously up traversing sequentially determined boundaries globally via `range`.",
        "3- Formulate explicit sequential lists packing locked parameter metrics confined securely navigating `Tuple` brackets `()` processing exponential values actively directly linked.",
        "4- Bridge assigned index keys pushing payload properties and finalize printing results collectively."
      ],
      "ar": [
        "1- تهيئة وإنشاء المعجم الرئيسي في متغير `data` وتفريغه للاستقبال.",
        "2- تشغيل حلقة التكرار `for` للتتابع وتوليد الأرقام عبر دالة `range`.",
        "3- بناء هيكل أزواج للـ `Tuple` عبر الأقواس المستديرة `()` واستخدام المعامل `**` لتربيع وتكعيب الرقم بشكل مباشر.",
        "4- استخدام المفتاح `i` وتمرير البيانات ثم طباعة الناتج بالكامل."
      ]
    },
    "code": "data = {}\n\nfor i in range(1, 4):\n    data[i] = (i ** 2, i ** 3, i ** 4)\n\nprint(data)",
    "output": "{1: (1, 1, 1), 2: (4, 8, 16), 3: (9, 27, 81)}"
  },
  {
    "id": 23,
    "categoryId": "strings",
    "title": {
      "en": "Question 23: Count Vowels and Consonants",
      "ar": "السؤال 23: عد حروف العلة والحروف الساكنة"
    },
    "prompt": {
      "en": "Prompt open plain texts, scanning tracking vocalic identities practically known explicitly as `vowels`, accompanying concurrent metric assessments concerning trailing solid consonants explicitly ignoring loose punctuation structures.",
      "ar": "استقبال نص صريح، وحساب عدد حروف العلة المكتوبة بالصيغة المتعارفة كـ `vowels` بالإضافة للحروف الساكنة الأخرى والرموز المرافقة."
    },
    "steps": {
      "en": [
        "1- Grab string blocks fetching manual console properties strictly storing output arrays identically labeled as `text`.",
        "2- Map explicit character constants covering specific vowel boundaries necessary allowing comprehensive referential cross-checks.",
        "3- Circulate loops traversing character arrays meticulously analyzing properties restricting matches checking structural `isalpha` states omitting blanks unconditionally.",
        "4- Advance segregated counters recursively splitting routes respectively yielding definitive visual outputs detailing final accumulated metrics comprehensively."
      ],
      "ar": [
        "1- استقبال السلسلة النصية الواردة كمدخل يُدعى بـ `text`.",
        "2- تحديد السلسلة اللينة التي تحتوي على نطاق حروف العلة لعمل وإكمال المقارنة المطلوبة.",
        "3- عبور حلقة التكرار وتفصيل الجملة حرفاً حرفاً وفحصه بإشراط وتأكيد كونه حرفاً وليس مسافة عبر أداة `isalpha` المحددة.",
        "4- زيادة وطرح العداد الخاص بكل جانب في المسارات التشعبية، ومن ثم طباعة جميع القيم المتوفرة للنتيجة الختامية."
      ]
    },
    "code": "text = input(\"Enter text: \")\n\nvowels = \"aeiouAEIOU\"\nv_count = 0\nc_count = 0\n\nfor char in text:\n    if char.isalpha():\n        if char in vowels:\n            v_count = v_count + 1\n        else:\n            c_count = c_count + 1\n\nprint(\"Vowels =\", v_count)\nprint(\"Consonants =\", c_count)",
    "output": "Enter text: Hello\nVowels = 2\nConsonants = 3"
  },
  {
    "id": 24,
    "categoryId": "strings",
    "title": {
      "en": "Question 24: Convert Text Letter Case",
      "ar": "السؤال 24: تحويل حالة أحرف النص"
    },
    "prompt": {
      "en": "Accept targeted text streams entered securely by arbitrary visitors, subsequently processing raw contents triggering full up-shift transformations creating standardized `upper case` sequences alongside miniaturized `lower case` formats explicitly.",
      "ar": "القيام بإدخال نص محدد من قبل الزائر، والعمل على تحويله إلى صيغتي `upper case` المرتفعة، و `lower case` الصغيرة."
    },
    "steps": {
      "en": [
        "1- Ingest payload texts explicitly collected natively from user prompts generating standard format variables securely.",
        "2- Display parameters forcefully binding and appending `.upper()` procedural macros enforcing prominent capitalized visibility across ranges.",
        "3- Output duplicate instances natively engaging established procedural `.lower()` sequences enforcing consecutive minimized boundaries natively scaling letterings."
      ],
      "ar": [
        "1- قراءة وقبول النص المستخرج من المستخدِم كمتغير نصي اعتيادي للملف.",
        "2- طباعة وعرض النص مصحوباً باستخدام توجيه وتفعيل الدالة `upper()` لجعل جميع الحروف كبيرة واضحة.",
        "3- طباعة وعرض هذا النص باستخدام تطبيق الدالة المعروفة `lower()` في المقابل لجعل وطباعة الحروف صغيرة بشكل تسلسلي."
      ]
    },
    "code": "text = input(\"Enter text: \")\n\nprint(\"Upper:\", text.upper())\nprint(\"Lower:\", text.lower())",
    "output": "Enter text: Hello World\nUpper: HELLO WORLD\nLower: hello world"
  },
  {
    "id": 25,
    "categoryId": "numbers-problems",
    "title": {
      "en": "Question 25: Reverse the Digits of a Number",
      "ar": "السؤال 25: عكس ترتيب أرقام العدد"
    },
    "prompt": {
      "en": "Reverse flip and actively re-arrange absolute whole number string sets procedurally overriding standard sequences (Example rendering specifically: converting source input `123` incrementally shifted into backward `321` arrangements dynamically).",
      "ar": "عكس وقلب اتجاه ترتيب أرقام العدد كاملة (مثال: من الرقم الأصلي `123` بالاتجاه الصاعد إلى `321` بصورته الهابطة المعكوسة)."
    },
    "steps": {
      "en": [
        "1- Commit natively streaming numeric demographics intercepting terminal inputs treating parameters deliberately mapped as raw unadulterated `String` types.",
        "2- Engage and trigger internal string slicing syntax capabilities explicitly commanding universal reverse parameter tracking mappings via `[::-1]` flipping orientations completely across ranges.",
        "3- Rely exclusively driving simplified operator utility dynamically forcing printed numerical blocks matching reversed visual attributes instantly."
      ],
      "ar": [
        "1- الشروع بقراءة العدد الديموغرافي من واجهة المستخدم واستقباله كمتغير نصي من النوع `String`.",
        "2- تفعيل واستخدام خاصية التتبع وتقطيع النصوص `slicing` عبر المعامل الشمولي العكسي `[::-1]` لعكس جميع أوجه ومقاطع النص بأكمله.",
        "3- الاعتماد المباشر على هذه الأداة البسيطة ومن ثم طباعة الرقم بصورته المعكوسة فوراً."
      ]
    },
    "code": "N = input(\"Enter N: \")\n\nprint(N[::-1])",
    "output": "Enter N: 123\n321"
  }
];
