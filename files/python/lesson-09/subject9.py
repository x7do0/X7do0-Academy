# ---------------------------------------------------------
#w 09. الدوال المخصصة - Custom Functions 
# ---------------------------------------------------------

#g 1. الدالة الأساسية (Basic: def NAME():) 
# لتعريف دالة جديدة def نستخدم كلمة 
def function(): 
    print("Hello! This is a basic function.") 
    
function() 


#g 2. الدوال مع الباراميترات والقيم المسترجعة (With Return & Params) 
# الباراميترات (Parameters): هي البيانات اللي نرسلها للدالة لتعالجها
#o Return: هي النتيجة اللي ترجعها لنا الدالة بعد الانتهاء              

def add_numbers(num1, num2): 
    result = num1 + num2     
    return result                    

# استخدام الدالة وتخزين نتيجتها في متغير
total = add_numbers(10, 20) 
print("The sum is:", total) 


#o  مثال يجمع الفكرتين (logicالباراميترات والـ )
def check_age(age): 
    if age >= 18:    
        return "Adult" 
    else:
        return "Minor" 

status = check_age(5) 
print("User status:", status) 

# ---------------------------------------------------------
#. def NAME(): هي الطريقة الرسمية لبدء تعريف أي دالة.
#. Return: ينهي تنفيذ الدالة ويرسل القيمة للخارج.
# ---------------------------------------------------------