#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool checkSubarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> firstIndex;
        firstIndex[0] = -1;

        long long prefixSum = 0;

        for (int i = 0; i < (int)nums.size(); i++) {
            prefixSum += nums[i];
            int remainder = (int)(prefixSum % k);

            auto it = firstIndex.find(remainder);
            if (it != firstIndex.end()) {
                if (i - it->second >= 2) {
                    return true;
                }
            } else {
                firstIndex[remainder] = i;
            }
        }

        return false;
    }
};
