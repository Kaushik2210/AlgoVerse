#include <vector>
#include <string>
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

    bool isSimilar(const string& a, const string& b) {
        int diff = 0;
        for (size_t i = 0; i < a.size(); i++) {
            if (a[i] != b[i]) {
                diff++;
                if (diff > 2) {
                    return false;
                }
            }
        }
        return true;
    }

    int numSimilarGroups(vector<string>& strs) {
        int n = strs.size();
        parent.resize(n);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (find(i) != find(j) && isSimilar(strs[i], strs[j])) {
                    unite(i, j);
                }
            }
        }

        int groups = 0;
        for (int i = 0; i < n; i++) {
            if (find(i) == i) {
                groups++;
            }
        }
        return groups;
    }
};
