#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    int getMoneyAmount(int n) {
        vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));

        for (int length = 2; length <= n; length++) {
            for (int i = 1; i <= n - length + 1; i++) {
                int j = i + length - 1;
                int best = INT_MAX;
                for (int g = i; g <= j; g++) {
                    int left = (g - 1 >= i) ? dp[i][g - 1] : 0;
                    int right = (g + 1 <= j) ? dp[g + 1][j] : 0;
                    int cost = g + max(left, right);
                    best = min(best, cost);
                }
                dp[i][j] = best;
            }
        }

        return dp[1][n];
    }
};
