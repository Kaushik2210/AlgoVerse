class Solution {
    public int calculateMinimumHP(int[][] dungeon) {
        int m = dungeon.length, n = dungeon[0].length;
        int[][] dp = new int[m][n];

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int need;
                if (i == m - 1 && j == n - 1) {
                    need = 1 - dungeon[i][j];
                } else if (i == m - 1) {
                    need = dp[i][j + 1] - dungeon[i][j];
                } else if (j == n - 1) {
                    need = dp[i + 1][j] - dungeon[i][j];
                } else {
                    need = Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j];
                }
                dp[i][j] = Math.max(1, need);
            }
        }

        return dp[0][0];
    }
}
