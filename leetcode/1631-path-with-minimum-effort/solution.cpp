#include <vector>
#include <queue>
#include <climits>
#include <cmath>
using namespace std;

class Solution {
public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        int rows = (int)heights.size(), cols = (int)heights[0].size();
        int directions[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        vector<vector<int>> effortTo(rows, vector<int>(cols, INT_MAX));
        effortTo[0][0] = 0;

        // min-heap of (effort, row, col)
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<>> heap;
        heap.push({0, 0, 0});

        while (!heap.empty()) {
            auto [effort, r, c] = heap.top();
            heap.pop();
            if (r == rows - 1 && c == cols - 1) return effort;
            if (effort > effortTo[r][c]) continue;

            for (auto& d : directions) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    int step = abs(heights[nr][nc] - heights[r][c]);
                    int newEffort = max(effort, step);
                    if (newEffort < effortTo[nr][nc]) {
                        effortTo[nr][nc] = newEffort;
                        heap.push({newEffort, nr, nc});
                    }
                }
            }
        }

        return 0;
    }
};
