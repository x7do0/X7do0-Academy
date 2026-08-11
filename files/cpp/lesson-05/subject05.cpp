#include <iostream>
using namespace std;

int main()
{
    //? 1- العمليات الاعتيادية
    cout << 10 + 6 << endl; // جمع
    cout << 10 - 6 << endl; // طرح
    cout << 10 * 6 << endl; // ضرب
    cout << 10 / 6 << endl; // قسمة
    cout << 10 % 6 << endl; // باقي القسمة

    //? 2- العمليات المركبة
    int a = 10;
    a += 6;
    a -= 6;
    a *= 6;
    a /= 6;

    //? 3- العمليات الاحادية
    a++;
    ++a;
    a--;
    --a;

    cout << a;
}
