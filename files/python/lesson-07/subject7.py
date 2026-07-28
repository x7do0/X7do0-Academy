# ---------------------------------------------------------
#w 07. الجمل الشرطية - Conditionals 
# ---------------------------------------------------------

#g 1. الشرط القياسي (Standard If/Elif/Else)
# يستخدم لتنفيذ أوامر معينة بحالات معينة

Number = int(input("Enter a Number: ")) 

if Number == 0:              # (if) تتنفذ إذا تم تحقق الشرط
    print("Zero")
elif Number < 0:            # (elif) تعني "أو إذا كان" وتستخدم لعدة شروط
    print("Negative")
else:                       # (else) تتنفذ إذا لم يتحقق أي شرط سابق
    print("posetive") 


#o 1.A البوابات المنطقية في الشروط (and, or, not) 
# للتحقق من اكثر من شرط في نفس التنفيذ 
if 10>5 and 4<3:
    print("true (and)") 

if 10>5 or 4<3:
    print("true (or)") 

if not 4>10:
    print("true (not)") 

#o 1.B للتحقق إذا كان العنصر موجود أو لا (if  in  )
name = "Ali"  #iterable 

if "A" in name:
    print("true")



#g 2. الشروط المتداخلة (Nested If)
# وضع شرط داخل شرط آخر (لا يتنفذ الثاني إلا إذا تحقق الأول)
age = int(input("Enter your age: "))
rules = int(input("Do you accept the rules? (1=Yes , 0=No)\n")) 

if age >= 18:
    print("Welcome!")
    if rules == 1:
        print("Access Accepted")
    else:
        print("Access Denied")
else:
    print("You are not allowed yet")

# ---------------------------------------------------------
# ملاحظة (موجودة في المخطط):
# المسافات البادئة (Indentation) في بايثون ليست اختيارية!
# أي كود مُزاح للداخل يعتبر تابعاً للشرط الذي فوقه. 
# ---------------------------------------------------------