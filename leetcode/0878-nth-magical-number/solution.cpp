#include <algorithm>
using namespace std;

class Solution {
public:
    int nthMagicalNumber(int n, int a, int b) {
        const long long MOD = 1000000007LL;
        long long lcmAb = lcm(a, b);

        long long lo = 1, hi = (long long)n * min(a, b);
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (count(mid, a, b, lcmAb) >= n) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int)(lo % MOD);
    }

private:
    long long count(long long x, int a, int b, long long lcmAb) {
        return x / a + x / b - x / lcmAb;
    }

    long long gcd(long long p, long long q) {
        return q == 0 ? p : gcd(q, p % q);
    }

    long long lcm(long long p, long long q) {
        return p / gcd(p, q) * q;
    }
};
