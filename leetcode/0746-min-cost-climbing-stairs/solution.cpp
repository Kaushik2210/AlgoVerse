#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int prev2 = 0, prev1 = 0;
        for (int i = 2; i <= (int)cost.size(); i++) {
            int cur = min(prev1 + cost[i - 1], prev2 + cost[i - 2]);
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
};
