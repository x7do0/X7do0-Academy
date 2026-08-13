#include <iostream>
using namespace std;

int main()
{
    cout << "one\ntwo"    << endl; // \n: سطر جديد
    cout << "one\atwo"    << endl; // \a: صوت تنبيه إذا الطرفية تدعمه
    cout << "one\ttwo"    << endl; // \t: Tab
    cout << "one\btwo"    << endl; // \b: رجوع خانة للخلف
    cout << "one\\two"    << endl; // \\: طباعة Backslash
    cout << "one\'two"    << endl; // \': طباعة Single Quote
    cout << "one\"two"    << endl; // \": طباعة Double Quote
    cout << "one\?two"    << endl; // \?: طباعة Question Mark

    return 0;
}
