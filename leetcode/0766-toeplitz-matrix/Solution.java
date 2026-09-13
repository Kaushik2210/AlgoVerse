class Solution {
    public boolean isToeplitzMatrix(int[][] matrix) {
        int rows = matrix.length, cols = matrix[0].length;
        for (int r = 0; r < rows - 1; r++) {
            for (int c = 0; c < cols - 1; c++) {
                if (matrix[r][c] != matrix[r + 1][c + 1]) {
                    return false;
                }
            }
        }
        return true;
    }
}
