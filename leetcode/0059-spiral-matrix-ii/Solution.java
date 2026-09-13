class Solution {
    public int[][] generateMatrix(int n) {
        int[][] matrix = new int[n][n];
        int top = 0, bottom = n - 1, left = 0, right = n - 1;
        int num = 1;

        while (top <= bottom && left <= right) {
            for (int c = left; c <= right; c++) {
                matrix[top][c] = num++;
            }
            top++;

            for (int r = top; r <= bottom; r++) {
                matrix[r][right] = num++;
            }
            right--;

            if (top <= bottom) {
                for (int c = right; c >= left; c--) {
                    matrix[bottom][c] = num++;
                }
                bottom--;
            }

            if (left <= right) {
                for (int r = bottom; r >= top; r--) {
                    matrix[r][left] = num++;
                }
                left++;
            }
        }

        return matrix;
    }
}
