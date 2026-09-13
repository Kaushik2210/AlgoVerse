#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int calculateMinimumHP(vector<vector<int>>& dungeon) {
        int m = dungeon.size(), n = dungeon[0].size();
        vector<vector<int>> dp(m, vector<int>(n, 0));

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int need;
                if (i == m - 1 && j == n - 1) {
                    need = 1 - dungeon[i][j];
                } else if (i == m - 1) {
                    need = dp[i][j + 1] - dungeon[i][j];
                } else if (j == n - 1) {
                    need = dp[i + 1][j] - dungeon[i][j];
                } else {
                    need = min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j];
                }
                dp[i][j] = max(1, need);
            }
        }

        return dp[0][0];
    }
};
