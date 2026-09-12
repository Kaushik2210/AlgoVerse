#include <vector>
using namespace std;

class Solution {
public:
    void solveSudoku(vector<vector<char>>& board) {
        this->board = &board;

        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                char val = board[r][c];
                if (val == '.') {
                    empties.push_back({r, c});
                } else {
                    int digit = val - '0';
                    int b = (r / 3) * 3 + c / 3;
                    rows[r][digit] = true;
                    cols[c][digit] = true;
                    boxes[b][digit] = true;
                }
            }
        }

        backtrack(0);
    }

private:
    bool rows[9][10] = {};
    bool cols[9][10] = {};
    bool boxes[9][10] = {};
    vector<vector<char>>* board;
    vector<pair<int, int>> empties;

    bool backtrack(int idx) {
        if (idx == (int)empties.size()) {
            return true;
        }

        int r = empties[idx].first;
        int c = empties[idx].second;
        int b = (r / 3) * 3 + c / 3;

        for (int digit = 1; digit <= 9; digit++) {
            if (rows[r][digit] || cols[c][digit] || boxes[b][digit]) {
                continue;
            }

            (*board)[r][c] = (char)('0' + digit);
            rows[r][digit] = cols[c][digit] = boxes[b][digit] = true;

            if (backtrack(idx + 1)) {
                return true;
            }

            (*board)[r][c] = '.';
            rows[r][digit] = cols[c][digit] = boxes[b][digit] = false;
        }

        return false;
    }
};
