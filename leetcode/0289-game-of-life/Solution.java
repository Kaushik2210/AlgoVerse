class Solution {
    public void gameOfLife(int[][] board) {
        int rows = board.length, cols = board[0].length;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                int live = liveNeighbors(board, r, c, rows, cols);
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

    private int liveNeighbors(int[][] board, int r, int c, int rows, int cols) {
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
    }
}
