from typing import List


class Solution:
    def maximizeSweetness(self, sweetness: List[int], k: int) -> int:
        def feasible(min_sweet: int) -> bool:
            pieces, cur = 0, 0
            for s in sweetness:
                cur += s
                if cur >= min_sweet:
                    pieces += 1
                    cur = 0
            return pieces >= k + 1

        lo, hi = min(sweetness), sum(sweetness) // (k + 1)
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if feasible(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo
