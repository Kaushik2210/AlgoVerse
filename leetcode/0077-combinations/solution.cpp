#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> result;
        vector<int> combo;
        backtrack(1, n, k, combo, result);
        return result;
    }

private:
    void backtrack(int start, int n, int k, vector<int>& combo, vector<vector<int>>& result) {
        if ((int)combo.size() == k) {
            result.push_back(combo);
            return;
        }

        for (int num = start; num <= n; num++) {
            combo.push_back(num);
            backtrack(num + 1, n, k, combo, result);
            combo.pop_back();
        }
    }
};
