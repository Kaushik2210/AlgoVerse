#include <vector>
using namespace std;

class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int left = lowerBound(nums, target);
        if (left == (int)nums.size() || nums[left] != target) {
            return {-1, -1};
        }
        int right = lowerBound(nums, target + 1) - 1;
        return {left, right};
    }

private:
    int lowerBound(vector<int>& nums, int x) {
        int lo = 0, hi = (int)nums.size();
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < x) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
};
