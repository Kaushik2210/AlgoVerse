class Solution {
    private int rows, cols;
    private int[][][] memo;
    private int[][] grid;
    private static final int UNSET = Integer.MIN_VALUE;

    public int cherryPickup(int[][] grid) {
        this.grid = grid;
        rows = grid.length;
        cols = grid[0].length;
        memo = new int[rows][cols][cols];
        for (int[][] plane : memo) {
            for (int[] row : plane) {
                java.util.Arrays.fill(row, UNSET);
            }
        }
        return dp(0, 0, cols - 1);
    }

    private int dp(int row, int c1, int c2) {
        if (c1 < 0 || c1 >= cols || c2 < 0 || c2 >= cols) {
            return Integer.MIN_VALUE / 2;
        }

        int cherries = grid[row][c1];
        if (c1 != c2) {
            cherries += grid[row][c2];
        }

        if (row == rows - 1) {
            return cherries;
        }

        if (memo[row][c1][c2] != UNSET) {
            return memo[row][c1][c2];
        }

        int best = Integer.MIN_VALUE / 2;
        for (int d1 = -1; d1 <= 1; d1++) {
            for (int d2 = -1; d2 <= 1; d2++) {
                best = Math.max(best, dp(row + 1, c1 + d1, c2 + d2));
            }
        }

        memo[row][c1][c2] = cherries + best;
        return cherries + best;
    }
}
