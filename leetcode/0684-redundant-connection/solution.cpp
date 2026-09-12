#include <vector>
using namespace std;

class Solution {
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        parent.resize(n + 1);
        for (int i = 0; i <= n; i++) parent[i] = i;

        for (auto& edge : edges) {
            int u = edge[0], v = edge[1];
            int ru = find(u), rv = find(v);
            if (ru == rv) return edge;
            parent[ru] = rv;
        }

        return {};
    }

private:
    vector<int> parent;

    int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
};
