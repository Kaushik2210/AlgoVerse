#include <vector>
#include <string>
using namespace std;

class Solution {
    vector<int> parent;

    int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    void unite(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra != rb) parent[ra] = rb;
    }

public:
    bool equationsPossible(vector<string>& equations) {
        parent.resize(26);
        for (int i = 0; i < 26; i++) parent[i] = i;

        for (const string& eq : equations) {
            if (eq[1] == '=') {
                unite(eq[0] - 'a', eq[3] - 'a');
            }
        }

        for (const string& eq : equations) {
            if (eq[1] == '!') {
                if (find(eq[0] - 'a') == find(eq[3] - 'a')) {
                    return false;
                }
            }
        }

        return true;
    }
};
