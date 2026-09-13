class Solution {
    public int numWays(int n, int k) {
        if (n == 0) return 0;
        if (n == 1) return k;

        long same = 0, diff = k;

        for (int i = 2; i <= n; i++) {
            long newSame = diff;
            long newDiff = (same + diff) * (k - 1);
            same = newSame;
            diff = newDiff;
        }

        return (int) (same + diff);
    }
}
