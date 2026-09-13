from functools import lru_cache


class Solution:
    def minDays(self, n: int) -> int:
        @lru_cache(maxsize=None)
        def f(n: int) -> int:
            if n <= 1:
                return n
            return 1 + min(n % 2 + f(n // 2), n % 3 + f(n // 3))

        return f(n)
