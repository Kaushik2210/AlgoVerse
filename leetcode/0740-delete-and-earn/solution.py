from typing import List


class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        if not nums:
            return 0

        max_val = max(nums)
        points = [0] * (max_val + 1)
        for x in nums:
            points[x] += x

        take, skip = 0, 0
        for v in range(1, max_val + 1):
            new_take = skip + points[v]
            new_skip = max(take, skip)
            take, skip = new_take, new_skip

        return max(take, skip)
