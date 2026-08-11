#include <iostream>
using namespace std;

int main()
{
    int a, b;
    cin >> a >> b;

    //? AND
    if (a && b) {cout << "AND = 1" << endl;}
    else        {cout << "AND = 0" << endl;}

    //? OR
    if (a || b) {cout << "OR = 1" << endl;}
    else        {cout << "OR = 0" << endl;}

    //? NOT
    if (!a) {cout << "NOT a = 1" << endl;}
    else    {cout << "NOT a = 0" << endl;}
}
