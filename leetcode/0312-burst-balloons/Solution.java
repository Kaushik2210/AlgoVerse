class Solution {
    public int maxCoins(int[] nums) {
        int n = nums.length + 2;
        int[] balloons = new int[n];
        balloons[0] = 1;
        balloons[n - 1] = 1;
        for (int i = 0; i < nums.length; i++) {
            balloons[i + 1] = nums[i];
        }

        int[][] dp = new int[n][n];

        for (int length = 2; length < n; length++) {
            for (int i = 0; i + length < n; i++) {
                int j = i + length;
                int best = 0;
                for (int k = i + 1; k < j; k++) {
                    int coins = dp[i][k] + dp[k][j] + balloons[i] * balloons[k] * balloons[j];
                    best = Math.max(best, coins);
                }
                dp[i][j] = best;
            }
        }

        return dp[0][n - 1];
    }
}
