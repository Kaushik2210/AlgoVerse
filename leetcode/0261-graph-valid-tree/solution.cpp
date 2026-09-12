#include <vector>
using namespace std;

class Solution {
public:
    bool validTree(int n, vector<vector<int>>& edges) {
        if ((int)edges.size() != n - 1) return false;

        parent.resize(n);
        for (int i = 0; i < n; i++) parent[i] = i;

        for (auto& edge : edges) {
            int ru = find(edge[0]), rv = find(edge[1]);
            if (ru == rv) return false;
            parent[ru] = rv;
        }

        return true;
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
