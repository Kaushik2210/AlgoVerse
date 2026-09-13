#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& grid) {
        int n = grid.size();
        vector<int> prev = grid[0];

        for (int i = 1; i < n; i++) {
            long long min1 = LLONG_MAX, min2 = LLONG_MAX;
            int min1Col = -1;
            for (int j = 0; j < n; j++) {
                if (prev[j] < min1) {
                    min2 = min1;
                    min1 = prev[j];
                    min1Col = j;
                } else if (prev[j] < min2) {
                    min2 = prev[j];
                }
            }

            vector<int> curr(n);
            for (int j = 0; j < n; j++) {
                long long best = (j == min1Col) ? min2 : min1;
                curr[j] = (int)(grid[i][j] + best);
            }
            prev = curr;
        }

        return *min_element(prev.begin(), prev.end());
    }
};
