#include <vector>
#include <unordered_map>
using namespace std;

/*
// Definition for Employee.
class Employee {
public:
    int id;
    int importance;
    vector<int> subordinates;
};
*/

class Solution {
public:
    int getImportance(vector<Employee*> employees, int id) {
        unordered_map<int, Employee*> byId;
        for (auto* employee : employees) {
            byId[employee->id] = employee;
        }
        return dfs(byId, id);
    }

private:
    int dfs(unordered_map<int, Employee*>& byId, int id) {
        Employee* employee = byId[id];
        int total = employee->importance;
        for (int subId : employee->subordinates) {
            total += dfs(byId, subId);
        }
        return total;
    }
};
