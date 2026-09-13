#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minCost(vector<vector<int>>& costs) {
        int red = costs[0][0], blue = costs[0][1], green = costs[0][2];

        for (size_t i = 1; i < costs.size(); i++) {
            int newRed = costs[i][0] + min(blue, green);
            int newBlue = costs[i][1] + min(red, green);
            int newGreen = costs[i][2] + min(red, blue);
            red = newRed;
            blue = newBlue;
            green = newGreen;
        }

        return min({red, blue, green});
    }
};
