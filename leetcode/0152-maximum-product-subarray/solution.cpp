#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int result = nums[0];
        int currMax = nums[0], currMin = nums[0];

        for (size_t i = 1; i < nums.size(); i++) {
            int num = nums[i];
            int candidate1 = num * currMax;
            int candidate2 = num * currMin;

            currMax = max({num, candidate1, candidate2});
            currMin = min({num, candidate1, candidate2});

            result = max(result, currMax);
        }

        return result;
    }
};
