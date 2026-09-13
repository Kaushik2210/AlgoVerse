class TicTacToe {
    private final int n;
    private final int[] rows;
    private final int[] cols;
    private int diag;
    private int antiDiag;

    public TicTacToe(int n) {
        this.n = n;
        this.rows = new int[n];
        this.cols = new int[n];
        this.diag = 0;
        this.antiDiag = 0;
    }

    public int move(int row, int col, int player) {
        int delta = (player == 1) ? 1 : -1;

        rows[row] += delta;
        cols[col] += delta;
        if (row == col) {
            diag += delta;
        }
        if (row + col == n - 1) {
            antiDiag += delta;
        }

        if (Math.abs(rows[row]) == n || Math.abs(cols[col]) == n
                || Math.abs(diag) == n || Math.abs(antiDiag) == n) {
            return player;
        }
        return 0;
    }
}

/**
 * Your TicTacToe object will be instantiated and called as such:
 * TicTacToe obj = new TicTacToe(n);
 * int param_1 = obj.move(row,col,player);
 */
