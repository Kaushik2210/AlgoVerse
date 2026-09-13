class Solution {
    public int kInversePairs(int n, int k) {
        final int MOD = 1_000_000_007;

        long[] dp = new long[k + 1];
        dp[0] = 1;

        for (int i = 1; i <= n; i++) {
            long[] newDp = new long[k + 1];
            newDp[0] = 1;
            for (int j = 1; j <= k; j++) {
                newDp[j] = (newDp[j - 1] + dp[j]) % MOD;
                if (j - i >= 0) {
                    newDp[j] = (newDp[j] - dp[j - i] + MOD) % MOD;
                }
            }
            dp = newDp;
        }

        return (int) dp[k];
    }
}
