#include <iostream>
#include <vector>
using namespace std;

int main()
{
    vector<string> arr;

    arr.push_back("a");
    arr.push_back("b");
    arr.push_back("c");

    cout << "arr[0]: " << arr[0] << endl;

    arr.push_back("d"); // adding
    arr.pop_back();     // deleting

    cout << "arr.empty(): " << arr.empty() << endl;
    cout << "arr.size(): "  << arr.size()  << endl;

    arr.insert(arr.begin(), "z");

    arr.clear(); // حذف كل العناصر
}
