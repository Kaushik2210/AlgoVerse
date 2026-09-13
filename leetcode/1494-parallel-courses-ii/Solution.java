import java.util.List;

class Solution {
    public int minNumberOfSemesters(int n, int[][] relations, int k) {
        int[] prereq = new int[n];
        for (int[] rel : relations) {
            prereq[rel[1] - 1] |= 1 << (rel[0] - 1);
        }

        int full = (1 << n) - 1;
        int[] dp = new int[1 << n];
        java.util.Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;

        for (int mask = 0; mask <= full; mask++) {
            if (dp[mask] == Integer.MAX_VALUE) continue;

            int available = 0;
            for (int c = 0; c < n; c++) {
                if ((mask & (1 << c)) != 0) continue;
                if ((prereq[c] & mask) == prereq[c]) {
                    available |= 1 << c;
                }
            }

            if (available == 0) continue;

            for (int sub = available; sub > 0; sub = (sub - 1) & available) {
                if (Integer.bitCount(sub) <= k) {
                    int newMask = mask | sub;
                    if (dp[mask] + 1 < dp[newMask]) {
                        dp[newMask] = dp[mask] + 1;
                    }
                }
            }
        }

        return dp[full];
    }
}
