#include <vector>
using namespace std;

class Solution {
public:
    int find(vector<int>& parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    vector<int> findRedundantDirectedConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<int> nodeParent(n + 1, 0);
        vector<int> candidate1, candidate2;
        int skipIndex = -1;

        for (int i = 0; i < n; i++) {
            int u = edges[i][0];
            int v = edges[i][1];
            if (nodeParent[v] != 0) {
                candidate1 = {nodeParent[v], v};
                candidate2 = {u, v};
                skipIndex = i;
            } else {
                nodeParent[v] = u;
            }
        }

        vector<int> ufParent(n + 1);
        for (int i = 0; i <= n; i++) {
            ufParent[i] = i;
        }

        for (int i = 0; i < n; i++) {
            if (i == skipIndex) {
                continue;
            }
            int u = edges[i][0];
            int v = edges[i][1];
            int ru = find(ufParent, u);
            int rv = find(ufParent, v);
            if (ru == rv) {
                return !candidate1.empty() ? candidate1 : vector<int>{u, v};
            }
            ufParent[ru] = rv;
        }

        return candidate2;
    }
};
