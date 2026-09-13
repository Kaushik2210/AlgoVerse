#include <vector>
using namespace std;

class Solution {
public:
    bool checkPossibility(vector<int>& nums) {
        int modified = 0;
        for (int i = 1; i < (int)nums.size(); i++) {
            if (nums[i - 1] <= nums[i]) {
                continue;
            }
            modified++;
            if (modified > 1) {
                return false;
            }
            if (i < 2 || nums[i - 2] <= nums[i]) {
                nums[i - 1] = nums[i];
            } else {
                nums[i] = nums[i - 1];
            }
        }
        return true;
    }
};
