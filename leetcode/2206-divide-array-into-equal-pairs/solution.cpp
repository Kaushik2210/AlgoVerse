#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool divideArray(vector<int>& nums) {
        unordered_map<int, int> counts;
        for (int num : nums) counts[num]++;

        for (auto& [value, c] : counts) {
            if (c % 2 != 0) return false;
        }
        return true;
    }
};
