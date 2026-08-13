#include <iostream>
using namespace std;

int main()
{
    // boolalpha تخلي cout تطبع true و false بدل 1 و 0
    cout << boolalpha;

    //? أي مقارنة بالنهاية تعطي true أو false
    cout << (10 > 5) << endl;  // true
    cout << (10 == 5) << endl; // false

    bool a = true;
    bool b = false;

    //? AND: لازم الشرطان يكونان true
    cout << (a && b) << endl; // false

    //? OR: يكفي شرط واحد يكون true
    cout << (a || b) << endl; // true

    //? NOT: تعكس النتيجة
    cout << (!a) << endl; // false

    //? مثال بشروط فعلية
    int age = 20;
    int degree = 70;

    cout << (age >= 18 && degree >= 50) << endl; // true
    cout << (age < 18 || degree >= 50) << endl;  // true
    cout << !(degree >= 50) << endl;              // false

    return 0;
}
