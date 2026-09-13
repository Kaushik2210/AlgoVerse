#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxDistance(vector<vector<int>>& grid) {
        int n = (int)grid.size();
        queue<tuple<int,int,int>> q;
        vector<vector<bool>> visited(n, vector<bool>(n, false));
        int landCount = 0;

        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    q.push({r, c, 0});
                    visited[r][c] = true;
                    landCount++;
                }
            }
        }

        if (landCount == 0 || landCount == n * n) {
            return -1;
        }

        int dr[] = {1, -1, 0, 0};
        int dc[] = {0, 0, 1, -1};
        int maxDist = 0;

        while (!q.empty()) {
            auto [r, c, dist] = q.front();
            q.pop();
            maxDist = max(maxDist, dist);
            for (int i = 0; i < 4; i++) {
                int nr = r + dr[i], nc = c + dc[i];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    q.push({nr, nc, dist + 1});
                }
            }
        }

        return maxDist;
    }
};
