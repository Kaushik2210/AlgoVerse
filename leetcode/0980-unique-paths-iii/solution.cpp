#include <vector>
using namespace std;

class Solution {
public:
    int uniquePathsIII(vector<vector<int>>& grid) {
        rows = (int)grid.size();
        cols = (int)grid[0].size();
        int startR = -1, startC = -1, emptyCount = 0;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 1) {
                    startR = r;
                    startC = c;
                } else if (grid[r][c] == 0) {
                    emptyCount++;
                }
            }
        }

        paths = 0;
        dfs(grid, startR, startC, emptyCount + 1);
        return paths;
    }

private:
    int rows, cols, paths;

    void dfs(vector<vector<int>>& grid, int r, int c, int remaining) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == -1) {
            return;
        }
        if (grid[r][c] == 2) {
            if (remaining == 0) paths++;
            return;
        }

        int original = grid[r][c];
        grid[r][c] = -1; // mark visited
        static const int dr[] = {1, -1, 0, 0};
        static const int dc[] = {0, 0, 1, -1};
        for (int i = 0; i < 4; i++) {
            dfs(grid, r + dr[i], c + dc[i], remaining - 1);
        }
        grid[r][c] = original; // backtrack
    }
};
