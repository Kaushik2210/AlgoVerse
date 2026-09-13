class Solution {
    public int[][] multiply(int[][] mat1, int[][] mat2) {
        int m = mat1.length, k = mat1[0].length, n = mat2[0].length;
        int[][] result = new int[m][n];

        for (int i = 0; i < m; i++) {
            for (int x = 0; x < k; x++) {
                int val1 = mat1[i][x];
                if (val1 == 0) continue;
                for (int j = 0; j < n; j++) {
                    int val2 = mat2[x][j];
                    if (val2 != 0) {
                        result[i][j] += val1 * val2;
                    }
                }
            }
        }

        return result;
    }
}
