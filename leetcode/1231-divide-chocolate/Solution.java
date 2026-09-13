class Solution {
    public int maximizeSweetness(int[] sweetness, int k) {
        int lo = Integer.MAX_VALUE;
        long total = 0;
        for (int s : sweetness) {
            lo = Math.min(lo, s);
            total += s;
        }
        int hi = (int) (total / (k + 1));

        while (lo < hi) {
            int mid = lo + (hi - lo + 1) / 2;
            if (feasible(sweetness, k, mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

    private boolean feasible(int[] sweetness, int k, int minSweet) {
        int pieces = 0;
        long cur = 0;
        for (int s : sweetness) {
            cur += s;
            if (cur >= minSweet) {
                pieces++;
                cur = 0;
            }
        }
        return pieces >= k + 1;
    }
}
