#include <vector>
#include <cstdlib>
using namespace std;

class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        vector<int> result;

        for (int x : nums) {
            int idx = abs(x) - 1;
            if (nums[idx] < 0) {
                result.push_back(idx + 1);
            } else {
                nums[idx] = -nums[idx];
            }
        }

        return result;
    }
};
