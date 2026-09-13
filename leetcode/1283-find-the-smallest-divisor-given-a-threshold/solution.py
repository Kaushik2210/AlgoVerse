import math
from typing import List


class Solution:
    def smallestDivisor(self, nums: List[int], threshold: int) -> int:
        def feasible(d: int) -> bool:
            return sum(math.ceil(x / d) for x in nums) <= threshold

        lo, hi = 1, max(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if feasible(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
