#include <unordered_set>
using namespace std;

class Solution {
public:
    int totalNQueens(int n) {
        count = 0;
        backtrack(0, n);
        return count;
    }

private:
    int count;
    unordered_set<int> usedCols;
    unordered_set<int> usedDiag1;
    unordered_set<int> usedDiag2;

    void backtrack(int row, int n) {
        if (row == n) {
            count++;
            return;
        }

        for (int col = 0; col < n; col++) {
            int diag1 = row - col;
            int diag2 = row + col;
            if (usedCols.count(col) || usedDiag1.count(diag1) || usedDiag2.count(diag2)) {
                continue;
            }

            usedCols.insert(col);
            usedDiag1.insert(diag1);
            usedDiag2.insert(diag2);

            backtrack(row + 1, n);

            usedCols.erase(col);
            usedDiag1.erase(diag1);
            usedDiag2.erase(diag2);
        }
    }
};
