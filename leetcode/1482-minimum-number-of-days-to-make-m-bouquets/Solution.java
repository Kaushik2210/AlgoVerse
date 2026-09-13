class Solution {
    public int minDays(int[] bloomDay, int m, int k) {
        int n = bloomDay.length;
        if ((long) m * k > n) return -1;

        int lo = Integer.MAX_VALUE, hi = Integer.MIN_VALUE;
        for (int b : bloomDay) {
            lo = Math.min(lo, b);
            hi = Math.max(hi, b);
        }

        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (feasible(bloomDay, m, k, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private boolean feasible(int[] bloomDay, int m, int k, int day) {
        int bouquets = 0, run = 0;
        for (int b : bloomDay) {
            if (b <= day) {
                run++;
                if (run == k) {
                    bouquets++;
                    run = 0;
                }
            } else {
                run = 0;
            }
        }
        return bouquets >= m;
    }
}
