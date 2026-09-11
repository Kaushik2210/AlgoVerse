class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int tmp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = tmp;
            }
        }

        for (int[] row : matrix) {
            int lo = 0, hi = row.length - 1;
            while (lo < hi) {
                int tmp = row[lo];
                row[lo] = row[hi];
                row[hi] = tmp;
                lo++;
                hi--;
            }
        }
    }
}
