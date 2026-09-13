#include <vector>
using namespace std;

class Solution {
public:
    int numberOfSubarrays(vector<int>& nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }

private:
    int atMost(vector<int>& nums, int limit) {
        if (limit < 0) {
            return 0;
        }
        int left = 0;
        int odds = 0;
        int count = 0;
        for (int right = 0; right < (int)nums.size(); right++) {
            if (nums[right] % 2 == 1) {
                odds++;
            }
            while (odds > limit) {
                if (nums[left] % 2 == 1) {
                    odds--;
                }
                left++;
            }
            count += right - left + 1;
        }
        return count;
    }
};
