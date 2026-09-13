class Solution {
    public String stoneGameIII(int[] stoneValue) {
        int n = stoneValue.length;
        int[] dp = new int[n + 1];

        for (int i = n - 1; i >= 0; i--) {
            int best = Integer.MIN_VALUE;
            int take = 0;
            for (int x = 1; x <= 3 && i + x <= n; x++) {
                take += stoneValue[i + x - 1];
                best = Math.max(best, take - dp[i + x]);
            }
            dp[i] = best;
        }

        if (dp[0] > 0) return "Alice";
        if (dp[0] < 0) return "Bob";
        return "Tie";
    }
}
