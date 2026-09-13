import java.util.HashSet;
import java.util.Set;

class Solution {
    private int count;
    private final Set<Integer> usedCols = new HashSet<>();
    private final Set<Integer> usedDiag1 = new HashSet<>();
    private final Set<Integer> usedDiag2 = new HashSet<>();

    public int totalNQueens(int n) {
        count = 0;
        backtrack(0, n);
        return count;
    }

    private void backtrack(int row, int n) {
        if (row == n) {
            count++;
            return;
        }

        for (int col = 0; col < n; col++) {
            int diag1 = row - col;
            int diag2 = row + col;
            if (usedCols.contains(col) || usedDiag1.contains(diag1) || usedDiag2.contains(diag2)) {
                continue;
            }

            usedCols.add(col);
            usedDiag1.add(diag1);
            usedDiag2.add(diag2);

            backtrack(row + 1, n);

            usedCols.remove(col);
            usedDiag1.remove(diag1);
            usedDiag2.remove(diag2);
        }
    }
}
