#include <iostream>
using namespace std;

int main()
{
    //? for
    for (int x = 1; x <= 5; ++x)
    {
        cout << x << "- Hello world" << endl;
    }

    //? while
    int y = 1;
    while (y <= 5)
    {
        cout << y << endl;
        ++y;
    }

    //? do while
    int z = 1;
    do
    {
        cout << z << endl;
        ++z;
    }
    while (z <= 5);
}
