#include <vector>
#include <numeric>
#include <cstdlib>
using namespace std;

class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        if (abs(target) > total || (total + target) % 2 != 0) return 0;

        int p = (total + target) / 2;
        vector<int> dp(p + 1, 0);
        dp[0] = 1;

        for (int num : nums) {
            for (int s = p; s >= num; s--) {
                dp[s] += dp[s - num];
            }
        }

        return dp[p];
    }
};
