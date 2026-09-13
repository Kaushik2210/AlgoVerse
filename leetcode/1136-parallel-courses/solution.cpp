#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int minimumSemesters(int n, vector<vector<int>>& relations) {
        vector<vector<int>> graph(n + 1);
        vector<int> indegree(n + 1, 0);
        for (auto& relation : relations) {
            graph[relation[0]].push_back(relation[1]);
            indegree[relation[1]]++;
        }

        queue<int> q;
        for (int c = 1; c <= n; c++) {
            if (indegree[c] == 0) {
                q.push(c);
            }
        }

        int studied = 0;
        int semesters = 0;

        while (!q.empty()) {
            semesters++;
            int size = q.size();
            for (int k = 0; k < size; k++) {
                int course = q.front();
                q.pop();
                studied++;
                for (int nxt : graph[course]) {
                    indegree[nxt]--;
                    if (indegree[nxt] == 0) {
                        q.push(nxt);
                    }
                }
            }
        }

        return studied == n ? semesters : -1;
    }
};
