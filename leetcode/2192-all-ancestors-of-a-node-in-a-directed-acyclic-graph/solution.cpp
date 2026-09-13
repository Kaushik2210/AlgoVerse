#include <vector>
#include <set>
#include <queue>
using namespace std;

class Solution {
public:
    vector<vector<int>> getAncestors(int n, vector<vector<int>>& edges) {
        vector<vector<int>> children(n);
        vector<int> inDegree(n, 0);

        for (auto& e : edges) {
            children[e[0]].push_back(e[1]);
            inDegree[e[1]]++;
        }

        vector<set<int>> ancestors(n);

        queue<int> q;
        for (int v = 0; v < n; v++) {
            if (inDegree[v] == 0) q.push(v);
        }

        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int v : children[u]) {
                ancestors[v].insert(u);
                ancestors[v].insert(ancestors[u].begin(), ancestors[u].end());
                if (--inDegree[v] == 0) q.push(v);
            }
        }

        vector<vector<int>> result(n);
        for (int i = 0; i < n; i++) {
            result[i] = vector<int>(ancestors[i].begin(), ancestors[i].end());
        }
        return result;
    }
};
