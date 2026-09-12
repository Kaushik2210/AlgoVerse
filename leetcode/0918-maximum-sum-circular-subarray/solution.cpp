#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int total = 0;
        int curMax = 0, maxSum = nums[0];
        int curMin = 0, minSum = nums[0];

        for (int x : nums) {
            total += x;
            curMax = max(curMax, 0) + x;
            maxSum = max(maxSum, curMax);
            curMin = min(curMin, 0) + x;
            minSum = min(minSum, curMin);
        }

        if (maxSum < 0) {
            return maxSum;
        }

        return max(maxSum, total - minSum);
    }
};
