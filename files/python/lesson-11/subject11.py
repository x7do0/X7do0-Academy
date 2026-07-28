# ---------------------------------------------------------
#w 11. Tupleالقوائم والـ  - Lists & Tuples 
# ---------------------------------------------------------

#y --- الجزء الأول: القوائم (Lists) ---
#g القائمة: هي مجموعة عناصر قابلة للتغيير (Mutable)

# إنشاء قائمة
numbers = [5, 2, 9, 1, 7] 
print(numbers)

#g 1. معرفة عدد العناصر (len)
print(len(numbers))

#g 2. الوصول إلى عناصر باستخدام slicing [ : ]
print(numbers[0])     # وصول للعنصر المحدد
print(numbers[0:3])   # من  0 إلى 2 index 
print(numbers[:3])    # من البداية إلى 2
print(numbers[2:])    # من 2 إلى النهاية index

#g 3. إضافة عنصر (append)
numbers.append(10)  
print(numbers)

#g 4. معرفة موقع عنصر (index)
print(numbers.index(9)) 

#g 5. إدخال عنصر في موقع معين (insert)
numbers.insert(1, 100) 
print(numbers)

#g 6. ترتيب القائمة (sort)
numbers.sort()
print(numbers)

#g 7. حذف عنصر (remove)
numbers.remove(5)
print(numbers)

#g 8. عكس الترتيب (reverse)
numbers.reverse()
print(numbers)

#g 9. أصغر وأكبر قيمة (min, max)
print(min(numbers))
print(max(numbers))

#g 10. حذف القائمة بالكامل (del)
del numbers
#. print(numbers)  # هذا السطر سيعطي خطأ لأن القائمة حُذفت


#y --- الجزء الثاني: Tuple ---
#g Tuple: مثل القائمة لكن غير قابلة للتغيير (Immutable)

# إنشاء Tuple
my_tuple = (10, 20, 30, 40)
print(my_tuple)

#g 1. الوصول إلى العناصر
print(my_tuple[0]) 
print(my_tuple[1:3])

#g 2. معرفة عدد العناصر
print(len(my_tuple)) 

#o Tuple مع append أو remove أو insert ملاحظة: لا يمكن استخدام  

# ---------------------------------------------------------
# ملاحظات (موجودة في المخطط):
# List: قابلة للتغيير (إضافة، حذف، تعديل)
# Tuple: غير قابلة للتغيير بعد إنشائها
# slicing [ : ] يستخدم لعرض جزء من القائمة أو Tuple
# ---------------------------------------------------------