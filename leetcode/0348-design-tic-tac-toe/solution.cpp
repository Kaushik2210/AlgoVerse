#include <cmath>
#include <vector>
using namespace std;

class TicTacToe {
public:
    TicTacToe(int n) : n(n), rows(n, 0), cols(n, 0), diag(0), antiDiag(0) {}

    int move(int row, int col, int player) {
        int delta = (player == 1) ? 1 : -1;

        rows[row] += delta;
        cols[col] += delta;
        if (row == col) {
            diag += delta;
        }
        if (row + col == n - 1) {
            antiDiag += delta;
        }

        if (abs(rows[row]) == n || abs(cols[col]) == n
            || abs(diag) == n || abs(antiDiag) == n) {
            return player;
        }
        return 0;
    }

private:
    int n;
    vector<int> rows;
    vector<int> cols;
    int diag;
    int antiDiag;
};

/**
 * Your TicTacToe object will be instantiated and called as such:
 * TicTacToe* obj = new TicTacToe(n);
 * int param_1 = obj->move(row,col,player);
 */
