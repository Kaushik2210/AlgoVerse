#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestSubarray(vector<int>& nums) {
        int left = 0;
        int zeros = 0;
        int best = 0;
        for (int right = 0; right < (int)nums.size(); right++) {
            if (nums[right] == 0) {
                zeros++;
            }
            while (zeros > 1) {
                if (nums[left] == 0) {
                    zeros--;
                }
                left++;
            }
            best = max(best, right - left);
        }
        return best;
    }
};
