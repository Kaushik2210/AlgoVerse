#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<vector<int>> reverse(n);
        vector<int> outDegree(n, 0);

        for (int u = 0; u < n; u++) {
            outDegree[u] = graph[u].size();
            for (int v : graph[u]) {
                reverse[v].push_back(u);
            }
        }

        queue<int> q;
        for (int u = 0; u < n; u++) {
            if (outDegree[u] == 0) q.push(u);
        }

        vector<bool> safe(n, false);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            safe[u] = true;
            for (int p : reverse[u]) {
                if (--outDegree[p] == 0) q.push(p);
            }
        }

        vector<int> result;
        for (int u = 0; u < n; u++) {
            if (safe[u]) result.push_back(u);
        }
        return result;
    }
};
