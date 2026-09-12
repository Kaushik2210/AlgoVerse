#include <vector>
using namespace std;

class Solution {
public:
    void solve(vector<vector<char>>& board) {
        if (board.empty() || board[0].empty()) return;
        int rows = board.size(), cols = board[0].size();

        auto flood = [&](int r, int c) {
            if (board[r][c] != 'O') return;
            vector<pair<int,int>> stack = {{r, c}};
            board[r][c] = '#';
            int dr[] = {1, -1, 0, 0};
            int dc[] = {0, 0, 1, -1};
            while (!stack.empty()) {
                auto [cr, cc] = stack.back();
                stack.pop_back();
                for (int i = 0; i < 4; i++) {
                    int nr = cr + dr[i], nc = cc + dc[i];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] == 'O') {
                        board[nr][nc] = '#';
                        stack.push_back({nr, nc});
                    }
                }
            }
        };

        for (int r = 0; r < rows; r++) {
            flood(r, 0);
            flood(r, cols - 1);
        }
        for (int c = 0; c < cols; c++) {
            flood(0, c);
            flood(rows - 1, c);
        }

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (board[r][c] == 'O') board[r][c] = 'X';
                else if (board[r][c] == '#') board[r][c] = 'O';
            }
        }
    }
};
