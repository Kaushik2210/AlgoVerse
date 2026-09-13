class Solution {
    public int minFallingPathSum(int[][] grid) {
        int n = grid.length;
        int[] prev = grid[0].clone();

        for (int i = 1; i < n; i++) {
            long min1 = Long.MAX_VALUE, min2 = Long.MAX_VALUE;
            int min1Col = -1;
            for (int j = 0; j < n; j++) {
                if (prev[j] < min1) {
                    min2 = min1;
                    min1 = prev[j];
                    min1Col = j;
                } else if (prev[j] < min2) {
                    min2 = prev[j];
                }
            }

            int[] curr = new int[n];
            for (int j = 0; j < n; j++) {
                long best = (j == min1Col) ? min2 : min1;
                curr[j] = (int) (grid[i][j] + best);
            }
            prev = curr;
        }

        int result = Integer.MAX_VALUE;
        for (int x : prev) result = Math.min(result, x);
        return result;
    }
}
