class Solution {
    public int[] findDiagonalOrder(int[][] mat) {
        int m = mat.length, n = mat[0].length;
        int[] result = new int[m * n];
        int idx = 0;

        for (int d = 0; d < m + n - 1; d++) {
            int rLo = Math.max(0, d - (n - 1));
            int rHi = Math.min(d, m - 1);

            if (d % 2 == 0) {
                for (int r = rHi; r >= rLo; r--) {
                    result[idx++] = mat[r][d - r];
                }
            } else {
                for (int r = rLo; r <= rHi; r++) {
                    result[idx++] = mat[r][d - r];
                }
            }
        }

        return result;
    }
}
