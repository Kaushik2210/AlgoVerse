#include <vector>
#include <cstdlib>
using namespace std;

class Solution {
public:
    Solution(vector<int>& nums) : nums(nums) {}

    int pick(int target) {
        int result = -1;
        int count = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            if (nums[i] == target) {
                count++;
                if (rand() % count == 0) {
                    result = i;
                }
            }
        }
        return result;
    }

private:
    vector<int> nums;
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution* obj = new Solution(nums);
 * int param_1 = obj->pick(target);
 */
