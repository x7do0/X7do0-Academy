# ---------------------------------------------------------
#w 01. الطباعة والمخرجات - Print & Output 
# --------------------------------------------------------- 

#g 1- رقم
print(100)
print(3.14)

#g 2- نصوص 
print("Hello World!")        # "" أي نص يوضع بين علامات تنصيص
print('Welcome to Python')   

#g 3- عمليات رياضية
print(5 + 5)   
print(10 * 2)  
print("Hi " * 3) 

#g 4- تنزيل سطر
print("First Line\nSecond Line") # رمز يفيد تنزيل السطر \n 
print() 

#g 5- متغير
name = "Ali"
print(name)
age = 20
print(age)

#G 6- قيم متعددة
#Y 6.1- فاصلة
print("Name:", name, "Age:", age) # space 

#Y 6.2- f-strings
print(f"Name: {name}  Age: {age}")

#Y 6.3- علامة الجمع (+)
print("Name: " + name + " Age: " + age) #r ERROR

# ملاحظة مهمة:
# عند استخدام الفاصلة (,) يمكنك دمج نص مع رقم
# لكن عند استخدام (+) يجب أن تكون كل القيم نصوصاً (Strings)