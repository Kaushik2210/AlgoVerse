class Solution {
    public int nthMagicalNumber(int n, int a, int b) {
        final int MOD = 1_000_000_007;
        long lcmAb = lcm(a, b);

        long lo = 1, hi = (long) n * Math.min(a, b);
        while (lo < hi) {
            long mid = lo + (hi - lo) / 2;
            if (count(mid, a, b, lcmAb) >= n) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int) (lo % MOD);
    }

    private long count(long x, int a, int b, long lcmAb) {
        return x / a + x / b - x / lcmAb;
    }

    private long gcd(long p, long q) {
        return q == 0 ? p : gcd(q, p % q);
    }

    private long lcm(long p, long q) {
        return p / gcd(p, q) * q;
    }
}
