import math


class Solution:
    def nthMagicalNumber(self, n: int, a: int, b: int) -> int:
        MOD = 10**9 + 7
        lcm_ab = a * b // math.gcd(a, b)

        def count(x: int) -> int:
            return x // a + x // b - x // lcm_ab

        lo, hi = 1, n * min(a, b)
        while lo < hi:
            mid = (lo + hi) // 2
            if count(mid) >= n:
                hi = mid
            else:
                lo = mid + 1
        return lo % MOD
