#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices, int fee) {
        int hold = -prices[0];
        int cash = 0;

        for (size_t i = 1; i < prices.size(); i++) {
            int prevHold = hold, prevCash = cash;
            hold = max(prevHold, prevCash - prices[i]);
            cash = max(prevCash, prevHold + prices[i] - fee);
        }

        return cash;
    }
};
