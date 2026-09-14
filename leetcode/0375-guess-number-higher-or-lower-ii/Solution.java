class Solution {
    public int getMoneyAmount(int n) {
        int[][] dp = new int[n + 2][n + 2];

        for (int length = 2; length <= n; length++) {
            for (int i = 1; i <= n - length + 1; i++) {
                int j = i + length - 1;
                int best = Integer.MAX_VALUE;
                for (int g = i; g <= j; g++) {
                    int left = (g - 1 >= i) ? dp[i][g - 1] : 0;
                    int right = (g + 1 <= j) ? dp[g + 1][j] : 0;
                    int cost = g + Math.max(left, right);
                    if (cost < best) {
                        best = cost;
                    }
                }
                dp[i][j] = best;
            }
        }

        return dp[1][n];
    }
}
