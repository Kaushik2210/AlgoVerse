#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int n = (int)nums.size();
        vector<vector<int>> result;

        for (int i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            long long minSum = (long long)nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3];
            if (minSum > target) break;
            long long maxSum = (long long)nums[i] + nums[n - 1] + nums[n - 2] + nums[n - 3];
            if (maxSum < target) continue;

            for (int j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                long long minSum2 = (long long)nums[i] + nums[j] + nums[j + 1] + nums[j + 2];
                if (minSum2 > target) break;
                long long maxSum2 = (long long)nums[i] + nums[j] + nums[n - 1] + nums[n - 2];
                if (maxSum2 < target) continue;

                int left = j + 1, right = n - 1;
                while (left < right) {
                    long long total = (long long)nums[i] + nums[j] + nums[left] + nums[right];
                    if (total < target) {
                        left++;
                    } else if (total > target) {
                        right--;
                    } else {
                        result.push_back({nums[i], nums[j], nums[left], nums[right]});
                        left++;
                        right--;
                        while (left < right && nums[left] == nums[left - 1]) left++;
                        while (left < right && nums[right] == nums[right + 1]) right--;
                    }
                }
            }
        }

        return result;
    }
};
