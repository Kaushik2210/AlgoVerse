#include <vector>
#include <algorithm>
using namespace std;

class Solution {
    vector<int> parent, sz;

    int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    void unite(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return;
        if (sz[ra] < sz[rb]) swap(ra, rb);
        parent[rb] = ra;
        sz[ra] += sz[rb];
    }

    int idx(int r, int c, int cols) {
        return r * cols + c;
    }

public:
    vector<int> hitBricks(vector<vector<int>>& grid, vector<vector<int>>& hits) {
        int rows = (int)grid.size(), cols = (int)grid[0].size();
        int roof = rows * cols;
        int directions[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        vector<vector<int>> finalGrid = grid;
        for (auto& hit : hits) finalGrid[hit[0]][hit[1]] = 0;

        parent.resize(rows * cols + 1);
        sz.assign(rows * cols + 1, 1);
        for (int i = 0; i < (int)parent.size(); i++) parent[i] = i;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (finalGrid[r][c] == 1) {
                    if (r == 0) unite(idx(r, c, cols), roof);
                    for (auto& d : directions) {
                        int nr = r + d[0], nc = c + d[1];
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && finalGrid[nr][nc] == 1) {
                            unite(idx(r, c, cols), idx(nr, nc, cols));
                        }
                    }
                }
            }
        }

        vector<int> result(hits.size(), 0);
        for (int i = (int)hits.size() - 1; i >= 0; i--) {
            int r = hits[i][0], c = hits[i][1];
            if (grid[r][c] == 0) continue;

            int before = sz[find(roof)];

            finalGrid[r][c] = 1;
            if (r == 0) unite(idx(r, c, cols), roof);
            for (auto& d : directions) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && finalGrid[nr][nc] == 1) {
                    unite(idx(r, c, cols), idx(nr, nc, cols));
                }
            }

            int after = sz[find(roof)];
            result[i] = max(0, after - before - 1);
        }

        return result;
    }
};
