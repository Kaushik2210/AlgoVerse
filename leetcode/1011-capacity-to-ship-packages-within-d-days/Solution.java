class Solution {
    public int shipWithinDays(int[] weights, int days) {
        int lo = 0, hi = 0;
        for (int w : weights) {
            lo = Math.max(lo, w);
            hi += w;
        }

        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (feasible(weights, days, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private boolean feasible(int[] weights, int days, int cap) {
        int usedDays = 1, cur = 0;
        for (int w : weights) {
            if (cur + w > cap) {
                usedDays++;
                cur = w;
                if (usedDays > days) return false;
            } else {
                cur += w;
            }
        }
        return true;
    }
}
