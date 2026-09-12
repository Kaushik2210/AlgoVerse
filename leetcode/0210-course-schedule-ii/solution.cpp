#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> graph(numCourses);
        vector<int> inDegree(numCourses, 0);

        for (auto& pair : prerequisites) {
            int course = pair[0], prereq = pair[1];
            graph[prereq].push_back(course);
            inDegree[course]++;
        }

        queue<int> q;
        for (int c = 0; c < numCourses; c++) {
            if (inDegree[c] == 0) {
                q.push(c);
            }
        }

        vector<int> order;
        while (!q.empty()) {
            int course = q.front();
            q.pop();
            order.push_back(course);
            for (int next : graph[course]) {
                if (--inDegree[next] == 0) {
                    q.push(next);
                }
            }
        }

        if ((int)order.size() != numCourses) {
            return {};
        }
        return order;
    }
};
