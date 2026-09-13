#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int maximumMinimumPath(vector<vector<int>>& grid) {
        int rows = (int)grid.size(), cols = (int)grid[0].size();
        int directions[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        // max-heap of (score, row, col)
        priority_queue<tuple<int, int, int>> heap;
        vector<vector<bool>> visited(rows, vector<bool>(cols, false));

        heap.push({grid[0][0], 0, 0});
        visited[0][0] = true;

        while (!heap.empty()) {
            auto [score, r, c] = heap.top();
            heap.pop();
            if (r == rows - 1 && c == cols - 1) return score;

            for (auto& d : directions) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    int newScore = min(score, grid[nr][nc]);
                    heap.push({newScore, nr, nc});
                }
            }
        }

        return -1;
    }
};
