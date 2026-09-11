from typing import List


class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        best = current = nums[0]

        for x in nums[1:]:
            current = max(x, current + x)
            best = max(best, current)

        return best
