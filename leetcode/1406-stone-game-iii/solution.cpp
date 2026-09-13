#include <string>
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
public:
    string stoneGameIII(vector<int>& stoneValue) {
        int n = stoneValue.size();
        vector<int> dp(n + 1, 0);

        for (int i = n - 1; i >= 0; i--) {
            int best = INT_MIN;
            int take = 0;
            for (int x = 1; x <= 3 && i + x <= n; x++) {
                take += stoneValue[i + x - 1];
                best = max(best, take - dp[i + x]);
            }
            dp[i] = best;
        }

        if (dp[0] > 0) return "Alice";
        if (dp[0] < 0) return "Bob";
        return "Tie";
    }
};
