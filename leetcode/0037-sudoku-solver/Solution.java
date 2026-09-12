import java.util.ArrayList;
import java.util.List;

class Solution {
    private boolean[][] rows = new boolean[9][10];
    private boolean[][] cols = new boolean[9][10];
    private boolean[][] boxes = new boolean[9][10];
    private char[][] board;
    private List<int[]> empties = new ArrayList<>();

    public void solveSudoku(char[][] board) {
        this.board = board;

        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                char val = board[r][c];
                if (val == '.') {
                    empties.add(new int[]{r, c});
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

    private boolean backtrack(int idx) {
        if (idx == empties.size()) {
            return true;
        }

        int r = empties.get(idx)[0];
        int c = empties.get(idx)[1];
        int b = (r / 3) * 3 + c / 3;

        for (int digit = 1; digit <= 9; digit++) {
            if (rows[r][digit] || cols[c][digit] || boxes[b][digit]) {
                continue;
            }

            board[r][c] = (char) ('0' + digit);
            rows[r][digit] = cols[c][digit] = boxes[b][digit] = true;

            if (backtrack(idx + 1)) {
                return true;
            }

            board[r][c] = '.';
            rows[r][digit] = cols[c][digit] = boxes[b][digit] = false;
        }

        return false;
    }
}
