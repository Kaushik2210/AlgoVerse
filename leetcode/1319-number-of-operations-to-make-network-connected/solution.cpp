#include <vector>
using namespace std;

class Solution {
public:
    vector<int> parent;

    int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    void unite(int a, int b) {
        int ra = find(a);
        int rb = find(b);
        if (ra != rb) {
            parent[ra] = rb;
        }
    }

    int makeConnected(int n, vector<vector<int>>& connections) {
        if ((int)connections.size() < n - 1) {
            return -1;
        }

        parent.resize(n);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }

        for (auto& connection : connections) {
            unite(connection[0], connection[1]);
        }

        int components = 0;
        for (int i = 0; i < n; i++) {
            if (find(i) == i) {
                components++;
            }
        }
        return components - 1;
    }
};
