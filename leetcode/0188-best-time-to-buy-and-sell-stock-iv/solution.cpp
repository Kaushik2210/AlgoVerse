#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        if (n == 0) return 0;

        if (k >= n / 2) {
            int profit = 0;
            for (int i = 1; i < n; i++) {
                if (prices[i] > prices[i - 1]) {
                    profit += prices[i] - prices[i - 1];
                }
            }
            return profit;
        }

        vector<int> hold(k + 1, INT_MIN / 2);
        vector<int> cash(k + 1, 0);

        for (int price : prices) {
            for (int t = 1; t <= k; t++) {
                hold[t] = max(hold[t], cash[t - 1] - price);
                cash[t] = max(cash[t], hold[t] + price);
            }
        }

        return cash[k];
    }
};
