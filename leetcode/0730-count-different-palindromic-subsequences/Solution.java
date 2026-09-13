class Solution {
    public int countPalindromicSubsequences(String s) {
        int n = s.length();
        long MOD = 1_000_000_007L;
        long[][] dp = new long[n][n];
        for (int i = 0; i < n; i++) dp[i][i] = 1;

        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                if (s.charAt(i) == s.charAt(j)) {
                    int lo = i + 1, hi = j - 1;
                    while (lo <= hi && s.charAt(lo) != s.charAt(i)) lo++;
                    while (lo <= hi && s.charAt(hi) != s.charAt(i)) hi--;
                    if (lo > hi) {
                        dp[i][j] = 2 * dp[i + 1][j - 1] + 2;
                    } else if (lo == hi) {
                        dp[i][j] = 2 * dp[i + 1][j - 1] + 1;
                    } else {
                        dp[i][j] = 2 * dp[i + 1][j - 1] - dp[lo + 1][hi - 1];
                    }
                } else {
                    dp[i][j] = dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1];
                }
                dp[i][j] = ((dp[i][j] % MOD) + MOD) % MOD;
            }
        }

        return (int) dp[0][n - 1];
    }
}
