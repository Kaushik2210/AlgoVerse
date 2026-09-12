#include <vector>
#include <string>
#include <unordered_set>
using namespace std;

class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        this->n = n;
        colPlacement.assign(n, -1);
        backtrack(0);
        return result;
    }

private:
    int n;
    vector<int> colPlacement;
    unordered_set<int> usedCols, usedDiag1, usedDiag2;
    vector<vector<string>> result;

    void backtrack(int row) {
        if (row == n) {
            result.push_back(buildBoard());
            return;
        }

        for (int col = 0; col < n; col++) {
            if (usedCols.count(col) || usedDiag1.count(row - col) || usedDiag2.count(row + col)) {
                continue;
            }

            colPlacement[row] = col;
            usedCols.insert(col);
            usedDiag1.insert(row - col);
            usedDiag2.insert(row + col);

            backtrack(row + 1);

            usedCols.erase(col);
            usedDiag1.erase(row - col);
            usedDiag2.erase(row + col);
        }
    }

    vector<string> buildBoard() {
        vector<string> board;
        for (int r = 0; r < n; r++) {
            string line(n, '.');
            line[colPlacement[r]] = 'Q';
            board.push_back(line);
        }
        return board;
    }
};
