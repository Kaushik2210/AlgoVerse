#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        long long buy1 = LLONG_MIN, buy2 = LLONG_MIN;
        long long sell1 = 0, sell2 = 0;

        for (int p : prices) {
            buy1 = max(buy1, -(long long)p);
            sell1 = max(sell1, buy1 + p);
            buy2 = max(buy2, sell1 - p);
            sell2 = max(sell2, buy2 + p);
        }

        return (int)sell2;
    }
};
