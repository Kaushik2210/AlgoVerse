#include <vector>
#include <queue>
#include <tuple>
using namespace std;

class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int n = grid.size();
        if (grid[0][0] != 0 || grid[n - 1][n - 1] != 0) {
            return -1;
        }

        vector<pair<int, int>> directions = {{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}};
        vector<vector<bool>> visited(n, vector<bool>(n, false));
        visited[0][0] = true;
        queue<tuple<int, int, int>> q;
        q.push({0, 0, 1});

        while (!q.empty()) {
            auto [row, col, dist] = q.front();
            q.pop();
            if (row == n - 1 && col == n - 1) {
                return dist;
            }
            for (auto& [dr, dc] : directions) {
                int nr = row + dr, nc = col + dc;
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] == 0) {
                    visited[nr][nc] = true;
                    q.push({nr, nc, dist + 1});
                }
            }
        }

        return -1;
    }
};
