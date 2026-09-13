from typing import List
from functools import lru_cache


class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        rows = len(grid)
        cols = len(grid[0])

        @lru_cache(maxsize=None)
        def dp(row: int, c1: int, c2: int) -> int:
            if c1 < 0 or c1 >= cols or c2 < 0 or c2 >= cols:
                return float('-inf')

            cherries = grid[row][c1]
            if c1 != c2:
                cherries += grid[row][c2]

            if row == rows - 1:
                return cherries

            best = float('-inf')
            for d1 in (-1, 0, 1):
                for d2 in (-1, 0, 1):
                    best = max(best, dp(row + 1, c1 + d1, c2 + d2))

            return cherries + best

        result = dp(0, 0, cols - 1)
        dp.cache_clear()
        return result
