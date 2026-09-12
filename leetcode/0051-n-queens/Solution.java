import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {
    private int n;
    private int[] colPlacement;
    private Set<Integer> usedCols = new HashSet<>();
    private Set<Integer> usedDiag1 = new HashSet<>();
    private Set<Integer> usedDiag2 = new HashSet<>();
    private List<List<String>> result = new ArrayList<>();

    public List<List<String>> solveNQueens(int n) {
        this.n = n;
        this.colPlacement = new int[n];
        backtrack(0);
        return result;
    }

    private void backtrack(int row) {
        if (row == n) {
            result.add(buildBoard());
            return;
        }

        for (int col = 0; col < n; col++) {
            if (usedCols.contains(col) || usedDiag1.contains(row - col) || usedDiag2.contains(row + col)) {
                continue;
            }

            colPlacement[row] = col;
            usedCols.add(col);
            usedDiag1.add(row - col);
            usedDiag2.add(row + col);

            backtrack(row + 1);

            usedCols.remove(col);
            usedDiag1.remove(row - col);
            usedDiag2.remove(row + col);
        }
    }

    private List<String> buildBoard() {
        List<String> board = new ArrayList<>();
        for (int r = 0; r < n; r++) {
            char[] line = new char[n];
            java.util.Arrays.fill(line, '.');
            line[colPlacement[r]] = 'Q';
            board.add(new String(line));
        }
        return board;
    }
}
