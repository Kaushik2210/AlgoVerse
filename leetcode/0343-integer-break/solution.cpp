#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int integerBreak(int n) {
        vector<int> dp(n + 1, 0);
        for (int i = 2; i <= n; i++) {
            int best = 0;
            for (int j = 1; j < i; j++) {
                best = max({best, j * (i - j), j * dp[i - j]});
            }
            dp[i] = best;
        }
        return dp[n];
    }
};
