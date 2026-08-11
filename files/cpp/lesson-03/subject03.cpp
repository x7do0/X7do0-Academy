#include <iostream>
using namespace std;

int main()
{
    cout << "one\ntwo"    << endl; // \n: new line
    cout << "one\ttwo"    << endl; // \t: tab
    cout << "one\btwo"    << endl; // \b: backspace
    cout << "one\\two"    << endl; // \\: backslash
    cout << "one\'two"    << endl; // \': single quote
    cout << "one\"two"    << endl; // \" : double quote

    return 0;
}
