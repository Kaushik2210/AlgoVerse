#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size() + 2;
        vector<int> balloons(n);
        balloons[0] = 1;
        balloons[n - 1] = 1;
        for (int i = 0; i < (int)nums.size(); i++) {
            balloons[i + 1] = nums[i];
        }

        vector<vector<int>> dp(n, vector<int>(n, 0));

        for (int length = 2; length < n; length++) {
            for (int i = 0; i + length < n; i++) {
                int j = i + length;
                int best = 0;
                for (int k = i + 1; k < j; k++) {
                    int coins = dp[i][k] + dp[k][j] + balloons[i] * balloons[k] * balloons[j];
                    best = max(best, coins);
                }
                dp[i][j] = best;
            }
        }

        return dp[0][n - 1];
    }
};
