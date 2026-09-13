#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> intervalIntersection(vector<vector<int>>& firstList, vector<vector<int>>& secondList) {
        vector<vector<int>> result;
        int i = 0, j = 0;
        while (i < (int)firstList.size() && j < (int)secondList.size()) {
            int lo = max(firstList[i][0], secondList[j][0]);
            int hi = min(firstList[i][1], secondList[j][1]);
            if (lo <= hi) {
                result.push_back({lo, hi});
            }
            if (firstList[i][1] < secondList[j][1]) {
                i++;
            } else {
                j++;
            }
        }
        return result;
    }
};
