import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public void solve(char[][] board) {
        if (board.length == 0 || board[0].length == 0) {
            return;
        }

        int rows = board.length, cols = board[0].length;

        for (int r = 0; r < rows; r++) {
            flood(board, r, 0, rows, cols);
            flood(board, r, cols - 1, rows, cols);
        }
        for (int c = 0; c < cols; c++) {
            flood(board, 0, c, rows, cols);
            flood(board, rows - 1, c, rows, cols);
        }

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (board[r][c] == 'O') {
                    board[r][c] = 'X';
                } else if (board[r][c] == '#') {
                    board[r][c] = 'O';
                }
            }
        }
    }

    private void flood(char[][] board, int r, int c, int rows, int cols) {
        if (board[r][c] != 'O') {
            return;
        }

        Deque<int[]> stack = new ArrayDeque<>();
        stack.push(new int[]{r, c});
        board[r][c] = '#';

        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!stack.isEmpty()) {
            int[] cur = stack.pop();
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] == 'O') {
                    board[nr][nc] = '#';
                    stack.push(new int[]{nr, nc});
                }
            }
        }
    }
}
