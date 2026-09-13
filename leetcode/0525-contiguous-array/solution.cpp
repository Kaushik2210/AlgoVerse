#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int findMaxLength(vector<int>& nums) {
        unordered_map<int, int> firstSeen;
        firstSeen[0] = -1;
        int balance = 0;
        int best = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            balance += nums[i] == 1 ? 1 : -1;
            auto it = firstSeen.find(balance);
            if (it != firstSeen.end()) {
                best = max(best, i - it->second);
            } else {
                firstSeen[balance] = i;
            }
        }
        return best;
    }
};
