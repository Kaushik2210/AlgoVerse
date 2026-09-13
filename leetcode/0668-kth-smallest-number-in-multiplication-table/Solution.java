class Solution {
    public int findKthNumber(int m, int n, int k) {
        int lo = 1, hi = m * n;

        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (countLessEqual(m, n, mid) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private long countLessEqual(int m, int n, int x) {
        long total = 0;
        for (int i = 1; i <= m; i++) {
            total += Math.min(x / i, n);
        }
        return total;
    }
}
