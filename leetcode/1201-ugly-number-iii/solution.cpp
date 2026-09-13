#include <algorithm>
using namespace std;

class Solution {
public:
    int nthUglyNumber(int n, int a, int b, int c) {
        long long la = a, lb = b, lc = c;
        long long ab = lcm(la, lb);
        long long ac = lcm(la, lc);
        long long bc = lcm(lb, lc);
        long long abc = lcm(ab, lc);

        long long lo = 1, hi = min(la, min(lb, lc)) * n;
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (count(mid, la, lb, lc, ab, ac, bc, abc) >= n) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int)lo;
    }

private:
    long long count(long long x, long long a, long long b, long long c,
                     long long ab, long long ac, long long bc, long long abc) {
        return x / a + x / b + x / c - x / ab - x / ac - x / bc + x / abc;
    }

    long long gcd(long long p, long long q) {
        return q == 0 ? p : gcd(q, p % q);
    }

    long long lcm(long long p, long long q) {
        return p / gcd(p, q) * q;
    }
};
