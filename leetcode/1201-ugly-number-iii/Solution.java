class Solution {
    public int nthUglyNumber(int n, int a, int b, int c) {
        long la = a, lb = b, lc = c;
        long ab = lcm(la, lb);
        long ac = lcm(la, lc);
        long bc = lcm(lb, lc);
        long abc = lcm(ab, lc);

        long lo = 1, hi = Math.min(la, Math.min(lb, lc)) * n;
        while (lo < hi) {
            long mid = lo + (hi - lo) / 2;
            if (count(mid, la, lb, lc, ab, ac, bc, abc) >= n) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int) lo;
    }

    private long count(long x, long a, long b, long c, long ab, long ac, long bc, long abc) {
        return x / a + x / b + x / c - x / ab - x / ac - x / bc + x / abc;
    }

    private long gcd(long p, long q) {
        return q == 0 ? p : gcd(q, p % q);
    }

    private long lcm(long p, long q) {
        return p / gcd(p, q) * q;
    }
}
