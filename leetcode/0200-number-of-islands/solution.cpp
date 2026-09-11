#include <vector>
#include <stack>
using namespace std;

class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty() || grid[0].empty()) {
            return 0;
        }

        int rows = grid.size(), cols = grid[0].size();
        int islands = 0;
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    islands++;
                    grid[r][c] = '0';

                    stack<pair<int, int>> st;
                    st.push({r, c});
                    while (!st.empty()) {
                        auto [row, col] = st.top();
                        st.pop();
                        for (auto& d : dirs) {
                            int nr = row + d[0];
                            int nc = col + d[1];
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == '1') {
                                grid[nr][nc] = '0';
                                st.push({nr, nc});
                            }
                        }
                    }
                }
            }
        }

        return islands;
    }
};
