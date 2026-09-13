class Solution {
    private int[] suffix;
    private int[][] memo;

    public int stoneGameII(int[] piles) {
        int n = piles.length;
        suffix = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            suffix[i] = suffix[i + 1] + piles[i];
        }
        memo = new int[n][n + 1];
        for (int[] row : memo) {
            java.util.Arrays.fill(row, -1);
        }
        return dp(0, 1, n);
    }

    private int dp(int index, int m, int n) {
        if (index + 2 * m >= n) {
            return suffix[index];
        }
        if (memo[index][m] != -1) {
            return memo[index][m];
        }
        int best = 0;
        for (int x = 1; x <= 2 * m; x++) {
            best = Math.max(best, suffix[index] - dp(index + x, Math.max(m, x), n));
        }
        memo[index][m] = best;
        return best;
    }
}
