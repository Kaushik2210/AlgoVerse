#include <vector>
#include <set>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    int numDistinctIslands(vector<vector<int>>& grid) {
        int rows = (int)grid.size(), cols = (int)grid[0].size();
        vector<vector<bool>> visited(rows, vector<bool>(cols, false));
        set<string> shapes;
        int dr[] = {1, -1, 0, 0};
        int dc[] = {0, 0, 1, -1};

        for (int sr = 0; sr < rows; sr++) {
            for (int sc = 0; sc < cols; sc++) {
                if (grid[sr][sc] == 1 && !visited[sr][sc]) {
                    vector<pair<int,int>> offsets;
                    vector<pair<int,int>> stack;
                    stack.push_back({sr, sc});
                    visited[sr][sc] = true;

                    while (!stack.empty()) {
                        auto [r, c] = stack.back();
                        stack.pop_back();
                        offsets.push_back({r - sr, c - sc});
                        for (int i = 0; i < 4; i++) {
                            int nr = r + dr[i], nc = c + dc[i];
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                                    && grid[nr][nc] == 1 && !visited[nr][nc]) {
                                visited[nr][nc] = true;
                                stack.push_back({nr, nc});
                            }
                        }
                    }

                    sort(offsets.begin(), offsets.end());
                    string signature;
                    for (auto& [dr2, dc2] : offsets) {
                        signature += to_string(dr2) + "," + to_string(dc2) + ";";
                    }
                    shapes.insert(signature);
                }
            }
        }

        return (int)shapes.size();
    }
};
