#include <vector>
using namespace std;

class Solution {
public:
    void gameOfLife(vector<vector<int>>& board) {
        int rows = (int)board.size(), cols = (int)board[0].size();

        auto liveNeighbors = [&](int r, int c) {
            int count = 0;
            for (int dr = -1; dr <= 1; dr++) {
                for (int dc = -1; dc <= 1; dc++) {
                    if (dr == 0 && dc == 0) continue;
                    int nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                        count += board[nr][nc] & 1;
                    }
                }
            }
            return count;
        };

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                int live = liveNeighbors(r, c);
                int old = board[r][c] & 1;
                if (old == 1 && (live == 2 || live == 3)) {
                    board[r][c] |= 2;
                } else if (old == 0 && live == 3) {
                    board[r][c] |= 2;
                }
            }
        }

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                board[r][c] >>= 1;
            }
        }
    }
};
