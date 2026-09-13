#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int shortestBridge(vector<vector<int>>& grid) {
        int n = (int)grid.size();
        vector<vector<bool>> visited(n, vector<bool>(n, false));
        int dr[] = {1, -1, 0, 0};
        int dc[] = {0, 0, 1, -1};

        int sr = -1, sc = -1;
        for (int r = 0; r < n && sr == -1; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    sr = r;
                    sc = c;
                    break;
                }
            }
        }

        vector<pair<int,int>> stack;
        stack.push_back({sr, sc});
        visited[sr][sc] = true;
        queue<tuple<int,int,int>> q;
        q.push({sr, sc, 0});

        while (!stack.empty()) {
            auto [r, c] = stack.back();
            stack.pop_back();
            for (int i = 0; i < 4; i++) {
                int nr = r + dr[i], nc = c + dc[i];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] == 1) {
                    visited[nr][nc] = true;
                    stack.push_back({nr, nc});
                    q.push({nr, nc, 0});
                }
            }
        }

        while (!q.empty()) {
            auto [r, c, dist] = q.front();
            q.pop();
            for (int i = 0; i < 4; i++) {
                int nr = r + dr[i], nc = c + dc[i];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
                    if (grid[nr][nc] == 1) {
                        return dist;
                    }
                    visited[nr][nc] = true;
                    q.push({nr, nc, dist + 1});
                }
            }
        }

        return -1;
    }
};
