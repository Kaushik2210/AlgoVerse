#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool isPossible(vector<int>& nums) {
        unordered_map<int, int> count, tails;
        for (int x : nums) count[x]++;

        for (int x : nums) {
            if (count[x] == 0) continue;
            count[x]--;

            if (tails[x - 1] > 0) {
                tails[x - 1]--;
                tails[x]++;
            } else if (count[x + 1] > 0 && count[x + 2] > 0) {
                count[x + 1]--;
                count[x + 2]--;
                tails[x + 2]++;
            } else {
                return false;
            }
        }
        return true;
    }
};
