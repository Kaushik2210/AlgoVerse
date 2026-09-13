#include <vector>
using namespace std;

class Solution {
public:
    int wiggleMaxLength(vector<int>& nums) {
        if (nums.empty()) return 0;

        int length = 1;
        int prevDiff = 0;
        for (int i = 1; i < (int)nums.size(); i++) {
            int diff = nums[i] - nums[i - 1];
            if (diff > 0 && prevDiff <= 0) {
                length++;
                prevDiff = 1;
            } else if (diff < 0 && prevDiff >= 0) {
                length++;
                prevDiff = -1;
            }
        }
        return length;
    }
};
