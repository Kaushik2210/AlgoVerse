#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0;
        long long windowSum = 0;
        int best = INT_MAX;

        for (int right = 0; right < (int)nums.size(); right++) {
            windowSum += nums[right];
            while (windowSum >= target) {
                best = min(best, right - left + 1);
                windowSum -= nums[left];
                left++;
            }
        }

        return best == INT_MAX ? 0 : best;
    }
};
