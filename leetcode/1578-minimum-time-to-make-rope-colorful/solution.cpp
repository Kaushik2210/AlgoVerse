#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minCost(string colors, vector<int>& neededTime) {
        int total = 0;
        int i = 0;
        int n = (int)colors.size();

        while (i < n) {
            int j = i;
            int groupSum = 0, groupMax = 0;
            while (j < n && colors[j] == colors[i]) {
                groupSum += neededTime[j];
                groupMax = max(groupMax, neededTime[j]);
                j++;
            }
            total += groupSum - groupMax;
            i = j;
        }

        return total;
    }
};
