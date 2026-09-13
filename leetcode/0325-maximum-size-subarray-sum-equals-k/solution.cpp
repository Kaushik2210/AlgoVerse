#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxSubArrayLen(vector<int>& nums, int k) {
        unordered_map<long long, int> firstSeen;
        firstSeen[0] = -1;
        long long prefix = 0;
        int best = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            prefix += nums[i];
            long long needed = prefix - k;
            auto it = firstSeen.find(needed);
            if (it != firstSeen.end()) {
                best = max(best, i - it->second);
            }
            if (firstSeen.find(prefix) == firstSeen.end()) {
                firstSeen[prefix] = i;
            }
        }
        return best;
    }
};
