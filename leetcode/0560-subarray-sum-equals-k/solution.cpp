#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> prefixCount;
        prefixCount[0] = 1;

        int prefixSum = 0;
        int count = 0;

        for (int x : nums) {
            prefixSum += x;
            auto it = prefixCount.find(prefixSum - k);
            if (it != prefixCount.end()) {
                count += it->second;
            }
            prefixCount[prefixSum]++;
        }

        return count;
    }
};
