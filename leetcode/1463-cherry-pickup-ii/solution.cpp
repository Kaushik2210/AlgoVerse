#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    int cherryPickup(vector<vector<int>>& grid) {
        rows = grid.size();
        cols = grid[0].size();
        this->grid = grid;
        memo.assign(rows, vector<vector<int>>(cols, vector<int>(cols, INT_MIN)));
        return dp(0, 0, cols - 1);
    }

private:
    int rows, cols;
    vector<vector<int>> grid;
    vector<vector<vector<int>>> memo;

    int dp(int row, int c1, int c2) {
        if (c1 < 0 || c1 >= cols || c2 < 0 || c2 >= cols) {
            return INT_MIN / 2;
        }

        int cherries = grid[row][c1];
        if (c1 != c2) {
            cherries += grid[row][c2];
        }

        if (row == rows - 1) {
            return cherries;
        }

        if (memo[row][c1][c2] != INT_MIN) {
            return memo[row][c1][c2];
        }

        int best = INT_MIN / 2;
        for (int d1 = -1; d1 <= 1; d1++) {
            for (int d2 = -1; d2 <= 1; d2++) {
                best = max(best, dp(row + 1, c1 + d1, c2 + d2));
            }
        }

        memo[row][c1][c2] = cherries + best;
        return cherries + best;
    }
};
