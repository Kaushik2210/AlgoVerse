import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
// Definition for Employee.
class Employee {
    public int id;
    public int importance;
    public List<Integer> subordinates;
};
*/

class Solution {
    public int getImportance(List<Employee> employees, int id) {
        Map<Integer, Employee> byId = new HashMap<>();
        for (Employee employee : employees) {
            byId.put(employee.id, employee);
        }
        return dfs(byId, id);
    }

    private int dfs(Map<Integer, Employee> byId, int id) {
        Employee employee = byId.get(id);
        int total = employee.importance;
        for (int subId : employee.subordinates) {
            total += dfs(byId, subId);
        }
        return total;
    }
}
