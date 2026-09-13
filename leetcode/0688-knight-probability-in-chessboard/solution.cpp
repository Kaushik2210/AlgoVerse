#include <vector>
using namespace std;

class Solution {
public:
    double knightProbability(int n, int k, int row, int column) {
        vector<pair<int, int>> moves = {
            {1, 2}, {2, 1}, {-1, 2}, {-2, 1},
            {1, -2}, {2, -1}, {-1, -2}, {-2, -1}
        };

        vector<vector<double>> dp(n, vector<double>(n, 0.0));
        dp[row][column] = 1.0;

        for (int step = 0; step < k; step++) {
            vector<vector<double>> newDp(n, vector<double>(n, 0.0));
            for (int r = 0; r < n; r++) {
                for (int c = 0; c < n; c++) {
                    if (dp[r][c] == 0.0) continue;
                    double share = dp[r][c] / 8.0;
                    for (auto& [dr, dc] : moves) {
                        int nr = r + dr, nc = c + dc;
                        if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                            newDp[nr][nc] += share;
                        }
                    }
                }
            }
            dp = newDp;
        }

        double total = 0.0;
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                total += dp[r][c];
            }
        }
        return total;
    }
};
