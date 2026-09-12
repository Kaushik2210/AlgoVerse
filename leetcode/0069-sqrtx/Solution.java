class Solution {
    public int mySqrt(int x) {
        if (x < 2) {
            return x;
        }

        int lo = 1, hi = x / 2;
        int ans = 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            long sq = (long) mid * mid;
            if (sq <= x) {
                ans = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }

        return ans;
    }
}
