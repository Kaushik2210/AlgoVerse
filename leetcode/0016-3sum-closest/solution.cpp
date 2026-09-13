#include <vector>
#include <algorithm>
#include <cstdlib>
using namespace std;

class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int n = (int)nums.size();
        int best = nums[0] + nums[1] + nums[2];

        for (int i = 0; i < n - 2; i++) {
            int left = i + 1, right = n - 1;
            while (left < right) {
                int total = nums[i] + nums[left] + nums[right];
                if (abs(total - target) < abs(best - target)) {
                    best = total;
                }
                if (total == target) {
                    return total;
                } else if (total < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        return best;
    }
};
