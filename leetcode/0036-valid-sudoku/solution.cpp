#include <vector>
using namespace std;

class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        bool rows[9][9] = {};
        bool cols[9][9] = {};
        bool boxes[9][9] = {};

        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                char ch = board[r][c];
                if (ch == '.') continue;
                int d = ch - '1';
                int b = (r / 3) * 3 + (c / 3);
                if (rows[r][d] || cols[c][d] || boxes[b][d]) {
                    return false;
                }
                rows[r][d] = true;
                cols[c][d] = true;
                boxes[b][d] = true;
            }
        }
        return true;
    }
};
