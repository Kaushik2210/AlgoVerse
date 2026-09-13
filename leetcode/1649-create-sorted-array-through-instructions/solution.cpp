#include <vector>
#include <algorithm>
using namespace std;

class Solution {
    void update(vector<int>& tree, int i, int size) {
        while (i <= size) {
            tree[i]++;
            i += i & (-i);
        }
    }

    int query(vector<int>& tree, int i) {
        int total = 0;
        while (i > 0) {
            total += tree[i];
            i -= i & (-i);
        }
        return total;
    }

public:
    int createSortedArray(vector<int>& instructions) {
        const long long MOD = 1'000'000'007;
        int maxVal = 0;
        for (int v : instructions) maxVal = max(maxVal, v);

        vector<int> tree(maxVal + 1, 0);
        long long cost = 0;

        for (int i = 0; i < (int)instructions.size(); i++) {
            int value = instructions[i];
            int less = query(tree, value - 1);
            int greater = i - query(tree, value);
            cost += min(less, greater);
            update(tree, value, maxVal);
        }

        return (int)(cost % MOD);
    }
};
