class Solution {
    public int[][] matrixReshape(int[][] mat, int r, int c) {
        int m = mat.length, n = mat[0].length;
        if (r * c != m * n) {
            return mat;
        }

        int[][] result = new int[r][c];
        for (int k = 0; k < m * n; k++) {
            result[k / c][k % c] = mat[k / n][k % n];
        }

        return result;
    }
}
