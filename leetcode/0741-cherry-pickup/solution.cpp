#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    int cherryPickup(vector<vector<int>>& grid) {
        int n = grid.size();
        const int NEG = INT_MIN / 2;

        vector<vector<int>> dp(n, vector<int>(n, NEG));
        dp[0][0] = grid[0][0];

        for (int t = 1; t <= 2 * n - 2; t++) {
            vector<vector<int>> newDp(n, vector<int>(n, NEG));

            int loR1 = max(0, t - n + 1);
            int hiR1 = min(n - 1, t);
            for (int r1 = loR1; r1 <= hiR1; r1++) {
                int c1 = t - r1;
                if (c1 < 0 || c1 >= n || grid[r1][c1] == -1) continue;

                int loR2 = max(0, t - n + 1);
                int hiR2 = min(n - 1, t);
                for (int r2 = loR2; r2 <= hiR2; r2++) {
                    int c2 = t - r2;
                    if (c2 < 0 || c2 >= n || grid[r2][c2] == -1) continue;

                    int best = NEG;
                    for (int pr1 = r1 - 1; pr1 <= r1; pr1++) {
                        if (pr1 < 0) continue;
                        for (int pr2 = r2 - 1; pr2 <= r2; pr2++) {
                            if (pr2 < 0) continue;
                            best = max(best, dp[pr1][pr2]);
                        }
                    }

                    if (best == NEG) continue;

                    int value = grid[r1][c1];
                    if (r1 != r2) value += grid[r2][c2];
                    newDp[r1][r2] = best + value;
                }
            }
            dp = newDp;
        }

        return max(dp[n - 1][n - 1], 0);
    }
};
