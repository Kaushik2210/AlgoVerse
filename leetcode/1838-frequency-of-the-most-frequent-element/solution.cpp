#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxFrequency(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int left = 0;
        long long windowSum = 0;
        int best = 1;
        for (int right = 0; right < (int)nums.size(); right++) {
            windowSum += nums[right];
            while ((long long) nums[right] * (right - left + 1) - windowSum > k) {
                windowSum -= nums[left];
                left++;
            }
            best = max(best, right - left + 1);
        }
        return best;
    }
};
