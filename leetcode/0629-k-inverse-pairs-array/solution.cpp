#include <vector>
using namespace std;

class Solution {
public:
    int kInversePairs(int n, int k) {
        const long long MOD = 1'000'000'007;

        vector<long long> dp(k + 1, 0);
        dp[0] = 1;

        for (int i = 1; i <= n; i++) {
            vector<long long> newDp(k + 1, 0);
            newDp[0] = 1;
            for (int j = 1; j <= k; j++) {
                newDp[j] = (newDp[j - 1] + dp[j]) % MOD;
                if (j - i >= 0) {
                    newDp[j] = (newDp[j] - dp[j - i] + MOD) % MOD;
                }
            }
            dp = newDp;
        }

        return (int)dp[k];
    }
};
