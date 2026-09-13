from typing import List


class Solution:
    def splitArray(self, nums: List[int], m: int) -> int:
        def feasible(cap: int) -> bool:
            count, cur = 1, 0
            for x in nums:
                if cur + x > cap:
                    count += 1
                    cur = x
                    if count > m:
                        return False
                else:
                    cur += x
            return True

        lo, hi = max(nums), sum(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if feasible(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
