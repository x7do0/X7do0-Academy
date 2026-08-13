#include <iostream>
using namespace std;

int main()
{
    //? 1- العمليات الاعتيادية
    cout << 10 + 6 << endl;   // 16
    cout << 10 - 6 << endl;   // 4
    cout << 10 * 6 << endl;   // 60
    cout << 10 / 6 << endl;   // 1 لأن القيم int
    cout << 10 % 6 << endl;   // 4 باقي القسمة
    cout << 10.0 / 6 << endl; // 1.66667 تقريباً

    //? 2- العمليات المركبة
    int a = 10;

    a += 6; // a = 16
    a -= 6; // a = 10
    a *= 6; // a = 60
    a /= 6; // a = 10

    cout << a << endl; // 10

    //? 3- العمليات الأحادية
    int b = 5;

    cout << b++ << endl; // 5 ثم تصبح b = 6
    cout << b << endl;   // 6
    cout << ++b << endl; // تصبح 7 ثم يطبع 7

    cout << b-- << endl; // 7 ثم تصبح b = 6
    cout << --b << endl; // تصبح 5 ثم يطبع 5

    return 0;
}
