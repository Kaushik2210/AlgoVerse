from typing import List


class Solution:
    def shipWithinDays(self, weights: List[int], days: int) -> int:
        def feasible(cap: int) -> bool:
            used_days, cur = 1, 0
            for w in weights:
                if cur + w > cap:
                    used_days += 1
                    cur = w
                    if used_days > days:
                        return False
                else:
                    cur += w
            return True

        lo, hi = max(weights), sum(weights)
        while lo < hi:
            mid = (lo + hi) // 2
            if feasible(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
