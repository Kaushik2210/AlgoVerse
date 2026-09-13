from typing import List
from functools import lru_cache


class Solution:
    def stoneGameII(self, piles: List[int]) -> int:
        n = len(piles)
        suffix = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            suffix[i] = suffix[i + 1] + piles[i]

        @lru_cache(maxsize=None)
        def dp(index: int, m: int) -> int:
            if index + 2 * m >= n:
                return suffix[index]
            best = 0
            for x in range(1, 2 * m + 1):
                best = max(best, suffix[index] - dp(index + x, max(m, x)))
            return best

        result = dp(0, 1)
        dp.cache_clear()
        return result
