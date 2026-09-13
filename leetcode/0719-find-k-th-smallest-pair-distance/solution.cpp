#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int smallestDistancePair(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        int lo = 0, hi = nums[n - 1] - nums[0];

        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (countLessEqual(nums, mid) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

private:
    long long countLessEqual(vector<int>& nums, int d) {
        long long count = 0;
        int left = 0;
        for (int right = 0; right < (int)nums.size(); right++) {
            while (nums[right] - nums[left] > d) {
                left++;
            }
            count += right - left;
        }
        return count;
    }
};
