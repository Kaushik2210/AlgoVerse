#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int stoneGameII(vector<int>& piles) {
        int n = piles.size();
        vector<int> suffix(n + 1, 0);
        for (int i = n - 1; i >= 0; i--) {
            suffix[i] = suffix[i + 1] + piles[i];
        }
        vector<vector<int>> memo(n, vector<int>(n + 1, -1));
        return dp(0, 1, n, suffix, memo);
    }

private:
    int dp(int index, int m, int n, vector<int>& suffix, vector<vector<int>>& memo) {
        if (index + 2 * m >= n) {
            return suffix[index];
        }
        if (memo[index][m] != -1) {
            return memo[index][m];
        }
        int best = 0;
        for (int x = 1; x <= 2 * m; x++) {
            best = max(best, suffix[index] - dp(index + x, max(m, x), n, suffix, memo));
        }
        memo[index][m] = best;
        return best;
    }
};
