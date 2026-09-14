#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int findPairs(vector<int>& nums, int k) {
        if (k < 0) {
            return 0;
        }

        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        int result = 0;
        if (k == 0) {
            for (auto& [value, freq] : count) {
                if (freq > 1) {
                    result++;
                }
            }
        } else {
            for (auto& [value, freq] : count) {
                if (count.find(value + k) != count.end()) {
                    result++;
                }
            }
        }

        return result;
    }
};
