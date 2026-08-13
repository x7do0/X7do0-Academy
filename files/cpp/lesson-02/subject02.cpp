#include <iostream>
#include <string>
using namespace std;

int main()
{
    //? cout: إخراج البيانات
    cout << "Hello" << endl;      // Hello
    cout << 25 << endl;           // 25

    int age = 20;
    cout << age << endl;          // 20
    cout << "Age: " << age << endl; // Age: 20

    //? cin: إدخال البيانات
    // cin يحتاج متغير، والقيمة المدخلة لازم تناسب نوع المتغير.
    string name;
    int userAge;

    cout << "Enter your name: ";
    cin >> name;

    cout << "Enter your age: ";
    cin >> userAge;

    cout << "Name: " << name << endl;
    cout << "Age: " << userAge << endl;

    return 0;
}
