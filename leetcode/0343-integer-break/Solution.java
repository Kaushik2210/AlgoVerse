class Solution {
    public int integerBreak(int n) {
        int[] dp = new int[n + 1];
        for (int i = 2; i <= n; i++) {
            int best = 0;
            for (int j = 1; j < i; j++) {
                best = Math.max(best, Math.max(j * (i - j), j * dp[i - j]));
            }
            dp[i] = best;
        }
        return dp[n];
    }
}
