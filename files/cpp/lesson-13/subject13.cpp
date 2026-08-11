#include <iostream>
using namespace std;

struct Person
{
    string name;
    int age;
};

int main()
{
    Person id;

    id.name = "Haidara";
    id.age = 20;

    cout << "Name: " << id.name << endl;
    cout << "Age: "  << id.age  << endl;

    id.age = 21;
    cout << "Updated Age: " << id.age << endl;
}
