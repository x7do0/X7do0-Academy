#include <iostream>
#include <fstream>
using namespace std;

int main()
{
    ifstream read("file_1.txt");  // فتح الملف للقراءة
    ofstream write("file_2.txt"); // فتح الملف للكتابة

    int x;

    read >> x;
    read.close();

    write << x;
    write.close();

    return 0;
}
