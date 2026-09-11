#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX;
        int bestProfit = 0;

        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else {
                bestProfit = max(bestProfit, price - minPrice);
            }
        }

        return bestProfit;
    }
};
