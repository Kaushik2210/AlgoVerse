class Solution {
    public int splitArray(int[] nums, int m) {
        long lo = 0, hi = 0;
        for (int x : nums) {
            lo = Math.max(lo, x);
            hi += x;
        }

        while (lo < hi) {
            long mid = lo + (hi - lo) / 2;
            if (feasible(nums, m, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int) lo;
    }

    private boolean feasible(int[] nums, int m, long cap) {
        int count = 1;
        long cur = 0;
        for (int x : nums) {
            if (cur + x > cap) {
                count++;
                cur = x;
                if (count > m) return false;
            } else {
                cur += x;
            }
        }
        return true;
    }
}
