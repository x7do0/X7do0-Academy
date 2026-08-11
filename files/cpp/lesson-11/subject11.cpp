#include <iostream>
#include <cctype>
#include <cstring>
#include <cmath>
using namespace std;

int main()
{
    ////-------------------------------------------------------------------------------------------------------------
    //? cctype
    char c = 'A';
    cout << isalpha(c) << endl;
    cout << isdigit(c) << endl;
    cout << (char)tolower(c) << endl;

    ////-------------------------------------------------------------------------------------------------------------
    //? cstring
    char a1[] = "Hello ";
    char a2[] = "World";
    char result[30] = "";

    strcpy(result, a1);
    strcat(result, a2);
    cout << result << endl;
    cout << strlen(result) << endl;

    ////-------------------------------------------------------------------------------------------------------------
    //? cmath
    int x = 2, y = 3;
    cout << pow(x,y) << endl;
    cout << sqrt(9) << endl;
    cout << abs(-5) << endl;
    cout << round(2.6) << endl;
}
