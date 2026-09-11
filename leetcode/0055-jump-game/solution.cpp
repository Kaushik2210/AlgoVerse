#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    bool canJump(vector<int>& nums) {
        int farthest = 0;

        for (int i = 0; i < (int)nums.size(); i++) {
            if (i > farthest) {
                return false;
            }
            farthest = max(farthest, i + nums[i]);
        }

        return true;
    }
};
