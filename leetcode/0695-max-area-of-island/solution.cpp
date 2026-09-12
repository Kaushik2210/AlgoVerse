#include <vector>
using namespace std;

class Solution {
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int rows = grid.size(), cols = grid[0].size();
        int best = 0;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 1) {
                    best = max(best, flood(grid, r, c, rows, cols));
                }
            }
        }

        return best;
    }

private:
    int flood(vector<vector<int>>& grid, int r, int c, int rows, int cols) {
        vector<pair<int,int>> stack = {{r, c}};
        grid[r][c] = 0;
        int area = 0;
        int dr[] = {1, -1, 0, 0};
        int dc[] = {0, 0, 1, -1};

        while (!stack.empty()) {
            auto [cr, cc] = stack.back();
            stack.pop_back();
            area++;
            for (int i = 0; i < 4; i++) {
                int nr = cr + dr[i], nc = cc + dc[i];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                    grid[nr][nc] = 0;
                    stack.push_back({nr, nc});
                }
            }
        }

        return area;
    }
};
