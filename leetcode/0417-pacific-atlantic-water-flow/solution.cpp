#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        vector<vector<int>> result;
        if (heights.empty() || heights[0].empty()) return result;

        int rows = heights.size(), cols = heights[0].size();
        vector<vector<bool>> pacific(rows, vector<bool>(cols, false));
        vector<vector<bool>> atlantic(rows, vector<bool>(cols, false));

        vector<pair<int,int>> pacificStack, atlanticStack;
        for (int c = 0; c < cols; c++) {
            pacific[0][c] = true;
            pacificStack.push_back({0, c});
            atlantic[rows - 1][c] = true;
            atlanticStack.push_back({rows - 1, c});
        }
        for (int r = 0; r < rows; r++) {
            pacific[r][0] = true;
            pacificStack.push_back({r, 0});
            atlantic[r][cols - 1] = true;
            atlanticStack.push_back({r, cols - 1});
        }

        flood(heights, pacific, pacificStack, rows, cols);
        flood(heights, atlantic, atlanticStack, rows, cols);

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (pacific[r][c] && atlantic[r][c]) {
                    result.push_back({r, c});
                }
            }
        }

        return result;
    }

private:
    void flood(vector<vector<int>>& heights, vector<vector<bool>>& reachable,
               vector<pair<int,int>>& stack, int rows, int cols) {
        int dr[] = {1, -1, 0, 0};
        int dc[] = {0, 0, 1, -1};
        while (!stack.empty()) {
            auto [r, c] = stack.back();
            stack.pop_back();
            for (int i = 0; i < 4; i++) {
                int nr = r + dr[i], nc = c + dc[i];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !reachable[nr][nc]
                        && heights[nr][nc] >= heights[r][c]) {
                    reachable[nr][nc] = true;
                    stack.push_back({nr, nc});
                }
            }
        }
    }
};
