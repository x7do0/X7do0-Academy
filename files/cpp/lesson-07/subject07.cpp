#include <iostream>
using namespace std;

int main()
{
    int age;
    cin >> age;

    if      (age > 18)  {cout << "adult";}
    else if (age == 18) {cout << "18";}
    else                 {cout << "kid";}

    cout << endl;

    int x;
    cin >> x;

    switch (x)
    {
        case 1: cout << "Saturday"; break;
        case 2: cout << "Sunday";   break;
        case 3: cout << "Monday";   break;
        default: cout << "invalid";
    }
}
