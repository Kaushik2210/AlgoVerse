class Solution {
    public double knightProbability(int n, int k, int row, int column) {
        int[][] moves = {
            {1, 2}, {2, 1}, {-1, 2}, {-2, 1},
            {1, -2}, {2, -1}, {-1, -2}, {-2, -1}
        };

        double[][] dp = new double[n][n];
        dp[row][column] = 1.0;

        for (int step = 0; step < k; step++) {
            double[][] newDp = new double[n][n];
            for (int r = 0; r < n; r++) {
                for (int c = 0; c < n; c++) {
                    if (dp[r][c] == 0.0) continue;
                    double share = dp[r][c] / 8.0;
                    for (int[] mv : moves) {
                        int nr = r + mv[0], nc = c + mv[1];
                        if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                            newDp[nr][nc] += share;
                        }
                    }
                }
            }
            dp = newDp;
        }

        double total = 0.0;
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                total += dp[r][c];
            }
        }
        return total;
    }
}
