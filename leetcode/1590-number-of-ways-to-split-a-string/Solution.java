class Solution {
    public int numWays(String s) {
        final int MOD = 1_000_000_007;
        int n = s.length();
        int totalOnes = 0;
        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == '1') {
                totalOnes++;
            }
        }

        if (totalOnes % 3 != 0) {
            return 0;
        }

        if (totalOnes == 0) {
            long ways = (long) (n - 1) * (n - 2) / 2;
            return (int) (ways % MOD);
        }

        int each = totalOnes / 3;
        int[] onesIdx = new int[totalOnes];
        int k = 0;
        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == '1') {
                onesIdx[k++] = i;
            }
        }

        long firstCutChoices = onesIdx[each] - onesIdx[each - 1];
        long secondCutChoices = onesIdx[2 * each] - onesIdx[2 * each - 1];

        return (int) ((firstCutChoices * secondCutChoices) % MOD);
    }
}
