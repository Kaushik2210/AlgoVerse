class Solution {
    public int minFallingPathSum(int[][] matrix) {
        int n = matrix.length;
        int[] prev = matrix[0].clone();

        for (int i = 1; i < n; i++) {
            int[] curr = new int[n];
            for (int j = 0; j < n; j++) {
                int best = prev[j];
                if (j > 0) best = Math.min(best, prev[j - 1]);
                if (j < n - 1) best = Math.min(best, prev[j + 1]);
                curr[j] = matrix[i][j] + best;
            }
            prev = curr;
        }

        int result = Integer.MAX_VALUE;
        for (int x : prev) result = Math.min(result, x);
        return result;
    }
}
