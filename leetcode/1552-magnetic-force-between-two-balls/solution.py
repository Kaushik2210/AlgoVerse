from typing import List


class Solution:
    def maxDistance(self, position: List[int], m: int) -> int:
        position.sort()

        def feasible(d: int) -> bool:
            count = 1
            last = position[0]
            for p in position[1:]:
                if p - last >= d:
                    count += 1
                    last = p
            return count >= m

        lo, hi = 1, position[-1] - position[0]
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if feasible(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo
