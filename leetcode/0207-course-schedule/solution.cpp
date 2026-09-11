#include <vector>
using namespace std;

class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> graph(numCourses);
        for (auto& pre : prerequisites) {
            graph[pre[0]].push_back(pre[1]);
        }

        // 0 = unvisited, 1 = visiting, 2 = done
        vector<int> state(numCourses, 0);

        for (int course = 0; course < numCourses; course++) {
            if (state[course] == 0 && hasCycle(course, graph, state)) {
                return false;
            }
        }

        return true;
    }

private:
    bool hasCycle(int node, vector<vector<int>>& graph, vector<int>& state) {
        if (state[node] == 1) return true;
        if (state[node] == 2) return false;

        state[node] = 1;
        for (int neighbor : graph[node]) {
            if (hasCycle(neighbor, graph, state)) return true;
        }
        state[node] = 2;
        return false;
    }
};
